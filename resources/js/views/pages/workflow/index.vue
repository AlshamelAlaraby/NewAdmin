<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import adminApi from "../../../api/adminAxios";
import Switches from "vue-switches";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import { dynamicSortString } from "../../../helper/tableSort";
import Multiselect from "vue-multiselect";
import { formatDateOnly } from "../../../helper/startDate";
import TreeBrowser from "../../../components/tree.vue";
import Partner from "../../../components/create/partner";
import Company from "../../../components/create/company";
import Module from "../../../components/create/module";
import Screen from "../../../components/create/screen";
/**
 * Advanced Table component
 */

export default {
  page: {
    title: "WorkFlow",
    meta: [{ name: "description", content: "WorkFlow" }],
  },
  components: {
    Layout,
    PageHeader,
    Switches,
    ErrorMessage,
    loader,
    Multiselect,
    TreeBrowser,
    Partner,
    Company,
    Module,
    Screen,
  },
  data() {
    return {
      per_page: 50,
      search: "",
      debounce: {},
      workflowsPagination: {},
      currentNodeId: null,
      rootNodes: [],
      workflows: [],
      partners: [],
      companies: [],
      modules: [],
      screens: [],
      enabled3: true,
      isLoader: false,
      Tooltip: "",
      mouseEnter: "",
      current_id: null,
      menus: [],
      company_data: null,
      create: {
        partner_id: null,
        company_id: null,
        module_id: null,
        id_sort: null,
        media: [],
        is_active: "active",
      },
      edit: {
        partner_id: null,
        company_id: null,
        module_id: null,
        id_sort: null,
        is_active: "active",
        old_media: [],
      },
      errors: {},
      isCheckAll: false,
      checkAll: [],
      images: [],
      media: {},
      workflow_id: null,
      saveImageName: [],
      current_page: 1,
      showPhoto: "./images/img-1.png",
      setting: {
        partner_id: true,
        company_id: true,
        module_id: true,
        // id_sort: true,
        // is_active: true,
      },
      idDelete: null,
      filterSetting: [
        "name",
        "name_e",
        this.$i18n.locale == "ar" ? "company.name" : "company.name_e",
        this.$i18n.locale == "ar" ? "module.name" : "module.name_e",
        this.$i18n.locale == "ar" ? "screen.name" : "screen.name_e",
      ],
      printLoading: true,
      printObj: {
        id: "printMe",
      },
    };
  },
  validations: {
    create: {
      // menu: { required },
      partner_id: { required },
      company_id: { required },
      is_active: { required },
      media: {},
    },
    edit: {
      // name: { required, minLength: minLength(2), maxLength: maxLength(100) },
      // name_e: { required, minLength: minLength(2), maxLength: maxLength(100) },
      is_active: { required },
      media: {},
      partner_id: { required },
      company_id: { required },
      // menu: { required },
    },
  },
  watch: {
    /**
     * watch per_page
     */
    per_page(after, befour) {
      this.getData();
    },
    /**
     * watch search
     */
    search(after, befour) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.getData();
      }, 400);
    },
    /**
     * watch check All table
     */
    isCheckAll(after, befour) {
      if (after) {
        this.workflows.forEach((el) => {
          if (!this.checkAll.includes(el.id)) {
            this.checkAll.push(el.id);
          }
        });
      } else {
        this.checkAll = [];
      }
    },
  },

  mounted() {
    this.getData();
  },

  updated() {
    $(function () {
      $(".englishInput").keypress(function (event) {
        var ew = event.which;
        if (ew == 32) return true;
        if (48 <= ew && ew <= 57) return true;
        if (65 <= ew && ew <= 90) return true;
        if (97 <= ew && ew <= 122) return true;
        return false;
      });
      $(".arabicInput").keypress(function (event) {
        var ew = event.which;
        if (ew == 32) return false;
        if (48 <= ew && ew <= 57) return false;
        if (65 <= ew && ew <= 90) return false;
        if (97 <= ew && ew <= 122) return false;
        return true;
      });
    });
  },
  methods: {
    deleteNode(id, company_id, menu_id) {
      Swal.fire({
        title: `${this.$t("general.Areyousure")}`,
        text: `${this.$t("general.Youwontbeabletoreverthis")}`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: `${this.$t("general.Yesdeleteit")}`,
        cancelButtonText: `${this.$t("general.Nocancel")}`,
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.isLoader = true;
          adminApi
            .delete(`/menu-tree/${id}`)
            .then((res) => {
              this.checkAll = [];
              this.getRootNodes(company_id, menu_id);
              Swal.fire({
                icon: "success",
                title: `${this.$t("general.Deleted")}`,
                text: `${this.$t("general.Yourrowhasbeendeleted")}`,
                showConfirmButton: false,
                timer: 1500,
              });
            })

            .catch((err) => {
              if (err.response.status == 400) {
                Swal.fire({
                  icon: "error",
                  title: `${this.$t("general.Error")}`,
                  text: `${this.$t("general.CantDeleteRelation")}`,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `${this.$t("general.Error")}`,
                  text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                });
              }
            })
            .finally(() => {
              this.isLoader = false;
            });
        }
      });
    },
    showModuleModal(id) {
      if (this.create.module_id == 0) {
        this.$bvModal.show("module-create");
        this.create.module_id = null;
        return;
      }
      // if (this.create.company_id && this.create.module_id) {
      //   this.getRootNodes(this.create.company_id, this.create.module_id);
      // }
      // this.getScreens(id);
    },
    showModuleModalEdit(id) {
      if (this.edit.module_id == 0) {
        this.$bvModal.show("module-create");
        this.edit.module_id = null;
        return;
      }
      // if (this.edit.company_id && this.edit.module_id) {
      //   this.getRootNodes(this.create.company_id, this.create.module_id);
      // }
      // this.getScreens(id);
    },
    showScreenModal() {
      if (this.create.screen_id == 0) {
        this.$bvModal.show("screen-create");
        this.create.screen_id = null;
      }
    },
    showScreenModalEdit() {
      if (this.edit.screen_id == 0) {
        this.$bvModal.show("screen-create");
        this.edit.screen_id = null;
      }
    },
    async getLookup() {
      await adminApi
        .get(`/workflow-trees/lookup`)
        .then((res) => {
          this.menus = res.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    getThirdLevelChildNodes(rootNode, parentNode, secondParentNode) {
      if (!secondParentNode.collapsed) {
        adminApi
          .get(`/workflow-trees/child-nodes/${secondParentNode.id}`)
          .then((res) => {
            this.rootNodes = this.getRootNodesAfter2ndCollapse(
              rootNode,
              parentNode,
              secondParentNode,
              res.data
            );
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
          });
      } else {
        this.rootNodes = this.getRootNodesAfter2ndCollapse(
          rootNode,
          parentNode,
          secondParentNode
        );
      }
    },
    getRootNodesAfter2ndCollapse(
      parentNode,
      secondParentNode,
      thirdParentNode,
      children
    ) {
      let rootNodes = [...this.rootNodes];
      console.log("Here one !!!!!");
      rootNodes.forEach((_parentNode, parentIndex) => {
        console.log("Here tow !!!!!");
        if (_parentNode.id == parentNode.id) {
          console.log("Here three !!!!!");
          if (_parentNode.children && _parentNode.children.length) {
            console.log("Here four !!!!!");
            _parentNode.children.forEach((child, index) => {
              console.log("Here five !!!!!");

              if (child.id == secondParentNode.id) {
                console.log("Here sex !!!!!");

                child.children.forEach((_child, _index) => {
                  console.log("Here seven !!!!!");

                  if (thirdParentNode.id == _child.id) {
                    console.log("Here 8 !!!!!");

                    if (thirdParentNode.collapsed) {
                      console.log("Here 9 !!!!!");

                      rootNodes[parentIndex].children[index].children[
                        _index
                      ].children = [];
                      rootNodes[parentIndex].children[index].children[
                        _index
                      ].collapsed = false;
                      console.log("Here 10 !!!!!");
                    } else {
                      console.log("Here 11 !!!!!");

                      rootNodes[parentIndex].children[index].children[
                        _index
                      ].children = children;
                      console.log("Here 12 !!!!!");

                      rootNodes[parentIndex].children[index].children[
                        _index
                      ].collapsed = true;
                      console.log("Here 13 !!!!!");
                    }
                    return;
                  }
                });
              }
            });
            return;
          }
        }
      });
      return rootNodes;
    },
    /**
     *  start get Data workflow && pagination
     */
    getData(page = 1) {
      this.isLoader = true;

      let filter = "";
      for (let i = 0; i < this.filterSetting.length; i++) {
        filter += `columns[${i}]=${this.filterSetting[i]}&`;
      }

      adminApi
        .get(
          `/workflow-trees?page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.workflows = l.data;
          this.workflowsPagination = l.pagination;
          this.current_page = l.pagination.current_page;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        })
        .finally(() => {
          this.isLoader = false;
        });
    },
    getDataCurrentPage(page = 1) {
      if (
        this.current_page <= this.workflowsPagination.last_page &&
        this.current_page != this.workflowsPagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        for (let i = 0; i < this.filterSetting.length; i++) {
          filter += `columns[${i}]=${this.filterSetting[i]}&`;
        }

        adminApi
          .get(
            `/workflow-trees?page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.workflows = l.data;
            this.workflowsPagination = l.pagination;
            this.current_page = l.pagination.current_page;
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
          })
          .finally(() => {
            this.isLoader = false;
          });
      }
    },
    /**
     *  end get Data workflow && pagination
     */
    /**
     *  start delete workflow
     */
    deleteCountry(id, tree = false, create = true) {
      if (Array.isArray(id)) {
        Swal.fire({
          title: `${this.$t("general.Areyousure")}`,
          text: `${this.$t("general.Youwontbeabletoreverthis")}`,
          type: "warning",
          showCancelButton: true,
          confirmButtonText: `${this.$t("general.Yesdeleteit")}`,
          cancelButtonText: `${this.$t("general.Nocancel")}`,
          confirmButtonClass: "btn btn-success mt-2",
          cancelButtonClass: "btn btn-danger ml-2 mt-2",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.isLoader = true;
            adminApi
              .post(`/workflow-trees/bulk-delete`, { ids: id })
              .then((res) => {
                this.checkAll = [];
                this.getData();
                Swal.fire({
                  icon: "success",
                  title: `${this.$t("general.Deleted")}`,
                  text: `${this.$t("general.Yourrowhasbeendeleted")}`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              })
              .catch((err) => {
                if (err.response.status == 400) {
                  Swal.fire({
                    icon: "error",
                    title: `${this.$t("general.Error")}`,
                    text: `${this.$t("general.CantDeleteRelation")}`,
                  });
                  this.getData();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: `${this.$t("general.Error")}`,
                    text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                  });
                }
              })
              .finally(() => {
                this.isLoader = false;
              });
          }
        });
      } else {
        Swal.fire({
          title: `${this.$t("general.Areyousure")}`,
          text: `${this.$t("general.Youwontbeabletoreverthis")}`,
          type: "warning",
          showCancelButton: true,
          confirmButtonText: `${this.$t("general.Yesdeleteit")}`,
          cancelButtonText: `${this.$t("general.Nocancel")}`,
          confirmButtonClass: "btn btn-success mt-2",
          cancelButtonClass: "btn btn-danger ml-2 mt-2",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.isLoader = true;

            adminApi
              .delete(`/workflow-trees/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                if (tree) {
                  let moduleId = create
                    ? this.create.module_id
                    : this.edit.module_id;
                  this.getRootNodes(moduleId);
                }
                Swal.fire({
                  icon: "success",
                  title: `${this.$t("general.Deleted")}`,
                  text: `${this.$t("general.Yourrowhasbeendeleted")}`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              })

              .catch((err) => {
                if (err.response.status == 400) {
                  Swal.fire({
                    icon: "error",
                    title: `${this.$t("general.Error")}`,
                    text: `${this.$t("general.CantDeleteRelation")}`,
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: `${this.$t("general.Error")}`,
                    text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                  });
                }
              })
              .finally(() => {
                this.isLoader = false;
              });
          }
        });
      }
    },
    /**
     *  end delete workflow
     */
    /**
     *  reset Modal (create)
     */
    resetModalHidden() {
      this.create = {
        name: "",
        name_e: "",
        partner_id: null,
        menu_tree_id: null,
        company_id: null,
        module_id: null,
        screen_id: [],
        id_sort: null,
        is_active: "active",
        media: null,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.images = [];
      this.workflow_id = null;
      this.errors = {};
      this.partners = [];
      this.companies = [];
      this.modules = [];
      this.screens = [];
      this.rootNodes = [];
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      this.companies.unshift({
        id: 0,
        name: "اضف شركة",
        name_e: "Add company",
      });
      this.modules.unshift({ id: 0, name: "اضف وحدة", name_e: "Add module" });
      await this.getPartners();
      await this.getLookup();
      this.create = {
        name: "",
        name_e: "",
        company_id: null,
        module_id: null,
        id_sort: null,
        is_active: "active",
      };
      this.showPhoto = "./images/img-1.png";
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.rootNodes = [];
      this.workflow_id = null;
      this.media = {};
      this.images = [];
      this.errors = {};
    },
    /**
     *  create workflow
     */
    resetForm() {
      this.create = {
        partner_id: null,
        company_id: null,
        module_id: null,
        id_sort: null,
        is_active: "active",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.workflow_id = null;
      this.media = {};
      this.images = [];
      this.rootNodes = [];
    },
    AddSubmit() {
      this.$v.create.$touch();
      if (this.$v.create.$invalid) {
        return;
      }
      this.isLoader = true;
      this.errors = {};
      this.create.name = "";
      this.create.name_e = "";
      // let workflowMenu = [];
      // this.create.screen_id.forEach(screen => {
      //   let element = {
      //     screen_id: screen, menu_tree_id: this.create.menu_tree_id
      //     , workflow_id: this.workflow_id, company_id: this.create.company_id
      //   }
      //   workflowMenu.push(element);
      // })
      adminApi
        .post(`/workflow-trees`, {
          module_ids: this.create.module_id,
          company_id: this.create.company_id,
          partner_id: this.create.partner_id,
        })
        .then((res) => {
          this.workflow_id = res.data.data.id;
          this.getData();
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              text: `${this.$t("general.Addedsuccessfully")}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }, 200);
        })
        .catch((err) => {
          if (err.response.data) {
            this.errors = err.response.data.errors;
          } else {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
          }
        })
        .finally(() => {
          this.isLoader = false;
        });
    },
    /**
     *  edit workflow
     */
    editSubmit(id) {
      this.$v.edit.$touch();
      this.images.forEach((e) => {
        this.edit.old_media.push(e.id);
      });
      if (this.$v.edit.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.edit.name = "";
        this.edit.name_e = "";
        let workflowMenu = [];
        // this.edit.screen_id.forEach(screen => {
        //   let element = {
        //     screen_id: screen, menu_tree_id: this.edit.menu_tree_id
        //     , workflow_id: id, company_id: this.edit.company_id
        //   }
        //   workflowMenu.push(element);
        // })
        adminApi
          .put(`/workflow-trees/${id}`, {
            module_id: this.edit.module_id,
            company_id: this.edit.company_id,
            partner_id: this.edit.partner_id,
          })
          .then((res) => {
            this.$bvModal.hide(`modal-edit-${id}`);
            this.getData();
            setTimeout(() => {
              Swal.fire({
                icon: "success",
                text: `${this.$t("general.Editsuccessfully")}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }, 500);
          })
          .catch((err) => {
            if (err.response.data) {
              this.errors = err.response.data.errors;
            } else {
              Swal.fire({
                icon: "error",
                title: `${this.$t("general.Error")}`,
                text: `${this.$t("general.Thereisanerrorinthesystem")}`,
              });
            }
          })
          .finally(() => {
            this.isLoader = false;
          });
      }
    },
    /*
     *  log workflow
     * */
    formatDate(value) {
      return formatDateOnly(value);
    },
    log(id) {
      if (this.mouseEnter != id) {
        this.Tooltip = "";
        this.mouseEnter = id;
        adminApi
          .get(`/workflow-trees/logs/${id}`)
          .then((res) => {
            let l = res.data.data;
            l.forEach((e) => {
              this.Tooltip += `Created By: ${e.causer_type}; Event: ${
                e.event
              }; Description: ${e.description} ;Created At: ${this.formatDate(
                e.created_at
              )} \n`;
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
          });
      } else {
      }
    },
    /**
     *   show Modal (edit)
     */
    async resetModalEdit(id) {
      let workflow = this.workflows.find((e) => id == e.id);
      await this.getPartners();
      await this.getLookup();
      this.edit.partner_id = workflow.partner_id;
      await this.getCompanies(this.edit.partner_id);
      this.edit.company_id = workflow.company_id;
      await this.getModules(this.edit.company_id);
      this.company_data = workflow.company;
      this.workflow_id = id;
      this.edit.parent_id = workflow.parent_id;
      this.edit.module_id = workflow.module_id;
      this.edit.id_sort = workflow.id_sort;
      this.edit.is_active = workflow.is_active;
      this.images = workflow.media ? workflow.media : [];
      if (this.images && this.images.length > 0) {
        this.showPhoto = this.images[this.images.length - 1].webp;
      } else {
        this.showPhoto = "./images/img-1.png";
      }
      // await this.getRootNodes(this.edit.company_id, this.edit.module_id);
      this.errors = {};
      this.current_id = id;
    },
    /**
     *  hidden Modal (edit)
     */
    resetModalHiddenEdit(id) {
      this.errors = {};
      this.edit = {
        partner_id: null,
        company_id: null,
        module_id: null,
        id_sort: null,
        is_active: "active",
        old_media: [],
      };
      this.workflow_id = null;
      this.images = [];
      this.partners = [];
      this.companies = [];
      this.modules = [];
      this.screens = [];
      this.rootNodes = [];
    },
    /**
     *  get screens
     */
    async getPartners() {
      await adminApi
        .get(`/partners`)
        .then((res) => {
          let l = res.data.data;
          l.unshift({ id: 0, name: "اضف شريك", name_e: "Add partner" });
          this.partners = l;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getCompanies(id) {
      if (id == 0) {
        this.$bvModal.show("partner-create");
        setTimeout(() => {
          this.create.partner_id = null;
          this.edit.partner_id = null;
        }, 400);
        return;
      }
      await adminApi
        .get(`/partner-company/${id}`)
        .then((res) => {
          let l = res.data.data;
          l.unshift({ id: 0, name: "اضف شركة", name_e: "Add company" });
          this.companies = l;
          this.create.company_id = null;
          this.edit.company_id = null;
          this.company_data = null;
          this.create.module_id = null;
          this.edit.module_id = null;
          this.edit.name = null;
          this.edit.name_e = null;
          this.create.name = null;
          this.create.name_e = null;
          this.modules = [];
          this.screens = [];
          this.rootNodes = [];
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getModules(id) {
      if (id == 0) {
        this.$bvModal.show("company-create");
        setTimeout(() => {
          this.create.company_id = null;
          this.edit.company_id = null;
          this.company_data = null;
        }, 400);
        return;
      }
      await adminApi
        .get(`/com-modules/${id}`)
        .then((res) => {
          console.log(res.data);
          let l = res.data.data;
          // l.unshift({ id: 0, name: "اضف وحدة", name_e: "Add module" });
          this.modules = l;
          this.create.module_id = null;
          this.edit.module_id = null;
          this.create.screen_id = null;
          this.edit.screen_id = null;
          this.edit.name = null;
          this.edit.name_e = null;
          this.create.name = null;
          this.create.name_e = null;
          this.screens = [];
          this.rootNodes = [];
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getScreens(moduleId) {
      await adminApi
        .get(`/workflow-trees/module-screens/${moduleId}`)
        .then((res) => {
          this.screens = res.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },

    async getRootNodes(companyId, moduleId) {
      await adminApi
        .get(`/menu-tree/module-root-nodes/${companyId}/${moduleId}`)
        .then((res) => {
          this.rootNodes = res.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    setChildNodes(result) {
      if (result.node.screen_tree) {
        let company_id = this.create.company_id
          ? this.create.company_id
          : this.edit.company_id;
        adminApi
          .get(
            `/screens?menu_tree_id=${result.node.id}&company_id=${company_id}&workflow_id=${this.workflow_id}`
          )
          .then((res) => {
            result.node.children = res.data.data.map((el) => {
              return {
                ...el,
                parent: result.node,
                isScreen: true,
              };
            });
            result.expanded.push(result.node);
          });
        return;
      }
      adminApi
        .get(`/workflow-trees/child-nodes/${result.node.id}`)
        .then((res) => {
          this.isLoader = false;
          result.node.children = res.data.map((el) => {
            return {
              ...el,
              parent: result.node,
            };
          });
          result.expanded.push(result.node);
        });
    },
    setCreateCurrentNode(node) {
      if (node.isScreen) return;
      if (this.create.menu_tree_id != node.id) {
        this.create.menu_tree_id = node.id;
      } else {
        this.create.menu_tree_id = null;
      }
    },
    setUpdateCurrentNode(node) {
      if (node.isScreen) return;
      this.isLoader = true;
      if (this.edit.menu_tree_id != node.id) {
        this.edit.menu_tree_id = node.id;
      } else {
        this.edit.menu_tree_id = null;
      }
      if (this.edit.menu_tree_id) {
        adminApi
          .get(
            `/screens?menu_tree_id=${node.id}&company_id=${this.edit.company_id}&workflow_id=${this.workflow_id}`
          )
          .then((res) => {
            this.isLoader = false;
            this.edit.screen_id = res.data.data.map((el) => el.id);
          });
      } else {
        this.isLoader = false;
        this.edit.screen_id = [];
      }
    },
    setParentsIds(node, parents) {
      if (node.parent) {
        parents.push(node.parent.id);
        this.setParentsIds(node.parent, parents);
      }
    },
    /**
     *  start  dynamicSortString
     */
    sortString(value) {
      return dynamicSortString(value);
    },
    /**
     *  start  ckeckRow
     */
    checkRow(id) {
      if (!this.checkAll.includes(id)) {
        this.checkAll.push(id);
      } else {
        let index = this.checkAll.indexOf(id);
        this.checkAll.splice(index, 1);
      }
    },
    /**
     *  end  ckeckRow
     */
    moveInput(tag, c, index) {
      document.querySelector(`${tag}[data-${c}='${index}']`).focus();
    },
    /**
     *  start Image ceate
     */
    changePhoto() {
      document.getElementById("uploadImageCreate").click();
    },
    changePhotoEdit() {
      document.getElementById("uploadImageEdit").click();
    },
    onImageChanged(e) {
      const file = e.target.files[0];
      this.addImage(file);
    },
    addImage(file) {
      this.media = file; //upload
      if (file) {
        this.idDelete = null;
        let is_media = this.images.find(
          (e) => e.name == file.name.slice(0, file.name.indexOf("."))
        );
        this.idDelete = is_media ? is_media.id : null;
        if (!this.idDelete) {
          this.isLoader = true;
          let formDate = new FormData();
          formDate.append("media[0]", this.media);
          adminApi
            .post(`/media`, formDate)
            .then((res) => {
              let old_media = [];

              this.images.forEach((e) => old_media.push(e.id));
              let new_media = [];
              res.data.data.forEach((e) => new_media.push(e.id));
              adminApi
                .put(`/workflow-trees/${this.workflow_id}`, {
                  old_media,
                  media: new_media,
                })
                .then((res) => {
                  console.log(res);
                  this.images = res.data.data.media ? res.data.data.media : [];
                  if (this.images && this.images.length > 0) {
                    this.showPhoto = this.images[this.images.length - 1].webp;
                  }

                  this.getData();
                })
                .catch((err) => {
                  Swal.fire({
                    icon: "error",
                    title: `${this.$t("general.Error")}`,
                    text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                  });
                });
            })
            .catch((err) => {
              if (err.response.data) {
                this.errors = err.response.data.errors;
              } else {
                Swal.fire({
                  icon: "error",
                  title: `${this.$t("general.Error")}`,
                  text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                });
              }
            })
            .finally(() => {
              this.isLoader = false;
            });
        } else {
          Swal.fire({
            title: `${this.$t("general.Thisfilehasalreadybeenuploaded")}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: `${this.$t("general.Replace")}`,
            cancelButtonText: `${this.$t("general.Nocancel")}`,
            confirmButtonClass: "btn btn-success mt-2",
            cancelButtonClass: "btn btn-danger ml-2 mt-2",
            buttonsStyling: false,
          }).then((result) => {
            if (result.value) {
              this.isLoader = true;
              let formDate = new FormData();
              formDate.append("media[0]", this.media);
              adminApi
                .post(`/media`, formDate)
                .then((res) => {
                  let old_media = [];
                  this.images.forEach((e) => old_media.push(e.id));
                  old_media.splice(old_media.indexOf(this.idDelete), 1);
                  let new_media = [];
                  res.data.data.forEach((e) => new_media.push(e.id));
                  adminApi
                    .put(`/workflow-trees/${this.workflow_id}`, {
                      old_media,
                      media: new_media,
                    })
                    .then((res) => {
                      this.images = res.data.data.media
                        ? res.data.data.media
                        : [];
                      if (this.images && this.images.length > 0) {
                        this.showPhoto =
                          this.images[this.images.length - 1].webp;
                      }
                      this.getData();
                    })
                    .catch((err) => {
                      Swal.fire({
                        icon: "error",
                        title: `${this.$t("general.Error")}`,
                        text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                      });
                    });
                })
                .catch((err) => {
                  if (err.response.data) {
                    this.errors = err.response.data.errors;
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: `${this.$t("general.Error")}`,
                      text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                    });
                  }
                })
                .finally(() => {
                  this.isLoader = false;
                });
            }
          });
        }
      }
    },
    deleteImageCreate(id, index) {
      let old_media = [];
      this.images.forEach((e) => {
        if (e.id != id) {
          old_media.push(e.id);
        }
      });
      adminApi
        .put(`/workflow-trees/${this.workflow_id}`, { old_media })
        .then((res) => {
          this.workflows[index] = res.data.data;
          this.images = res.data.data.media ? res.data.data.media : [];
          if (this.images && this.images.length > 0) {
            this.showPhoto = this.images[this.images.length - 1].webp;
          } else {
            this.showPhoto = "./images/img-1.png";
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    /**
     *  end Image ceate
     */

    /**
     *   Export Excel
     */
    ExportExcel(type, fn, dl) {
      this.enabled3 = false;
      setTimeout(() => {
        let elt = this.$refs.exportable_table;
        let wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
        if (dl) {
          XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" });
        } else {
          XLSX.writeFile(
            wb,
            fn ||
              ("Work Flow" + "." || "SheetJSTableExport.") + (type || "xlsx")
          );
        }
        this.enabled3 = true;
      }, 100);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader />
    <Partner @created="getPartners" />
    <Company />
    <Module />
    <Screen @created="getScreens" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- start search -->
            <div class="row justify-content-between align-items-center mb-2">
              <h4 class="header-title">{{ $t("Workflow.WorkflowsTable") }}</h4>
              <div class="col-xs-10 col-md-9 col-lg-7" style="font-weight: 500">
                <div class="d-inline-block" style="width: 22.2%">
                  <!-- Basic dropdown -->
                  <b-dropdown
                    variant="primary"
                    :text="$t('general.searchSetting')"
                    ref="dropdown"
                    class="btn-block setting-search"
                  >
                    <b-form-checkbox
                      v-model="filterSetting"
                      :value="
                        $i18n.locale == 'ar' ? 'company.name' : 'company.name_e'
                      "
                      class="mb-1"
                      >{{ $t("company.company") }}
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="filterSetting"
                      :value="
                        $i18n.locale == 'ar' ? 'module.name' : 'module.name_e'
                      "
                      class="mb-1"
                      >{{ $t("module.module") }}
                    </b-form-checkbox>
                  </b-dropdown>
                  <!-- Basic dropdown -->
                </div>

                <div
                  class="d-inline-block position-relative"
                  style="width: 77%"
                >
                  <span
                    :class="[
                      'search-custom position-absolute',
                      $i18n.locale == 'ar' ? 'search-custom-ar' : '',
                    ]"
                  >
                    <i class="fe-search"></i>
                  </span>
                  <input
                    class="form-control"
                    style="display: block; width: 93%; padding-top: 3px"
                    type="text"
                    v-model.trim="search"
                    :placeholder="`${$t('general.Search')}...`"
                  />
                </div>
              </div>
            </div>
            <!-- end search -->

            <div
              class="row justify-content-between align-items-center mb-2 px-1"
            >
              <div class="col-md-3 d-flex align-items-center mb-1 mb-xl-0">
                <!-- start create and printer -->
                <b-button
                  v-b-modal.create
                  variant="primary"
                  class="btn-sm mx-1 font-weight-bold"
                >
                  {{ $t("general.Create") }}
                  <i class="fas fa-plus"></i>
                </b-button>
                <div class="d-inline-flex">
                  <button
                    @click="ExportExcel('xlsx')"
                    class="custom-btn-dowonload"
                  >
                    <i class="fas fa-file-download"></i>
                  </button>
                  <button v-print="'#printMe'" class="custom-btn-dowonload">
                    <i class="fe-printer"></i>
                  </button>
                  <button
                    class="custom-btn-dowonload"
                    @click="$bvModal.show(`modal-edit-${checkAll[0]}`)"
                    v-if="checkAll.length == 1"
                  >
                    <i class="mdi mdi-square-edit-outline"></i>
                  </button>
                  <!-- start mult delete  -->
                  <button
                    class="custom-btn-dowonload"
                    v-if="checkAll.length > 1"
                    @click.prevent="deleteCountry(checkAll)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!-- end mult delete  -->
                  <!--  start one delete  -->
                  <button
                    class="custom-btn-dowonload"
                    v-if="checkAll.length == 1"
                    @click.prevent="deleteCountry(checkAll[0])"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!--  end one delete  -->
                </div>
                <!-- end create and printer -->
              </div>
              <div
                class="col-xs-10 col-md-9 col-lg-7 d-flex align-items-center justify-content-end"
              >
                <div class="d-fex">
                  <!-- start filter and setting -->
                  <div class="d-inline-block">
                    <b-button class="mx-1 custom-btn-background">
                      {{ $t("general.filter") }}
                      <i class="fas fa-filter"></i>
                    </b-button>
                    <b-button class="mx-1 custom-btn-background">
                      {{ $t("general.group") }}
                      <i class="fe-menu"></i>
                    </b-button>
                    <!-- Basic dropdown -->
                    <b-dropdown
                      variant="primary"
                      :html="`${$t(
                        'general.setting'
                      )} <i class='fe-settings'></i>`"
                      ref="dropdown"
                      class="dropdown-custom-ali"
                    >
                      <b-form-checkbox
                        v-model="setting.partner_id"
                        class="mb-1"
                      >
                        {{ $t("general.Partner") }}
                      </b-form-checkbox>
                      <b-form-checkbox
                        v-model="setting.company_id"
                        class="mb-1"
                      >
                        {{ $t("general.Company") }}
                      </b-form-checkbox>
                      <b-form-checkbox v-model="setting.module_id" class="mb-1">
                        {{ $t("general.Module") }}
                      </b-form-checkbox>
                      <!-- <b-form-checkbox v-model="setting.id_sort" class="mb-1">
                        {{ $t("general.IdSort") }}
                      </b-form-checkbox>  -->
                      <!-- <b-form-checkbox v-model="setting.is_active" class="mb-1">
                        {{ $t("general.Status") }}
                      </b-form-checkbox> -->
                      <div class="d-flex justify-content-end">
                        <a
                          href="javascript:void(0)"
                          class="btn btn-primary btn-sm"
                          >{{ $t("general.Apply") }}</a
                        >
                      </div>
                    </b-dropdown>
                    <!-- Basic dropdown -->
                  </div>
                  <!-- end filter and setting -->

                  <!-- start Pagination -->
                  <div
                    class="d-inline-flex align-items-center pagination-custom"
                  >
                    <div class="d-inline-block" style="font-size: 13px">
                      {{ workflowsPagination.from }}-{{
                        workflowsPagination.to
                      }}
                      /
                      {{ workflowsPagination.total }}
                    </div>
                    <div class="d-inline-block">
                      <a
                        href="javascript:void(0)"
                        :style="{
                          'pointer-events':
                            workflowsPagination.current_page == 1 ? 'none' : '',
                        }"
                        @click.prevent="
                          getData(workflowsPagination.current_page - 1)
                        "
                      >
                        <span>&lt;</span>
                      </a>
                      <input
                        type="text"
                        @keyup.enter="getDataCurrentPage()"
                        v-model="current_page"
                        class="pagination-current-page"
                      />
                      <a
                        href="javascript:void(0)"
                        :style="{
                          'pointer-events':
                            workflowsPagination.last_page ==
                            workflowsPagination.current_page
                              ? 'none'
                              : '',
                        }"
                        @click.prevent="
                          getData(workflowsPagination.current_page + 1)
                        "
                      >
                        <span>&gt;</span>
                      </a>
                    </div>
                  </div>
                  <!-- end Pagination -->
                </div>
              </div>
            </div>
            <!--  create   -->
            <b-modal
              id="create"
              :title="$t('Workflow.AddWorkflow')"
              title-class="font-18"
              dialog-class="modal-full-width"
              body-class="workflow"
              :hide-footer="true"
              @show="resetModal"
              @hidden="resetModalHidden"
            >
              <form>
                <div class="card">
                  <div class="card-body">
                    <div class="mt-1 d-flex justify-content-end">
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        variant="success"
                        :disabled="!workflow_id"
                        @click.prevent="resetForm"
                        type="button"
                        :class="[
                          'font-weight-bold px-2',
                          workflow_id ? 'mx-2' : '',
                        ]"
                      >
                        {{ $t("general.AddNewRecord") }}
                      </b-button>

                      <template v-if="!workflow_id">
                        <b-button
                          variant="success"
                          type="button"
                          class="mx-1 font-weight-bold px-3"
                          v-if="!isLoader"
                          @click.prevent="AddSubmit"
                        >
                          {{ $t("general.Save") }}
                        </b-button>

                        <b-button
                          variant="success"
                          class="mx-1"
                          disabled
                          v-else
                        >
                          <b-spinner small></b-spinner>
                          <span class="sr-only"
                            >{{ $t("login.Loading") }}...</span
                          >
                        </b-button>
                      </template>

                      <b-button
                        variant="danger"
                        class="font-weight-bold"
                        type="button"
                        @click.prevent="$bvModal.hide(`create`)"
                      >
                        {{ $t("general.Cancel") }}
                      </b-button>
                    </div>
                  </div>
                  <b-tabs nav-class="nav-tabs nav-bordered">
                    <b-tab :title="$t('general.DataEntry')" active>
                      <div class="row">
                        <!-- <div class="myUl-workflow col-md-6">
                          <TreeBrowser @deleteClicked="deleteNode($event.id, create.company_id, create.module_id)"
                            :currentNodeId="create.menu_tree_id" @onClick="setCreateCurrentNode"
                            @nodeExpanded="setChildNodes" :nodes="rootNodes" />
                        </div> -->
                        <div class="col-md-12">
                          <div class="row">
                            <!-- <div class="col-md-12 position-relative">
                                                                                    <div class="form-group">
                                                                                      <label class="my-1 mr-2">{{ $t("general.menu") }}</label>
                                                                                      <span class="text-danger">*</span>
                                                                                      <multiselect
                                                                                        v-model="create.menu"
                                                                                        :options="menus"
                                                                                        :custom-label="
                                                                                          (opt) =>
                                                                                            $i18n.locale == 'ar' ? opt.name : opt.name_e
                                                                                        "
                                                                                        :class="{
                                                                                          'is-invalid': $v.create.menu.$error || errors.menu,
                                                                                        }"
                                                                                      >
                                                                                      </multiselect>
                                                                                      <div
                                                                                        v-if="!$v.create.menu.required"
                                                                                        class="invalid-feedback"
                                                                                      >
                                                                                        {{ $t("general.fieldIsRequired") }}
                                                                                      </div>
                                                                                    </div>
                                                                                  </div> -->
                            <div class="col-md-4 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2">{{
                                  $t("general.Partner")
                                }}</label>
                                <span class="text-danger">*</span>

                                <multiselect
                                  @select="getCompanies"
                                  v-model="create.partner_id"
                                  :options="partners.map((type) => type.id)"
                                  :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? partners.find((x) => x.id == opt).name
                                        : partners.find((x) => x.id == opt)
                                            .name_e
                                  "
                                  :class="{
                                    'is-invalid':
                                      $v.create.partner_id.$error ||
                                      errors.partner_id,
                                  }"
                                >
                                </multiselect>
                                <div
                                  v-if="!$v.create.partner_id.required"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.fieldIsRequired") }}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2"
                                  >{{ $t("general.Company") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <multiselect
                                  @select="getModules"
                                  v-model="create.company_id"
                                  :options="companies.map((type) => type.id)"
                                  :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? companies.find((x) => x.id == opt)
                                            .name
                                        : companies.find((x) => x.id == opt)
                                            .name_e
                                  "
                                  :class="{
                                    'is-invalid':
                                      $v.create.company_id.$error ||
                                      errors.company_id,
                                  }"
                                >
                                </multiselect>
                                <div
                                  v-if="!$v.create.company_id.required"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.fieldIsRequired") }}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2"
                                  >{{ $t("general.Module") }}
                                </label>
                                <multiselect
                                  :multiple="true"
                                  v-model="create.module_id"
                                  :options="modules.map((type) => type.id)"
                                  :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? `${
                                            modules.find((x) => x.id == opt)
                                              .parent.name
                                          }|${
                                            modules.find((x) => x.id == opt)
                                              .name
                                          }`
                                        : `${
                                            modules.find((x) => x.id == opt)
                                              .parent.name_e
                                          }|${
                                            modules.find((x) => x.id == opt)
                                              .name_e
                                          }`
                                  "
                                >
                                </multiselect>
                              </div>
                            </div>
                            <!-- <div class="col-md-6 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2">{{
                                  $t("general.Screen")
                                }}</label>
                                <multiselect :multiple="true" @input="showScreenModal" v-model="create.screen_id"
                                  :options="screens.map((type) => type.id)" :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? screens.find((x) => x.id == opt).name
                                        : screens.find((x) => x.id == opt).name_e
                                  ">
                                </multiselect>
                              </div>
                            </div> -->
                            <!-- <div class="col-md-6">
                              <div class="form-group">
                                <label for="field-2" class="control-label">
                                  {{ $t("general.IdSort") }}
                                </label>
                                <div>
                                  <input type="number" class="form-control" data-create="2"
                                    @keypress.enter="moveInput('input', 'create', 3)" v-model="create.id_sort"
                                    id="field-2" />
                                </div>
                              </div>
                            </div> -->
                            <!-- <div class="col-md-6">
                              <div class="form-group">
                                <label class="mr-2">
                                  {{ $t("general.Status") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <b-form-group :class="{
                                  'is-invalid':
                                    $v.create.is_active.$error || errors.is_active,
                                  'is-valid':
                                    !$v.create.is_active.$invalid && !errors.is_active,
                                }">
                                  <b-form-radio class="d-inline-block" v-model="$v.create.is_active.$model"
                                    name="some-radios" value="active">{{ $t("general.Active") }}
                                  </b-form-radio>
                                  <b-form-radio class="d-inline-block m-1" v-model="$v.create.is_active.$model"
                                    name="some-radios" value="inactive">{{ $t("general.Inactive") }}
                                  </b-form-radio>
                                </b-form-group>
                                <template v-if="errors.is_active">
                                  <ErrorMessage v-for="(errorMessage, index) in errors.is_active" :key="index">{{
                                    errorMessage }}
                                  </ErrorMessage>
                                </template>
                              </div>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </b-tab>
                    <b-tab
                      :disabled="!workflow_id"
                      :title="$t('general.ImageUploads')"
                    >
                      <div class="row">
                        <input
                          accept="image/png, image/gif, image/jpeg, image/jpg"
                          type="file"
                          id="uploadImageCreate"
                          @change.prevent="onImageChanged"
                          class="input-file-upload position-absolute"
                          :class="[
                            'd-none',
                            {
                              'is-invalid':
                                $v.create.media.$error || errors.media,
                              'is-valid':
                                !$v.create.media.$invalid && !errors.media,
                            },
                          ]"
                        />
                        <div class="col-md-8 my-1">
                          <!-- file upload -->
                          <div
                            class="row align-content-between"
                            style="width: 100%; height: 100%"
                          >
                            <div class="col-12">
                              <div class="d-flex flex-wrap">
                                <div
                                  :class="[
                                    'dropzone-previews col-4 position-relative mb-2',
                                  ]"
                                  v-for="(photo, index) in images"
                                  :key="photo.id"
                                >
                                  <div
                                    :class="[
                                      'card mb-0 shadow-none border',
                                      images.length - 1 == index
                                        ? 'bg-primary'
                                        : '',
                                    ]"
                                  >
                                    <div class="p-2">
                                      <div class="row align-items-center">
                                        <div
                                          class="col-auto"
                                          @click="showPhoto = photo.webp"
                                        >
                                          <img
                                            data-dz-thumbnail
                                            :src="photo.webp"
                                            class="avatar-sm rounded bg-light"
                                            @error="src = './images/img-1.png'"
                                          />
                                        </div>
                                        <div class="col pl-0">
                                          <a
                                            href="javascript:void(0);"
                                            :class="[
                                              'font-weight-bold',
                                              images.length - 1 == index
                                                ? 'text-white'
                                                : 'text-muted',
                                            ]"
                                            data-dz-name
                                          >
                                            {{ photo.name }}
                                          </a>
                                        </div>
                                        <!-- Button -->
                                        <a
                                          href="javascript:void(0);"
                                          :class="[
                                            'btn-danger dropzone-close',
                                            $i18n.locale == 'ar'
                                              ? 'dropzone-close-rtl'
                                              : '',
                                          ]"
                                          data-dz-remove
                                          @click.prevent="
                                            deleteImageCreate(photo.id, index)
                                          "
                                        >
                                          <i class="fe-x"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="footer-image col-12">
                              <b-button
                                @click="changePhoto"
                                variant="success"
                                type="button"
                                class="mx-1 font-weight-bold px-3"
                                v-if="!isLoader"
                              >
                                {{ $t("general.Add") }}
                              </b-button>
                              <b-button
                                variant="success"
                                class="mx-1"
                                disabled
                                v-else
                              >
                                <b-spinner small></b-spinner>
                                <span class="sr-only"
                                  >{{ $t("login.Loading") }}...</span
                                >
                              </b-button>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="show-dropzone">
                            <img
                              :src="showPhoto"
                              class="img-thumbnail"
                              @error="src = './images/img-1.png'"
                            />
                          </div>
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </form>
            </b-modal>
            <!--  /create   -->

            <!-- start .table-responsive-->
            <div
              class="table-responsive mb-3 custom-table-theme position-relative"
            >
              <!--       start loader       -->
              <loader size="large" v-if="isLoader" />
              <!--       end loader       -->
              {{ create.menu }}
              <table
                class="table table-borderless table-hover table-centered m-0"
                ref="exportable_table"
                id="printMe"
              >
                <thead>
                  <tr>
                    <th
                      v-if="enabled3"
                      class="do-not-print"
                      scope="col"
                      style="width: 0"
                    >
                      <div class="form-check custom-control">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="isCheckAll"
                          style="width: 17px; height: 17px"
                        />
                      </div>
                    </th>
                    <th v-if="setting.partner_id">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Partner") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? 'name' : 'name_e')
                                )
                              )
                            "
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? '-name' : '-name_e')
                                )
                              )
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.company_id">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Company") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? 'name' : 'name_e')
                                )
                              )
                            "
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? '-name' : '-name_e')
                                )
                              )
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.module_id">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Module") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? 'name' : 'name_e')
                                )
                              )
                            "
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="
                              workflows.sort(
                                sortString(
                                  ($i18n.locale = 'ar' ? '-name' : '-name_e')
                                )
                              )
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <!-- <th v-if="setting.id_sort">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.IdSort") }}</span>
                        <div class="arrow-sort">
                          <i class="fas fa-arrow-up" @click="workflows.sort(sortString('id_sort'))"></i>
                          <i class="fas fa-arrow-down" @click="workflows.sort(sortString('-id_sort'))"></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.is_active">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Status") }}</span>
                        <div class="arrow-sort">
                          <i class="fas fa-arrow-up" @click="workflows.sort(sortString('is_active'))"></i>
                          <i class="fas fa-arrow-down" @click="workflows.sort(sortString('-is_active'))"></i>
                        </div>
                      </div>
                    </th> -->
                    <th v-if="enabled3" class="do-not-print">
                      {{ $t("general.Action") }}
                    </th>
                    <th v-if="enabled3" class="do-not-print">
                      <i class="fas fa-ellipsis-v"></i>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="workflows.length > 0">
                  <tr
                    @click.capture="checkRow(data.id)"
                    @dblclick.prevent="$bvModal.show(`modal-edit-${data.id}`)"
                    v-for="(data, index) in workflows"
                    :key="data.id"
                    class="body-tr-custom"
                  >
                    <td v-if="enabled3" class="do-not-print">
                      <div
                        class="form-check custom-control"
                        style="min-height: 1.9em"
                      >
                        <input
                          style="width: 17px; height: 17px"
                          class="form-check-input"
                          type="checkbox"
                          v-model="checkAll"
                          :value="data.id"
                        />
                      </div>
                    </td>
                    <td v-if="setting.partner_id">
                      <h5 class="m-0 font-weight-normal">
                        {{
                          $i18n.locale == "ar"
                            ? data.partner.name
                            : data.partner.name_e
                        }}
                      </h5>
                    </td>
                    <td v-if="setting.company_id">
                      <h5 class="m-0 font-weight-normal">
                        {{
                          $i18n.locale == "ar"
                            ? data.company.name
                            : data.company.name_e
                        }}
                      </h5>
                    </td>
                    <td v-if="setting.module_id">
                      <h5 v-if="data.module" class="m-0 font-weight-normal">
                        {{
                          $i18n.locale == "ar"
                            ? data.module.name
                            : data.module.name_e
                        }}
                      </h5>
                    </td>
                    <!-- <td v-if="setting.id_sort">
                      <h5 class="m-0 font-weight-normal">{{ data.id_sort }}</h5>
                    </td>
                    <td v-if="setting.is_active">
                      <span :class="[
                        data.is_active == 'active' ? 'text-success' : 'text-danger',
                        'badge',
                      ]">
                        {{
                          data.is_active == "active"
                          ? `${$t("general.Active")}`
                          : `${$t("general.Inactive")}`
                        }}
                      </span>
                    </td> -->
                    <td v-if="enabled3" class="do-not-print">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm dropdown-toggle dropdown-coustom"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {{ $t("general.commands") }}
                          <i class="fas fa-angle-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-custom">
                          <a
                            class="dropdown-item"
                            href="#"
                            @click="$bvModal.show(`modal-edit-${data.id}`)"
                          >
                            <div
                              class="d-flex justify-content-between align-items-center text-black"
                            >
                              <span>{{ $t("general.edit") }}</span>
                              <i
                                class="mdi mdi-square-edit-outline text-info"
                              ></i>
                            </div>
                          </a>
                          <a
                            class="dropdown-item text-black"
                            href="#"
                            @click.prevent="deleteCountry(data.id)"
                          >
                            <div
                              class="d-flex justify-content-between align-items-center text-black"
                            >
                              <span>{{ $t("general.delete") }}</span>
                              <i class="fas fa-times text-danger"></i>
                            </div>
                          </a>
                        </div>
                      </div>

                      <!--  edit   -->
                      <b-modal
                        :id="`modal-edit-${data.id}`"
                        :title="
                          $t('Workflow.EditWorkflow') +
                          (company_data
                            ? '    ( ' +
                              $t('general.companyName') +
                              ' : ' +
                              ($i18n.locale == 'ar'
                                ? company_data.name
                                : company_data.name_e) +
                              ' )'
                            : '')
                        "
                        title-class="font-18"
                        body-class="workflow"
                        dialog-class="modal-full-width"
                        :ref="`edit-${data.id}`"
                        :hide-footer="true"
                        @show="resetModalEdit(data.id)"
                        @hidden="resetModalHiddenEdit(data.id)"
                      >
                        <div class="card">
                          <div class="card-body">
                            <div class="mt-1 d-flex justify-content-end">
                              <!-- Emulate built in modal footer ok and cancel button actions -->
                              <b-button
                                variant="success"
                                @click.prevent="editSubmit(data.id)"
                                type="button"
                                class="mx-1 font-weight-bold px-3"
                                v-if="!isLoader"
                              >
                                {{ $t("general.Add") }}
                              </b-button>

                              <b-button
                                variant="success"
                                class="mx-1"
                                disabled
                                v-else
                              >
                                <b-spinner small></b-spinner>
                                <span class="sr-only"
                                  >{{ $t("login.Loading") }}...</span
                                >
                              </b-button>

                              <b-button
                                variant="danger"
                                class="font-weight-bold"
                                type="button"
                                @click.prevent="
                                  $bvModal.hide(`modal-edit-${data.id}`)
                                "
                              >
                                {{ $t("general.Cancel") }}
                              </b-button>
                            </div>
                          </div>
                          <b-tabs nav-class="nav-tabs nav-bordered">
                            <b-tab :title="$t('general.DataEntry')" active>
                              <div class="row">
                                <!-- <div class="myUl-workflow col-md-6">
                                  <TreeBrowser @deleteClicked="deleteNode($event.id, edit.company_id, edit.module_id)"
                                    :currentNodeId="edit.menu_tree_id" @onClick="setUpdateCurrentNode"
                                    @nodeExpanded="setChildNodes" :nodes="rootNodes" />
                                </div> -->
                                <div class="col-md-12">
                                  <div class="row">
                                    <!-- <div class="col-md-12 position-relative">
                                                                                            <div class="form-group">
                                                                                              <label class="my-1 mr-2">{{
                                                                                                $t("general.menu")
                                                                                              }}</label>
                                                                                              <span class="text-danger">*</span>
                                                                                              <multiselect
                                                                                                v-model="edit.menu"
                                                                                                :options="menus"
                                                                                                :custom-label="
                                                                                                  (opt) =>
                                                                                                    $i18n.locale == 'ar' ? opt.name : opt.name_e
                                                                                                "
                                                                                                :class="{
                                                                                                  'is-invalid':
                                                                                                    $v.edit.menu.$error || errors.menu,
                                                                                                }"
                                                                                              >
                                                                                              </multiselect>
                                                                                              <div
                                                                                                v-if="!$v.edit.menu.required"
                                                                                                class="invalid-feedback"
                                                                                              >
                                                                                                {{ $t("general.fieldIsRequired") }}
                                                                                              </div>
                                                                                            </div>
                                                                                          </div> -->
                                    <div class="col-md-4 position-relative">
                                      <div class="form-group">
                                        <label class="my-1 mr-2">{{
                                          $t("general.Partner")
                                        }}</label>
                                        <span class="text-danger">*</span>

                                        <multiselect
                                          @select="getCompanies"
                                          v-model="edit.partner_id"
                                          :options="
                                            partners.map((type) => type.id)
                                          "
                                          :custom-label="
                                            (opt) =>
                                              $i18n.locale == 'ar'
                                                ? partners.find(
                                                    (x) => x.id == opt
                                                  ).name
                                                : partners.find(
                                                    (x) => x.id == opt
                                                  ).name_e
                                          "
                                          :class="{
                                            'is-invalid':
                                              $v.edit.partner_id.$error ||
                                              errors.partner_id,
                                          }"
                                        >
                                        </multiselect>
                                        <div
                                          v-if="!$v.edit.partner_id.required"
                                          class="invalid-feedback"
                                        >
                                          {{ $t("general.fieldIsRequired") }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-4 position-relative">
                                      <div class="form-group">
                                        <label class="my-1 mr-2"
                                          >{{ $t("general.Company") }}
                                          <span class="text-danger">*</span>
                                        </label>
                                        <multiselect
                                          @select="getModules"
                                          v-model="edit.company_id"
                                          :options="
                                            companies.map((type) => type.id)
                                          "
                                          :custom-label="
                                            (opt) =>
                                              $i18n.locale == 'ar'
                                                ? companies.find(
                                                    (x) => x.id == opt
                                                  ).name
                                                : companies.find(
                                                    (x) => x.id == opt
                                                  ).name_e
                                          "
                                          :class="{
                                            'is-invalid':
                                              $v.edit.company_id.$error ||
                                              errors.company_id,
                                          }"
                                        >
                                        </multiselect>
                                        <div
                                          v-if="!$v.edit.company_id.required"
                                          class="invalid-feedback"
                                        >
                                          {{ $t("general.fieldIsRequired") }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-4 position-relative">
                                      <div class="form-group">
                                        <label class="my-1 mr-2"
                                          >{{ $t("general.Module") }}
                                        </label>
                                        <multiselect
                                          v-model="edit.module_id"
                                          :options="
                                            modules.map((type) => type.id)
                                          "
                                          :custom-label="
                                            (opt) =>
                                              $i18n.locale == 'ar'
                                                ? `${
                                                    modules.find(
                                                      (x) => x.id == opt
                                                    ).parent.name
                                                  }|${
                                                    modules.find(
                                                      (x) => x.id == opt
                                                    ).name
                                                  }`
                                                : `${
                                                    modules.find(
                                                      (x) => x.id == opt
                                                    ).parent.name_e
                                                  }|${
                                                    modules.find(
                                                      (x) => x.id == opt
                                                    ).name_e
                                                  }`
                                          "
                                        >
                                        </multiselect>
                                      </div>
                                    </div>
                                    <!-- <div class="col-md-6 position-relative">
                                      <div class="form-group">
                                        <label class="my-1 mr-2">{{
                                          $t("general.Screen")
                                        }}</label>
                                        <multiselect :multiple="true" @input="showScreenModalEdit"
                                          v-model="edit.screen_id" :options="screens.map((type) => type.id)"
                                          :custom-label="
                                            (opt) =>
                                              $i18n.locale == 'ar'
                                                ? screens.find((x) => x.id == opt).name
                                                : screens.find((x) => x.id == opt).name_e
                                          ">
                                        </multiselect>
                                      </div>
                                    </div> -->
                                    <!-- <div class="col-md-6">
                                      <div class="form-group">
                                        <label for="field-2" class="control-label">
                                          {{ $t("general.IdSort") }}
                                        </label>
                                        <div>
                                          <input type="number" class="form-control" data-create="2" @keypress.enter="
                                            moveInput('input', 'create', 3)
                                          " v-model="edit.id_sort" id="field-2" />
                                        </div>
                                      </div>
                                    </div> -->
                                    <!-- <div class="col-md-6">
                                      <div class="form-group">
                                        <label class="mr-2">
                                          {{ $t("general.Status") }}
                                          <span class="text-danger">*</span>
                                        </label>
                                        <b-form-group :class="{
                                          'is-invalid':
                                            $v.edit.is_active.$error ||
                                            errors.is_active,
                                          'is-valid':
                                            !$v.edit.is_active.$invalid &&
                                            !errors.is_active,
                                        }">
                                          <b-form-radio class="d-inline-block" v-model="$v.edit.is_active.$model"
                                            name="some-radios" value="active">{{ $t("general.Active") }}
                                          </b-form-radio>
                                          <b-form-radio class="d-inline-block m-1" v-model="$v.edit.is_active.$model"
                                            name="some-radios" value="inactive">{{ $t("general.Inactive") }}
                                          </b-form-radio>
                                        </b-form-group>
                                        <template v-if="errors.is_active">
                                          <ErrorMessage v-for="(
                                                                                                    errorMessage, index
                                                                                                  ) in errors.is_active"
                                            :key="index">
                                            {{
                                              errorMessage
                                            }}
                                          </ErrorMessage>
                                        </template>
                                      </div>
                                    </div> -->
                                  </div>
                                </div>
                              </div>
                            </b-tab>
                            <b-tab :title="$t('general.ImageUploads')">
                              <div class="row">
                                <input
                                  accept="image/png, image/gif, image/jpeg, image/jpg"
                                  type="file"
                                  id="uploadImageEdit"
                                  @change.prevent="onImageChanged"
                                  class="input-file-upload position-absolute"
                                  :class="[
                                    'd-none',
                                    {
                                      'is-invalid':
                                        $v.edit.media.$error || errors.media,
                                      'is-valid':
                                        !$v.edit.media.$invalid &&
                                        !errors.media,
                                    },
                                  ]"
                                />
                                <div class="col-md-8 my-1">
                                  <!-- file upload -->
                                  <div
                                    class="row align-content-between"
                                    style="width: 100%; height: 100%"
                                  >
                                    <div class="col-12">
                                      <div class="d-flex flex-wrap">
                                        <div
                                          class="dropzone-previews col-4 position-relative mb-2"
                                          v-for="(photo, index) in images"
                                        >
                                          <div
                                            :class="[
                                              'card mb-0 shadow-none border',
                                              images.length - 1 == index
                                                ? 'bg-primary'
                                                : '',
                                            ]"
                                          >
                                            <div class="p-2">
                                              <div
                                                class="row align-items-center"
                                              >
                                                <div
                                                  class="col-auto"
                                                  @click="
                                                    showPhoto = photo.webp
                                                  "
                                                >
                                                  <img
                                                    data-dz-thumbnail
                                                    :src="photo.webp"
                                                    class="avatar-sm rounded bg-light"
                                                    @error="
                                                      src = './images/img-1.png'
                                                    "
                                                  />
                                                </div>
                                                <div class="col pl-0">
                                                  <a
                                                    href="javascript:void(0);"
                                                    :class="[
                                                      'font-weight-bold',
                                                      images.length - 1 == index
                                                        ? 'text-white'
                                                        : 'text-muted',
                                                    ]"
                                                    data-dz-name
                                                  >
                                                    {{ photo.name }}
                                                  </a>
                                                </div>
                                                <!-- Button -->
                                                <a
                                                  href="javascript:void(0);"
                                                  :class="[
                                                    'btn-danger text-muted dropzone-close',
                                                    $i18n.locale == 'ar'
                                                      ? 'dropzone-close-rtl'
                                                      : '',
                                                  ]"
                                                  data-dz-remove
                                                  @click.prevent="
                                                    deleteImageCreate(
                                                      photo.id,
                                                      index
                                                    )
                                                  "
                                                >
                                                  <i class="fe-x"></i>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="footer-image col-12">
                                      <b-button
                                        @click="changePhotoEdit"
                                        variant="success"
                                        type="button"
                                        class="mx-1 font-weight-bold px-3"
                                        v-if="!isLoader"
                                      >
                                        {{ $t("general.Add") }}
                                      </b-button>
                                      <b-button
                                        variant="success"
                                        class="mx-1"
                                        disabled
                                        v-else
                                      >
                                        <b-spinner small></b-spinner>
                                        <span class="sr-only"
                                          >{{ $t("login.Loading") }}...</span
                                        >
                                      </b-button>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="show-dropzone">
                                    <img
                                      :src="showPhoto"
                                      class="img-thumbnail"
                                      @error="src = './images/img-1.png'"
                                    />
                                  </div>
                                </div>
                              </div>
                            </b-tab>
                          </b-tabs>
                        </div>
                      </b-modal>
                      <!--  /edit   -->
                    </td>
                    <td v-if="enabled3" class="do-not-print">
                      <b-button
                        class="btn"
                        @mouseover="log(data.id)"
                        @mousemove="log(data.id)"
                        :id="'tooltip-button-' + data.id"
                        :variant="$i18n.locale == 'en' ? 'left' : 'right'"
                      >
                        <i class="fe-info" style="font-size: 22px"></i
                      ></b-button>
                      <b-tooltip
                        :target="'tooltip-button-' + data.id"
                        :placement="$i18n.locale == 'en' ? 'left' : 'right'"
                        >{{ Tooltip }}</b-tooltip
                      >
                      <!--                      <button-->
                      <!--                        @mouseover="log(data.id)"-->
                      <!--                        @mousemove="log(data.id)"-->
                      <!--                        type="button"-->
                      <!--                        class="btn"-->
                      <!--                        data-toggle="tooltip"-->
                      <!--                        :data-placement="$i18n.locale == 'en' ? 'left' : 'right'"-->
                      <!--                        :title="Tooltip"-->
                      <!--                      >-->
                      <!--                        <i class="fe-info" style="font-size: 22px"></i>-->
                      <!--                      </button>-->
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th class="text-center" colspan="11">
                      {{ $t("general.notDataFound") }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- end .table-responsive-->
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
.myUl-workflow {
  ul,
  #myUL {
    list-style-type: none;
  }

  #myUL {
    .delete-node {
      i {
        font-size: 18px;
        margin: 0 5px;
      }
    }

    margin: 0;
    padding: 0;

    span {
      i {
        font-size: 20px;
        position: relative;
        top: 3px;
        color: black;
      }

      span:hover,
      i:hover {
        cursor: pointer;
      }
    }
  }

  .nested {
    display: block;
  }

  .active {
    color: #1abc9c;
  }

  &.rtl {
    #myUL {
      .without-children {
        padding-right: 10px;
      }

      .nested {
        padding-right: 40px;
      }
    }
  }

  &.ltr {
    #myUL {
      .without-children {
        padding-left: 10px;
      }
    }
  }
}

.modal-dialog .card {
  margin: 0 !important;
}

.workflow.modal-body {
  padding: 0 !important;
}

.modal-dialog .card-body {
  padding: 1.5rem 1.5rem 0 1.5rem !important;
}

.nav-bordered {
  border: unset !important;
}

.nav {
  background-color: #dff0fe;
}

.tab-content {
  padding: 70px 60px 40px;
  min-height: 300px;
  background-color: #f5f5f5;
  position: relative;
}

.nav-tabs .nav-link {
  border: 1px solid #b7b7b7 !important;
  background-color: #d7e5f2;
  border-bottom: 0 !important;
  margin-bottom: 1px;
}

.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #000;
  background-color: hsl(0deg 0% 96%);
  border-bottom: 0 !important;
}

.img-thumbnail {
  max-height: 400px !important;
}

@media print {
  .do-not-print {
    display: none;
  }

  .arrow-sort {
    display: none;
  }

  .bg-soft-success {
    background-color: unset;
    color: #000000 !important;
    border: unset;
  }

  .bg-soft-danger {
    background-color: unset;
    color: #000000 !important;
    border: unset;
  }
}

.tooltip-inner {
  max-width: 750px !important;
  background-color: #eed900;
  color: black;
}
</style>
