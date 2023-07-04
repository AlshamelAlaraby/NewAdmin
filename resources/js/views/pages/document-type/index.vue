<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import adminApi from "../../../api/adminAxios";
import partnerApi from "../../../api/partnerAxios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import { dynamicSortString } from "../../../helper/tableSort";
import { formatDateOnly } from "../../../helper/startDate";
import { arabicValue, englishValue } from "../../../helper/langTransform";
import Multiselect from "vue-multiselect";

/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Document Type",
    meta: [{ name: "description", content: "Document Type" }],
  },
  components: {
    Layout,
    PageHeader,
    ErrorMessage,
    loader,
    Multiselect
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
    //   console.log(ew);
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
      documentTypePagination: {},
      documentTypes: [],
      enabled3: true,
      isLoader: false,
      Tooltip: "",
      mouseEnter: "",
      document_id: null,
      branches: [],
      serials: [],
      docsList: [],
      create_linked_with_docs: [],
      edit_linked_with_docs: [],
      document_types: [],
      create: {
        name: "",
        name_e: "",
        is_default: "inactive",
      },
      create_effects: {
        cash: 0,
        customer: 0,
        supplier: 0,
        item_quantity: 0,
        reserved_quantity: 0,
        ordered_quantity: 0,
        available: 0,
        unrealized_revenue: 0,
        revenue: 0,
        unrealized_commission: 0,
        commission: 0
      },
      edit_effects: {
        cash: 0,
        customer: 0,
        supplier: 0,
        item_quantity: 0,
        reserved_quantity: 0,
        ordered_quantity: 0,
        available: 0,
        unrealized_revenue: 0,
        revenue: 0,
        unrealized_commission: 0,
        commission: 0
      },
      branchFormCreate: {
        branch_id: null,
        serial_id: null,
      },
      branchFormEdit: {
        branch_id: null,
        serial_id: null,
      },

      edit: {
        name: "",
        name_e: "",
        is_default: "inactive",
      },
      setting: {
        name: true,
        name_e: true,
        is_default: true,
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
      }
    };
  },
  validations: {
    create: {
      name: { required, minLength: minLength(3), maxLength: maxLength(255) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
      is_default: { required },
    },
    edit: {
      name: { required, minLength: minLength(3), maxLength: maxLength(255) },
      name_e: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255),
      },
      is_default: { required },
    },
    branchFormCreate: {
      branch_id: { required },
      serial_id: { required },
    },
    branchFormEdit: {
      branch_id: { required },
      serial_id: { required },
    }
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
        this.documentTypes.forEach((el) => {
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
    addDocs($action) {
      this.isLoader = true;
      let linked_with_docs = $action == "create" ? this.create_linked_with_docs : this.edit_linked_with_docs;
      let data = $action == "create" ? this.create : this.edit;
      adminApi
        .put(`/document-type/${this.document_id}`, {
          ...data,
          document_id: this.document_id,
          document_relateds: linked_with_docs,
          is_default: data.is_default == "active" ? 1 : 0,
        })
        .then((res) => {
          this.isLoader = false;
          this.getData();
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              text: `${this.$t("general.Addedsuccessfully")}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }, 500);

        }).catch((err) => {
        })
    },
    async docType() {
      await adminApi
        .get(
          `/document-type`
        )
        .then((res) => {
          let l = res.data;
          this.docsList = l.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        })
    },
    formatDate(value) {
      return formatDateOnly(value);
    },
    getHeader() {
      if (this.document_id) {
        let doc = this.documentTypes.filter(el => el.id == this.document_id)[0];
        return this.$i18n.locale == 'ar' ? doc.name : doc.name_e;
      }
      return ""
    },
    log(id) {
      if (this.mouseEnter != id) {
        this.Tooltip = "";
        this.mouseEnter = id;
        adminApi
          .get(`/document-type/logs/${id}`)
          .then((res) => {
            let l = res.data.data;
            l.forEach((e) => {
              this.Tooltip += `Created By: ${e.causer_type}; Event: ${e.event
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
     *  get Data document type
     */
    getData(page = 1) {
      this.isLoader = true;

      let filter = "";
      for (let i = 0; i < this.filterSetting.length; i++) {
        filter += `columns[${i}]=${this.filterSetting[i]}&`;
      }

      adminApi
        .get(
          `/document-type?page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.documentTypes = l.data;
          this.documentTypePagination = l.pagination;
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
        this.current_page <= this.documentTypePagination.last_page &&
        this.current_page != this.documentTypePagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        for (let i = 0; i < this.filterSetting.length; i++) {
          filter += `columns[${i}]=${this.filterSetting[i]}&`;
        }

        adminApi
          .get(
            `/document-type?page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.documentTypes = l.data;
            this.documentTypePagination = l.pagination;
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
     *  delete document type
     */
    deleteDocumentType(id, index) {
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
              .post(`/document-type/bulk-delete`, { ids: id })
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
              .delete(`/document-type/${id}`)
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
      this.create = { name: "", name_e: "", is_default: "inactive" };
      this.document_id = null;
      this.create_linked_with_docs = [];
      this.create_effects = {
          cash: 0,
          customer: 0,
          supplier: 0,
          item_quantity: 0,
          reserved_quantity: 0,
          ordered_quantity: 0,
          available: 0,
          unrealized_revenue: 0,
          revenue: 0,
          unrealized_commission: 0,
          commission: 0
      };
      this.branchFormCreate = {
        branch_id: null,
        serial_id: null,
      },
        this.$nextTick(() => {
          this.$v.$reset();
        });
      this.errors = {};
    },
    /**
     *  hidden Modal (create)
     */
    resetModal() {
      this.create = { name: "", name_e: "", is_default: "inactive" };
      this.create_linked_with_docs = [];
      this.create_effects = {
          cash: 0,
          customer: 0,
          supplier: 0,
          item_quantity: 0,
          reserved_quantity: 0,
          ordered_quantity: 0,
          available: 0,
          unrealized_revenue: 0,
          revenue: 0,
          unrealized_commission: 0,
          commission: 0
      };
      this.branchFormCreate = {
        branch_id: null,
        serial_id: null,
      },

        this.document_id = null;
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      // this.getBranches();
      // this.getSerials();
      this.docType();
    },
    /**
     *  create document type
     */
    resetForm() {
      this.create = { name: "", name_e: "", is_default: "inactive" };
      this.create_linked_with_docs = [];
      this.create_effects = {
          cash: 0,
          customer: 0,
          supplier: 0,
          item_quantity: 0,
          reserved_quantity: 0,
          ordered_quantity: 0,
          available: 0,
          unrealized_revenue: 0,
          revenue: 0,
          unrealized_commission: 0,
          commission: 0
      };
      this.branchFormCreate = {
        branch_id: null,
        serial_id: null,
      },
        this.document_id = null;
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    AddSubmit() {
      if (this.create.name || this.create.name_e) {
        this.create.name = this.create.name ? this.create.name : this.create.name_e;
        this.create.name_e = this.create.name_e ? this.create.name_e : this.create.name;
      }
      this.$v.create.$touch();
      if (this.$v.create.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.is_disabled = false;
        adminApi
          .post(`/document-type`, {
            ...this.create,
            is_default: this.create.is_default == "active" ? 1 : 0,
          })
          .then((res) => {
            this.getData();
            this.document_id = res.data.data.id;
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
    addEffects(method) {
      let form = null;
      if (method == "create") {
        form = { id: this.document_id, attributes: this.create_effects };
      }
      else {
        form = { id: this.document_id, attributes: this.edit_effects };
      }
      this.isLoader = true;
      adminApi
        .put(`/document-type/${this.document_id}`, form)
        .then((res) => {
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
    },
    addBranchForm(method) {
      let form = null;
      if (method == "create") {
        form = { ...this.branchFormCreate, id: this.document_id };
        this.$v.branchFormCreate.$touch();
        if (this.$v.branchFormCreate.$invalid) return;
      }
      else {
        form = { ...this.branchFormEdit, id: this.document_id };
        this.$v.branchFormEdit.$touch();
        if (this.$v.branchFormEdit.$invalid) return;
      }
      this.isLoader = true;
      adminApi
        .put(`/document-type/${this.document_id}`, form)
        .then((res) => {
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
    },
    // async getBranches() {
    //   this.isLoader = true;
    //   await partnerApi
    //     .get(`/branches`)
    //     .then((res) => {
    //       this.branches = res.data.data;
    //     })
    //     .catch((err) => {
    //       if (err.response.data) {
    //         this.errors = err.response.data.errors;
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: `${this.$t("general.Error")}`,
    //           text: `${this.$t("general.Thereisanerrorinthesystem")}`,
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       this.isLoader = false;
    //     });
    // },
    // async getSerials() {
    //   this.isLoader = true;
    //   await partnerApi
    //     .get(`/serials`)
    //     .then((res) => {
    //       this.serials = res.data.data;
    //     })
    //     .catch((err) => {
    //       if (err.response.data) {
    //         this.errors = err.response.data.errors;
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: `${this.$t("general.Error")}`,
    //           text: `${this.$t("general.Thereisanerrorinthesystem")}`,
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       this.isLoader = false;
    //     });
    // },
    /**
     *  edit document type
     */
    editSubmit(id) {
      if (this.edit.name || this.edit.name_e) {
        this.edit.name = this.edit.name ? this.edit.name : this.edit.name_e;
        this.edit.name_e = this.edit.name_e ? this.edit.name_e : this.create.name;
      }
      this.$v.edit.$touch();
      if (this.$v.edit.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        let { name, name_e, is_default } = this.edit;
        adminApi
          .put(`/document-type/${id}`, {
            name,
            name_e,
            is_default: is_default == "active" ? 1 : 0,
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
      await this.docType();
      // await this.getBranches();
      // await this.getSerials();

      let documentType = this.documentTypes.find((e) => id == e.id);
      this.edit.name = documentType.name;
      this.edit.name_e = documentType.name_e;
      this.edit.is_default = documentType.is_default == 1 ? "active" : "inactive";
      if (documentType.attributes) {
        this.edit_effects.cash = documentType.attributes.cash;
        this.edit_effects.customer = documentType.attributes.customer;
        this.edit_effects.supplier = documentType.attributes.supplier;
        this.edit_effects.item_quantity = documentType.attributes.item_quantity;
        this.edit_effects.reserved_quantity = documentType.attributes.reserved_quantity;
        this.edit_effects.ordered_quantity = documentType.attributes.ordered_quantity;
        this.edit_effects.available = documentType.attributes.available;
      }
      this.document_id = documentType.id;
      this.branchFormEdit.branch_id = documentType.branch_id;
      this.branchFormEdit.serial_id = documentType.serial_id;
      this.edit_linked_with_docs = documentType.document_relateds.map(doc => { return doc.id });
      this.errors = {};
    },
    /**
     *  hidden Modal (edit)
     */
    resetModalHiddenEdit(id) {
      this.edit_linked_with_docs = [];
      this.errors = {};
      this.edit = {
        name: "",
        name_e: "",
        is_default: "inactive",
      };
      this.edit_effects = {
          cash: 0,
          customer: 0,
          supplier: 0,
          item_quantity: 0,
          reserved_quantity: 0,
          ordered_quantity: 0,
          available: 0,
          unrealized_revenue: 0,
          revenue: 0,
          unrealized_commission: 0,
          commission: 0
      }
      this.branchFormEdit = {
        branch_id: null,
        serial_id: null,
      },
        this.document_id = null;
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
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' });
        } else {
          XLSX.writeFile(wb, fn || (('Document Type' + '.' || 'SheetJSTableExport.') + (type || 'xlsx')));
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
    }

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
              <h4 class="header-title">{{ $t("DocumentType.DocumentTypesTable") }}</h4>
              <div class="col-xs-10 col-md-9 col-lg-7" style="font-weight: 500">
                <div class="d-inline-block" style="width: 22.2%">
                  <!-- Basic dropdown -->
                  <b-dropdown variant="primary" :text="$t('general.searchSetting')" ref="dropdown"
                    class="btn-block setting-search">
                    <b-form-checkbox v-model="filterSetting" value="name" class="mb-1">{{
                      $t("general.Name")
                    }}</b-form-checkbox>
                    <b-form-checkbox v-model="filterSetting" value="name_e" class="mb-1">{{ $t("general.Name_en")
                    }}</b-form-checkbox>
                  </b-dropdown>
                  <!-- Basic dropdown -->
                </div>

                <div class="d-inline-block position-relative" style="width: 77%">
                  <span :class="[
                    'search-custom position-absolute',
                    $i18n.locale == 'ar' ? 'search-custom-ar' : '',
                  ]">
                    <i class="fe-search"></i>
                  </span>
                  <input class="form-control" style="display: block; width: 93%; padding-top: 3px" type="text"
                    v-model.trim="search" :placeholder="`${$t('general.Search')}...`" />
                </div>
              </div>
            </div>

            <div class="row justify-content-between align-items-center mb-2 px-1">
              <div class="col-md-3 d-flex align-items-center mb-1 mb-xl-0">
                <b-button v-b-modal.create variant="primary" class="btn-sm mx-1 font-weight-bold">
                  {{ $t("general.Create") }}
                  <i class="fas fa-plus"></i>
                </b-button>
                <div class="d-inline-flex">
                  <button @click="ExportExcel('xlsx')" class="custom-btn-dowonload">
                    <i class="fas fa-file-download"></i>
                  </button>
                  <button v-print="'#printMe'" class="custom-btn-dowonload">
                    <i class="fe-printer"></i>
                  </button>
                  <button class="custom-btn-dowonload" @click="$bvModal.show(`modal-edit-${checkAll[0]}`)"
                    v-if="checkAll.length == 1">
                    <i class="mdi mdi-square-edit-outline"></i>
                  </button>
                  <!-- start mult delete  -->
                  <button class="custom-btn-dowonload" v-if="checkAll.length > 1"
                    @click.prevent="deleteDocumentType(checkAll)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!-- end mult delete  -->
                  <!--  start one delete  -->
                  <button class="custom-btn-dowonload" v-if="checkAll.length == 1"
                    @click.prevent="deleteDocumentType(checkAll[0])">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!--  end one delete  -->
                </div>
              </div>
              <div class="col-xs-10 col-md-9 col-lg-7 d-flex align-items-center justify-content-end">
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
                  <b-dropdown variant="primary" :html="`${$t('general.setting')} <i class='fe-settings'></i>`"
                    ref="dropdown" class="dropdown-custom-ali">
                    <b-form-checkbox v-model="setting.name" class="mb-1">{{ $t("general.Name") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.name_e" class="mb-1">
                      {{ $t("general.Name_en") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.is_default" class="mb-1">
                      {{ $t("general.Default") }}
                    </b-form-checkbox>
                    <div class="d-flex justify-content-end">
                      <a href="javascript:void(0)" class="btn btn-primary btn-sm">{{
                        $t("general.Apply")
                      }}</a>
                    </div>
                  </b-dropdown>
                  <!-- Basic dropdown -->
                  <!-- start Pagination -->
                  <div class="d-inline-flex align-items-center pagination-custom">
                    <div class="d-inline-block" style="font-size: 15px">
                      {{ documentTypePagination.from }}-{{ documentTypePagination.to }} /
                      {{ documentTypePagination.total }}
                    </div>
                    <div class="d-inline-block">
                      <a href="javascript:void(0)" :style="{
                        'pointer-events':
                          documentTypePagination.current_page == 1 ? 'none' : '',
                      }" @click.prevent="getData(documentTypePagination.current_page - 1)">
                        <span>&lt;</span>
                      </a>
                      <input type="text" @keyup.enter="getDataCurrentPage()" v-model="current_page"
                        class="pagination-current-page" />
                      <a href="javascript:void(0)" :style="{
                        'pointer-events':
                          documentTypePagination.last_page ==
                            documentTypePagination.current_page
                            ? 'none'
                            : '',
                      }" @click.prevent="getData(documentTypePagination.current_page + 1)">
                        <span>&gt;</span>
                      </a>
                    </div>
                  </div>
                  <!-- end Pagination -->
                </div>
              </div>
            </div>
            <!--  create   -->
            <b-modal id="create" :title="$t('DocumentType.AddDocumentType')" title-class="font-18" body-class="p-4 "
              :hide-footer="true" size="lg" @show="resetModal" @hidden="resetModalHidden">
              <h5>{{ getHeader() }}</h5>
              <form>
                <div class="mb-3 d-flex justify-content-end">
                  <b-button variant="success" :disabled="!is_disabled" @click.prevent="resetForm" type="button"
                    :class="['font-weight-bold px-2', is_disabled ? 'mx-2' : '']">
                    {{ $t("general.AddNewRecord") }}
                  </b-button>
                  <!-- Emulate built in modal footer ok and cancel button actions -->
                  <template v-if="!is_disabled">
                    <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader" @click.prevent="AddSubmit">
                      {{ $t("general.Add") }}
                    </b-button>
                    <b-button variant="success" class="mx-1" disabled v-else>
                      <b-spinner small></b-spinner>
                      <span class="sr-only">{{ $t("login.Loading") }}...</span>
                    </b-button>
                  </template>
                  <b-button variant="danger" type="button" @click.prevent="$bvModal.hide(`create`)">
                    {{ $t("general.Cancel") }}
                  </b-button>
                </div>
                <b-tabs nav-class="nav-tabs nav-bordered">
                  <b-tab :title="$t('general.DataEntry')" active>
                    <div class="row">
                      <div class="col-md-6 direction" dir="rtl">
                        <div class="form-group">
                          <label for="field-1" class="control-label">
                            {{ $t("general.Name") }}
                            <span class="text-danger">*</span>
                          </label>
                          <input type="text" class="form-control arabicInput" v-model="$v.create.name.$model" :class="{
                            'is-invalid': $v.create.name.$error || errors.name,
                            'is-valid': !$v.create.name.$invalid && !errors.name,
                          }" @keyup="arabicValue(create.name)" id="field-1" />
                          <div v-if="!$v.create.name.minLength" class="invalid-feedback">
                            {{ $t("general.Itmustbeatleast") }}
                            {{ $v.create.name.$params.minLength.min }}
                            {{ $t("general.letters") }}
                          </div>
                          <div v-if="!$v.create.name.maxLength" class="invalid-feedback">
                            {{ $t("general.Itmustbeatmost") }}
                            {{ $v.create.name.$params.maxLength.max }}
                            {{ $t("general.letters") }}
                          </div>
                          <template v-if="errors.name">
                            <ErrorMessage v-for="(errorMessage, index) in errors.name" :key="index">{{ errorMessage }}
                            </ErrorMessage>
                          </template>
                        </div>
                      </div>
                      <div class="col-md-6 direction-ltr" dir="ltr">
                        <div class="form-group">
                          <label for="field-2" class="control-label">
                            {{ $t("general.Name_en") }}
                            <span class="text-danger">*</span>
                          </label>
                          <input type="text" class="form-control englishInput" v-model="$v.create.name_e.$model" :class="{
                            'is-invalid': $v.create.name_e.$error || errors.name_e,
                            'is-valid': !$v.create.name_e.$invalid && !errors.name_e,
                          }" @keyup="englishValue(create.name_e)" id="field-2" />
                          <div v-if="!$v.create.name_e.minLength" class="invalid-feedback">
                            {{ $t("general.Itmustbeatleast") }}
                            {{ $v.create.name_e.$params.minLength.min }}
                            {{ $t("general.letters") }}
                          </div>
                          <div v-if="!$v.create.name_e.maxLength" class="invalid-feedback">
                            {{ $t("general.Itmustbeatmost") }}
                            {{ $v.create.name_e.$params.maxLength.max }}
                            {{ $t("general.letters") }}
                          </div>
                          <template v-if="errors.name_e">
                            <ErrorMessage v-for="(errorMessage, index) in errors.name_e" :key="index">{{ errorMessage }}
                            </ErrorMessage>
                          </template>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="mr-2">
                            {{ $t("general.Default") }}
                            <span class="text-danger">*</span>
                          </label>
                          <b-form-group :class="{
                            'is-invalid':
                              $v.create.is_default.$error,
                            'is-valid':
                              !$v.create.is_default.$invalid,
                          }">
                            <b-form-radio class="d-inline-block" v-model="$v.create.is_default.$model" name="some-radios"
                              value="active">{{ $t("general.Yes") }}</b-form-radio>
                            <b-form-radio class="d-inline-block m-1" v-model="$v.create.is_default.$model"
                              name="some-radios" value="inactive">{{ $t("general.No") }}</b-form-radio>
                          </b-form-group>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab :disabled="!document_id" :title="$t('general.effects')">
                    <div class="d-flex justify-content-end">
                      <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                        @click.prevent="addEffects('create')">
                        {{ $t("general.Add") }}
                      </b-button>
                      <b-button variant="success" class="mx-1" disabled v-else>
                        <b-spinner small></b-spinner>
                        <span class="sr-only">{{ $t("login.Loading") }}...</span>
                      </b-button>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.cash") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref" v-model="create_effects.cash">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.customer") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref" v-model="create_effects.customer">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.supplier") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref" v-model="create_effects.supplier">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.item_quantity") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref"
                            v-model="create_effects.item_quantity">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.reserved_quantity") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref"
                            v-model="create_effects.reserved_quantity">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.ordered_quantity") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref"
                            v-model="create_effects.ordered_quantity">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inlineFormCustomSelectPref">
                            {{ $t("general.available") }}
                            <span class="text-danger">*</span>
                          </label>
                          <select class="custom-select" id="inlineFormCustomSelectPref"
                            v-model="create_effects.available">
                            <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                            <option value="1">{{ $t("general.increase") }}</option>
                            <option value="-1">{{ $t("general.decrease") }}</option>
                          </select>
                        </div>
                      </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>
                                    {{ $t("general.unrealized_revenue") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <select class="custom-select"
                                        v-model="create_effects.unrealized_revenue">
                                    <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                    <option value="1">{{ $t("general.increase") }}</option>
                                    <option value="-1">{{ $t("general.decrease") }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="inlineFormCustomSelectPref">
                                    {{ $t("general.revenue") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <select class="custom-select"
                                        v-model="create_effects.revenue">
                                    <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                    <option value="1">{{ $t("general.increase") }}</option>
                                    <option value="-1">{{ $t("general.decrease") }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="inlineFormCustomSelectPref">
                                    {{ $t("general.unrealized_commission") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <select class="custom-select" id="inlineFormCustomSelectPref"
                                        v-model="create_effects.unrealized_commission">
                                    <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                    <option value="1">{{ $t("general.increase") }}</option>
                                    <option value="-1">{{ $t("general.decrease") }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="inlineFormCustomSelectPref">
                                    {{ $t("general.commission") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <select class="custom-select" id="inlineFormCustomSelectPref"
                                        v-model="create_effects.commission">
                                    <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                    <option value="1">{{ $t("general.increase") }}</option>
                                    <option value="-1">{{ $t("general.decrease") }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                  </b-tab>
                  <b-tab :disabled="!document_id" :title="$t('general.linkedWithDocs')">
                    <div class="d-flex justify-content-end">
                      <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                        @click.prevent="addDocs('create')">
                        {{ $t("general.Add") }}
                      </b-button>
                      <b-button variant="success" class="mx-1" disabled v-else>
                        <b-spinner small></b-spinner>
                        <span class="sr-only">{{ $t("login.Loading") }}...</span>
                      </b-button>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="control-label">
                            {{ $t("general.linkedWithDocs") }}
                            <span class="text-danger">*</span>
                          </label>
                          <multiselect :multiple="true" v-model="create_linked_with_docs"
                            :options="docsList.map((type) => type.id)" :custom-label="
                              (opt) =>
                                $i18n.locale == 'ar'
                                  ? docsList.find((x) => x.id == opt).name
                                  : docsList.find((x) => x.id == opt).name_e
                            ">
                          </multiselect>
                          <template v-if="errors.document_types">
                            <ErrorMessage v-for="(errorMessage, index) in errors.document_types" :key="index">{{
                              errorMessage
                            }}</ErrorMessage>
                          </template>
                        </div>
                      </div>
                    </div>
                  </b-tab>

                  <!-- <b-tab :disabled="!document_id" :title="$t('general.branch')">
                                          <div class="d-flex justify-content-end">
                                            <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                                              @click.prevent="addBranchForm('create')">
                                              {{ $t("general.Add") }}
                                            </b-button>
                                            <b-button variant="success" class="mx-1" disabled v-else>
                                              <b-spinner small></b-spinner>
                                              <span class="sr-only">{{ $t("login.Loading") }}...</span>
                                            </b-button>
                                          </div>
                                          <div class="row">
                                            <div class="col-md-6 position-relative">
                                              <div class="form-group">
                                                <label class="my-1 mr-2">{{
                                                  $t("general.branch")
                                                }}</label>
                                                <span class="text-danger">*</span>
                                                <multiselect v-model="$v.branchFormCreate.branch_id.$model"
                                                  :options="branches.map((type) => type.id)" :custom-label="
                                                    (opt) =>
                                                      $i18n.locale == 'ar'
                                                        ? branches.find((type) => type.id == opt).name
                                                        : branches.find((type) => type.id == opt).name_e"
                                                  :class="{ 'is-invalid': $v.branchFormCreate.branch_id.$error }">
                                                </multiselect>
                                                <div v-if="!$v.branchFormCreate.branch_id.required" class="invalid-feedback">
                                                  {{ $t("general.fieldIsRequired") }}
                                                </div>
                                              </div>
                                            </div>
                                            <div class="col-md-6 position-relative">
                                              <div class="form-group">
                                                <label class="my-1 mr-2">{{
                                                  $t("general.serial")
                                                }}</label>
                                                <span class="text-danger">*</span>
                                                <multiselect v-model="$v.branchFormCreate.serial_id.$model"
                                                  :options="serials.map((type) => type.id)" :custom-label="
                                                    (opt) => serials.find((type) => type.id == opt).start_no"
                                                  :class="{ 'is-invalid': $v.branchFormCreate.serial_id.$error }">
                                                </multiselect>
                                                <div v-if="!$v.branchFormCreate.serial_id.required" class="invalid-feedback">
                                                  {{ $t("general.fieldIsRequired") }}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </b-tab> -->
                </b-tabs>
              </form>
            </b-modal>
            <!--  /create   -->

            <!-- start .table-responsive-->
            <div class="table-responsive mb-3 custom-table-theme position-relative">
              <!--       start loader       -->
              <loader size="large" v-if="isLoader" />
              <!--       end loader       -->

              <table class="table table-borderless table-hover table-centered m-0" ref="exportable_table" id="printMe">
                <thead>
                  <tr>
                    <th v-if="enabled3" class="do-not-print" scope="col" style="width: 0">
                      <div class="form-check custom-control">
                        <input class="form-check-input" type="checkbox" v-model="isCheckAll"
                          style="width: 17px; height: 17px" />
                      </div>
                    </th>
                    <th v-if="setting.name">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Name") }}</span>
                        <div class="arrow-sort">
                          <i class="fas fa-arrow-up" @click="documentTypes.sort(sortString('name'))"></i>
                          <i class="fas fa-arrow-down" @click="documentTypes.sort(sortString('-name'))"></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.name_e">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Name_en") }}</span>
                        <div class="arrow-sort">
                          <i class="fas fa-arrow-up" @click="documentTypes.sort(sortString('name_e'))"></i>
                          <i class="fas fa-arrow-down" @click="documentTypes.sort(sortString('-name_e'))"></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.is_default">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("general.Default") }}</span>
                        <div class="arrow-sort">
                          <i class="fas fa-arrow-up" @click="documentTypes.sort(sortString('is_default'))"></i>
                          <i class="fas fa-arrow-down" @click="documentTypes.sort(sortString('-is_default'))"></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="enabled3" class="do-not-print">
                      {{ $t("general.Action") }}
                    </th>
                    <th v-if="enabled3" class="do-not-print"><i class="fas fa-ellipsis-v"></i></th>
                  </tr>
                </thead>
                <tbody v-if="documentTypes.length > 0">
                  <tr @click.capture="checkRow(data.id)" @dblclick.prevent="$bvModal.show(`modal-edit-${data.id}`)"
                    v-for="(data, index) in documentTypes" :key="data.id" class="body-tr-custom">
                    <td v-if="enabled3" class="do-not-print">
                      <div class="form-check custom-control" style="min-height: 1.9em">
                        <input style="width: 17px; height: 17px" class="form-check-input" type="checkbox" :value="data.id"
                          v-model="checkAll" />
                      </div>
                    </td>
                    <td v-if="setting.name">
                      <h5 class="m-0 font-weight-normal">{{ data.name }}</h5>
                    </td>
                    <td v-if="setting.name_e">
                      <h5 class="m-0 font-weight-normal">{{ data.name_e }}</h5>
                    </td>
                    <td v-if="setting.is_default">
                      <span :class="[
                        data.is_default == 1 ? 'text-success' : 'text-danger',
                        'badge',
                      ]">
                        {{
                          data.is_default == 1
                          ? `${$t("general.Yes")}`
                          : `${$t("general.No")}`
                        }}
                      </span>
                    </td>
                    <td v-if="enabled3" class="do-not-print">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm dropdown-toggle dropdown-coustom" data-toggle="dropdown"
                          aria-expanded="false">
                          {{ $t("general.commands") }}
                          <i class="fas fa-angle-down"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-custom">
                          <a class="dropdown-item" href="#" @click="$bvModal.show(`modal-edit-${data.id}`)">
                            <div class="d-flex justify-content-between align-items-center text-black">
                              <span>{{ $t("general.edit") }}</span>
                              <i class="mdi mdi-square-edit-outline text-info"></i>
                            </div>
                          </a>
                          <a class="dropdown-item text-black" href="#" @click.prevent="deleteDocumentType(data.id)">
                            <div class="d-flex justify-content-between align-items-center text-black">
                              <span>{{ $t("general.delete") }}</span>
                              <i class="fas fa-times text-danger"></i>
                            </div>
                          </a>
                        </div>
                      </div>

                      <!--  edit   -->
                      <b-modal :id="`modal-edit-${data.id}`" :title="$t('DocumentType.EditDocumentType')"
                        title-class="font-18" body-class="p-4" size="lg" :ref="`edit-${data.id}`" :hide-footer="true"
                        @show="resetModalEdit(data.id)" @hidden="resetModalHiddenEdit(data.id)">
                        <h5>{{ getHeader() }}</h5>
                        <form>
                          <div class="mb-3 d-flex justify-content-end">
                            <!-- Emulate built in modal footer ok and cancel button actions -->
                            <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader"
                              @click.prevent="editSubmit(data.id)">
                              {{ $t("general.Edit") }}
                            </b-button>

                            <b-button variant="success" class="mx-1" disabled v-else>
                              <b-spinner small></b-spinner>
                              <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>

                            <b-button variant="danger" type="button"
                              @click.prevent="$bvModal.hide(`modal-edit-${data.id}`)">
                              {{ $t("general.Cancel") }}
                            </b-button>
                          </div>
                          <b-tabs nav-class="nav-tabs nav-bordered">
                            <b-tab :title="$t('general.DataEntry')" active>
                              <div class="row">
                                <div class="col-md-6 direction" dir="rtl">
                                  <div class="form-group">
                                    <label for="field-1" class="control-label">
                                      {{ $t("general.Name") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control arabicInput" v-model="$v.edit.name.$model"
                                      :class="{
                                        'is-invalid': $v.edit.name.$error || errors.name,
                                        'is-valid': !$v.edit.name.$invalid && !errors.name,
                                      }" @keyup="arabicValue(edit.name)" id="field-1" />
                                    <div v-if="!$v.edit.name.minLength" class="invalid-feedback">
                                      {{ $t("general.Itmustbeatleast") }}
                                      {{ $v.edit.name.$params.minLength.min }}
                                      {{ $t("general.letters") }}
                                    </div>
                                    <div v-if="!$v.edit.name.maxLength" class="invalid-feedback">
                                      {{ $t("general.Itmustbeatmost") }}
                                      {{ $v.edit.name.$params.maxLength.max }}
                                      {{ $t("general.letters") }}
                                    </div>
                                    <template v-if="errors.name">
                                      <ErrorMessage v-for="(errorMessage, index) in errors.name" :key="index">{{
                                        errorMessage }}
                                      </ErrorMessage>
                                    </template>
                                  </div>
                                </div>
                                <div class="col-md-6 direction-ltr" dir="ltr">
                                  <div class="form-group">
                                    <label for="field-2" class="control-label">
                                      {{ $t("general.Name_en") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control englishInput" v-model="$v.edit.name_e.$model"
                                      :class="{
                                        'is-invalid': $v.edit.name_e.$error || errors.name_e,
                                        'is-valid': !$v.edit.name_e.$invalid && !errors.name_e,
                                      }" @keyup="englishValue(edit.name_e)" id="field-2" />
                                    <div v-if="!$v.edit.name_e.minLength" class="invalid-feedback">
                                      {{ $t("general.Itmustbeatleast") }}
                                      {{ $v.edit.name_e.$params.minLength.min }}
                                      {{ $t("general.letters") }}
                                    </div>
                                    <div v-if="!$v.edit.name_e.maxLength" class="invalid-feedback">
                                      {{ $t("general.Itmustbeatmost") }}
                                      {{ $v.edit.name_e.$params.maxLength.max }}
                                      {{ $t("general.letters") }}
                                    </div>
                                    <template v-if="errors.name_e">
                                      <ErrorMessage v-for="(errorMessage, index) in errors.name_e" :key="index">{{
                                        errorMessage }}
                                      </ErrorMessage>
                                    </template>
                                  </div>
                                </div>
                                <div class="col-md-12">
                                  <div class="form-group">
                                    <label class="mr-2">
                                      {{ $t("general.Default") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <b-form-group :class="{
                                      'is-invalid':
                                        $v.edit.is_default.$error,
                                      'is-valid':
                                        !$v.edit.is_default.$invalid,
                                    }">
                                      <b-form-radio class="d-inline-block" v-model="$v.edit.is_default.$model"
                                        name="some-radios" value="active">{{ $t("general.Yes") }}</b-form-radio>
                                      <b-form-radio class="d-inline-block m-1" v-model="$v.edit.is_default.$model"
                                        name="some-radios" value="inactive">{{ $t("general.No") }}</b-form-radio>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </b-tab>
                            <b-tab :title="$t('general.effects')">
                              <div class="d-flex justify-content-end">
                                <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                                  @click.prevent="addEffects('update')">
                                  {{ $t("general.Add") }}
                                </b-button>
                                <b-button variant="success" class="mx-1" disabled v-else>
                                  <b-spinner small></b-spinner>
                                  <span class="sr-only">{{ $t("login.Loading") }}...</span>
                                </b-button>
                              </div>
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.cash") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.cash">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.customer") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.customer">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.supplier") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.supplier">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.item_quantity") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.item_quantity">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.reserved_quantity") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.reserved_quantity">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.ordered_quantity") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.ordered_quantity">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="inlineFormCustomSelectPref">
                                      {{ $t("general.available") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <select class="custom-select" id="inlineFormCustomSelectPref"
                                      v-model="edit_effects.available">
                                      <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                      <option value="1">{{ $t("general.increase") }}</option>
                                      <option value="-1">{{ $t("general.decrease") }}</option>
                                    </select>
                                  </div>
                                </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label>
                                              {{ $t("general.unrealized_revenue") }}
                                              <span class="text-danger">*</span>
                                          </label>
                                          <select class="custom-select"
                                                  v-model="edit_effects.unrealized_revenue">
                                              <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                              <option value="1">{{ $t("general.increase") }}</option>
                                              <option value="-1">{{ $t("general.decrease") }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label for="inlineFormCustomSelectPref">
                                              {{ $t("general.revenue") }}
                                              <span class="text-danger">*</span>
                                          </label>
                                          <select class="custom-select"
                                                  v-model="edit_effects.revenue">
                                              <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                              <option value="1">{{ $t("general.increase") }}</option>
                                              <option value="-1">{{ $t("general.decrease") }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label for="inlineFormCustomSelectPref">
                                              {{ $t("general.unrealized_commission") }}
                                              <span class="text-danger">*</span>
                                          </label>
                                          <select class="custom-select" id="inlineFormCustomSelectPref"
                                                  v-model="edit_effects.unrealized_commission">
                                              <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                              <option value="1">{{ $t("general.increase") }}</option>
                                              <option value="-1">{{ $t("general.decrease") }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label for="inlineFormCustomSelectPref">
                                              {{ $t("general.commission") }}
                                              <span class="text-danger">*</span>
                                          </label>
                                          <select class="custom-select" id="inlineFormCustomSelectPref"
                                                  v-model="edit_effects.commission">
                                              <option value="0" selected>{{ $t("general.noeffect") }}...</option>
                                              <option value="1">{{ $t("general.increase") }}</option>
                                              <option value="-1">{{ $t("general.decrease") }}</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                            </b-tab>
                            <b-tab :disabled="!document_id" :title="$t('general.linkedWithDocs')">
                              <div class="d-flex justify-content-end">
                                <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                                  @click.prevent="addDocs('edit')">
                                  {{ $t("general.Add") }}
                                </b-button>
                                <b-button variant="success" class="mx-1" disabled v-else>
                                  <b-spinner small></b-spinner>
                                  <span class="sr-only">{{ $t("login.Loading") }}...</span>
                                </b-button>
                              </div>
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label class="control-label">
                                      {{ $t("general.linkedWithDocs") }}
                                      <span class="text-danger">*</span>
                                    </label>
                                    <multiselect :multiple="true" v-model="edit_linked_with_docs"
                                      :options="docsList.map((type) => type.id)" :custom-label="
                                        (opt) =>
                                          $i18n.locale == 'ar'
                                            ? docsList.find((x) => x.id == opt).name
                                            : docsList.find((x) => x.id == opt).name_e
                                      ">
                                    </multiselect>
                                    <template v-if="errors.document_types">
                                      <ErrorMessage v-for="(errorMessage, index) in errors.document_types" :key="index">{{
                                        errorMessage
                                      }}</ErrorMessage>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </b-tab>
                            <!-- <b-tab :title="$t('general.branch')">
                                                    <div class="d-flex justify-content-end">
                                                      <b-button variant="success" v-if="!isLoader" type="submit" class="mx-1"
                                                        @click.prevent="addBranchForm('update')">
                                                        {{ $t("general.Add") }}
                                                      </b-button>
                                                      <b-button variant="success" class="mx-1" disabled v-else>
                                                        <b-spinner small></b-spinner>
                                                        <span class="sr-only">{{ $t("login.Loading") }}...</span>
                                                      </b-button>
                                                    </div>
                                                    <div class="row">
                                                      <div class="col-md-6 position-relative">
                                                        <div class="form-group">
                                                          <label class="my-1 mr-2">{{
                                                            $t("general.branch")
                                                          }}</label>
                                                          <span class="text-danger">*</span>
                                                          <multiselect v-model="$v.branchFormEdit.branch_id.$model"
                                                            :options="branches.map((type) => type.id)" :custom-label="
                                                              (opt) =>
                                                                $i18n.locale == 'ar'
                                                                  ? branches.find((x) => x.id == opt).name
                                                                  : branches.find((x) => x.id == opt).name_e"
                                                            :class="{ 'is-invalid': $v.branchFormEdit.branch_id.$error }">
                                                          </multiselect>
                                                          <div v-if="!$v.branchFormEdit.branch_id.required" class="invalid-feedback">
                                                            {{ $t("general.fieldIsRequired") }}
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div class="col-md-6 position-relative">
                                                        <div class="form-group">
                                                          <label class="my-1 mr-2">{{
                                                            $t("general.serial")
                                                          }}</label>
                                                          <span class="text-danger">*</span>
                                                          <multiselect v-model="$v.branchFormEdit.serial_id.$model"
                                                            :options="serials.map((type) => type.id)" :custom-label="
                                                              (opt) => serials.find((type) => type.id == opt).start_no"
                                                            :class="{ 'is-invalid': $v.branchFormEdit.serial_id.$error }">
                                                          </multiselect>
                                                          <div v-if="!$v.branchFormEdit.serial_id.required" class="invalid-feedback">
                                                            {{ $t("general.fieldIsRequired") }}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </b-tab> -->
                          </b-tabs>
                        </form>
                      </b-modal>
                      <!--  /edit   -->
                    </td>
                    <td v-if="enabled3" class="do-not-print">
                      <b-button class="btn" @mouseover="log(data.id)" @mousemove="log(data.id)"
                        :id="'tooltip-button-' + data.id" :variant="$i18n.locale == 'en' ? 'left' : 'right'"> <i
                          class="fe-info" style="font-size: 22px"></i></b-button>
                      <b-tooltip :target="'tooltip-button-' + data.id"
                        :placement="$i18n.locale == 'en' ? 'left' : 'right'">{{ Tooltip }}</b-tooltip>
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
