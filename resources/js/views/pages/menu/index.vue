<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import adminApi from "../../../api/adminAxios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import { dynamicSortString } from "../../../helper/tableSort";
import { formatDateOnly } from "../../../helper/startDate";
import { arabicValue, englishValue } from "../../../helper/langTransform";
import Multiselect from "vue-multiselect";

import TreeBrowser from "../../../components/tree.vue";

/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Menu",
    meta: [{ name: "description", content: "Menus" }],
  },
  components: {
    Multiselect,
    Layout,
    PageHeader,
    ErrorMessage,
    loader,
    TreeBrowser,
  },
  updated() {
    // $("").keypress(function (event) {
    //   var ew = event.which;
    //   if (ew == 32) return true;
    //   if (48 <= ew && ew <= 57) return true;
    //   if (65 <= ew && ew <= 90) return true;
    //   if (97 <= ew && ew <= 122) return true;
    //   return false;
    // });
    // $(".arabicInput").keypress(function (event) {
    //   var ew = event.which;
    //   if (ew == 32) return true;
    //   if (48 <= ew && ew <= 57) return false;
    //   if (65 <= ew && ew <= 90) return false;
    //   if (97 <= ew && ew <= 122) return false;
    //   return true;
    // });
  },
  data() {
    return {
      per_page: 50,
      search: "",
      debounce: {},
      menusPagination: {},
      menus: [],
      enabled3: true,
      isLoader: false,
      Tooltip: "",
      mouseEnter: "",
      rootNodes: [],
      menu_id: null,
      editClicked: false,
      programs: [],
      folders: [],
      create: {
        project_program_module_id: null,
        menu_folder: [],
      },
      createTree: {
        name: null,
        name_e: null,
        parent_id: null,
        is_active: "active",
      },
      edit: {
        project_program_module_id: null,
        menu_folder: [],
      },
      setting: {
        program: true,
        folder: true,
      },
      filterSetting: ["program", "folder"],
      errors: {},
      isCheckAll: false,
      checkAll: [],
      is_disabled: false,
      current_page: 1,
      printLoading: true,
      printObj: {
        id: "printMe",
      },
    };
  },
  validations: {
    create: {
      project_program_module_id: { required },
      menu_folder: { required },
    },
    createTree: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      is_active: { required },
    },
    edit: {
      project_program_module_id: { required },
      menu_folder: { required },
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
        this.hotfields.forEach((el) => {
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
  methods: {
    async getPrograms() {
      await adminApi
        .get(`/modules?child=true`)
        .then((res) => {
          let l = res.data.data;
          this.programs = l;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getFolders() {
      await adminApi
        .get(`/folder-menu`)
        .then((res) => {
          let l = res.data.data;
          this.folders = l;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    cancelEdit() {
      this.editClicked = false;
      this.$v.$reset();
      this.createTree = {
        name: "",
        name_e: "",
        is_active: "active",
        parent_id: null,
        id: null,
      };
    },
    resetTreeEdit(node) {
      this.editClicked = true;
      this.createTree.name = node.name;
      this.createTree.id = node.id;
      this.createTree.name_e = node.name_e;
      this.createTree.parent_id = node.parent_id;
      this.createTree.is_active = node.is_active;
    },
    test() {
      alert("test");
    },
    SubmitMenuTree() {
      if (this.createTree.name || this.createTree.name_e) {
        this.createTree.name = this.createTree.name
          ? this.createTree.name
          : this.createTree.name_e;
        this.createTree.name_e = this.createTree.name_e
          ? this.createTree.name_e
          : this.createTree.name;
      }
      this.$v.createTree.$touch();
      if (this.$v.createTree.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.is_disabled = false;
        if (this.createTree.parent_id == null) {
          this.createTree.parent_id = 0;
        }
        adminApi
          .post(`/program-folder-tree`, {
            ...this.createTree,
            menu_id: this.menu_id,
            id: undefined,
          })
          .then((res) => {
            this.$v.createTree.$reset();
            this.createTree = {
              name: "",
              name_e: "",
              is_active: "active",
              parent_id: null,
              id: null,
            };
            this.getData();
            this.is_disabled = true;
            this.getRootNodes(this.menu_id);
            setTimeout(() => {
              Swal.fire({
                icon: "success",
                text: `${this.$t("general.Addedsuccessfully")}`,
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
    SubmitMenuTreeEdit() {
      if (this.createTree.name || this.createTree.name_e) {
        this.createTree.name = this.createTree.name
          ? this.createTree.name
          : this.createTree.name_e;
        this.createTree.name_e = this.createTree.name_e
          ? this.createTree.name_e
          : this.createTree.name;
      }
      this.$v.createTree.$touch();
      if (this.$v.createTree.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        if (this.createTree.parent_id == null) {
          this.createTree.parent_id = 0;
        }
        adminApi
          .put(`/program-folder-tree/${this.createTree.id}`, {
            ...this.createTree,
            menu_id: this.menu_id,
            id: undefined,
          })
          .then((res) => {
            this.getRootNodes(this.menu_id);
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

    deleteMenu(id, tree = false, menu_id = null) {
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
              .post(`/program-folder-tree/bulk-delete`, { ids: id })
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
              .delete(`/program-folder-tree/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                if (tree) {
                  this.getRootNodes(menu_id);
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
    setChildNodes(result) {
      adminApi
        .get(`/program-folder-tree/child-nodes/${result.node.id}`)
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
      if (this.editClicked) {
        this.setUpdateCurrentNode(node);
      } else {
        if (this.createTree.parent_id != node.id) {
          this.createTree.parent_id = node.id;
        } else {
          this.createTree.parent_id = null;
        }
      }
    },
    setUpdateCurrentNode(node) {
      let parents = [];
      this.setParentsIds(node, parents);
      if (parents.includes(this.createTree.id)) {
        Swal.fire({
          icon: "error",
          title: `${this.$t("general.Error")}`,
          text: `${this.$t("general.cantSelectChildToBeParent")}`,
        });
        return;
      }
      if (this.createTree.id == node.id) {
        Swal.fire({
          icon: "error",
          title: `${this.$t("general.Error")}`,
          text: `${this.$t("general.cantSelectSelfParent")}`,
        });
        return;
      }
      if (this.createTree.parent_id != node.id) {
        this.createTree.parent_id = node.id;
      } else {
        this.createTree.parent_id = null;
      }
    },
    setParentsIds(node, parents) {
      if (node.parent) {
        parents.push(node.parent.id);
        this.setParentsIds(node.parent, parents);
      }
    },
    async getRootNodes(id) {
      if (!id) {
        this.rootNodes = [];
      }
      await adminApi
        .get(`/program-folder-/treeprogram-folder-root-nodes/${id}`)
        .then((res) => {
          console.log(this.rootNodes);
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
    formatDate(value) {
      return formatDateOnly(value);
    },
    log(id) {
      if (this.mouseEnter != id) {
        this.Tooltip = "";
        this.mouseEnter = id;
        adminApi
          .get(`/program-folder/logs/${id}`)
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
     *  get Data hot field
     */
    getData(page = 1) {
      this.isLoader = true;
      let filter = "";
      let _filterSetting = [...this.filterSetting];
      let index = this.filterSetting.indexOf("program");
      if (index > -1) {
        _filterSetting[index] =
          this.$i18n.locale == "ar" ? "program.name" : "program.name_e";
      }
      index = this.filterSetting.indexOf("folder");
      if (index > -1) {
        _filterSetting[index] =
          this.$i18n.locale == "ar" ? "folder.name" : "folder.name_e";
      }
      for (let i = 0; i < _filterSetting.length; i++) {
        filter += `columns[${i}]=${_filterSetting[i]}&`;
      }
      adminApi
        .get(
          `/program-folder?page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.menus = l.data;
          this.menusPagination = l.pagination;
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
    getDataCurrentPage() {
      if (
        this.current_page <= this.menusPagination.last_page &&
        this.current_page != this.menusPagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        let _filterSetting = [...this.filterSetting];
        let index = this.filterSetting.indexOf("program");
        if (index > -1) {
          _filterSetting[index] =
            this.$i18n.locale == "ar" ? "program.name" : "program.name_e";
        }
        index = this.filterSetting.indexOf("folder");
        if (index > -1) {
          _filterSetting[index] =
            this.$i18n.locale == "ar" ? "folder.name" : "folder.name_e";
        }
        for (let i = 0; i < _filterSetting.length; i++) {
          filter += `columns[${i}]=${_filterSetting[i]}&`;
        }
        adminApi
          .get(
            `/program-folder?page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.menus = l.data;
            this.menusPagination = l.pagination;
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
     *  delete hot field
     */
    deleteHotField(id, index) {
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
              .post(`/program-folder/bulk-delete`, { ids: id })
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
              .delete(`/program-folder/${id}`)
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
     *  reset Modal (create)
     */
    resetModalHidden() {
      this.editClicked = false;

      this.create = {
        project_program_module_id: null,
        menu_folder: [],
      };
      this.createTree = {
        name: "",
        name_e: "",
        is_active: "active",
        parent_id: null,
        id: null,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.rootNodes = [];
      this.menu_id = null;
      this.errors = {};
      this.parents = [];
      this.$bvModal.hide(`create`);
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      await this.getPrograms();
      await this.getFolders();
      this.create = {
        project_program_module_id: null,
        menu_folder: [],
      };
      this.editClicked = false;
      this.rootNodes = [];
      this.createTree = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        id: null,
      };
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.menu_id = null;
      this.errors = {};
    },
    /**
     *  create hot field
     */
    resetForm() {
      this.create = {
        project_program_module_id: null,
        menu_folder: [],
      };

      this.createTree = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        id: null,
      };
      this.menu_id = null;
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    AddSubmit() {
      this.$v.create.$touch();
      if (this.$v.create.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.is_disabled = false;
        adminApi
          .post(`/program-folder`, this.create)
          .then((res) => {
            // this.menu_id = res.data.data.id;
            this.getData();
            this.is_disabled = true;
            setTimeout(() => {
              Swal.fire({
                icon: "success",
                text: `${this.$t("general.Addedsuccessfully")}`,
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
    /**
     *  edit hot field
     */
    editSubmit(id) {
      this.$v.edit.$touch();
      if (this.$v.edit.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        adminApi
          .put(`/program-folder/${id}`, {
            ...this.edit,
            menu_folder: undefined,
            menu_folder_id: this.edit.menu_folder,
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
    /**
     *   show Modal (edit)
     */
    async resetModalEdit(id) {
      await this.getPrograms();
      await this.getFolders();
      let menu = this.menus.find((e) => id == e.id);
      this.menu_id = menu.id;
      this.edit.project_program_module_id = menu.project_program_module_id;
      this.edit.menu_folder = menu.menu_folder_id;
      // this.getRootNodes(this.menu_id);
      this.errors = {};
      this.editClicked = false;
    },
    /**
     *  hidden Modal (edit)
     */
    resetModalHiddenEdit(id) {
      this.errors = {};
      this.editClicked = false;

      this.edit = {
        project_program_module_id: null,
        menu_folder: [],
      };
      this.menu_id = null;
      this.createTree = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        id: null,
      };
      this.rootNodes = [];
    },

    /**
     *  start  dynamicSortString
     */
    sortString(value) {
      return dynamicSortString(value);
    },
    checkRow(id) {
      if (!this.checkAll.includes(id)) {
        this.checkAll.push(id);
      } else {
        let index = this.checkAll.indexOf(id);
        this.checkAll.splice(index, 1);
      }
    },

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
              ("Hot field" + "." || "SheetJSTableExport.") + (type || "xlsx")
          );
        }
        this.enabled3 = true;
      }, 100);
    },

    arabicValue(txt) {
      this.create.name = arabicValue(txt);
      this.edit.name = arabicValue(txt);
    },

    englishValue(txt) {
      this.create.name_e = englishValue(txt);
      this.edit.name_e = englishValue(txt);
    },
    arabicValueTree(txt) {
      this.createTree.name = arabicValue(txt);
    },
    englishValueTree(txt) {
      this.createTree.name_e = englishValue(txt);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-between align-items-center mb-2">
              <h4 class="header-title">{{ $t("general.MenuTable") }}</h4>
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
                      value="program"
                      class="mb-1"
                      >{{ $t("general.program") }}</b-form-checkbox
                    >
                    <b-form-checkbox
                      v-model="filterSetting"
                      value="folder"
                      class="mb-1"
                      >{{ $t("general.folder") }}</b-form-checkbox
                    >
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

            <div
              class="row justify-content-between align-items-center mb-2 px-1"
            >
              <div class="col-md-3 d-flex align-items-center mb-1 mb-xl-0">
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
                    @click.prevent="deleteHotField(checkAll)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!-- end mult delete  -->
                  <!--  start one delete  -->
                  <button
                    class="custom-btn-dowonload"
                    v-if="checkAll.length == 1"
                    @click.prevent="deleteHotField(checkAll[0])"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!--  end one delete  -->
                </div>
              </div>
              <div
                class="col-xs-10 col-md-9 col-lg-7 d-flex align-items-center justify-content-end"
              >
                <div>
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
                    <b-form-checkbox v-model="setting.program" class="mb-1">
                      {{ $t("general.program") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.folder" class="mb-1">
                      {{ $t("general.folder") }}
                    </b-form-checkbox>

                    <div class="d-flex justify-content-end">
                      <a
                        href="javascript:void(0)"
                        class="btn btn-primary btn-sm"
                        >{{ $t("general.Apply") }}</a
                      >
                    </div>
                  </b-dropdown>
                  <!-- Basic dropdown -->
                  <!-- start Pagination -->
                  <div
                    class="d-inline-flex align-items-center pagination-custom"
                  >
                    <div class="d-inline-block" style="font-size: 15px">
                      {{ menusPagination.from }}-{{ menusPagination.to }} /
                      {{ menusPagination.total }}
                    </div>
                    <div class="d-inline-block">
                      <a
                        href="javascript:void(0)"
                        :style="{
                          'pointer-events':
                            menusPagination.current_page == 1 ? 'none' : '',
                        }"
                        @click.prevent="
                          getData(menusPagination.current_page - 1)
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
                            menusPagination.last_page ==
                            menusPagination.current_page
                              ? 'none'
                              : '',
                        }"
                        @click.prevent="
                          getData(menusPagination.current_page + 1)
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
              :title="$t('general.AddMenu')"
              title-class="font-18"
              body-class="p-4 "
              :hide-footer="true"
              @show="resetModal"
              @hidden="resetModalHidden"
            >
              <form>
                <div class="mb-3 d-flex justify-content-end">
                  <b-button
                    variant="success"
                    :disabled="!is_disabled"
                    @click.prevent="resetForm"
                    type="button"
                    :class="[
                      'font-weight-bold px-2',
                      is_disabled ? 'mx-2' : '',
                    ]"
                  >
                    {{ $t("general.AddNewRecord") }}
                  </b-button>
                  <!-- Emulate built in modal footer ok and cancel button actions -->
                  <template v-if="!is_disabled">
                    <b-button
                      variant="success"
                      type="submit"
                      class="mx-1"
                      v-if="!isLoader"
                      @click.prevent="AddSubmit"
                    >
                      {{ $t("general.Add") }}
                    </b-button>

                    <b-button variant="success" class="mx-1" disabled v-else>
                      <b-spinner small></b-spinner>
                      <span class="sr-only">{{ $t("login.Loading") }}...</span>
                    </b-button>
                  </template>
                  <b-button
                    variant="danger"
                    type="button"
                    @click.prevent="resetModalHidden"
                  >
                    {{ $t("general.Cancel") }}
                  </b-button>
                </div>
                <!-- <div class="row"> -->
                <div class="row">
                  <div class="col-md-12 position-relative">
                    <div class="form-group">
                      <label class="my-1 mr-2">{{
                        $t("general.program")
                      }}</label>
                      <multiselect
                        v-model="create.project_program_module_id"
                        :options="programs.map((type) => type.id)"
                        :custom-label="
                          (opt) =>
                            $i18n.locale == 'ar'
                              ? programs.find((x) => x.id == opt).name
                              : programs.find((x) => x.id == opt).name_e
                        "
                        :class="{
                          'is-invalid':
                            $v.create.project_program_module_id.$error ||
                            errors.project_program_module_id,
                        }"
                      >
                      </multiselect>
                      <div
                        v-if="!$v.create.project_program_module_id.required"
                        class="invalid-feedback"
                      >
                        {{ $t("general.fieldIsRequired") }}
                      </div>

                      <template v-if="errors.project_program_module_id">
                        <ErrorMessage
                          v-for="(
                            errorMessage, index
                          ) in errors.project_program_module_id"
                          :key="index"
                          >{{ errorMessage }}</ErrorMessage
                        >
                      </template>
                    </div>
                  </div>
                  <div class="col-md-12 position-relative">
                    <div class="form-group">
                      <label class="my-1 mr-2">{{
                        $t("general.folder")
                      }}</label>
                      <multiselect
                        :multiple="true"
                        v-model="create.menu_folder"
                        :options="folders.map((type) => type.id)"
                        :custom-label="
                          (opt) =>
                            $i18n.locale == 'ar'
                              ? folders.find((x) => x.id == opt).name
                              : folders.find((x) => x.id == opt).name_e
                        "
                        :class="{
                          'is-invalid':
                            $v.create.menu_folder.$error || errors.menu_folder,
                        }"
                      >
                      </multiselect>
                      <div
                        v-if="!$v.create.menu_folder.required"
                        class="invalid-feedback"
                      >
                        {{ $t("general.fieldIsRequired") }}
                      </div>

                      <template v-if="errors.menu_folder">
                        <ErrorMessage
                          v-for="(errorMessage, index) in errors.menu_folder"
                          :key="index"
                          >{{ errorMessage }}</ErrorMessage
                        >
                      </template>
                    </div>
                  </div>
              
                </div>
                <!-- <b-tabs nav-class="nav-tabs nav-bordered">
                    <b-tab :title="$t('general.DataEntry')" active>
                    


                    </b-tab>
                    <b-tab :disabled="!menu_id" :title="$t('general.menuTree')">
                      <div class="row">
                        <div class="col-8">
                          <TreeBrowser @editClicked="resetTreeEdit" :editable="true"
                            @deleteClicked="deleteMenu($event.id, true, menu_id)" :currentNodeId="createTree.parent_id"
                            @onClick="setCreateCurrentNode" @nodeExpanded="setChildNodes" :nodes="rootNodes" />

                        </div>
                        <div class="col-4">
                          <div class="d-flex justify-content-end">
                            <template v-if="!isLoader">
                              <b-button variant="success" type="submit" class="mx-1" v-if="!editClicked"
                                @click.prevent="SubmitMenuTree">
                                {{ $t("general.Add") }}
                              </b-button>
                              <b-button variant="success" type="submit" class="mx-1" v-if="editClicked"
                                @click.prevent="SubmitMenuTreeEdit">
                                {{ $t("general.Edit") }}
                              </b-button>
                              <b-button variant="success" type="submit" class="mx-1" v-if="editClicked"
                                @click.prevent="cancelEdit">
                                {{ $t("general.Cancel") }}
                              </b-button>
                            </template>
                            <b-button variant="success" class="mx-1" v-else>
                              <b-spinner small></b-spinner>
                              <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>
                          </div>
                          <div class="row">
                            <div class="col-12 direction" dir="rtl">
                              <div class="form-group">
                                <label for="field-1" class="control-label">
                                  {{ $t("general.Name") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control arabicInput" v-model="$v.createTree.name.$model"
                                  :class="{
                                    'is-invalid': $v.createTree.name.$error || errors.name,
                                    'is-valid': !$v.createTree.name.$invalid && !errors.name,
                                  }" @keyup="arabicValueTree(createTree.name)" id="field-1" />
                                <div v-if="!$v.createTree.name.minLength" class="invalid-feedback">
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.createTree.name.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div v-if="!$v.createTree.name.maxLength" class="invalid-feedback">
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.createTree.name.$params.maxLength.max }}
                                  {{ $t("general.letters") }}
                                </div>
                                <template v-if="errors.name">
                                  <ErrorMessage v-for="(errorMessage, index) in errors.name" :key="index">{{
                                    $t(errorMessage) }}
                                  </ErrorMessage>
                                </template>
                              </div>
                            </div>
                            <div class="col-12 direction-ltr" dir="ltr">
                              <div class="form-group">
                                <label for="field-2" class="control-label">
                                  {{ $t("general.Name_en") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control englishInput" v-model="$v.createTree.name_e.$model"
                                  :class="{
                                    'is-invalid': $v.createTree.name_e.$error || errors.name_e,
                                    'is-valid': !$v.createTree.name_e.$invalid && !errors.name_e,
                                  }" @keyup="englishValueTree(createTree.name_e)" id="field-2" />
                                <div v-if="!$v.createTree.name_e.minLength" class="invalid-feedback">
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.createTree.name_e.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div v-if="!$v.createTree.name_e.maxLength" class="invalid-feedback">
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.createTree.name_e.$params.maxLength.max }}
                                  {{ $t("general.letters") }}
                                </div>
                                <template v-if="errors.name_e">
                                  <ErrorMessage v-for="(errorMessage, index) in errors.name_e" :key="index">{{
                                    $t(errorMessage)
                                  }}</ErrorMessage>
                                </template>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="form-group">
                                <label class="mr-2 mb-2">
                                  {{ $t("general.Status") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <b-form-group :class="{
                                  'is-invalid':
                                    $v.createTree.is_active.$error || errors.is_active,
                                  'is-valid':
                                    !$v.createTree.is_active.$invalid && !errors.is_active,
                                }">
                                  <b-form-radio class="d-inline-block" v-model="$v.createTree.is_active.$model"
                                    name="some-radios" value="active">{{ $t("general.Active") }}</b-form-radio>
                                  <b-form-radio class="d-inline-block m-1" v-model="$v.createTree.is_active.$model"
                                    name="some-radios" value="inactive">{{ $t("general.Inactive") }}</b-form-radio>
                                </b-form-group>
                                <template v-if="errors.is_active">
                                  <ErrorMessage v-for="(errorMessage, index) in errors.is_active" :key="index">{{
                                    $t(errorMessage) }}
                                  </ErrorMessage>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs> -->
                <!-- </div> -->
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
                    <th v-if="setting.program">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.program") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="menus.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="menus.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.folder">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.folder") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="menus.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="menus.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="enabled3" class="do-not-print">
                      {{ $t("general.Action") }}
                    </th>
                    <th v-if="enabled3" class="do-not-print">
                      <i class="fas fa-ellipsis-v"></i>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="menus.length > 0">
                  <tr
                    @click.capture="checkRow(data.id)"
                    @dblclick.prevent="$bvModal.show(`modal-edit-${data.id}`)"
                    v-for="(data, index) in menus"
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
                          :value="data.id"
                          v-model="checkAll"
                        />
                      </div>
                    </td>
                    <td v-if="setting.program">
                      <h5 class="m-0 font-weight-normal">
                        {{
                          $i18n.locale == "ar"
                            ? data.project_program_module.name
                            : data.project_program_module.name_e
                        }}
                      </h5>
                    </td>
                    <td v-if="setting.folder">
                      <h5 class="m-0 font-weight-normal">
                        {{
                          $i18n.locale == "ar"
                            ? data.menu_folder.name
                            : data.menu_folder.name_e
                        }}
                      </h5>
                    </td>
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
                            @click.prevent="deleteHotField(data.id)"
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
                        :title="$t('general.EditMenu')"
                        title-class="font-18"
                        body-class="p-4"
                        :ref="`edit-${data.id}`"
                        :hide-footer="true"
                        @show="resetModalEdit(data.id)"
                        @hidden="resetModalHiddenEdit(data.id)"
                      >
                        <form>
                          <div class="mb-3 d-flex justify-content-end">
                            <!-- Emulate built in modal footer ok and cancel button actions -->
                            <b-button
                              variant="success"
                              type="submit"
                              class="mx-1"
                              v-if="!isLoader"
                              @click.prevent="editSubmit(data.id)"
                            >
                              {{ $t("general.Edit") }}
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
                              type="button"
                              @click.prevent="
                                $bvModal.hide(`modal-edit-${data.id}`)
                              "
                            >
                              {{ $t("general.Cancel") }}
                            </b-button>
                          </div>
                          <!-- <div class="row"> -->
                          <!-- <b-tabs nav-class="nav-tabs nav-bordered">
                              <b-tab :title="$t('general.DataEntry')" active>
                               
                              </b-tab>
                              <b-tab :title="$t('general.menuTree')">
                                <div class="row">
                                  <div class="col-8">
                                    <TreeBrowser
                                      :editable="true"
                                      @editClicked="resetTreeEdit"
                                      @deleteClicked="
                                        deleteMenu($event.id, true, menu_id)
                                      "
                                      :currentNodeId="createTree.parent_id"
                                      @onClick="setCreateCurrentNode"
                                      @nodeExpanded="setChildNodes"
                                      :nodes="rootNodes"
                                    />
                                  </div>
                                  <div class="col-4">
                                    <div class="d-flex justify-content-end">
                                      <template v-if="!isLoader">
                                        <b-button
                                          variant="success"
                                          type="submit"
                                          class="mx-1"
                                          v-if="!editClicked"
                                          @click.prevent="SubmitMenuTree"
                                        >
                                          {{ $t("general.Add") }}
                                        </b-button>
                                        <b-button
                                          variant="success"
                                          type="submit"
                                          class="mx-1"
                                          v-if="editClicked"
                                          @click.prevent="SubmitMenuTreeEdit"
                                        >
                                          {{ $t("general.Edit") }}
                                        </b-button>
                                        <b-button
                                          variant="success"
                                          type="submit"
                                          class="mx-1"
                                          v-if="editClicked"
                                          @click.prevent="cancelEdit"
                                        >
                                          {{ $t("general.Cancel") }}
                                        </b-button>
                                      </template>
                                      <b-button
                                        variant="success"
                                        class="mx-1"
                                        v-else
                                      >
                                        <b-spinner small></b-spinner>
                                        <span class="sr-only"
                                          >{{ $t("login.Loading") }}...</span
                                        >
                                      </b-button>
                                    </div>
                                    <div class="row">
                                      <div class="col-12 direction" dir="rtl">
                                        <div class="form-group">
                                          <label
                                            for="field-1"
                                            class="control-label"
                                          >
                                            {{ $t("general.Name") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control arabicInput"
                                            v-model="$v.createTree.name.$model"
                                            :class="{
                                              'is-invalid':
                                                $v.createTree.name.$error ||
                                                errors.name,
                                              'is-valid':
                                                !$v.createTree.name.$invalid &&
                                                !errors.name,
                                            }"
                                            @keyup="
                                              arabicValueTree(createTree.name)
                                            "
                                            id="field-1"
                                          />
                                          <div
                                            v-if="!$v.createTree.name.minLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatleast") }}
                                            {{
                                              $v.createTree.name.$params
                                                .minLength.min
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div
                                            v-if="!$v.createTree.name.maxLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatmost") }}
                                            {{
                                              $v.createTree.name.$params
                                                .maxLength.max
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <template v-if="errors.name">
                                            <ErrorMessage
                                              v-for="(
                                                errorMessage, index
                                              ) in errors.name"
                                              :key="index"
                                              >{{ $t(errorMessage) }}
                                            </ErrorMessage>
                                          </template>
                                        </div>
                                      </div>
                                      <div
                                        class="col-12 direction-ltr"
                                        dir="ltr"
                                      >
                                        <div class="form-group">
                                          <label
                                            for="field-2"
                                            class="control-label"
                                          >
                                            {{ $t("general.Name_en") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control englishInput"
                                            v-model="
                                              $v.createTree.name_e.$model
                                            "
                                            :class="{
                                              'is-invalid':
                                                $v.createTree.name_e.$error ||
                                                errors.name_e,
                                              'is-valid':
                                                !$v.createTree.name_e
                                                  .$invalid && !errors.name_e,
                                            }"
                                            @keyup="
                                              englishValueTree(
                                                createTree.name_e
                                              )
                                            "
                                            id="field-2"
                                          />
                                          <div
                                            v-if="
                                              !$v.createTree.name_e.minLength
                                            "
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatleast") }}
                                            {{
                                              $v.createTree.name_e.$params
                                                .minLength.min
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div
                                            v-if="
                                              !$v.createTree.name_e.maxLength
                                            "
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatmost") }}
                                            {{
                                              $v.createTree.name_e.$params
                                                .maxLength.max
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <template v-if="errors.name_e">
                                            <ErrorMessage
                                              v-for="(
                                                errorMessage, index
                                              ) in errors.name_e"
                                              :key="index"
                                              >{{
                                                $t(errorMessage)
                                              }}</ErrorMessage
                                            >
                                          </template>
                                        </div>
                                      </div>
                                      <div class="col-12">
                                        <div class="form-group">
                                          <label class="mr-2 mb-2">
                                            {{ $t("general.Status") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <b-form-group
                                            :class="{
                                              'is-invalid':
                                                $v.createTree.is_active
                                                  .$error || errors.is_active,
                                              'is-valid':
                                                !$v.createTree.is_active
                                                  .$invalid &&
                                                !errors.is_active,
                                            }"
                                          >
                                            <b-form-radio
                                              class="d-inline-block"
                                              v-model="
                                                $v.createTree.is_active.$model
                                              "
                                              name="some-radios"
                                              value="active"
                                              >{{
                                                $t("general.Active")
                                              }}</b-form-radio
                                            >
                                            <b-form-radio
                                              class="d-inline-block m-1"
                                              v-model="
                                                $v.createTree.is_active.$model
                                              "
                                              name="some-radios"
                                              value="inactive"
                                              >{{
                                                $t("general.Inactive")
                                              }}</b-form-radio
                                            >
                                          </b-form-group>
                                          <template v-if="errors.is_active">
                                            <ErrorMessage
                                              v-for="(
                                                errorMessage, index
                                              ) in errors.is_active"
                                              :key="index"
                                            >
                                              {{ $t(errorMessage) }}
                                            </ErrorMessage>
                                          </template>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </b-tab>
                            </b-tabs> -->
                          <!-- </div> -->
                          <div class="row">
                            <div class="col-md-12 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2">{{
                                  $t("general.program")
                                }}</label>
                                <multiselect
                                  v-model="edit.project_program_module_id"
                                  :options="programs.map((type) => type.id)"
                                  :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? programs.find((x) => x.id == opt).name
                                        : programs.find((x) => x.id == opt)
                                            .name_e
                                  "
                                  :class="{
                                    'is-invalid':
                                      $v.edit.project_program_module_id
                                        .$error ||
                                      errors.project_program_module_id,
                                  }"
                                >
                                </multiselect>
                                <div
                                  v-if="
                                    !$v.edit.project_program_module_id.required
                                  "
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.fieldIsRequired") }}
                                </div>

                                <template
                                  v-if="errors.project_program_module_id"
                                >
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.project_program_module_id"
                                    :key="index"
                                    >{{ errorMessage }}</ErrorMessage
                                  >
                                </template>
                              </div>
                            </div>
                            <div class="col-md-12 position-relative">
                              <div class="form-group">
                                <label class="my-1 mr-2">{{
                                  $t("general.folder")
                                }}</label>
                                <multiselect
                                  v-model="edit.menu_folder"
                                  :options="folders.map((type) => type.id)"
                                  :custom-label="
                                    (opt) =>
                                      $i18n.locale == 'ar'
                                        ? folders.find((x) => x.id == opt).name
                                        : folders.find((x) => x.id == opt)
                                            .name_e
                                  "
                                  :class="{
                                    'is-invalid':
                                      $v.edit.menu_folder.$error ||
                                      errors.menu_folder,
                                  }"
                                >
                                </multiselect>
                                <div
                                  v-if="!$v.edit.menu_folder.required"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.fieldIsRequired") }}
                                </div>

                                <template v-if="errors.menu_folder">
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.menu_folder"
                                    :key="index"
                                    >{{ errorMessage }}</ErrorMessage
                                  >
                                </template>
                              </div>
                            </div>
                           
                          </div>
                        </form>
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
                    <th class="text-center" colspan="8">
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

<style>
@media print {
  .do-not-print {
    display: none;
  }

  .arrow-sort {
    display: none;
  }
}

.tooltip-inner {
  max-width: 750px !important;
  background-color: #eed900;
  color: black;
}
</style>
