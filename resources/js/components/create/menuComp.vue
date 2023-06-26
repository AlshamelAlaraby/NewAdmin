<script>
import adminApi from "../../api/adminAxios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/widgets/errorMessage";
import loader from "../../components/loader";
import { dynamicSortString } from "../../helper/tableSort";
import { formatDateOnly } from "../../helper/startDate";
import { arabicValue, englishValue } from "../../helper/langTransform";
import Multiselect from "vue-multiselect";

import TreeBrowser from "../../components/tree.vue";

/**
 * Advanced Table component
 */
export default {
  components: {
    Multiselect,
    ErrorMessage,
    loader,
    TreeBrowser,
  },
  props: ["current_id"],
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
        menu_folder: [],
        sort: 0,
      },
      createTree: {
        name: null,
        name_e: null,
        parent_id: null,
        is_active: "active",
      },
      edit: {
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
      menu_folder: { required },
    },
  },

  methods: {
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
        menu_folder: [],
        sort: 0,
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
      this.$bvModal.hide(`create_menu_comp`);
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      await this.getFolders();
      this.create = {
        menu_folder: [],
        sort: 0,
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
        menu_folder: [],
        sort: 0,
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
          .post(`/program-folder`, {
            menu_folder: this.create.menu_folder,
            project_program_module_id: this.current_id,
            sort:this.create.sort
          })
          .then((res) => {
            // this.menu_id = res.data.data.id;
            this.$emit("created");
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
      await this.getFolders();
      let menu = this.menus.find((e) => id == e.id);
      this.menu_id = menu.id;
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
  <!--  create   -->
  <b-modal
    id="create_menu_comp"
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
          :class="['font-weight-bold px-2', is_disabled ? 'mx-2' : '']"
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
            <label class="my-1 mr-2">{{ $t("general.folder") }}</label>
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
