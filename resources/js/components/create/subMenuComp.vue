<script>
import adminApi from "../../api/adminAxios";
import Switches from "vue-switches";
import {
  required,
  minLength,
  maxLength,
  integer,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/widgets/errorMessage";
import loader from "../../components/loader";
import { dynamicSortString } from "../../helper/tableSort";
import Multiselect from "vue-multiselect";
import { formatDateOnly } from "../../helper/startDate";

import { arabicValue, englishValue } from "../../helper/langTransform";

/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Sub menu",
    meta: [{ name: "description", content: "Sub menu" }],
  },
  props: ["menu_id"],
  components: {
    Switches,
    ErrorMessage,
    loader,
    Multiselect,
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
      menuTreesPagination: {},
      menuTrees: [],
      enabled3: true,
      isLoader: false,
      rootNodes: [],
      childNodes: [],
      Tooltip: "",
      mouseEnter: "",
      current_id: null,
      menus: [],
      createScreens: [
        {
          name: "",
          name_e: "",
          title: "",
          title_e: "",
          serial_id: "",
          search: "",
          url: "",
          is_implementor: 0,
          sort: 0,
        },
      ],
      create: {
        name: "",
        name_e: "",
        parent_id: null,
        is_add_on: 1,
        menu_id: null,
        sort: 0,
      },
      edit: {
        name: "",
        name_e: "",
        parent_id: null,
        menu_id: null,
        is_add_on: 1,
        sort: 0,
      },
      setting: {
        name: true,
        name_e: true,
        is_add_on: true,
        parent_id: true,
        menu_id: true,
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
    create: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      is_add_on: { required },
    },
    createScreens: {
      $each: {
        name: { required, minLength: minLength(3), maxLength: maxLength(100) },
        name_e: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(100),
        },
        title: { required, minLength: minLength(3), maxLength: maxLength(100) },
        title_e: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(100),
        },
        url: { required },
        is_implementor: {},
      },
    },
    edit: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      menu_id: { required },
      is_add_on: { required },
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
        this.menuTrees.forEach((el) => {
          if (!this.checkAll.includes(el.id)) {
            this.checkAll.push(el.id);
          }
        });
      } else {
        this.checkAll = [];
      }
    },
  },
  mounted() {},
  methods: {
    arabicValueTitle(txt, index) {
      this.createScreens[index].title = arabicValue(txt);
    },
    englishValueTitle(txt, index) {
      this.createScreens[index].title_e = englishValue(txt);
    },
    arabicValueIndex(txt, index) {
      this.createScreens[index].name = arabicValue(txt);
    },
    englishValueIndex(txt, index) {
      this.createScreens[index].name_e = englishValue(txt);
    },
    AddScreens() {
      this.$v.createScreens.$touch();
      if (this.$v.createScreens.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        adminApi
          .post(`/screens/create-sub-menu-screens`, {
            sub_menu_id: this.current_id,
            screens: this.createScreens,
          })
          .then((res) => {
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
    addNewField() {
      this.createScreens.push({
        name: "",
        name_e: "",
        title: "",
        title_e: "",
        serial_id: "",
        search: "",
        url: "",
        is_implementor: 0,
        sort: 0,
      });
    },

    removeNewField(index) {
      if (this.createScreens.length > 1) {
        this.createScreens.splice(index, 1);
      }
    },
    setChildNodes(result) {
      adminApi.get(`/sub-menus/child-nodes/${result.node.id}`).then((res) => {
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
          .get(`/sub-menus/logs/${id}`)
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
          `/sub-menus?page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.menuTrees = l.data;
          this.menuTreesPagination = l.pagination;
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
        this.current_page <= this.menuTreesPagination.last_page &&
        this.current_page != this.menuTreesPagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        for (let i = 0; i < this.filterSetting.length; i++) {
          filter += `columns[${i}]=${this.filterSetting[i]}&`;
        }

        adminApi
          .get(
            `/sub-menus?page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.menuTrees = l.data;
            this.menuTreesPagination = l.pagination;
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
    deleteModule(id, tree = false, menu_id = null) {
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
              .delete(`/sub-menus/${id}`)
              .then((res) => {
                this.checkAll = [];
                this.getData();
                if (tree) {
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
      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        menu_id: null,
        is_add_on: 1,
        sort: 0,
      };
      this.createScreens = [
        {
          name: "",
          name_e: "",
          title: "",
          title_e: "",
          serial_id: "",
          search: "",
          url: "",
          is_implementor: 0,
          sort: 0,
        },
      ];
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      this.rootNodes = [];
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      await this.getMenus();
      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        menu_id: null,
        is_add_on: 1,
        sort: 0,
      };
      this.createScreens = [
        {
          name: "",
          name_e: "",
          title: "",
          title_e: "",
          serial_id: "",
          search: "",
          url: "",
          is_implementor: 0,
          sort: 0,
        },
      ];
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      this.current_id = null;
    },
    /**
     *  create module
     */
    resetForm() {
      this.create = {
        name: "",
        name_e: "",
        parent_id: null,
        menu_id: null,
        is_add_on: 1,
        sort: 0,
      };
      this.createScreens = [
        {
          name: "",
          name_e: "",
          title: "",
          title_e: "",
          serial_id: "",
          search: "",
          url: "",
          is_implementor: 0,
          sort: 0,
        },
      ];
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.current_id = null;
    },
    AddSubmit() {
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
        if (this.create.parent_id == null) {
          this.create.parent_id = 0;
        }
        adminApi
          .post(`/sub-menus`, { ...this.create })
          .then((res) => {
            this.is_disabled = true;
            this.current_id = res.data.data.id;
            this.$emit("created");
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
        if (this.edit.parent_id == null) {
          this.edit.parent_id = 0;
        }
        adminApi
          .put(`/sub-menus/${id}`, this.edit)
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
    async getMenus() {
      await adminApi
        .get(`/program-folder`)
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

    /**
     *   show Modal (edit)
     */
    async resetModalEdit(id) {
      await this.getMenus();
      let module = this.menuTrees.find((e) => id == e.id);
      this.edit.name = module.name;
      this.edit.name_e = module.name_e;
      this.edit.is_add_on = module.is_add_on;
      this.edit.menu_id = module.menu_id;
      this.edit.sort = module.sort;
      this.errors = {};
      this.current_id = id;
    },
    /**
     *  hidden Modal (edit)
     */
    resetModalHiddenEdit(id) {
      this.errors = {};
      this.edit = {
        name: "",
        name_e: "",
        parent_id: null,
        menu_id: null,
        is_add_on: 1,
        sort: 0,
      };
      this.rootNodes = [];
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
    getMenusAfterCollapse(parentNode, secondParentNode, children) {
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
                  rootNodes[parentIndex].children[index].children = children;
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
  },
};
</script>

<template>
  <!--  create   -->
  <b-modal
    id="create_sub_menu_comp"
    :title="$t('general.subMenu')"
    title-class="font-18"
    body-class="paddingUnset "
    dialog-class="modal-full-width"
    :hide-footer="true"
    @show="resetModal"
    @hidden="resetModalHidden"
  >
    <form>
      <div class="mb-3 d-flex justify-content-end m-3">
        <b-button
          variant="success"
          :disabled="!is_disabled"
          @click.prevent="resetForm"
          type="button"
          :class="['font-weight-bold px-2', is_disabled ? 'mx-2' : '']"
        >
          {{ $t("general.AddNewRecord") }}
        </b-button>
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
          @click.prevent="$bvModal.hide(`create_sub_menu_comp`)"
          variant="danger"
          type="button"
        >
          {{ $t("general.Cancel") }}
        </b-button>
      </div>
      <b-tabs nav-class="nav-tabs nav-bordered">
        <b-tab :title="$t('general.DataEntry')" active>
          <div class="col-5">
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
                      'is-invalid': $v.create.name.$error || errors.name,
                      'is-valid': !$v.create.name.$invalid && !errors.name,
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
                      >{{ $t(errorMessage) }}
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
                  <input
                    type="text"
                    class="form-control englishInput"
                    v-model="$v.create.name_e.$model"
                    :class="{
                      'is-invalid': $v.create.name_e.$error || errors.name_e,
                      'is-valid': !$v.create.name_e.$invalid && !errors.name_e,
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
                      v-for="(errorMessage, index) in errors.name_e"
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
                        v-for="(errorMessage, index) in errors.sort"
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
                    {{ $t("general.addOn") }}
                    <span class="text-danger">*</span>
                  </label>
                  <b-form-group
                    :class="{
                      'is-invalid':
                        $v.create.is_add_on.$error || errors.is_add_on,
                      'is-valid':
                        !$v.create.is_add_on.$invalid && !errors.is_add_on,
                    }"
                  >
                    <b-form-radio
                      class="d-inline-block"
                      v-model="$v.create.is_add_on.$model"
                      name="some-radios"
                      :value="1"
                      >{{ $t("general.Yes") }}</b-form-radio
                    >
                    <b-form-radio
                      class="d-inline-block m-1"
                      v-model="$v.create.is_add_on.$model"
                      name="some-radios"
                      :value="0"
                      >{{ $t("general.No") }}</b-form-radio
                    >
                  </b-form-group>
                  <template v-if="errors.is_add_on">
                    <ErrorMessage
                      v-for="(errorMessage, index) in errors.is_add_on"
                      :key="index"
                      >{{ $t(errorMessage) }}
                    </ErrorMessage>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab :disabled="!current_id" :title="$t('general.screen')">
          <div class="d-flex justify-content-end mb-4">
            <b-button
              variant="success"
              type="submit"
              class="mx-1"
              v-if="!isLoader"
              @click.prevent="AddScreens"
            >
              {{ $t("general.Add") }}
            </b-button>

            <b-button variant="success" class="mx-1" disabled v-else>
              <b-spinner small></b-spinner>
              <span class="sr-only">{{ $t("login.Loading") }}...</span>
            </b-button>
          </div>
          <div
            class="row mb-2"
            v-for="(item, index) in createScreens"
            :key="index"
          >
            <div class="col-md-2 direction">
              <div class="form-group">
                <label for="field-1" class="control-label">
                  {{ $t("general.Name") }}
                  <span class="text-danger">*</span>
                </label>
                <div dir="rtl">
                  <input
                    type="text"
                    class="form-control arabicInput"
                    v-model="$v.createScreens.$each[index].name.$model"
                    :class="{
                      'is-invalid':
                        $v.createScreens.$each[index].name.$error ||
                        errors.name,
                      'is-valid':
                        !$v.createScreens.$each[index].name.$invalid &&
                        !errors.name,
                    }"
                    @keyup="arabicValueIndex(createScreens[index].name, index)"
                    id="field-1"
                  />
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].name.minLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatleast") }}
                  {{ $v.createScreens.$each[index].name.$params.minLength.min }}
                  {{ $t("general.letters") }}
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].name.maxLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatmost") }}
                  {{ $v.createScreens.$each[index].name.$params.maxLength.max }}
                  {{ $t("general.letters") }}
                </div>
                <template v-if="errors.name">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.name"
                    :key="index"
                    >{{ errorMessage }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2 direction">
              <div class="form-group">
                <label for="field-1" class="control-label">
                  {{ $t("general.title") }}
                  <span class="text-danger">*</span>
                </label>
                <div dir="rtl">
                  <input
                    type="text"
                    class="form-control arabicInput"
                    v-model="$v.createScreens.$each[index].title.$model"
                    :class="{
                      'is-invalid':
                        $v.createScreens.$each[index].title.$error ||
                        errors.title,
                      'is-valid':
                        !$v.createScreens.$each[index].title.$invalid &&
                        !errors.title,
                    }"
                    @keyup="arabicValueTitle(createScreens[index].title, index)"
                  />
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].title.minLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatleast") }}
                  {{
                    $v.createScreens.$each[index].title.$params.minLength.min
                  }}
                  {{ $t("general.letters") }}
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].title.maxLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatmost") }}
                  {{
                    $v.createScreens.$each[index].title.$params.maxLength.max
                  }}
                  {{ $t("general.letters") }}
                </div>
                <template v-if="errors.title">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.title"
                    :key="index"
                    >{{ errorMessage }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2 direction-ltr">
              <div class="form-group">
                <label for="field-2" class="control-label">
                  <span class="text-danger">*</span>
                  {{ $t("general.Name_en") }}
                </label>
                <div dir="ltr">
                  <input
                    type="text"
                    class="form-control englishInput"
                    v-model="$v.createScreens.$each[index].name_e.$model"
                    :class="{
                      'is-invalid':
                        $v.createScreens.$each[index].name_e.$error ||
                        errors.name_e,
                      'is-valid':
                        !$v.createScreens.$each[index].name_e.$invalid &&
                        !errors.name_e,
                    }"
                    @keyup="
                      englishValueIndex(createScreens[index].name_e, index)
                    "
                    id="field-2"
                  />
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].name_e.minLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatleast") }}
                  {{
                    $v.createScreens.$each[index].name_e.$params.minLength.min
                  }}
                  {{ $t("general.letters") }}
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].name_e.maxLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatmost") }}
                  {{
                    $v.createScreens.$each[index].name_e.$params.maxLength.max
                  }}
                  {{ $t("general.letters") }}
                </div>
                <template v-if="errors.name_e">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.name_e"
                    :key="index"
                    >{{ errorMessage }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2 direction-ltr">
              <div class="form-group">
                <label for="field-2" class="control-label">
                  <span class="text-danger">*</span>
                  {{ $t("general.title_en") }}
                </label>
                <div dir="ltr">
                  <input
                    type="text"
                    class="form-control englishInput"
                    v-model="$v.createScreens.$each[index].title_e.$model"
                    :class="{
                      'is-invalid':
                        $v.createScreens.$each[index].title_e.$error || errors.title_e,
                      'is-valid':
                        !$v.createScreens.$each[index].title_e.$invalid &&
                        !errors.title_e,
                    }"
                    @keyup="
                      englishValueTitle(createScreens[index].title_e, index)
                    "
                  />
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].title_e.minLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatleast") }}
                  {{
                    $v.createScreens.$each[index].title_e.$params.minLength.min
                  }}
                  {{ $t("general.letters") }}
                </div>
                <div
                  v-if="!$v.createScreens.$each[index].title_e.maxLength"
                  class="invalid-feedback"
                >
                  {{ $t("general.Itmustbeatmost") }}
                  {{
                    $v.createScreens.$each[index].title_e.$params.maxLength.max
                  }}
                  {{ $t("general.letters") }}
                </div>
                <template v-if="errors.title_e">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.title_e"
                    :key="index"
                    >{{ errorMessage }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="field-3" class="control-label">
                  {{ $t("general.url") }}
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  v-model.trim="$v.createScreens.$each[index].url.$model"
                  :class="{
                    'is-invalid':
                      $v.createScreens.$each[index].url.$error || errors.url,
                    'is-valid':
                      !$v.createScreens.$each[index].url.$invalid &&
                      !errors.url,
                  }"
                  id="field-3"
                />
                <div
                  v-if="!$v.createScreens.$each[index].url.required"
                  class="invalid-feedback"
                >
                  {{ $t("general.fieldIsRequired") }}
                </div>
                <template v-if="errors.url">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.url"
                    :key="index"
                    >{{ errorMessage }}</ErrorMessage
                  >
                </template>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="field-2" class="control-label">
                  {{ $t("general.IdSort") }}
                </label>
                <div>
                  <input
                    type="number"
                    class="form-control"
                    data-create="2"
                    v-model="createScreens[index].sort"
                    id="field-2"
                  />
                </div>
                <template v-if="errors.sort">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.sort"
                    :key="index"
                    >{{ $t(errorMessage) }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label class="mr-2 mb-2">
                  {{ $t("general.isImplementor") }}
                  <span class="text-danger">*</span>
                </label>
                <b-form-group
                  :class="{
                    'is-invalid':
                      $v.createScreens.$each[index].is_implementor.$error ||
                      errors.is_implementor,
                    'is-valid':
                      !$v.createScreens.$each[index].is_implementor.$invalid &&
                      !errors.is_implementor,
                  }"
                >
                  <b-form-radio
                    class="d-inline-block"
                    v-model="
                      $v.createScreens.$each[index].is_implementor.$model
                    "
                    :name="`some-radios-${index}`"
                    :value="1"
                    >{{ $t("general.Yes") }}</b-form-radio
                  >
                  <b-form-radio
                    class="d-inline-block m-1"
                    v-model="
                      $v.createScreens.$each[index].is_implementor.$model
                    "
                    :name="`some-radios-${index}`"
                    :value="0"
                    >{{ $t("general.No") }}</b-form-radio
                  >
                </b-form-group>
                <template v-if="errors.is_implementor">
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.is_implementor"
                    :key="index"
                    >{{ $t(errorMessage) }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
            <div class="col-md-2">
              <button
                v-if="createScreens.length > 1"
                type="button"
                @click.prevent="removeNewField(index)"
                class="subMenuComp custom-btn-dowonload"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div class="row">
            <a
              @click.prevent="addNewField"
              href=""
              class="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0 mx-2"
              >{{ $t("general.Add") }}</a
            >
          </div>
        </b-tab>
      </b-tabs>
    </form>
  </b-modal>
  <!--  /create   -->
</template>
<style>
.subMenuComp.custom-btn-dowonload {
  margin-top: 13px;
}
.dropdown-menu-custom-company.dropdown .dropdown-menu {
  padding: 5px 10px !important;
  overflow-y: scroll;
  height: 400px;
}
.modal-dialog .card {
  margin: 0 !important;
}
.modal-body.paddingUnset {
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
}
</style>
