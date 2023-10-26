<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import adminApi from "../../../api/adminAxios";
import Switches from "vue-switches";
import {
  required,
  minLength,
  maxLength,
  integer,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import { dynamicSortString } from "../../../helper/tableSort";
import Multiselect from "vue-multiselect";
import Templates from "../email/templates.vue";
import { formatDateOnly } from "../../../helper/startDate";
import TreeBrowser from "../../../components/tree.vue";
import { arabicValue, englishValue } from "../../../helper/langTransform";
import menuComp from "../../../components/create/menuComp";
import subMenuComp from "../../../components/create/subMenuComp";
import ScreenComp from "../../../components/create/screenComp";
import ScreenTab from "../../../components/create/screenTab";
/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Module",
    meta: [{ name: "description", content: "Module" }],
  },
  components: {
    Layout,
    ScreenTab,
    PageHeader,
    Switches,
    ErrorMessage,
    loader,
    Multiselect,
    Templates,
    TreeBrowser,
    menuComp,
    subMenuComp,
    ScreenComp,
  },
  updated() {
    // $(".englishInput").keypress(function (event) {
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
      modulesPagination: {},
      modules: [],
      enabled3: true,
      isLoader: false,
      rootNodes: [],
      childNodes: [],
      Tooltip: "",
      mouseEnter: "",
      current_id: null,
      folders: [],
      menu_folder: [],
      sort: 0,
      menu_id: null,
      menus: [],
      sub_menu_id: null,
      all_sub_menu_id: null,
      subMenus: [],
      screens: [],
      allSubMenus: [],
      allModules: [],
      modules_ids: [],
      moduleName: "",
      subMenuName: "",
      menuName: "",
      create: {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        search: "",
        sort: 0,
        icon: "",
        is_module: 1,
      },
      edit: {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        search: "",
        sort: 0,
        icon: "",
        is_module: 1,
      },
      setting: {
        name: true,
        name_e: true,
        is_active: true,
        parent_id: true,
        type: true,
      },
      filterSetting: ["name", "name_e"],
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
    modules_ids: { required },
    create: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      icon: {},
      is_active: { required },
      is_module: { required },
    },
    menu_folder: { required },
    edit: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      icon: {},
      is_active: { required },
      is_module: { required },
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
        this.modules.forEach((el) => {
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
    onSubMenuChanged(subMenuId) {
      this.subMenuName =
        this.$i18n.locale == "ar"
          ? "->" + this.allSubMenus.filter((e) => e.id == subMenuId)[0].name
          : "->" + this.allSubMenus.filter((e) => e.id == subMenuId)[0].name_e;

      if (subMenuId == null) {
        this.sub_menu_id = null;
        return;
      }
      this.isLoader = true;
      adminApi
        .post(`/sub-menus/create-submenu-menu`, {
          menu_id: this.menu_id,
          sub_menu_id: subMenuId,
        })
        .then((res) => {
          this.isLoader = false;
          this.sub_menu_id = res.data.data.id;
          this.getSubMenus();
          this.getScreens();
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
    },
    deleteMenu(id, index) {
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
                this.getMenus();
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
                  this.getMenus();
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
                this.getMenus();
                this.menu_id = null;
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
    deleteSubMenu(id, index) {
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
              .post(`/sub-menus/bulk-delete`, { ids: id })
              .then((res) => {
                this.checkAll = [];
                this.getData();
                this.getSubMenus();
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
                  this.getSubMenus();
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
              .delete(`/sub-menus/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                this.getSubMenus();
                this.sub_menu_id = null;
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
    deleteScreen(id, index) {
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
              .post(`/screens/bulk-delete`, { ids: id })
              .then((res) => {
                this.checkAll = [];
                this.getData();
                this.getScreens();
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
                  this.getScreens();
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
              .delete(`/screens/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                this.getScreens();

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
    addFolders(edit) {
      if (edit == "edit") {
        this.$v.menu_folder.$touch();
        if (this.$v.menu_folder.$invalid) {
          return;
        } else {
          this.isLoader = true;
          adminApi
            .put(`/program-folder/${this.menu_id}`, {
              project_program_module_id: this.current_id,
              menu_folder_id: this.menu_folder,
              sort: this.sort,
            })
            .then((res) => {
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
        return;
      }

      this.$v.menu_folder.$touch();
      if (this.$v.menu_folder.$invalid) {
        return;
      } else {
        this.isLoader = true;
        adminApi
          .post(`/program-folder`, {
            project_program_module_id: this.current_id,
            menu_folder: this.menu_folder,
            sort: this.sort,
          })
          .then((res) => {
            // this.menu_id = res.data.data.id;
            this.getData();
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
    async getMenus() {
      await adminApi
        .get(`/program-folder?project_program_module_id=${this.current_id}`)
        .then((res) => {
          this.menus = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getSubMenus(id) {
      if (id) {
        let menu = this.menus.filter((e) => e.id == id)[0];
        this.menuName =
          this.$i18n.locale == "ar"
            ? "->" +
              menu.project_program_module.name +
              " | " +
              menu.menu_folder.name
            : "->" +
              menu.project_program_module.name_e +
              " | " +
              menu.menu_folder.name_e;
      }

      await adminApi
        .get(`/sub-menus?program_folder_menu_id=${this.menu_id}`)
        .then((res) => {
          this.subMenus = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });

        this.getScreens();
    },
    async getAllSubMenus(id) {
      await adminApi
        .get(`/sub-menus/all-sub-menus?program_folder_menu_id=0`)
        .then((res) => {
          this.allSubMenus = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getAllModules(id) {
      await adminApi
        .get(`/project-program-modules?module_child=1`)
        .then((res) => {
          this.allModules = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getScreens(id) {
      await adminApi
        .get(`/screens?${this.menu_id?'menu_id='+this.menu_id:''}${this.sub_menu_id?'&sub_menu_id='+this.sub_menu_id:''}`)
        .then((res) => {
          this.screens = res.data.data;
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
      adminApi
        .get(`/project-program-modules/child-nodes/${result.node.id}`)
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
      if (this.create.parent_id != node.id) {
        this.create.parent_id = node.id;
      } else {
        this.create.parent_id = null;
      }
    },
    setUpdateCurrentNode(node) {
      let parents = [];
      this.setParentsIds(node, parents);
      if (parents.includes(this.current_id)) {
        Swal.fire({
          icon: "error",
          title: `${this.$t("general.Error")}`,
          text: `${this.$t("general.cantSelectChildToBeParent")}`,
        });
        return;
      }
      if (this.current_id == node.id) {
        Swal.fire({
          icon: "error",
          title: `${this.$t("general.Error")}`,
          text: `${this.$t("general.cantSelectSelfParent")}`,
        });
        return;
      }
      if (this.edit.parent_id != node.id) {
        this.edit.parent_id = node.id;
      } else {
        this.edit.parent_id = null;
      }
    },
    setParentsIds(node, parents) {
      if (node.parent) {
        parents.push(node.parent.id);
        this.setParentsIds(node.parent, parents);
      }
    },
    formatDate(value) {
      return formatDateOnly(value);
    },
    log(id) {
      if (this.mouseEnter != id) {
        this.Tooltip = "";
        this.mouseEnter = id;
        adminApi
          .get(`/project-program-modules/logs/${id}`)
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
     *  get Data module
     */
    getData(page = 1) {
      this.isLoader = true;

      let filter = "";
      for (let i = 0; i < this.filterSetting.length; i++) {
        filter += `columns[${i}]=${this.filterSetting[i]}&`;
      }

      adminApi
        .get(
          `project-program-modules?program_modules=1&page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.modules = l.data;
          this.modulesPagination = l.pagination;
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
        this.current_page <= this.modulesPagination.last_page &&
        this.current_page != this.modulesPagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        for (let i = 0; i < this.filterSetting.length; i++) {
          filter += `columns[${i}]=${this.filterSetting[i]}&`;
        }

        adminApi
          .get(
            `project-program-modules?program_modules=1&page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.modules = l.data;
            this.modulesPagination = l.pagination;
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
     *  delete module
     */
    deleteModule(id, tree = false) {
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
              .post(`/project-program-modules/bulk-delete`, { ids: id })
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
              .delete(`/project-program-modules/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                if (tree) {
                  this.getRootNodes();
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
     *  reset Modal (create)
     */
    resetModalHidden() {
      this.modules_ids = [];
      this.moduleName = "";
      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        sort: 0,
        icon: "",
      };
      this.all_sub_menu_id = null;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.sort = 0;

      this.errors = {};
      this.rootNodes = [];
      this.menu_folder = [];
      this.current_id = null;
      this.menus = [];
      this.menu_id = null;
      this.subMenus = [];
      this.sub_menu_id = null;
      this.screens = [];
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      this.moduleName = "";
      this.subMenuName = "";
      this.menuName = "";

      this.modules_ids = [];
      await this.getRootNodes();
      await this.getAllSubMenus();
      await this.getAllModules();
      this.all_sub_menu_id = null;
      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        sort: 0,
        icon: "",
        is_module: 1,
      };
      this.sort = 0;

      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.menu_folder = [];
      this.current_id = null;
      this.menu_id = null;
      this.sub_menu_id = null;
      this.screens = [];

      this.errors = {};
    },
    /**
     *  create module
     */
    resetForm() {
      this.modules_ids = [];
      this.moduleName = "";
      this.subMenuName = "";
      this.menuName = "";

      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        sort: 0,
        icon: "",
        is_module: 1,
      };
      this.all_sub_menu_id = null;
      this.sort = 0;
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.menu_folder = [];
      this.current_id = null;
      this.menus = [];
      this.menu_id = null;
      this.subMenus = [];
      this.screens = [];
      this.sub_menu_id = null;
    },
    AddSubmit() {
      if (this.create.parent_id) {
        this.isLoader = true;
        adminApi
          .post(`project-program-modules/create-program-children`, {
            program_id: this.create.parent_id,
            modules: this.modules_ids,
          })
          .then((res) => {
            this.current_id = res.data.id;
            this.modules_ids = [];
            this.getData();
            this.is_disabled = true;
            this.getRootNodes();
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
        return;
      }
      if (this.create.name || this.create.name_e) {
        this.create.name = this.create.name
          ? this.create.name
          : this.create.name_e;
        this.create.name_e = this.create.name_e
          ? this.create.name_e
          : this.create.name;
      }
      this.$v.create.$touch();
      if (this.$v.create.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.is_disabled = false;
        adminApi
          .post(`/project-program-modules`, this.create)
          .then((res) => {
            if (this.create.is_module) {
              this.getAllModules();
            }
            this.getData();
            this.is_disabled = true;
            this.getRootNodes();
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
     *  edit module
     */
    editSubmit(id) {
      if (this.edit.parent_id) {
        this.isLoader = true;
        adminApi
          .post(`project-program-modules/create-program-children`, {
            program_id: this.edit.parent_id,
            modules: this.modules_ids,
          })
          .then((res) => {
            this.current_id = res.data.id;
            this.modules_ids = [];
            this.getData();
            this.is_disabled = true;
            this.getRootNodes();
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
        return;
      }
      if (this.edit.name || this.edit.name_e) {
        this.edit.name = this.edit.name ? this.edit.name : this.edit.name_e;
        this.edit.name_e = this.edit.name_e ? this.edit.name_e : this.edit.name;
      }
      this.$v.edit.$touch();
      if (this.$v.edit.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        let { name, name_e, parent_id, is_active } = this.edit;
        adminApi
          .put(`/project-program-modules/${id}`, {
            ...this.edit,
            search: undefined,
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
      this.modules_ids = [];
      this.subMenuName = "";
      this.menuName = "";

      await this.getRootNodes();
      await this.getAllSubMenus();
      await this.getAllModules();
      this.all_sub_menu_id = null;
      this.current_id = id;

      await this.getMenus();
      let module = this.modules.find((e) => id == e.id);
      this.moduleName =
        this.$i18n.locale == "ar"
          ? `${
              module.parent
                ? `${module.parent.name}->${module.name}`
                : module.name
            }`
          : `${
              module.parent
                ? `${module.parent.name_e}->${module.name_e}`
                : module.name_e
            }`;
      this.edit.name = module.name;
      this.edit.name_e = module.name_e;
      this.edit.is_active = module.is_active;
      this.edit.is_module = module.is_module;
      this.edit.sort = module.sort;
      this.edit.icon = module.icon;
      this.errors = {};
      this.menu_id = null;
      this.sub_menu_id = null;
    },
    resetModalHiddenEdit(id) {
      this.modules_ids = [];
      this.moduleName = "";
      this.menu_id = null;
      this.sub_menu_id = null;
      this.all_sub_menu_id = null;
      this.errors = {};
      this.edit = {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        sort: 0,
        icon: "",
        is_module: 1,
      };
      this.sort = 0;
      this.rootNodes = [];
      this.menu_folder = [];
      this.current_id = null;
      this.menus = [];
      this.subMenus = [];
      this.screens = [];
    },
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
            fn || ("Module" + "." || "SheetJSTableExport.") + (type || "xlsx")
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

      async getRootNodes() {
          await adminApi
              .get(`/project-program-modules/root-nodes`)
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
      getFirstLevelChildNodes(node) {
          if (!node.collapsed) {
              adminApi
                  .get(`/project-program-modules/child-nodes/${node.id}`)
                  .then((res) => {
                      this.rootNodes = this.getUpdatedRootNodes(node, res.data);
                  })
                  .catch((err) => {
                      Swal.fire({
                          icon: "error",
                          title: `${this.$t("general.Error")}`,
                          text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                      });
                  });
          } else {
              this.rootNodes = this.getUpdatedRootNodes(node);
          }
      },
      getSecondLevelChildNodes(rootNode, parentNode) {
          if (!parentNode.collapsed) {
              adminApi
                  .get(`/program-folder/menu-folder/${parentNode.id}`)
                  .then((res) => {
                      this.rootNodes = this.getRootNodesAfterCollapse(
                          rootNode,
                          parentNode,
                          res.data.data
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
              this.rootNodes = this.getRootNodesAfterCollapse(rootNode, parentNode);
          }
      },
      getThirdLevelChildNodes(rootNode, parentNode, secondParentNode) {
          if (!secondParentNode.collapsed) {
              adminApi
                  .get(`/program-folder/${secondParentNode.id}`)
                  .then((res) => {
                      console.log(res.data.data)
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
      getFourthLevelChildNodes(rootNode, parentNode, secondParentNode, thirdParentNode) {
          if (!thirdParentNode.collapsed) {
              adminApi
                  .get(`/tree-properties/child-nodes/${thirdParentNode.id}`)
                  .then((res) => {
                      this.rootNodes = this.getRootNodesAfter3rdCollapse(
                          rootNode,
                          parentNode,
                          secondParentNode,
                          thirdParentNode,
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
              this.rootNodes = this.getRootNodesAfter3rdCollapse(
                  rootNode,
                  parentNode,
                  secondParentNode,
                  thirdParentNode
              );
          }
      },
      setCreateParentId(node) {
          if (this.create.parent_id != node.id) {
              this.create.parent_id = node.id;
          } else {
              this.create.parent_id = null;
          }
      },
      getUpdatedRootNodes(parentNode, children) {
          let rootNodes = [...this.rootNodes];
          rootNodes.forEach((node, index) => {
              if (node.id == parentNode.id) {
                  if (parentNode.collapsed) {
                      rootNodes[index].children = [];
                      rootNodes[index].collapsed = false;
                  } else {
                      rootNodes[index].children = children;
                      rootNodes[index].collapsed = true;
                  }
                  return;
              }
          });
          return rootNodes;
      },
      getRootNodesAfterCollapse(parentNode, secondParentNode, children) {
          let rootNodes = [...this.rootNodes];
          rootNodes.forEach((_parentNode, parentIndex) => {
              if (_parentNode.id == parentNode.id) {
                  if (_parentNode.children && _parentNode.children.length) {
                      _parentNode.children.forEach((child, index) => {
                          if (child.id == secondParentNode.id) {
                              if (secondParentNode.collapsed) {
                                  rootNodes[parentIndex].children[index].children = [];
                                  rootNodes[parentIndex].children[index].collapsed = false;
                              } else {
                                  rootNodes[parentIndex].children[index].children = children.menu_folders;
                                  rootNodes[parentIndex].children[index].program_folder_menus = children.program_folder_menus;
                                  rootNodes[parentIndex].children[index].collapsed = true;
                              }
                              return;
                          }
                      });
                      return;
                  }
              }
          });
          return rootNodes;
      },
      getRootNodesAfter2ndCollapse(
          parentNode,
          secondParentNode,
          thirdParentNode,
          children
      ) {
          let rootNodes = [...this.rootNodes];
          rootNodes.forEach((_parentNode, parentIndex) => {
              if (_parentNode.id == parentNode.id) {
                  if (_parentNode.children && _parentNode.children.length) {
                      _parentNode.children.forEach((child, index) => {
                          if (child.id == secondParentNode.id) {
                              child.children.forEach((_child, _index) => {
                                  if (thirdParentNode.id == _child.id) {
                                      if (thirdParentNode.collapsed) {
                                          rootNodes[index].children[parentIndex].children[
                                              _index
                                              ].children = [];
                                          rootNodes[index].children[parentIndex].children[
                                              _index
                                              ].collapsed = false;
                                      } else {
                                          rootNodes[index].children[parentIndex].children[
                                              _index
                                              ].children = children;
                                          rootNodes[index].children[parentIndex].children[
                                              _index
                                              ].collapsed = true;
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
      getRootNodesAfter3rdCollapse(
          parentNode,
          secondParentNode,
          thirdParentNode,
          fourthParentNode,
          children
      ) {
          let rootNodes = [...this.rootNodes];
          rootNodes.forEach((_parentNode, parentIndex) => {
              if (_parentNode.id == parentNode.id) {
                  if (_parentNode.children && _parentNode.children.length) {
                      _parentNode.children.forEach((child, index) => {
                          if (child.id == secondParentNode.id) {
                              child.children.forEach((_child, _index) => {
                                  if (thirdParentNode.id == _child.id) {
                                      _child.children.forEach((__child, __index) => {
                                          if (__child.id == fourthParentNode.id) {
                                              if (fourthParentNode.collapsed) {
                                                  rootNodes[index].children[parentIndex].children[
                                                      _index
                                                      ].children[__index].children = [];
                                                  rootNodes[index].children[parentIndex].children[
                                                      _index
                                                      ].children[__index].collapsed = false;
                                              } else {
                                                  rootNodes[index].children[parentIndex].children[
                                                      _index
                                                      ].children[__index].children = children;
                                                  rootNodes[index].children[parentIndex].children[
                                                      _index
                                                      ].children[__index].collapsed = true;
                                              }
                                              return;
                                          }
                                      });
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
  },
};
</script>

<template>
  <Layout>
    <PageHeader />
    <menuComp @created="getMenus" :current_id="current_id" />
    <subMenuComp @created="getAllSubMenus" :menu_id="menu_id" />
    <!-- <ScreenComp @created="getScreens" :sub_menu_id="sub_menu_id" /> -->
    <ScreenTab @created="getScreens" :menu_id="menu_id" :sub_menu_id="sub_menu_id" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-between align-items-center mb-2">
              <h4 class="header-title">{{ $t("general.ProgramsTable") }}</h4>
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
                      value="name"
                      class="mb-1"
                      >{{ $t("general.Name") }}</b-form-checkbox
                    >
                    <b-form-checkbox
                      v-model="filterSetting"
                      value="name_e"
                      class="mb-1"
                      >{{ $t("general.Name_en") }}</b-form-checkbox
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
                    @click.prevent="deleteModule(checkAll)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!-- end mult delete  -->
                  <!--  start one delete  -->
                  <button
                    class="custom-btn-dowonload"
                    v-if="checkAll.length == 1"
                    @click.prevent="deleteModule(checkAll[0])"
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
                    <b-form-checkbox v-model="setting.name" class="mb-1"
                      >{{ $t("general.Name") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.name_e" class="mb-1">
                      {{ $t("general.Name_en") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.is_active" class="mb-1">
                      {{ $t("general.Status") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.parent_id" class="mb-1">
                      {{ $t("general.parent") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.type" class="mb-1">
                      {{ $t("general.Type") }}
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
                      {{ modulesPagination.from }}-{{ modulesPagination.to }} /
                      {{ modulesPagination.total }}
                    </div>
                    <div class="d-inline-block">
                      <a
                        href="javascript:void(0)"
                        :style="{
                          'pointer-events':
                            modulesPagination.current_page == 1 ? 'none' : '',
                        }"
                        @click.prevent="
                          getData(modulesPagination.current_page - 1)
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
                            modulesPagination.last_page ==
                            modulesPagination.current_page
                              ? 'none'
                              : '',
                        }"
                        @click.prevent="
                          getData(modulesPagination.current_page + 1)
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
              dialog-class="modal-full-width"
              id="create"
              :title="`${$t('general.addProgram')}`"
              title-class="font-18"
              body-class="p-4 "
              :hide-footer="true"
              size="lg"
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
                  <template v-if="!is_disabled">
                    <b-button
                      variant="success"
                      type="button"
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
                    @click.prevent="$bvModal.hide(`create`)"
                    variant="danger"
                    type="button"
                  >
                    {{ $t("general.Cancel") }}
                  </b-button>
                </div>
                <b-tabs nav-class="nav-tabs nav-bordered">
                  <b-tab :title="$t('general.DataEntry')" active>
                    <div class="row">
                      <div class="col-8" :class="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
<!--                        <TreeBrowser-->
<!--                          :secondNodeNotChoosed="true"-->
<!--                          @deleteClicked="deleteModule($event.id, true)"-->
<!--                          :currentNodeId="create.parent_id"-->
<!--                          @onClick="setCreateCurrentNode"-->
<!--                          @nodeExpanded="setChildNodes"-->
<!--                          :nodes="rootNodes"-->
<!--                        />-->
                            <ul id="myUL">
                              <li v-for="node in rootNodes" :key="node.id" style="margin: 0 25px;">
                                  <span>
                                    <i
                                        @click="getFirstLevelChildNodes(node)"
                                        v-if="node.haveChildren"
                                        :class="
                                        node.collapsed
                                          ? 'fas fa-minus' : 'fas fa-plus'
                                      "
                                    ></i>
                                    <span
                                        @click="setCreateParentId(node)"
                                        :class="{
                                        'without-children': !node.haveChildren,
                                        active: node.id == create.parent_id,
                                      }"
                                    >
                                      {{ $i18n.locale == "ar" ? node.name : node.name_e }}
                                    </span>
                                  </span>
                                  <ul v-if="node.children && node.children.length" class="nested list-unstyled">
                                      <li v-for="childNode in node.children" :key="childNode.id" style="margin: 0 25px;">
                                      <span>
                                        <i
                                            @click="getSecondLevelChildNodes(node, childNode)"
                                            :class="
                                            childNode.collapsed
                                              ?  'fas fa-minus' : 'fas fa-plus'
                                         "
                                        >
                                        </i>
                                        <span
                                            :class="{
                                            'without-children': !childNode.haveChildren,
                                            active: childNode.id == create.parent_id,
                                          }"
                                        >
                                          {{ $i18n.locale == "ar" ? childNode.name : childNode.name_e }}
                                        </span>
                                      </span>
                                          <ul
                                              v-if="childNode.children && childNode.children.length"
                                              class="nested list-unstyled"
                                          >
                                          <li v-for="child in childNode.children" :key="child.id" style="margin: 0 25px;">
                                          <span>
                                            <i
                                                @click="getThirdLevelChildNodes(node, childNode, child)"
                                                :class="
                                                child.collapsed
                                                  ? 'fas fa-minus' : 'fas fa-plus'
                                              "
                                            >
                                            </i>
                                            <span
                                                :class="{
                                                'without-children': !child.haveChildren,
                                                active: child.id == create.parent_id,
                                              }"
                                            >
                                              {{ $i18n.locale == "ar" ? child.name : child.name_e }}
                                            </span>
                                          </span>
                                              <ul v-if="child.children && child.children.length" class="nested">
                                                  <li v-for="_child in child.children" :key="_child.id">
                                              <span>
                                                <i
                                                    @click="
                                                    getFourthLevelChildNodes(node, childNode, child, _child)
                                                  "
                                                    v-if="_child.haveChildren"
                                                    :class="
                                                    _child.collapsed
                                                      ? 'fa fa-caret-down'
                                                      : $i18n.locale == 'ar'
                                                      ? 'fa fa-caret-left'
                                                      : 'fa fa-caret-right'
                                                  "
                                                >
                                                </i>
                                                <span
                                                    @click="setCreateParentId(_child)"
                                                    :class="{
                                                    'without-children': !_child.haveChildren,
                                                    active: _child.id == create.parent_id,
                                                  }"
                                                >
                                                  {{ $i18n.locale == "ar" ? _child.name : _child.name_e }}
                                                </span>
                                              </span>
                                          <ul
                                              v-if="_child.children && _child.children.length"
                                              class="nested"
                                          >
                                              <li v-for="__child in _child.children" :key="__child.id">
                                                  {{ $i18n.locale == "ar" ? __child.name : __child.name_e }}
                                              </li>
                                          </ul>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                  </ul>
                              </li>
                           </ul>
                      </div>
                      <div class="col-4">
                        <template v-if="create.parent_id">
                          <div class="row">
                            <div class="col-12">
                              <div class="col-md-12 position-relative">
                                <div class="form-group">
                                  <label class="my-1 mr-2">{{
                                    $t("general.Module")
                                  }}</label>
                                  <multiselect
                                    :multiple="true"
                                    v-model="modules_ids"
                                    :options="allModules.map((type) => type.id)"
                                    :custom-label="
                                      (opt) =>
                                        $i18n.locale == 'ar'
                                          ? allModules.find((x) => x.id == opt)
                                              .name
                                          : allModules.find((x) => x.id == opt)
                                              .name_e
                                    "
                                    :class="{
                                      'is-invalid':
                                        $v.modules_ids.$error ||
                                        errors.modules_ids,
                                    }"
                                  >
                                  </multiselect>
                                  <div
                                    v-if="!$v.modules_ids.required"
                                    class="invalid-feedback"
                                  >
                                    {{ $t("general.fieldIsRequired") }}
                                  </div>

                                  <template v-if="errors.modules_ids">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.modules_ids"
                                      :key="index"
                                      >{{ errorMessage }}</ErrorMessage
                                    >
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div class="row">
                            <div class="col-12 direction" dir="rtl">
                              <div class="form-group">
                                <label for="field-1" class="control-label">
                                  {{ $t("general.Name") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  class="form-control arabicInput"
                                  v-model="$v.create.name.$model"
                                  :class="{
                                    'is-invalid':
                                      $v.create.name.$error || errors.name,
                                    'is-valid':
                                      !$v.create.name.$invalid && !errors.name,
                                  }"
                                  @keyup="arabicValue(create.name)"
                                  id="field-1"
                                />
                                <div
                                  v-if="!$v.create.name.minLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.create.name.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div
                                  v-if="!$v.create.name.maxLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.create.name.$params.maxLength.max }}
                                  {{ $t("general.letters") }}
                                </div>
                                <template v-if="errors.name">
                                  <ErrorMessage
                                    v-for="(errorMessage, index) in errors.name"
                                    :key="index"
                                    >{{ $t(errorMessage) }}</ErrorMessage
                                  >
                                </template>
                              </div>
                            </div>
                            <div class="col-12 direction-ltr" dir="ltr">
                              <div class="form-group">
                                <label for="field-2" class="control-label">
                                  {{ $t("general.Name_en") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  class="form-control englishInput"
                                  v-model="$v.create.name_e.$model"
                                  :class="{
                                    'is-invalid':
                                      $v.create.name_e.$error || errors.name_e,
                                    'is-valid':
                                      !$v.create.name_e.$invalid &&
                                      !errors.name_e,
                                  }"
                                  @keyup="englishValue(create.name_e)"
                                  id="field-2"
                                />
                                <div
                                  v-if="!$v.create.name_e.minLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.create.name_e.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div
                                  v-if="!$v.create.name_e.maxLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.create.name_e.$params.maxLength.max }}
                                  {{ $t("general.letters") }}
                                </div>
                                <template v-if="errors.name_e">
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.name_e"
                                    :key="index"
                                    >{{ $t(errorMessage) }}</ErrorMessage
                                  >
                                </template>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="field-2" class="control-label">
                                  {{ $t("general.IdSort") }}
                                </label>
                                <div>
                                  <input
                                    type="number"
                                    class="form-control"
                                    data-create="2"
                                    v-model="create.sort"
                                    id="field-2"
                                  />
                                  <template v-if="errors.sort">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.sort"
                                      :key="index"
                                      >{{ $t(errorMessage) }}
                                    </ErrorMessage>
                                  </template>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="field-2" class="control-label">
                                  {{ $t("general.icon") }}
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    data-create="2"
                                    v-model="create.icon"
                                    id="field-2"
                                  />
                                  <template v-if="errors.icon">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.icon"
                                      :key="index"
                                      >{{ $t(errorMessage) }}
                                    </ErrorMessage>
                                  </template>
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="form-group">
                                <label class="mr-2 mb-2">
                                  {{ $t("general.Status") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <b-form-group
                                  :class="{
                                    'is-invalid':
                                      $v.create.is_active.$error ||
                                      errors.is_active,
                                    'is-valid':
                                      !$v.create.is_active.$invalid &&
                                      !errors.is_active,
                                  }"
                                >
                                  <b-form-radio
                                    class="d-inline-block"
                                    v-model="$v.create.is_active.$model"
                                    name="some-radios"
                                    value="active"
                                    >{{ $t("general.Active") }}</b-form-radio
                                  >
                                  <b-form-radio
                                    class="d-inline-block m-1"
                                    v-model="$v.create.is_active.$model"
                                    name="some-radios"
                                    value="inactive"
                                    >{{ $t("general.Inactive") }}</b-form-radio
                                  >
                                </b-form-group>
                                <template v-if="errors.is_active">
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.is_active"
                                    :key="index"
                                    >{{ $t(errorMessage) }}
                                  </ErrorMessage>
                                </template>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="form-group">
                                <label class="mr-2 mb-2">
                                  {{ $t("general.Module") }}
                                  <span class="text-danger">*</span>
                                </label>
                                <b-form-group
                                  :class="{
                                    'is-invalid':
                                      $v.create.is_module.$error ||
                                      errors.is_module,
                                    'is-valid':
                                      !$v.create.is_module.$invalid &&
                                      !errors.is_module,
                                  }"
                                >
                                  <b-form-radio
                                    class="d-inline-block"
                                    v-model="$v.create.is_module.$model"
                                    name="module_some-radios"
                                    :value="1"
                                    >{{ $t("general.Yes") }}</b-form-radio
                                  >
                                  <b-form-radio
                                    class="d-inline-block m-1"
                                    v-model="$v.create.is_module.$model"
                                    name="module_some-radios"
                                    :value="0"
                                    >{{ $t("general.No") }}</b-form-radio
                                  >
                                </b-form-group>
                                <template v-if="errors.is_module">
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.is_module"
                                    :key="index"
                                    >{{ $t(errorMessage) }}
                                  </ErrorMessage>
                                </template>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab :disabled="!current_id" :title="$t('general.menu')">
                    <div class="row">
                      <div class="col-2">
                        <b-button
                          v-b-modal.create_menu_comp
                          style="width: 100%; margin-top: 24px"
                          variant="primary"
                          type="button"
                          class="mx-1"
                        >
                          {{ $t("general.Create") }}
                          <i class="fas fa-plus"></i>
                        </b-button>
                      </div>
                      <div class="col-4">
                        <div class="form-group">
                          <label class="">{{ $t("general.menu") }}</label>
                          <multiselect
                            @input="getSubMenus"
                            v-model="menu_id"
                            :options="menus.map((type) => type.id)"
                            :custom-label="
                              (opt) =>
                                $i18n.locale == 'ar'
                                  ? `${
                                      menus.find((x) => x.id == opt)
                                        .project_program_module.name
                                    } | ${
                                      menus.find((x) => x.id == opt).menu_folder
                                        .name
                                    }`
                                  : `${
                                      menus.find((x) => x.id == opt)
                                        .project_program_module.name_e
                                    } | ${
                                      menus.find((x) => x.id == opt).menu_folder
                                        .name_e
                                    }`
                            "
                          >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <!-- start .table-responsive-->
                    <div
                      class="table-responsive mb-3 custom-table-theme position-relative"
                    >
                      <!--       start loader       -->
                      <loader size="large" v-if="isLoader" />
                      <!--       end loader       -->

                      <table
                        class="table table-borderless table-hover table-centered m-0"
                      >
                        <thead>
                          <tr>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name") }}</span>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name_en") }}</span>
                              </div>
                            </th>
                            <th>{{ $t("general.Action") }}</th>
                          </tr>
                        </thead>
                        <tbody v-if="menus.length > 0">
                          <tr
                            v-for="(data, index) in menus"
                            :key="data.id"
                            class="body-tr-custom"
                          >
                            <td>
                              {{
                                `${data.project_program_module.name} | ${data.menu_folder.name}`
                              }}
                            </td>
                            <td>
                              {{
                                `${data.project_program_module.name_e} | ${data.menu_folder.name_e}`
                              }}
                            </td>
                            <td>
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
                                    class="dropdown-item text-black"
                                    href="#"
                                    @click.prevent="deleteMenu(data.id)"
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
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <th class="text-center" colspan="15">
                              {{ $t("general.notDataFound") }}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- end .table-responsive-->
                  </b-tab>
                  <b-tab :disabled="!menu_id" :title="$t('general.subMenu')">
                    <div class="row">
                      <div class="col-2">
                        <b-button
                          v-b-modal.create_sub_menu_comp
                          style="width: 100%; margin-top: 24px"
                          variant="primary"
                          type="button"
                          class="mx-1"
                        >
                          {{ $t("general.Create") }}
                          <i class="fas fa-plus"></i>
                        </b-button>
                      </div>
                      <div class="col-4">
                        <div class="form-group">
                          <label class="">{{ $t("general.subMenu") }}</label>
                          <multiselect
                            @input="onSubMenuChanged"
                            v-model="all_sub_menu_id"
                            :options="allSubMenus.map((type) => type.id)"
                            :custom-label="
                              (opt) =>
                                $i18n.locale == 'ar'
                                  ? `${
                                      allSubMenus.find((x) => x.id == opt).name
                                    }`
                                  : `${
                                      allSubMenus.find((x) => x.id == opt)
                                        .name_e
                                    }`
                            "
                          >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <!-- start .table-responsive-->
                    <div
                      class="table-responsive mb-3 custom-table-theme position-relative"
                    >
                      <!--       start loader       -->
                      <loader size="large" v-if="isLoader" />
                      <!--       end loader       -->

                      <table
                        class="table table-borderless table-hover table-centered m-0"
                      >
                        <thead>
                          <tr>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name") }}</span>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name_en") }}</span>
                              </div>
                            </th>
                            <th>{{ $t("general.Action") }}</th>
                          </tr>
                        </thead>
                        <tbody v-if="subMenus.length > 0">
                          <tr
                            v-for="(data, index) in subMenus"
                            :key="data.id"
                            class="body-tr-custom"
                          >
                            <td>
                              {{ `${data.name}` }}
                            </td>
                            <td>
                              {{ `${data.name_e}` }}
                            </td>
                            <td>
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
                                    class="dropdown-item text-black"
                                    href="#"
                                    @click.prevent="deleteSubMenu(data.id)"
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
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <th class="text-center" colspan="15">
                              {{ $t("general.notDataFound") }}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- end .table-responsive-->
                  </b-tab>
                  <b-tab :disabled="!menu_id" :title="$t('general.screen')">
                    <div class="row">
                      <div class="col-2">
                        <b-button
                          v-b-modal.create_screen_tab
                          style="width: 100%; margin-top: 24px"
                          variant="primary"
                          type="button"
                          class="my-2"
                        >
                          {{ $t("general.Create") }}
                          <i class="fas fa-plus"></i>
                        </b-button>
                      </div>
                    </div>
                    <!-- start .table-responsive-->
                    <div
                      class="table-responsive mb-3 custom-table-theme position-relative"
                    >
                      <!--       start loader       -->
                      <loader size="large" v-if="isLoader" />
                      <!--       end loader       -->

                      <table
                        class="table table-borderless table-hover table-centered m-0"
                      >
                        <thead>
                          <tr>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name") }}</span>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex justify-content-center">
                                <span>{{ $t("general.Name_en") }}</span>
                              </div>
                            </th>
                            <th>
                                  <div class="d-flex justify-content-center">
                                      <span>{{ $t("general.subMenu") }}</span>
                                  </div>
                            </th>
                            <th>{{ $t("general.Action") }}</th>
                          </tr>
                        </thead>
                        <tbody v-if="screens.length > 0">
                          <tr
                            v-for="(data, index) in screens"
                            :key="data.id"
                            class="body-tr-custom"
                          >
                            <td>
                              {{ `${data.title}` }}
                            </td>
                            <td>
                              {{ `${data.title_e}` }}
                            </td>
                            <td>
                                  {{ data.sub_menu ? $i18n.locale == 'ar' ? `${data.sub_menu.name}` :`${data.sub_menu.name_e}` : '' }}
                              </td>
                            <td>
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
                                    class="dropdown-item text-black"
                                    href="#"
                                    @click.prevent="deleteScreen(data.id)"
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
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <th class="text-center" colspan="15">
                              {{ $t("general.notDataFound") }}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- end .table-responsive-->
                  </b-tab>
                </b-tabs>
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
                    <th v-if="setting.name">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Name") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="modules.sort(sortString('name'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="modules.sort(sortString('-name'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.name_e">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Name_en") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="modules.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="modules.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.is_active">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Status") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="modules.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="modules.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.parent_id">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.parent") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="modules.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="modules.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.type">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Type") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="modules.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="modules.sort(sortString('-name_e'))"
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
                <tbody v-if="modules.length > 0">
                  <tr
                    @click.capture="checkRow(data.id)"
                    @dblclick.prevent="$bvModal.show(`modal-edit-${data.id}`)"
                    v-for="(data, index) in modules"
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
                    <td v-if="setting.name">
                      <h5 class="m-0 font-weight-normal">{{ data.name }}</h5>
                    </td>
                    <td v-if="setting.name_e">
                      <h5 class="m-0 font-weight-normal">{{ data.name_e }}</h5>
                    </td>
                    <td v-if="setting.is_active">
                      <span
                        :class="[
                          data.is_active == 'active'
                            ? 'text-success'
                            : 'text-danger',
                          'badge',
                        ]"
                      >
                        {{
                          data.is_active == "active"
                            ? `${$t("general.Active")}`
                            : `${$t("general.Inactive")}`
                        }}
                      </span>
                    </td>
                    <td>
                      <template v-if="data.parent">
                        {{
                          $i18n.locale == "ar"
                            ? data.parent.name
                            : data.parent.name_e
                        }}
                      </template>
                    </td>
                    <td v-if="setting.type">
                      {{
                        data.parent
                          ? $t("general.Module")
                          : $t("general.program")
                      }}
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
                            @click.prevent="deleteModule(data.id)"
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
                        dialog-class="modal-full-width"
                        :id="`modal-edit-${data.id}`"
                        :title="`${$t(
                          'general.editProgram'
                        )} (${moduleName}${menuName}${subMenuName})`"
                        title-class="font-18"
                        body-class="p-4"
                        size="lg"
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

                          <b-tabs nav-class="nav-tabs nav-bordered">
                            <b-tab :title="$t('general.DataEntry')" active>
                              <div class="row">
                                <div class="col-8">
                                  <TreeBrowser
                                    :secondNodeNotChoosed="true"
                                    @deleteClicked="
                                      deleteModule($event.id, true)
                                    "
                                    :currentNodeId="edit.parent_id"
                                    @onClick="setUpdateCurrentNode"
                                    @nodeExpanded="setChildNodes"
                                    :nodes="rootNodes"
                                  />
                                </div>
                                <div class="col-4">
                                  <template v-if="edit.parent_id">
                                    <div class="row">
                                      <div class="col-12">
                                        <div
                                          class="col-md-12 position-relative"
                                        >
                                          <div class="form-group">
                                            <label class="my-1 mr-2">{{
                                              $t("general.Module")
                                            }}</label>
                                            <multiselect
                                              :multiple="true"
                                              v-model="modules_ids"
                                              :options="
                                                allModules.map(
                                                  (type) => type.id
                                                )
                                              "
                                              :custom-label="
                                                (opt) =>
                                                  $i18n.locale == 'ar'
                                                    ? allModules.find(
                                                        (x) => x.id == opt
                                                      ).name
                                                    : allModules.find(
                                                        (x) => x.id == opt
                                                      ).name_e
                                              "
                                              :class="{
                                                'is-invalid':
                                                  $v.modules_ids.$error ||
                                                  errors.modules_ids,
                                              }"
                                            >
                                            </multiselect>
                                            <div
                                              v-if="!$v.modules_ids.required"
                                              class="invalid-feedback"
                                            >
                                              {{
                                                $t("general.fieldIsRequired")
                                              }}
                                            </div>

                                            <template v-if="errors.modules_ids">
                                              <ErrorMessage
                                                v-for="(
                                                  errorMessage, index
                                                ) in errors.modules_ids"
                                                :key="index"
                                                >{{
                                                  errorMessage
                                                }}</ErrorMessage
                                              >
                                            </template>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div class="row">
                                      <div class="col-12 direction" dir="rtl">
                                        <div class="form-group">
                                          <label
                                            for="field-u-1"
                                            class="control-label"
                                          >
                                            {{ $t("general.Name") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control arabicInput"
                                            v-model="$v.edit.name.$model"
                                            :class="{
                                              'is-invalid':
                                                $v.edit.name.$error ||
                                                errors.name,
                                              'is-valid':
                                                !$v.edit.name.$invalid &&
                                                !errors.name,
                                            }"
                                            :placeholder="$t('general.Name')"
                                            @keyup="arabicValue(edit.name)"
                                            id="field-u-1"
                                          />
                                          <div
                                            v-if="!$v.edit.name.minLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatleast") }}
                                            {{
                                              $v.edit.name.$params.minLength.min
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div
                                            v-if="!$v.edit.name.maxLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatmost") }}
                                            {{
                                              $v.edit.name.$params.maxLength.max
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <template v-if="errors.name">
                                            <ErrorMessage
                                              v-for="(
                                                errorMessage, index
                                              ) in errors.name"
                                              :key="index"
                                              >{{
                                                $t(errorMessage)
                                              }}</ErrorMessage
                                            >
                                          </template>
                                        </div>
                                      </div>
                                      <div
                                        class="col-12 direction-ltr"
                                        dir="ltr"
                                      >
                                        <div class="form-group">
                                          <label
                                            for="field-u-2"
                                            class="control-label"
                                          >
                                            {{ $t("general.Name_en") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control englishInput"
                                            v-model="$v.edit.name_e.$model"
                                            :class="{
                                              'is-invalid':
                                                $v.edit.name_e.$error ||
                                                errors.name_e,
                                              'is-valid':
                                                !$v.edit.name_e.$invalid &&
                                                !errors.name_e,
                                            }"
                                            :placeholder="$t('general.Name_en')"
                                            @keyup="englishValue(edit.name_e)"
                                            id="field-u-2"
                                          />
                                          <div
                                            v-if="!$v.edit.name_e.minLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatleast") }}
                                            {{
                                              $v.edit.name_e.$params.minLength
                                                .min
                                            }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div
                                            v-if="!$v.edit.name_e.maxLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatmost") }}
                                            {{
                                              $v.edit.name_e.$params.maxLength
                                                .max
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
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <label
                                            for="field-2"
                                            class="control-label"
                                          >
                                            {{ $t("general.IdSort") }}
                                          </label>
                                          <div>
                                            <input
                                              type="number"
                                              class="form-control"
                                              data-create="2"
                                              v-model="edit.sort"
                                              id="field-2"
                                            />
                                            <template v-if="errors.sort">
                                              <ErrorMessage
                                                v-for="(
                                                  errorMessage, index
                                                ) in errors.sort"
                                                :key="index"
                                                >{{ $t(errorMessage) }}
                                              </ErrorMessage>
                                            </template>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <label
                                            for="field-2"
                                            class="control-label"
                                          >
                                            {{ $t("general.icon") }}
                                          </label>
                                          <div>
                                            <input
                                              type="text"
                                              class="form-control"
                                              data-create="2"
                                              v-model="edit.icon"
                                              id="field-2"
                                            />
                                            <template v-if="errors.icon">
                                              <ErrorMessage
                                                v-for="(
                                                  errorMessage, index
                                                ) in errors.icon"
                                                :key="index"
                                                >{{ $t(errorMessage) }}
                                              </ErrorMessage>
                                            </template>
                                          </div>
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
                                                $v.edit.is_active.$error ||
                                                errors.is_active,
                                              'is-valid':
                                                !$v.edit.is_active.$invalid &&
                                                !errors.is_active,
                                            }"
                                          >
                                            <b-form-radio
                                              class="d-inline-block"
                                              v-model="$v.edit.is_active.$model"
                                              name="some-radios"
                                              value="active"
                                              >{{
                                                $t("general.Active")
                                              }}</b-form-radio
                                            >
                                            <b-form-radio
                                              class="d-inline-block m-1"
                                              v-model="$v.edit.is_active.$model"
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
                                              >{{ $t(errorMessage) }}
                                            </ErrorMessage>
                                          </template>
                                        </div>
                                      </div>
                                      <div class="col-12">
                                        <div class="form-group">
                                          <label class="mr-2 mb-2">
                                            {{ $t("general.Module") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <b-form-group
                                            :class="{
                                              'is-invalid':
                                                $v.edit.is_module.$error ||
                                                errors.is_module,
                                              'is-valid':
                                                !$v.edit.is_module.$invalid &&
                                                !errors.is_module,
                                            }"
                                          >
                                            <b-form-radio
                                              class="d-inline-block"
                                              v-model="$v.edit.is_module.$model"
                                              name="module_some-radios"
                                              :value="1"
                                              >{{
                                                $t("general.Yes")
                                              }}</b-form-radio
                                            >
                                            <b-form-radio
                                              class="d-inline-block m-1"
                                              v-model="$v.edit.is_module.$model"
                                              name="module_some-radios"
                                              :value="0"
                                              >{{
                                                $t("general.No")
                                              }}</b-form-radio
                                            >
                                          </b-form-group>
                                          <template v-if="errors.is_module">
                                            <ErrorMessage
                                              v-for="(
                                                errorMessage, index
                                              ) in errors.is_module"
                                              :key="index"
                                              >{{ $t(errorMessage) }}
                                            </ErrorMessage>
                                          </template>
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </b-tab>
                            <b-tab :title="$t('general.menu')">
                              <div class="row">
                                <div class="col-2">
                                  <b-button
                                    v-b-modal.create_menu_comp
                                    style="width: 100%; margin-top: 24px"
                                    variant="primary"
                                    type="button"
                                    class="mx-1"
                                  >
                                    {{ $t("general.Create") }}
                                    <i class="fas fa-plus"></i>
                                  </b-button>
                                </div>
                                <div class="col-4">
                                  <div class="form-group">
                                    <label class="">{{
                                      $t("general.menu")
                                    }}</label>
                                    <multiselect
                                      @input="getSubMenus"
                                      v-model="menu_id"
                                      :options="menus.map((type) => type.id)"
                                      :custom-label="
                                        (opt) =>
                                          $i18n.locale == 'ar'
                                            ? `${
                                                menus.find((x) => x.id == opt)
                                                  .project_program_module.name
                                              } | ${
                                                menus.find((x) => x.id == opt)
                                                  .menu_folder.name
                                              }`
                                            : `${
                                                menus.find((x) => x.id == opt)
                                                  .project_program_module.name_e
                                              } | ${
                                                menus.find((x) => x.id == opt)
                                                  .menu_folder.name_e
                                              }`
                                      "
                                    >
                                    </multiselect>
                                  </div>
                                </div>
                              </div>
                              <!-- start .table-responsive-->
                              <div
                                class="table-responsive mb-3 custom-table-theme position-relative"
                              >
                                <!--       start loader       -->
                                <loader size="large" v-if="isLoader" />
                                <!--       end loader       -->

                                <table
                                  class="table table-borderless table-hover table-centered m-0"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{ $t("general.Name") }}</span>
                                        </div>
                                      </th>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{
                                            $t("general.Name_en")
                                          }}</span>
                                        </div>
                                      </th>
                                      <th>{{ $t("general.Action") }}</th>
                                    </tr>
                                  </thead>
                                  <tbody v-if="menus.length > 0">
                                    <tr
                                      v-for="(data, index) in menus"
                                      :key="data.id"
                                      class="body-tr-custom"
                                    >
                                      <td>
                                        {{
                                          `${data.project_program_module.name} | ${data.menu_folder.name}`
                                        }}
                                      </td>
                                      <td>
                                        {{
                                          `${data.project_program_module.name_e} | ${data.menu_folder.name_e}`
                                        }}
                                      </td>
                                      <td>
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
                                          <div
                                            class="dropdown-menu dropdown-menu-custom"
                                          >
                                            <a
                                              class="dropdown-item text-black"
                                              href="#"
                                              @click.prevent="
                                                deleteMenu(data.id)
                                              "
                                            >
                                              <div
                                                class="d-flex justify-content-between align-items-center text-black"
                                              >
                                                <span>{{
                                                  $t("general.delete")
                                                }}</span>
                                                <i
                                                  class="fas fa-times text-danger"
                                                ></i>
                                              </div>
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody v-else>
                                    <tr>
                                      <th class="text-center" colspan="15">
                                        {{ $t("general.notDataFound") }}
                                      </th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!-- end .table-responsive-->
                            </b-tab>
                            <b-tab :disabled="!menu_id" :title="$t('general.subMenu')">
                              <div class="row">
                                <div class="col-2">
                                  <b-button
                                    v-b-modal.create_sub_menu_comp
                                    style="width: 100%; margin-top: 24px"
                                    variant="primary"
                                    type="button"
                                    class="mx-1"
                                  >
                                    {{ $t("general.Create") }}
                                    <i class="fas fa-plus"></i>
                                  </b-button>
                                </div>
                                <div class="col-4">
                                  <div class="form-group">
                                    <label class="">{{
                                      $t("general.subMenu")
                                    }}</label>
                                    <multiselect
                                      @input="onSubMenuChanged"
                                      v-model="all_sub_menu_id"
                                      :options="
                                        allSubMenus.map((type) => type.id)
                                      "
                                      :custom-label="
                                        (opt) =>
                                          $i18n.locale == 'ar'
                                            ? `${
                                                allSubMenus.find(
                                                  (x) => x.id == opt
                                                ).name
                                              }`
                                            : `${
                                                allSubMenus.find(
                                                  (x) => x.id == opt
                                                ).name_e
                                              }`
                                      "
                                    >
                                    </multiselect>
                                  </div>
                                </div>
                              </div>
                              <!-- start .table-responsive-->
                              <div
                                class="table-responsive mb-3 custom-table-theme position-relative"
                              >
                                <!--       start loader       -->
                                <loader size="large" v-if="isLoader" />
                                <!--       end loader       -->

                                <table
                                  class="table table-borderless table-hover table-centered m-0"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{ $t("general.Name") }}</span>
                                        </div>
                                      </th>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{
                                            $t("general.Name_en")
                                          }}</span>
                                        </div>
                                      </th>
                                      <th>{{ $t("general.Action") }}</th>
                                    </tr>
                                  </thead>
                                  <tbody v-if="subMenus.length > 0">
                                    <tr
                                      v-for="(data, index) in subMenus"
                                      :key="data.id"
                                      class="body-tr-custom"
                                    >
                                      <td>
                                        {{ `${data.name}` }}
                                      </td>
                                      <td>
                                        {{ `${data.name_e}` }}
                                      </td>
                                      <td>
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
                                          <div
                                            class="dropdown-menu dropdown-menu-custom"
                                          >
                                            <a
                                              class="dropdown-item text-black"
                                              href="#"
                                              @click.prevent="
                                                deleteSubMenu(data.id)
                                              "
                                            >
                                              <div
                                                class="d-flex justify-content-between align-items-center text-black"
                                              >
                                                <span>{{
                                                  $t("general.delete")
                                                }}</span>
                                                <i
                                                  class="fas fa-times text-danger"
                                                ></i>
                                              </div>
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody v-else>
                                    <tr>
                                      <th class="text-center" colspan="15">
                                        {{ $t("general.notDataFound") }}
                                      </th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!-- end .table-responsive-->
                            </b-tab>
                            <b-tab :disabled="!menu_id" :title="$t('general.screen')">
                              <div class="row">
                                <div class="col-2">
                                  <b-button
                                    v-b-modal.create_screen_tab
                                    style="width: 100%; margin-top: 24px"
                                    variant="primary"
                                    type="button"
                                    class="my-2"
                                  >
                                    {{ $t("general.Create") }}
                                    <i class="fas fa-plus"></i>
                                  </b-button>
                                </div>
                              </div>
                              <!-- start .table-responsive-->
                              <div
                                class="table-responsive mb-3 custom-table-theme position-relative"
                              >
                                <!--       start loader       -->
                                <loader size="large" v-if="isLoader" />
                                <!--       end loader       -->

                                <table
                                  class="table table-borderless table-hover table-centered m-0"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{ $t("general.Name") }}</span>
                                        </div>
                                      </th>
                                      <th>
                                        <div
                                          class="d-flex justify-content-center"
                                        >
                                          <span>{{
                                            $t("general.Name_en")
                                          }}</span>
                                        </div>
                                      </th>
                                      <th>
                                            <div class="d-flex justify-content-center">
                                                <span>{{ $t("general.subMenu") }}</span>
                                            </div>
                                        </th>
                                      <th>{{ $t("general.Action") }}</th>
                                    </tr>
                                  </thead>
                                  <tbody v-if="screens.length > 0">
                                    <tr
                                      v-for="(data, index) in screens"
                                      :key="data.id"
                                      class="body-tr-custom"
                                    >
                                      <td>
                                        {{ `${data.title}` }}
                                      </td>
                                      <td>
                                        {{ `${data.title_e}` }}
                                      </td>
                                      <td>
                                            {{ data.sub_menu ? $i18n.locale == 'ar' ? `${data.sub_menu.name}` :`${data.sub_menu.name_e}` : '' }}
                                        </td>
                                      <td>
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
                                          <div
                                            class="dropdown-menu dropdown-menu-custom"
                                          >
                                            <a
                                              class="dropdown-item text-black"
                                              href="#"
                                              @click.prevent="
                                                deleteScreen(data.id)
                                              "
                                            >
                                              <div
                                                class="d-flex justify-content-between align-items-center text-black"
                                              >
                                                <span>{{
                                                  $t("general.delete")
                                                }}</span>
                                                <i
                                                  class="fas fa-times text-danger"
                                                ></i>
                                              </div>
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody v-else>
                                    <tr>
                                      <th class="text-center" colspan="15">
                                        {{ $t("general.notDataFound") }}
                                      </th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!-- end .table-responsive-->
                            </b-tab>
                          </b-tabs>
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
                    <th class="text-center" colspan="6">
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
<style scoped lang="scss">
#myUL {
    list-style-type: none;
}
#myUL {
    margin: 0;
    padding: 0;
    span {
        i {
            padding: 2px;
            background-color: #6dc6f5;
            color: #fff;
            border-radius: 50%;
            font-size: 18px;
            line-height: 17px;
            font-weight: 600;
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
.rtl {
    #myUL {
        .without-children {
            padding-right: 10px;
        }
        .nested {
            padding-right: 40px;
        }
    }
}
.ltr {
    #myUL {
        .without-children {
            padding-left: 10px;
        }
    }
}

.tooltip-inner {
  max-width: 750px !important;
  background-color: #eed900;
  color: black;
}
</style>
