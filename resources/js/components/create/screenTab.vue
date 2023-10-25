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
  props: ["sub_menu_id","menu_id"],
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
      screens: [],
      companies: [],
      create: {
        company_id: "",
        screen_id: null,
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
      screen_id: { required },
      company_id: { required },
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
    async getDefScreens(id) {
      await adminApi
        .get(`/screens/all-company-screen?${`sub_menu_id=${this.sub_menu_id}`}&company_id=0`)
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
    async getCompanies(id) {
      await adminApi
        .get(`/companies`)
        .then((res) => {
          this.companies = res.data.data;
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
        company_id: "",
        screen_id: null,
      };
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
      await this.getDefScreens();
      await this.getCompanies();
      this.create = {
        company_id: "",
        screen_id: null,
      };
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
    },
    /**
     *  create module
     */
    resetForm() {
      this.create = {
        company_id: "",
        screen_id: null,
      };
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
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
        if(this.sub_menu_id){
            adminApi
                .post(`/screens/create-company-screens`, { company_id:this.create.company_id,screens:this.create.screen_id, sub_menu_id: this.sub_menu_id })
                .then((res) => {
                    this.is_disabled = true;
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
        }else{
            adminApi
                .post(`/screens/create-company-screens-menu`, { company_id:this.create.company_id,screens:[this.create.screen_id], menu_id: this.menu_id })
                .then((res) => {
                    this.is_disabled = true;
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
    id="create_screen_tab"
    :title="$t('general.screen')"
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
          @click.prevent="$bvModal.hide(`create_screen_tab`)"
          variant="danger"
          type="button"
        >
          {{ $t("general.Cancel") }}
        </b-button>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              {{ $t("general.screen") }}
              <span class="text-danger">*</span>
            </label>

            <multiselect
              :multiple="true"
              v-model="create.screen_id"
              :options="screens.map((type) => type.id)"
              :custom-label="
                (opt) =>
                  $i18n.locale
                    ? screens.find((x) => x.id == opt).title
                    : screens.find((x) => x.id == opt).title_e
              "
            >
            </multiselect>

            <div v-if="!$v.create.screen_id.required" class="invalid-feedback">
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.screen_id">
              <ErrorMessage
                v-for="(errorMessage, index) in errors.screen_id"
                :key="index"
                >{{ errorMessage }}</ErrorMessage
              >
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              {{ $t("general.Company") }}
              <span class="text-danger">*</span>
            </label>

            <multiselect
              v-model="create.company_id"
              :options="companies.map((type) => type.id)"
              :custom-label="
                (opt) =>
                  $i18n.locale
                    ? companies.find((x) => x.id == opt).name
                    : companies.find((x) => x.id == opt).name_e
              "
            >
            </multiselect>

            <div v-if="!$v.create.company_id.required" class="invalid-feedback">
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.company_id">
              <ErrorMessage
                v-for="(errorMessage, index) in errors.company_id"
                :key="index"
                >{{ errorMessage }}</ErrorMessage
              >
            </template>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
  <!--  /create   -->
</template>
<style scoped lang="scss">
ul,
#myUL {
  list-style-type: none;

  .delete-node {
    i {
      font-size: 18px;
      margin: 0 5px;
    }
  }
}

#myUL {
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
