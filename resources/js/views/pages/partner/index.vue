<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import ErrorMessage from "../../../components/widgets/errorMessage";
import adminApi from "../../../api/adminAxios";
import Switches from "vue-switches";
import {
    required,
    minLength,
    maxLength,
    integer,
    email,
    sameAs, minValue, url,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import loader from "../../../components/loader";
import { dynamicSortString, dynamicSortNumber } from "../../../helper/tableSort";
import {formatDateOnly, formatDateTime} from "../../../helper/startDate";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";
import add_programs_and_modules_to_company from './add_programs_and_modules_to_company.vue';

/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Partner",
    meta: [{ name: "description", content: "Partner" }],
  },
  components: {
    Layout,
    PageHeader,
    Switches,
    loader,
    ErrorMessage,
    DatePicker,
    Multiselect,
    add_programs_and_modules_to_company,
  },
  data() {
    return {
      per_page: 50,
      search: "",
      debounce: {},
      partnersPagination: {},
      new_company: {
        name: "",
        name_e: "",
        id:0
      },
      partners: [],
      enabled3: true,
      isLoader: false,
      Tooltip: "",
      mouseEnter: "",
      create: {
        name: "",
        name_e: "",
        email: "",
        password: "",
        repeatPassword: "",
        mobile_no: "",
        phone_code: "",
        country_code: "",
        is_active: "active",
      },
      edit: {
        name: "",
        name_e: "",
        email: "",
        mobile_no: "",
        phone_code: "",
        country_code: "",
        is_active: "active",
      },
      createCompany: {
            name: "",
            name_e: "",
            email: "",
            partner_id: null,
            url: "",
            phone: "",
            tax_id: null,
            vat_no: null,
            cr: "",
            address: "",
            website: "",
            phone_code: "",
            country_code: "",
            is_active: 'active',
            contact_person: ''
        },
      editCompany: {
            name: "",
            name_e: "",
            email: "",
            partner_id: null,
            url: "",
            phone: "",
            tax_id: null,
            vat_no: null,
            cr: "",
            address: "",
            website: "",
            phone_code: "",
            country_code: "",
            is_active: 'active',
            contact_person: '',
        },

      setting: {
        name: true,
        name_e: true,
        is_active: true,
        mobile_no: true,
        email: true,
      },
      filterSetting: ["name", "name_e", "email", "mobile_no"],
      errors: {},
      isEye: false,
      isVaildPhone: false,
      isEyeEdit: false,
      isCheckAll: false,
      checkAll: [],
      is_disabled: false,
      current_page: 1,
      printLoading: true,
      printObj: {
            id: "printMe",
        },
      partner_id: null,
      company_id: null,
      idDelete: null,
      saveImageName: [],
      showPhoto: "./images/img-1.png",
      images: [],
      media: {},
      isDrop: false,
      is_disabledCom: false,
      is_disabledProgram: false,
      menus: [],
      modules: [],
      companies: [],
        companyModules: []
    };
  },
  validations: {
    create: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
      email: { required, email, minLength: minLength(3), maxLength: maxLength(100) },
      password: { required, minLength: minLength(8), maxLength: maxLength(16) },
      repeatPassword: { required, sameAs: sameAs("password") },
      mobile_no: { required, integer },
      is_active: { required },
    },
    edit: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
      email: { required, email, minLength: minLength(3), maxLength: maxLength(100) },
      mobile_no: { required, integer },
      is_active: { required },
    },
    createCompany: {
          name: { required, minLength: minLength(3), maxLength: maxLength(100) },
          name_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
          email: {
              required,
              email,
              minLength: minLength(3),
              maxLength: maxLength(100),
          },
          phone: { required },
          tax_id: {  minValue: minValue(0) },
          vat_no: {  minValue: minValue(0) },
          // url: { required, url, minLength: minLength(10), maxLength: maxLength(200) },
          website: {
              required,
              url,
              minLength: minLength(10),
              maxLength: maxLength(200),
          },
          cr: { minValue: minValue(0) },
          address: {
              minLength: minLength(0),
              maxLength: maxLength(200),
          },
          partner_id: { required, integer },
          is_active: { required },
          contact_person : {}
      },
    editCompany: {
        name: { required, minLength: minLength(3), maxLength: maxLength(100) },
        name_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
        email: {
            required,
            email,
            minLength: minLength(3),
            maxLength: maxLength(100),
        },
        phone: { required },
        tax_id: {  minValue: minValue(0) },
        vat_no: {  minValue: minValue(0) },
        // url: { required, url, minLength: minLength(10), maxLength: maxLength(200) },
        website: {
            required,
            url,
            minLength: minLength(10),
            maxLength: maxLength(200),
        },
        cr: { minValue: minValue(0) },
        address: {
            minLength: minLength(0),
            maxLength: maxLength(200),
        },
        partner_id: { required, integer },
        is_active: { required },
        contact_person : {}
    },

  },
  watch: {
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
        this.partners.forEach((el) => {
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
    /**
     *  get Data Partner
     */
    getData(page = 1) {
      this.isLoader = true;
      let filter = "";
      for (let i = 0; i < this.filterSetting.length; ++i) {
        filter += `columns[${i}]=${this.filterSetting[i]}&`;
      }
      adminApi
        .get(
          `/partners?page=${page}&per_page=${this.per_page}&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
          this.partners = l.data;
          this.partnersPagination = l.pagination;
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
        this.current_page <= this.partnersPagination.last_page &&
        this.current_page != this.partnersPagination.current_page &&
        this.current_page
      ) {
        this.isLoader = true;
        let filter = "";
        for (let i = 0; i < this.filterSetting.length; i++) {
          filter += `columns[${i}]=${this.filterSetting[i]}&`;
        }
        adminApi
          .get(
            `/partners?page=${this.current_page}&per_page=${this.per_page}&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
            this.partners = l.data;
            this.current_page = l.pagination.current_page;
            this.partnersPagination = l.pagination;
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
     *  delete Partner
     */
    deletePartner(id, index) {
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
              .post(`/partners/bulk-delete`, { ids: id })
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
              .delete(`/partners/${id}`)
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
      this.create = {
        name: "",
        name_e: "",
        email: "",
        password: "",
        repeatPassword: "",
        mobile_no: "",
        phone_code: "",
        country_code: "",
        is_active: "active",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.$bvModal.hide(`create`);
      this.errors = {};
      this.isVaildPhone = false;
    },
    /**
     *  hidden Modal (create)
     */
    resetModal() {
      this.create = {
        name: "",
        name_e: "",
        email: "",
        password: "",
        repeatPassword: "",
        mobile_no: "",
        phone_code: "",
        country_code: "",
        is_active: "active",
      };
      this.resetFormCom();
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.isVaildPhone = false;
      this.errors = {};
      this.is_disabled = false;
    },
    /**
     *  create Partner
     */
    resetForm() {
      this.create = {
        name: "",
        name_e: "",
        email: "",
        password: "",
        repeatPassword: "",
        mobile_no: "",
        is_active: "active",
      };
      this.resetFormCom();
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.is_disabled = false;
    },
    AddSubmit() {
        if (!this.create.name_e) {
            this.create.name_e = this.create.name;
        }
        if (!this.create.name) {
            this.create.name = this.create.name_e;
        }
      this.$v.create.$touch();

      if (this.$v.create.$invalid && !this.isVaildPhone) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};

        adminApi
          .post(`/partners`, this.create)
          .then((res) => {
            this.partner_id = res.data.data.id;
            this.is_disabled = true;
            setTimeout(() => {
                  Swal.fire({
                      icon: "success",
                      text: `${this.$t("general.Addedsuccessfully")}`,
                      showConfirmButton: false,
                      timer: 1500,
                  });
              }, 500);
            this.getData();
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
     *  edit Partner
     */
    editSubmit(id) {
        if (!this.edit.name_e) {
            this.edit.name_e = this.edit.name;
        }
        if (!this.edit.name) {
            this.edit.name = this.edit.name_e;
        }
      this.$v.edit.$touch();

      if (this.$v.edit.$invalid && !this.isVaildPhone) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        adminApi
          .put(`/partners/${id}`, this.edit)
          .then((res) => {
            this.partner_id = res.data.data.id;
            setTimeout(() => {
                  Swal.fire({
                      icon: "success",
                      text: `${this.$t("general.Editsuccessfully")}`,
                      showConfirmButton: false,
                      timer: 1500,
                  });
              }, 500);
            this.getData();
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
    resetModalEdit(id) {
      this.partner_id = id;
      let Partner = this.partners.find((e) => id == e.id);
      this.edit.name = Partner.name;
      this.edit.name_e = Partner.name_e;
      this.edit.is_active = Partner.is_active;
      this.edit.email = Partner.email;
      this.edit.mobile_no = Partner.mobile_no;
      this.isVaildPhone = false;
    },
    /**
     *  hidden Modal (edit)
     */
    resetModalHiddenEdit() {
      this.edit = {
        name: "",
        name_e: "",
        email: "",
        mobile_no: "",
        phone_code: "",
        country_code: "",
        is_active: "active",
      };
      this.companies= [];
      this.companyModules= [];
      this.errors = {};
    },
    updatePhone(e) {
      this.create.phone_code = e.countryCallingCode;
      this.create.country_code = e.countryCode;
      this.isVaildPhone = e.isValid;
    },
    updatePhoneEdit(e) {
      this.edit.phone_code = e.countryCallingCode;
      this.edit.country_code = e.countryCode;
      this.isVaildPhone = e.isValid;
    },
    /**
     *  start  dynamicSortString
     */
    sortString(value) {
      return dynamicSortString(value);
    },
    sortNumber() {
      return dynamicSortNumber(value);
    },
    checkRow(id) {
      if (!this.checkAll.includes(id)) {
        this.checkAll.push(id);
      } else {
        let index = this.checkAll.indexOf(id);
        this.checkAll.splice(index, 1);
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
          .get(`/partners/logs/${id}`)
          .then((res) => {
            let l = res.data.data;
            l.forEach((e) => {
              this.Tooltip += `Created By: ${e.causer_type}; Event: ${e.event }; Description: ${e.description} ;Created At: ${this.formatDate(e.created_at)} \n`;
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
      ExportExcel(type, fn, dl) {
          this.enabled3 = false;
          setTimeout(()=>{
              let elt = this.$refs.exportable_table;
              let wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
              if (dl){
                  XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'});
              }else {
                  XLSX.writeFile(wb, fn || (('Partner' + '.'|| 'SheetJSTableExport.') + (type || 'xlsx')));
              }
              this.enabled3 = true;
          },100);
      },
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
                          if (this.images) this.images.forEach((e) => old_media.push(e.id));
                          let new_media = [];
                          res.data.data.forEach((e) => new_media.push(e.id));

                          adminApi
                              .put(`/companies/${this.company_id}`, {
                                  old_media,
                                  media: new_media,
                              })
                              .then((res) => {
                                  this.images = res.data.data.media;
                                  this.showPhoto = this.images[this.images.length - 1].webp;
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
                                      .put(`/companies/${this.company_id}`, {
                                          old_media,
                                          media: new_media,
                                      })
                                      .then((res) => {
                                          this.images = res.data.data.media;
                                          this.showPhoto = this.images[this.images.length - 1].webp;
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
              .post(`/companies/${this.company_id}`, { old_media })
              .then((res) => {
                  this.companies[index] = res.data.data;
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
      updatePhoneCom(e) {
          this.createCompany.phone_code = e.countryCallingCode;
          this.createCompany.country_code = e.countryCode;
          this.isVaildPhone = e.isValid;
      },
      updatePhoneComEdit(e) {
          // this.editCompany.phone_code = e.countryCallingCode;
          // this.isVaildPhone = e.isValid;
      },
      updateContactPersonCom(e) {
          this.createCompany.phone_code = e.countryCallingCode;
          this.createCompany.country_code = e.countryCode;
          this.isVaildPhone = e.isValid;
      },
      updateContactPersonComEdit(e) {
          // this.editCompany.phone_code = e.countryCallingCode;
          // this.editCompany = e.isValid;
      },
      resetFormCom() {
          this.createCompany = {
              name: "",
              name_e: "",
              email: "",
              partner_id: null,
              url: "",
              phone: "",
              tax_id: null,
              vat_no: null,
              cr: "",
              address: "",
              website: "",
              phone_code: "",
              country_code: "",
              is_active: "active",
              contact_person: ''
          };
          this.company_id = null;
          this.is_disabledCom = false;
          this.$nextTick(() => {
              this.$v.$reset();
          });
          this.isVaildPhone = false;
      },
      AddSubmitCom(type = null) {
          if (!this.createCompany.name) {
              this.createCompany.name = this.createCompany.name_e;
          }
          if (!this.createCompany.name_e) {
              this.createCompany.name_e = this.createCompany.name;
          }
          this.createCompany.partner_id = this.partner_id;

          this.$v.createCompany.$touch();

          if (this.$v.createCompany.$invalid && !this.isVaildPhone) {
              return;
          } else {
              this.isLoader = true;
              this.errors = {};

              adminApi
                  .post(`/companies`, {
                      ...this.createCompany,
                      url: this.createCompany.website,
                      website: undefined,
                  })
                  .then((res) => {
                      this.is_disabledCom = true;
                      this.company_id = res.data.data.id;
                      this.new_company['id'] = res.data.data.id
                      this.new_company['name'] = this.createCompany.name
                      this.new_company['name_e'] = this.createCompany.name_e
                      setTimeout(() => {
                          Swal.fire({
                              icon: "success",
                              text: `${this.$t("general.Addedsuccessfully")}`,
                              showConfirmButton: false,
                              timer: 1500,
                          });
                      }, 500);
                      if(type == 'edit'){
                          this.getDataCompany();
                      }else {
                          this.getAllModules();
                      }
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
      editSubmitCom(id, index) {
          if (!this.editCompany.name) {
              this.editCompany.name = this.editCompany.name_e;
          }
          if (!this.editCompany.name_e) {
              this.editCompany.name_e = this.editCompany.name;
          }

          this.$v.editCompany.$touch();
          if (this.images)
              this.images.forEach((e) => {
                  this.editCompany.old_media.push(e.id);
              });
          if (this.$v.editCompany.$invalid && !this.isVaildPhone) {
              return;
          } else {
              this.isLoader = true;
              this.errors = {};
              adminApi
                  .put(`/companies/${id}`, {
                      ...this.editCompany,
                      url: this.editCompany.website,
                      website: undefined,
                  })
                  .then((res) => {
                      this.getDataCompany();
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

      async getAllModules(id) {
          await adminApi
              .get(`/project-program-modules/all-program-modules`)
              .then((res) => {
                  this.modules = res.data.data;
              })
              .catch((err) => {
                  Swal.fire({
                      icon: "error",
                      title: `${this.$t("general.Error")}`,
                      text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                  });
              });
      },



      getDataCompany() {
          this.isLoader = true;

          adminApi
              .get(
                  `/companies?partner_id=${this.partner_id}`
              )
              .then((res) => {
                  let l = res.data;
                  this.companies = l.data;
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
      resetModalComEdit(id) {
          let company = this.companies.find((e) => id == e.id);
          this.isVaildPhone = false;
          this.editCompany.name = company.name;
          this.editCompany.name_e = company.name_e;
          this.editCompany.is_active = company.is_active;
          this.editCompany.email = company.email;
          this.editCompany.address = company.address;
          this.editCompany.cr = company.cr;
          this.editCompany.partner_id = this.partner_id;
          this.editCompany.tax_id = company.tax_id;
          this.editCompany.website = company.url;
          this.editCompany.vat_no = company.vat_no;
          this.editCompany.phone = company.phone;
          this.editCompany.contact_person = company.contact_person;
          this.editCompany.country_code = company.country_code;
          this.editCompany.phone_code = company.phone_code;
          this.errors = {};
          this.images = company.media ?? [];
          if (this.images && this.images.length > 0) {
              this.showPhoto = this.images[this.images.length - 1].webp;
          } else {
              this.showPhoto = "./images/img-1.png";
          }
      },
      resetModalHiddenComEdit(id) {
          this.editCompany = {
              name: "",
              name_e: "",
              email: "",
              partner_id: null,
              url: "",
              phone: "",
              tax_id: null,
              vat_no: null,
              cr: "",
              address: "",
              website: "",
              contact_person: '',
              phone_code: "",
              country_code: "",
              is_active: "active",
              old_media: [],
          };
          this.errors = {};
      },
      getDataProgram() {
          this.isLoader = true;
          let company_ids = this.companies.map(el => el.id);
          let filter = '';
          for (let i = 0; i < company_ids.length; ++i) {
              filter += `company_ids[${i}]=${company_ids[i]}&`;
          }

          adminApi
              .get(
                  `/company-project-program-modules?${filter}`
              )
              .then((res) => {
                  let l = res.data;
                  this.companyModules = l.data;
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


      deletecompany(id, index) {
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
                          .post(`/companies/bulk-delete`, { ids: id })
                          .then((res) => {
                              this.checkAll = [];
                              this.getDataCompany();
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
                          .delete(`/companies/${id}`)
                          .then((res) => {
                              this.checkAll = [];
                              this.getDataCompany();
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
  },
};
</script>

<template>
  <Layout>
    <PageHeader />
    <div class="row no-gutters">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-between align-items-center mb-2">
              <h4 class="header-title">{{ $t("partner.partnersTable") }}</h4>
              <div class="col-xs-10 col-md-9 col-lg-7" style="font-weight: 500">
                <div class="d-inline-block" style="width: 22.2%">
                  <!-- Basic dropdown -->
                  <b-dropdown
                    variant="primary"
                    :text="$t('general.searchSetting')"
                    ref="dropdown"
                    class="btn-block setting-search"
                  >
                    <b-form-checkbox v-model="filterSetting" value="name" class="mb-1">{{
                      $t("general.Name")
                    }}</b-form-checkbox>
                    <b-form-checkbox
                      v-model="filterSetting"
                      value="name_e"
                      class="mb-1"
                      >{{ $t("general.Name_en") }}</b-form-checkbox
                    >
                    <b-form-checkbox v-model="filterSetting" value="email" class="mb-1">{{
                      $t("login.Emailaddress")
                    }}</b-form-checkbox>
                    <b-form-checkbox
                      v-model="filterSetting"
                      value="mobile_no"
                      class="mb-1"
                      >{{ $t("general.mobile_no") }}</b-form-checkbox
                    >
                  </b-dropdown>
                  <!-- Basic dropdown -->
                </div>

                <div class="d-inline-block position-relative" style="width: 77%">
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

            <div class="row justify-content-between align-items-center mb-2 px-1">
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
                  <button @click="ExportExcel('xlsx')" class="custom-btn-dowonload">
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
                    @click.prevent="deletePartner(checkAll)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <!-- end mult delete  -->
                  <!--  start one delete  -->
                  <button
                    class="custom-btn-dowonload"
                    v-if="checkAll.length == 1"
                    @click.prevent="deletePartner(checkAll[0])"
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
                    :html="`${$t('general.setting')} <i class='fe-settings'></i>`"
                    ref="dropdown"
                    class="dropdown-custom-ali"
                  >
                    <b-form-checkbox v-model="setting.name" class="mb-1"
                      >{{ $t("general.Name") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.name_e" class="mb-1">
                      {{ $t("general.Name_en") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.mobile_no" class="mb-1">
                      {{ $t("general.mobile_no") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.email" class="mb-1">
                      {{ $t("login.Emailaddress") }}
                    </b-form-checkbox>
                    <b-form-checkbox v-model="setting.is_active" class="mb-1">
                      {{ $t("general.Status") }}
                    </b-form-checkbox>
                    <div class="d-flex justify-content-end">
                      <a href="javascript:void(0)" class="btn btn-primary btn-sm"
                        >Apply</a
                      >
                    </div>
                  </b-dropdown>
                  <!-- Basic dropdown -->
                  <!-- start Pagination -->
                  <div class="d-inline-flex align-items-center pagination-custom">
                    <div class="d-inline-block" style="font-size: 15px">
                      {{ partnersPagination.from }}-{{ partnersPagination.to }} /
                      {{ partnersPagination.total }}
                    </div>
                    <div class="d-inline-block">
                      <a
                        href="javascript:void(0)"
                        :style="{
                          'pointer-events':
                            partnersPagination.current_page == 1 ? 'none' : '',
                        }"
                        @click.prevent="getData(partnersPagination.current_page - 1)"
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
                            partnersPagination.last_page ==
                            partnersPagination.current_page
                              ? 'none'
                              : '',
                        }"
                        @click.prevent="getData(partnersPagination.current_page + 1)"
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
              :title="$t('partner.addpartner')"
              title-class="font-18"
              dialog-class="modal-full-width"
              body-class="p-4"
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
                    :class="['font-weight-bold px-2', !is_disabled ? '' : 'mx-2']"
                  >
                    {{ $t("general.AddNewRecord") }}
                  </b-button>
                  <!-- Emulate built in modal footer ok and cancel button actions -->
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
                    variant="danger"
                    type="button"
                    @click.prevent="$bvModal.hide(`create`)"
                  >
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
                                      <input
                                          type="text"
                                          class="form-control arabicInput"
                                          v-model.trim="$v.create.name.$model"
                                          :class="{
                          'is-invalid': $v.create.name.$error || errors.name,
                          'is-valid': !$v.create.name.$invalid && !errors.name,
                        }"
                                          id="field-1"
                                      />
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
                                      <div v-if="!$v.create.name.alphaArabic" class="invalid-feedback">
                                          {{ $t("general.alphaArabic") }}
                                      </div>
                                      <template v-if="errors.name">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.name"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6 direction-ltr" dir="ltr">
                                  <div class="form-group">
                                      <label for="field-2" class="control-label">
                                          {{ $t("general.Name_en") }}
                                          <span class="text-danger">*</span>
                                      </label>
                                      <input
                                          type="text"
                                          class="form-control englishInput"
                                          v-model.trim="$v.create.name_e.$model"
                                          :class="{
                          'is-invalid': $v.create.name_e.$error || errors.name_e,
                          'is-valid': !$v.create.name_e.$invalid && !errors.name_e,
                        }"
                                          id="field-2"
                                      />
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
                                      <div v-if="!$v.create.name_e.alphaEnglish" class="invalid-feedback">
                                          {{ $t("general.alphaEnglish") }}
                                      </div>
                                      <template v-if="errors.name_e">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.name_e"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="field-3" class="control-label">
                                          {{ $t("login.Emailaddress") }}
                                          <span class="text-danger">*</span>
                                      </label>
                                      <input
                                          type="email"
                                          class="form-control"
                                          v-model.trim="$v.create.email.$model"
                                          :class="{
                          'is-invalid': $v.create.email.$error || errors.email,
                          'is-valid': !$v.create.email.$invalid && !errors.email,
                        }"
                                          id="field-3"
                                      />
                                      <div v-if="!$v.create.email.email" class="invalid-feedback">
                                          {{ $t("general.PleaseEnterValidEmail") }}
                                      </div>
                                      <div v-if="!$v.create.email.minLength" class="invalid-feedback">
                                          {{ $t("general.Itmustbeatleast") }}
                                          {{ $v.create.email.$params.minLength.min }}
                                          {{ $t("general.letters") }}
                                      </div>
                                      <div v-if="!$v.create.email.maxLength" class="invalid-feedback">
                                          {{ $t("general.Itmustbeatmost") }}
                                          {{ $v.create.email.$params.maxLength.max }}
                                          {{ $t("general.letters") }}
                                      </div>
                                      <template v-if="errors.email">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.email"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <label class="control-label">
                                          {{ $t("general.mobile_no") }}
                                          <span class="text-danger">*</span>
                                      </label>
                                      <VuePhoneNumberInput
                                          v-model="$v.create.mobile_no.$model"
                                          default-country-code="KW"
                                          valid-color="#28a745"
                                          error-color="#dc3545"
                                          :preferred-countries="['FR', 'EG', 'DE']"
                                          @update="updatePhone"
                                      />
                                      <template v-if="errors.mobile_no">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.mobile_no"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <div class="d-flex justify-content-between align-items-center">
                                          <label for="field-5" class="control-label">
                                              {{ $t("login.Password") }}
                                              <span class="text-danger">*</span>
                                          </label>
                                          <i
                                              :class="[
                            'fas custom-eye',
                            !isEye ? 'fa-eye-slash' : 'fas fa-eye active',
                          ]"
                                              @click="isEye = !isEye"
                                          ></i>
                                      </div>
                                      <input
                                          :type="!isEye ? 'password' : 'text'"
                                          class="form-control"
                                          v-model.trim="$v.create.password.$model"
                                          :class="{
                          'is-invalid': $v.create.password.$error || errors.password,
                          'is-valid': !$v.create.password.$invalid && !errors.password,
                        }"
                                          id="field-5"
                                      />
                                      <div v-if="!$v.create.password.minLength" class="invalid-feedback">
                                          {{ $t("general.Itmustbeatleast") }}
                                          {{ $v.create.password.$params.minLength.min }}
                                          {{ $t("general.letters") }}
                                      </div>
                                      <div v-if="!$v.create.password.maxLength" class="invalid-feedback">
                                          {{ $t("general.Itmustbeatmost") }}
                                          {{ $v.create.password.$params.maxLength.max }}
                                          {{ $t("general.letters") }}
                                      </div>
                                      <template v-if="errors.password">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.password"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="field-6" class="control-label">
                                          {{ $t("general.repeatPassword") }}
                                          <span class="text-danger">*</span>
                                      </label>
                                      <input
                                          type="password"
                                          class="form-control"
                                          v-model.trim="$v.create.repeatPassword.$model"
                                          :class="{
                          'is-invalid':
                            $v.create.repeatPassword.$error || errors.repeatPassword,
                          'is-valid':
                            !$v.create.repeatPassword.$invalid && !errors.repeatPassword,
                        }"
                                          id="field-6"
                                      />
                                      <div
                                          v-if="!$v.create.repeatPassword.sameAs"
                                          class="invalid-feedback"
                                      >
                                          {{ $t("general.samaAs") }}
                                      </div>
                                      <template v-if="errors.repeatPassword">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.repeatPassword"
                                              :key="index"
                                          >{{ errorMessage }}</ErrorMessage
                                          >
                                      </template>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group">
                                      <label class="mr-2 mb-2">
                                          {{ $t("general.Status") }}
                                          <span class="text-danger">*</span>
                                      </label>
                                      <b-form-group>
                                          <b-form-radio
                                              class="d-inline-block"
                                              v-model="$v.create.is_active.$model"
                                              name="some-radios-dd"
                                              value="active"
                                          >{{ $t("general.Active") }}</b-form-radio
                                          >
                                          <b-form-radio
                                              class="d-inline-block m-1"
                                              v-model="$v.create.is_active.$model"
                                              name="some-radios-dd"
                                              value="inactive"
                                          >{{ $t("general.Inactive") }}</b-form-radio
                                          >
                                      </b-form-group>
                                      <template v-if="errors.is_active">
                                          <ErrorMessage
                                              v-for="(errorMessage, index) in errors.is_active"
                                              :key="index"
                                          >{{ errorMessage }}
                                          </ErrorMessage>
                                      </template>
                                  </div>
                              </div>
                          </div>
                      </b-tab>
                      <b-tab :title="$t('company.company')" :disabled="!partner_id">
                          <div class="mt-1 d-flex justify-content-end">
                              <b-button
                                  variant="success"
                                  :disabled="!is_disabledCom"
                                  @click.prevent="resetFormCom"
                                  type="button"
                                  :class="[
                          'font-weight-bold px-2',
                          is_disabledCom ? 'mx-2' : '',
                        ]"
                              >
                                  {{ $t("general.AddNewRecord") }}
                              </b-button>
                              <template v-if="!is_disabledCom">
                                  <b-button
                                      variant="success"
                                      type="button"
                                      class="mx-1 font-weight-bold px-3"
                                      v-if="!isLoader"
                                      @click.prevent="AddSubmitCom"
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
                          </div>
                          <div class="row justify-content-between">
                              <div class="col-7">
                                  <div class="row">
                                      <div class="col-md-6 direction" dir="rtl">
                                          <div class="form-group">
                                              <label for="field-1" class="control-label">
                                                  {{ $t("general.Name") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="text"
                                                  class="form-control arabicInput"
                                                  v-model.trim="$v.createCompany.name.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.name.$error || errors.name,
                                    'is-valid':
                                      !$v.createCompany.name.$invalid && !errors.name,
                                  }"
                                              />
                                              <div
                                                  v-if="!$v.createCompany.name.minLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatleast") }}
                                                  {{ $v.createCompany.name.$params.minLength.min }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.name.maxLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatmost") }}
                                                  {{ $v.createCompany.name.$params.maxLength.max }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <template v-if="errors.name">
                                                  <ErrorMessage
                                                      v-for="(errorMessage, index) in errors.name"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6 direction-ltr" dir="ltr">
                                          <div class="form-group">
                                              <label for="field-2" class="control-label">
                                                  {{ $t("general.Name_en") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="text"
                                                  class="form-control englishInput"
                                                  v-model.trim="$v.createCompany.name_e.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.name_e.$error || errors.name_e,
                                    'is-valid':
                                      !$v.createCompany.name_e.$invalid &&
                                      !errors.name_e,
                                  }"
                                                  id="field-2"
                                              />
                                              <div
                                                  v-if="!$v.createCompany.name_e.minLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatleast") }}
                                                  {{ $v.createCompany.name_e.$params.minLength.min }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.name_e.maxLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatmost") }}
                                                  {{ $v.createCompany.name_e.$params.maxLength.max }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <template v-if="errors.name_e">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.name_e"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="field-3" class="control-label">
                                                  {{ $t("login.Emailaddress") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="email"
                                                  class="form-control"
                                                  v-model.trim="$v.createCompany.email.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.email.$error || errors.email,
                                    'is-valid':
                                      !$v.createCompany.email.$invalid &&
                                      !errors.email,
                                  }"
                                                  id="field-3"
                                              />
                                              <div
                                                  v-if="!$v.createCompany.email.email"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.PleaseEnterValidEmail") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.email.minLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatleast") }}
                                                  {{ $v.createCompany.email.$params.minLength.min }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.email.maxLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatmost") }}
                                                  {{ $v.createCompany.email.$params.maxLength.max }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <template v-if="errors.email">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.email"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="field-12" class="control-label">
                                                  {{ $t("general.address") }}
                                              </label>
                                              <input
                                                  type="text"
                                                  class="form-control"
                                                  v-model.number="$v.createCompany.address.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.address.$error ||
                                      errors.address,
                                    'is-valid':
                                      !$v.createCompany.address.$invalid &&
                                      !errors.address,
                                  }"
                                                  id="field-12"
                                              />
                                              <div
                                                  v-if="!$v.createCompany.address.minLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatleast") }}
                                                  {{ $v.createCompany.address.$params.minLength.min }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.address.maxLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatmost") }}
                                                  {{ $v.createCompany.address.$params.maxLength.max }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <template v-if="errors.address">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.address"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label class="control-label">
                                                  {{ $t("general.mobile_no") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <VuePhoneNumberInput
                                                  v-model="$v.createCompany.phone.$model"
                                                  default-country-code="KW"
                                                  valid-color="#28a745"
                                                  error-color="#dc3545"
                                                  :preferred-countries="['FR', 'EG', 'DE']"
                                                  @update="updatePhoneCom"
                                              />
                                              <template v-if="errors.phone">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.phone"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label class="control-label">
                                                  {{ $t("general.contact_person") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <VuePhoneNumberInput
                                                  v-model="$v.createCompany.contact_person.$model"
                                                  default-country-code="KW"
                                                  valid-color="#28a745"
                                                  error-color="#dc3545"
                                                  :preferred-countries="['FR', 'EG', 'DE']"
                                                  @update="updateContactPersonCom"
                                              />
                                              <template v-if="errors.contact_person">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.contact_person"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="field-11" class="control-label">
                                                  {{ $t("general.website") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="url"
                                                  class="form-control"
                                                  v-model.number="$v.createCompany.website.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.website.$error ||
                                      errors.website,
                                    'is-valid':
                                      !$v.createCompany.website.$invalid &&
                                      !errors.website,
                                  }"
                                                  id="field-11"
                                              />
                                              <div
                                                  v-if="!$v.createCompany.website.minLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatleast") }}
                                                  {{ $v.createCompany.website.$params.minLength.min }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.website.maxLength"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeatmost") }}
                                                  {{ $v.createCompany.website.$params.maxLength.max }}
                                                  {{ $t("general.letters") }}
                                              </div>
                                              <div
                                                  v-if="!$v.createCompany.website.url"
                                                  class="invalid-feedback"
                                              >
                                                  {{ $t("general.Itmustbeyourlink") }}
                                              </div>
                                              <template v-if="errors.website">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.website"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-4">
                                  <div class="row">
                                      <div class="col-md-6" style="height: 67.6px"></div>
                                      <div class="col-md-6" style="height: 67.6px"></div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="field-5" class="control-label">
                                                  {{ $t("general.taxnumber") }}
                                              </label>
                                              <input
                                                  min="0"
                                                  type="number"
                                                  class="form-control"
                                                  v-model.number="$v.createCompany.tax_id.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.tax_id.$error || errors.tax_id,
                                    'is-valid':
                                      !$v.createCompany.tax_id.$invalid &&
                                      !errors.tax_id,
                                  }"
                                                  id="field-5"
                                              />
                                              <template v-if="errors.tax_id">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.tax_id"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="field-8" class="control-label">
                                                  {{ $t("general.CommercialRecord") }}
                                              </label>
                                              <input
                                                  type="text"
                                                  class="form-control"
                                                  v-model.trim="$v.createCompany.cr.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.cr.$error || errors.cr,
                                    'is-valid':
                                      !$v.createCompany.cr.$invalid && !errors.cr,
                                  }"
                                                  id="field-8"
                                              />
                                              <template v-if="errors.cr">
                                                  <ErrorMessage
                                                      v-for="(errorMessage, index) in errors.cr"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <!-- <div class="col-md-6">
                                        <div class="form-group">
                                          <label for="field-10" class="control-label">
                                            {{ $t("general.companysystempath") }}
                                            <span class="text-danger">*</span>
                                          </label>
                                          <input
                                            type="url"
                                            class="form-control"
                                            v-model.number="$v.createCompany.url.$model"
                                            :class="{
                                              'is-invalid': $v.createCompany.url.$error || errors.url,
                                              'is-valid': !$v.createCompany.url.$invalid && !errors.url,
                                            }"
                                            id="field-10"
                                          />
                                          <div
                                            v-if="!$v.createCompany.url.minLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatleast") }}
                                            {{ $v.createCompany.url.$params.minLength.min }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div
                                            v-if="!$v.createCompany.url.maxLength"
                                            class="invalid-feedback"
                                          >
                                            {{ $t("general.Itmustbeatmost") }}
                                            {{ $v.createCompany.url.$params.maxLength.max }}
                                            {{ $t("general.letters") }}
                                          </div>
                                          <div v-if="!$v.createCompany.url.url" class="invalid-feedback">
                                            {{ $t("general.Itmustbeyourlink") }}
                                          </div>
                                          <template v-if="errors.url">
                                            <ErrorMessage
                                              v-for="(errorMessage, index) in errors.url"
                                              :key="index"
                                              >{{ errorMessage }}</ErrorMessage
                                            >
                                          </template>
                                        </div>
                                      </div> -->
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label
                                                  for="field-6"
                                                  class="control-label"
                                                  style="font-size: 10px"
                                              >
                                                  {{
                                                      $t("general.Valueaddedregistrationnumber")
                                                  }}
                                              </label>
                                              <input
                                                  type="number"
                                                  class="form-control"
                                                  v-model.number="$v.createCompany.vat_no.$model"
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.vat_no.$error || errors.vat_no,
                                    'is-valid':
                                      !$v.createCompany.vat_no.$invalid &&
                                      !errors.vat_no,
                                  }"
                                                  id="field-6"
                                              />
                                              <template v-if="errors.vat_no">
                                                  <ErrorMessage
                                                      v-for="(
                                      errorMessage, index
                                    ) in errors.vat_no"
                                                      :key="index"
                                                  >{{ errorMessage }}</ErrorMessage
                                                  >
                                              </template>
                                          </div>
                                      </div>
                                      <div class="col-md-12">
                                          <div class="form-group">
                                              <label class="mr-2">
                                                  {{ $t("general.Status") }}
                                                  <span class="text-danger">*</span>
                                              </label>
                                              <b-form-group
                                                  :class="{
                                    'is-invalid':
                                      $v.createCompany.is_active.$error ||
                                      errors.is_active,
                                    'is-valid':
                                      !$v.createCompany.is_active.$invalid &&
                                      !errors.is_active,
                                  }"
                                              >
                                                  <b-form-radio
                                                      class="d-inline-block"
                                                      v-model="$v.createCompany.is_active.$model"
                                                      name="some-radio-pp"
                                                      value="active"
                                                  >{{ $t("general.Active") }}</b-form-radio
                                                  >
                                                  <b-form-radio
                                                      class="d-inline-block m-1"
                                                      v-model="$v.createCompany.is_active.$model"
                                                      name="some-radio-pp"
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
                                                  >{{ errorMessage }}
                                                  </ErrorMessage>
                                              </template>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </b-tab>
                      <b-tab :disabled="!company_id" :title="$t('company.LogoFileUpload')">
                          <div class="row">
                              <input
                                  accept="image/png, image/gif, image/jpeg, image/jpg"
                                  type="file"
                                  id="uploadImageCreate"
                                  @change.prevent="onImageChanged"
                                  class="input-file-upload position-absolute d-none"
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
                      <b-tab :title="$t('general.program')" :disabled="!company_id">
                        <add_programs_and_modules_to_company :companies="[new_company]"/>
                      </b-tab>
                  </b-tabs>
              </form>
            </b-modal>
            <!--  /create   -->

            <!-- start .table-responsive-->
            <div class="table-responsive mb-3 custom-table-theme position-relative">
              <!--       start loader       -->
              <loader size="large" v-if="isLoader" />
              <!--       end loader       -->

              <table class="table table-borderless table-centered m-0" ref="exportable_table" id="printMe">
                <thead>
                  <tr>
                    <th class="do-not-print" scope="col" style="width: 0" v-if="enabled3">
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
                            @click="partners.sort(sortString('name'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="partners.sort(sortString('-name'))"
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
                            @click="partners.sort(sortString('name_e'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="partners.sort(sortString('-name_e'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.email">
                      <div class="d-flex justify-content-center">
                        <span>{{ $t("login.Emailaddress") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="partners.sort(sortString('email'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="partners.sort(sortString('-email'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.mobile_no">
                      <div class="d-flex justify-content-center">
                        <span> {{ $t("general.mobile_no") }}</span>
                        <div class="arrow-sort">
                          <i
                            class="fas fa-arrow-up"
                            @click="partners.sort(sortNumber('mobile_no'))"
                          ></i>
                          <i
                            class="fas fa-arrow-down"
                            @click="partners.sort(sortNumber('-mobile_no'))"
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th v-if="setting.is_active">
                      {{ $t("general.Status") }}
                    </th>
                    <th class="do-not-print" v-if="enabled3">{{ $t("general.Action") }}</th>
                    <th class="do-not-print" v-if="enabled3"><i class="fas fa-ellipsis-v"></i></th>
                  </tr>
                </thead>
                <tbody v-if="partners.length > 0">
                  <tr
                    v-for="(data, index) in partners"
                    :key="data.id"
                    class="body-tr-custom"
                    @click.capture="checkRow(data.id)"
                    @dblclick.prevent="$bvModal.show(`modal-edit-${data.id}`)"
                  >
                    <td class="do-not-print" v-if="enabled3">
                      <div class="form-check custom-control" style="min-height: 1.9em">
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
                    <td v-if="setting.name_e">{{ data.name_e }}</td>
                    <td v-if="setting.email">{{ data.email }}</td>
                    <td v-if="setting.mobile_no">{{ data.mobile_no }}</td>
                    <td v-if="setting.is_active">
                      <span
                        :class="[
                          data.is_active == 'active'
                            ? 'bg-soft-success text-success'
                            : 'bg-soft-danger  text-danger',
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
                    <td class="do-not-print" v-if="enabled3">
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
                              <i class="mdi mdi-square-edit-outline text-info"></i>
                            </div>
                          </a>
                          <a
                            class="dropdown-item text-black"
                            href="#"
                            @click.prevent="deletePartner(data.id)"
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
                        :title="$t('partner.editpartner')"
                        title-class="font-18"
                        body-class="p-4"
                        dialog-class="modal-full-width"
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
                              type="button"
                              class="mx-1"
                              v-if="!isLoader"
                              @click.prevent="editSubmit(data.id)"
                            >
                              {{ $t("general.Add") }}
                            </b-button>

                            <b-button variant="success" class="mx-1" disabled v-else>
                              <b-spinner small></b-spinner>
                              <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>

                            <b-button
                              variant="danger"
                              type="button"
                              @click.prevent="$bvModal.hide(`modal-edit-${data.id}`)"
                            >
                              {{ $t("general.Cancel") }}
                            </b-button>
                          </div>
                          <b-tabs nav-class="nav-tabs nav-bordered">
                                <b-tab :title="$t('general.DataEntry')" active>
                                    <div class="row">
                                        <div class="col-md-6 direction" dir="rtl">
                                            <div class="form-group">
                                                <label for="edit-1" class="control-label">
                                                    {{ $t("general.Name") }}
                                                    <span class="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control arabicInput"
                                                    v-model.trim="$v.edit.name.$model"
                                                    :class="{
                                    'is-invalid': $v.edit.name.$error || errors.name,
                                    'is-valid': !$v.edit.name.$invalid && !errors.name,
                                  }"
                                                    id="edit-1"
                                                />
                                                <div
                                                    v-if="!$v.edit.name.minLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatleast") }}
                                                    {{ $v.edit.name.$params.minLength.min }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.name.maxLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatmost") }}
                                                    {{ $v.edit.name.$params.maxLength.max }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.name.alphaArabic"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.alphaArabic") }}
                                                </div>
                                                <template v-if="errors.name">
                                                    <ErrorMessage
                                                        v-for="(errorMessage, index) in errors.name"
                                                        :key="index"
                                                    >{{ errorMessage }}</ErrorMessage
                                                    >
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-md-6 direction-ltr" dir="ltr">
                                            <div class="form-group">
                                                <label for="edit-2" class="control-label">
                                                    {{ $t("general.Name_en") }}
                                                    <span class="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control englishInput"
                                                    v-model.trim="$v.edit.name_e.$model"
                                                    :class="{
                                    'is-invalid': $v.edit.name_e.$error || errors.name_e,
                                    'is-valid':
                                      !$v.edit.name_e.$invalid && !errors.name_e,
                                  }"
                                                    id="edit-2"
                                                />
                                                <div
                                                    v-if="!$v.edit.name_e.minLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatleast") }}
                                                    {{ $v.edit.name_e.$params.minLength.min }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.name_e.maxLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatmost") }}
                                                    {{ $v.edit.name_e.$params.maxLength.max }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.name_e.alphaEnglish"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.alphaEnglish") }}
                                                </div>
                                                <template v-if="errors.name_e">
                                                    <ErrorMessage
                                                        v-for="(errorMessage, index) in errors.name_e"
                                                        :key="index"
                                                    >{{ errorMessage }}</ErrorMessage
                                                    >
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="edit-3" class="control-label">
                                                    {{ $t("login.Emailaddress") }}
                                                    <span class="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    v-model.trim="$v.edit.email.$model"
                                                    :class="{
                                    'is-invalid': $v.edit.email.$error || errors.email,
                                    'is-valid': !$v.edit.email.$invalid && !errors.email,
                                  }"
                                                    id="edit-3"
                                                />
                                                <div v-if="!$v.edit.email.email" class="invalid-feedback">
                                                    {{ $t("general.PleaseEnterValidEmail") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.email.minLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatleast") }}
                                                    {{ $v.edit.email.$params.minLength.min }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <div
                                                    v-if="!$v.edit.email.maxLength"
                                                    class="invalid-feedback"
                                                >
                                                    {{ $t("general.Itmustbeatmost") }}
                                                    {{ $v.edit.email.$params.maxLength.max }}
                                                    {{ $t("general.letters") }}
                                                </div>
                                                <template v-if="errors.email">
                                                    <ErrorMessage
                                                        v-for="(errorMessage, index) in errors.email"
                                                        :key="index"
                                                    >{{ errorMessage }}</ErrorMessage
                                                    >
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    {{ $t("general.mobile_no") }}
                                                    <span class="text-danger">*</span>
                                                </label>
                                                <VuePhoneNumberInput
                                                    v-model="$v.edit.mobile_no.$model"
                                                    default-country-code="KW"
                                                    valid-color="#28a745"
                                                    error-color="#dc3545"
                                                    :preferred-countries="['FR', 'EG', 'DE']"
                                                    @update="updatePhoneEdit"
                                                />
                                                <template v-if="errors.mobile_no">
                                                    <ErrorMessage
                                                        v-for="(errorMessage, index) in errors.mobile_no"
                                                        :key="index"
                                                    >{{ errorMessage }}</ErrorMessage
                                                    >
                                                </template>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mr-2 mb-2">
                                                    {{ $t("general.Status") }}
                                                    <span class="text-danger">*</span>
                                                </label>
                                                <b-form-group
                                                    :class="{
                                    'is-invalid':
                                      $v.edit.is_active.$error || errors.is_active,
                                    'is-valid':
                                      !$v.edit.is_active.$invalid && !errors.is_active,
                                  }"
                                                >
                                                    <b-form-radio
                                                        class="d-inline-block"
                                                        v-model="$v.edit.is_active.$model"
                                                        name="some-radios"
                                                        value="active"
                                                    >{{ $t("general.Active") }}</b-form-radio
                                                    >
                                                    <b-form-radio
                                                        class="d-inline-block m-1"
                                                        v-model="$v.edit.is_active.$model"
                                                        name="some-radios"
                                                        value="inactive"
                                                    >{{ $t("general.Inactive") }}</b-form-radio
                                                    >
                                                </b-form-group>
                                                <template v-if="errors.is_active">
                                                    <ErrorMessage
                                                        v-for="(errorMessage, index) in errors.is_active"
                                                        :key="index"
                                                    >{{ errorMessage }}
                                                    </ErrorMessage>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab :title="$t('company.company')" @click="getDataCompany">
                                    <div
                                        class="row justify-content-between align-items-center mb-2 px-1"
                                    >
                                        <div class="col-md-3 d-flex align-items-center mb-1 mb-xl-0">
                                            <b-button
                                                v-b-modal.create_company
                                                variant="primary"
                                                class="btn-sm mx-1 font-weight-bold"
                                            >
                                                {{ $t("general.Create") }}
                                                <i class="fas fa-plus"></i>
                                            </b-button>
                                        </div>
                                        <div
                                            class="col-xs-10 col-md-9 col-lg-7 d-flex align-items-center justify-content-end"
                                        ></div>
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
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortString('name'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortString('-name'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span>{{ $t("general.Name_en") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortString('name_e'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortString('-name_e'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span>{{ $t("login.Emailaddress") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortString('email'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortString('-email'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    {{ $t("partner.partner") }}
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span>{{ $t("general.mobile_no") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortNumber('phone'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortNumber('-phone'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                        <span>{{
                                $t("general.Valueaddedregistrationnumber")
                            }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortNumber('vat_no'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortNumber('-vat_no'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span>{{ $t("general.CommercialRecord") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortNumber('cr'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortNumber('-cr'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span>{{ $t("general.taxnumber") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortNumber('tax_id'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortNumber('-tax_id'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div class="d-flex justify-content-center">
                                                        <span> {{ $t("general.address") }}</span>
                                                        <div class="arrow-sort">
                                                            <i
                                                                class="fas fa-arrow-up"
                                                                @click="companies.sort(sortString('address'))"
                                                            ></i>
                                                            <i
                                                                class="fas fa-arrow-down"
                                                                @click="companies.sort(sortString('-address'))"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>{{ $t("general.website") }}</th>
                                                <!-- <th v-if="setting.url">{{ $t("general.url") }}</th> -->
                                                <th>{{ $t("general.Status") }}</th>
                                                <th class="do-not-print" v-if="enabled3">
                                                    {{ $t("general.Action") }}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody v-if="companies.length > 0">
                                            <tr
                                                @click.capture="checkRow(data.id)"
                                                v-for="(comp, index) in companies"
                                                :key="comp.id"
                                                class="body-tr-custom"
                                            >
                                                <td>
                                                    {{ comp.name }}
                                                </td>
                                                <td>
                                                    {{ comp.name_e }}
                                                </td>
                                                <td>
                                                    {{ comp.email }}
                                                </td>
                                                <td>
                                                    {{
                                                        $i18n.locale == "ar"
                                                            ? comp.partner.name
                                                            : comp.partner.name_e
                                                    }}
                                                </td>
                                                <td>
                                                    {{ comp.phone }}
                                                </td>
                                                <td>
                                                    {{ comp.vat_no }}
                                                </td>
                                                <td>
                                                    {{ data.cr }}
                                                </td>
                                                <td>
                                                    {{ comp.tax_id }}
                                                </td>
                                                <td>
                                                    {{ comp.address }}
                                                </td>
                                                <td>
                                                    {{ comp.url }}
                                                </td>
                                                <!-- <td v-if="setting.url">
                                                  {{ data.url }}
                                                </td> -->
                                                <td>
                                                      <span
                                                          :class="[
                                                          comp.is_active == 'active'
                                                            ? 'bg-soft-success text-success'
                                                            : 'bg-soft-danger  text-danger',
                                                          'badge',
                                                        ]"
                                                      >
                                                        {{
                                                              comp.is_active == "active"
                                                                  ? `${$t("general.Active")}`
                                                                  : `${$t("general.Inactive")}`
                                                          }}
                                                      </span>
                                                </td>
                                                <td class="do-not-print" v-if="enabled3">
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
                                                                @click="$bvModal.show(`modal-edit-company-${comp.id}`)"
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
                                                                @click.prevent="deletecompany(comp.id)"
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
                                                        :id="`modal-edit-company-${comp.id}`"
                                                        :title="$t('company.editcompany')"
                                                        title-class="font-18"
                                                        dialog-class="modal-full-width"
                                                        body-class="paddingUnset"
                                                        :hide-footer="true"
                                                        @show="resetModalComEdit(comp.id)"
                                                        @hidden="resetModalHiddenComEdit(comp.id)"
                                                    >
                                                        <form>
                                                            <div class="card-body">
                                                                <div class="mt-1 d-flex justify-content-end">
                                                                    <!-- Emulate built in modal footer ok and cancel button actions -->

                                                                    <b-button
                                                                        variant="success"
                                                                        type="button"
                                                                        class="mx-1 font-weight-bold px-3"
                                                                        v-if="!isLoader"
                                                                        @click.prevent="editSubmitCom(comp.id, index)"
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

                                                                    <b-button
                                                                        variant="danger"
                                                                        class="font-weight-bold"
                                                                        type="button"
                                                                        @click.prevent="
                                  $bvModal.hide(`modal-edit-company-${comp.id}`)
                                "
                                                                    >
                                                                        {{ $t("general.Cancel") }}
                                                                    </b-button>
                                                                </div>
                                                            </div>
                                                            <b-tabs nav-class="nav-tabs nav-bordered">
                                                                <b-tab :title="$t('general.DataEntry')" active>
                                                                    <div class="row justify-content-between">
                                                                        <div class="col-7">
                                                                            <div class="row">
                                                                                <div class="col-md-6 direction" dir="rtl">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="edit-1"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("general.Name") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control arabicInput"
                                                                                            v-model.trim="$v.editCompany.name.$model"
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.name.$error ||
                                              errors.name,
                                            'is-valid':
                                              !$v.editCompany.name.$invalid &&
                                              !errors.name,
                                          }"
                                                                                            id="edit-1"
                                                                                        />
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name.minLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatleast") }}
                                                                                            {{
                                                                                                $v.editCompany.name.$params.minLength.min
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name.maxLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatmost") }}
                                                                                            {{
                                                                                                $v.editCompany.name.$params.maxLength.max
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name.alphaArabic"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.alphaArabic") }}
                                                                                        </div>
                                                                                        <template v-if="errors.name">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.name"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6 direction-ltr" dir="ltr">
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
                                                                                            v-model.trim="$v.editCompany.name_e.$model"
                                                                                            :class="{
                                                                                                'is-invalid':
                                                                                                  $v.editCompany.name_e.$error ||
                                                                                                  errors.name_e,
                                                                                                'is-valid':
                                                                                                  !$v.editCompany.name_e.$invalid &&
                                                                                                  !errors.name_e,
                                                                                              }"
                                                                                            id="editCompany-2"
                                                                                        />
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name_e.minLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatleast") }}
                                                                                            {{
                                                                                                $v.editCompany.name_e.$params.minLength.min
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name_e.maxLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatmost") }}
                                                                                            {{
                                                                                                $v.editCompany.name_e.$params.maxLength.max
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.name_e.alphaEnglish"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.alphaEnglish") }}
                                                                                        </div>
                                                                                        <template v-if="errors.name_e">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.name_e"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="editCompany-3"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("login.Emailaddress") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <input
                                                                                            type="email"
                                                                                            class="form-control"
                                                                                            v-model.trim="$v.editCompany.email.$model"
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.email.$error ||
                                              errors.email,
                                            'is-valid':
                                              !$v.editCompany.email.$invalid &&
                                              !errors.email,
                                          }"
                                                                                            id="editCompany-3"
                                                                                        />
                                                                                        <div
                                                                                            v-if="!$v.editCompany.email.email"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{
                                                                                                $t("general.PleaseEnterValidEmail")
                                                                                            }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.email.minLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatleast") }}
                                                                                            {{
                                                                                                $v.editCompany.email.$params.minLength.min
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.email.maxLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatmost") }}
                                                                                            {{
                                                                                                $v.editCompany.email.$params.maxLength.max
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <template v-if="errors.email">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.email"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="field-12"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("general.address") }}
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            v-model.number="
                                            $v.editCompany.address.$model
                                          "
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.address.$error ||
                                              errors.address,
                                            'is-valid':
                                              !$v.editCompany.address.$invalid &&
                                              !errors.address,
                                          }"
                                                                                            id="editCompany-12"
                                                                                        />
                                                                                        <div
                                                                                            v-if="!$v.editCompany.address.minLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatleast") }}
                                                                                            {{
                                                                                                $v.editCompany.address.$params.minLength
                                                                                                    .min
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.address.maxLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatmost") }}
                                                                                            {{
                                                                                                $v.editCompany.address.$params.maxLength
                                                                                                    .max
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <template v-if="errors.address">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.address"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label class="control-label">
                                                                                            {{ $t("general.mobile_no") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <VuePhoneNumberInput
                                                                                            v-model="$v.editCompany.phone.$model"
                                                                                            :default-country-code="
                                            editCompany.country_code
                                          "
                                                                                            valid-color="#28a745"
                                                                                            default-country-code="KW"
                                                                                            error-color="#dc3545"
                                                                                            :preferred-countries="[
                                            'FR',
                                            'EG',
                                            'DE',
                                          ]"
                                                                                            @update="updatePhoneComEdit"
                                                                                        />
                                                                                        <template v-if="errors.phone">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.phone"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label class="control-label">
                                                                                            {{ $t("general.contact_person") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <VuePhoneNumberInput
                                                                                            v-model="$v.editCompany.contact_person.$model"
                                                                                            default-country-code="KW"
                                                                                            valid-color="#28a745"
                                                                                            error-color="#dc3545"
                                                                                            :preferred-countries="['FR', 'EG', 'DE']"
                                                                                            @update="updateContactPersonComEdit"
                                                                                        />
                                                                                        <template v-if="errors.contact_person">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                      errorMessage, index
                                    ) in errors.contact_person"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="editCompany-11"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("general.website") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <input
                                                                                            type="url"
                                                                                            class="form-control"
                                                                                            v-model.number="
                                            $v.editCompany.website.$model
                                          "
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.website.$error ||
                                              errors.website,
                                            'is-valid':
                                              !$v.editCompany.website.$invalid &&
                                              !errors.website,
                                          }"
                                                                                            id="editCompany-11"
                                                                                        />
                                                                                        <div
                                                                                            v-if="!$v.editCompany.website.minLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatleast") }}
                                                                                            {{
                                                                                                $v.editCompany.website.$params.minLength
                                                                                                    .min
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.website.maxLength"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeatmost") }}
                                                                                            {{
                                                                                                $v.editCompany.website.$params.maxLength
                                                                                                    .max
                                                                                            }}
                                                                                            {{ $t("general.letters") }}
                                                                                        </div>
                                                                                        <div
                                                                                            v-if="!$v.editCompany.website.url"
                                                                                            class="invalid-feedback"
                                                                                        >
                                                                                            {{ $t("general.Itmustbeyourlink") }}
                                                                                        </div>
                                                                                        <template v-if="errors.website">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.website"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-4">
                                                                            <div class="row">
                                                                                <div
                                                                                    class="col-md-6"
                                                                                    style="height: 67.6px"
                                                                                ></div>
                                                                                <div
                                                                                    class="col-md-6"
                                                                                    style="height: 67.6px"
                                                                                ></div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="editCompany-5"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("general.taxnumber") }}
                                                                                        </label>
                                                                                        <input
                                                                                            type="number"
                                                                                            class="form-control"
                                                                                            v-model.number="$v.editCompany.tax_id.$model"
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.tax_id.$error ||
                                              errors.tax_id,
                                            'is-valid':
                                              !$v.editCompany.tax_id.$invalid &&
                                              !errors.tax_id,
                                          }"
                                                                                            id="editCompany-5"
                                                                                        />
                                                                                        <template v-if="errors.tax_id">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.tax_id"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="field-8"
                                                                                            class="control-label"
                                                                                        >
                                                                                            {{ $t("general.CommercialRecord") }}
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            v-model.trim="$v.editCompany.cr.$model"
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.cr.$error || errors.cr,
                                            'is-valid':
                                              !$v.editCompany.cr.$invalid &&
                                              !errors.cr,
                                          }"
                                                                                            id="editCompany-8"
                                                                                        />
                                                                                        <template v-if="errors.cr">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.cr"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <!-- <div class="col-md-6">
                                                                                  <div class="form-group">
                                                                                    <label for="editCompany-10" class="control-label">
                                                                                      {{ $t("general.companysystempath") }}
                                                                                      <span class="text-danger">*</span>
                                                                                    </label>
                                                                                    <input
                                                                                      type="url"
                                                                                      class="form-control"
                                                                                      v-model.number="$v.editCompany.url.$model"
                                                                                      :class="{
                                                                                        'is-invalid':
                                                                                          $v.editCompany.url.$error || errors.url,
                                                                                        'is-valid':
                                                                                          !$v.editCompany.url.$invalid && !errors.url,
                                                                                      }"
                                                                                      id="editCompany-10"
                                                                                    />
                                                                                    <div
                                                                                      v-if="!$v.editCompany.url.minLength"
                                                                                      class="invalid-feedback"
                                                                                    >
                                                                                      {{ $t("general.Itmustbeatleast") }}
                                                                                      {{ $v.editCompany.url.$params.minLength.min }}
                                                                                      {{ $t("general.letters") }}
                                                                                    </div>
                                                                                    <div
                                                                                      v-if="!$v.editCompany.url.maxLength"
                                                                                      class="invalid-feedback"
                                                                                    >
                                                                                      {{ $t("general.Itmustbeatmost") }}
                                                                                      {{ $v.editCompany.url.$params.maxLength.max }}
                                                                                      {{ $t("general.letters") }}
                                                                                    </div>
                                                                                    <div
                                                                                      v-if="!$v.editCompany.url.url"
                                                                                      class="invalid-feedback"
                                                                                    >
                                                                                      {{ $t("general.Itmustbeyourlink") }}
                                                                                    </div>
                                                                                    <template v-if="errors.url">
                                                                                      <ErrorMessage
                                                                                        v-for="(errorMessage, index) in errors.url"
                                                                                        :key="index"
                                                                                        >{{ errorMessage }}</ErrorMessage
                                                                                      >
                                                                                    </template>
                                                                                  </div>
                                                                                </div> -->
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                        <label
                                                                                            for="field-6"
                                                                                            class="control-label"
                                                                                            style="font-size: 10px"
                                                                                        >
                                                                                            {{
                                                                                                $t(
                                                                                                    "general.Valueaddedregistrationnumber"
                                                                                                )
                                                                                            }}
                                                                                        </label>
                                                                                        <input
                                                                                            type="number"
                                                                                            class="form-control"
                                                                                            v-model.number="$v.editCompany.vat_no.$model"
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.vat_no.$error ||
                                              errors.vat_no,
                                            'is-valid':
                                              !$v.editCompany.vat_no.$invalid &&
                                              !errors.vat_no,
                                          }"
                                                                                            id="editCompany-6"
                                                                                        />
                                                                                        <template v-if="errors.vat_no">
                                                                                            <ErrorMessage
                                                                                                v-for="(
                                              errorMessage, index
                                            ) in errors.vat_no"
                                                                                                :key="index"
                                                                                            >{{ errorMessage }}</ErrorMessage
                                                                                            >
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-12">
                                                                                    <div class="form-group">
                                                                                        <label class="mr-2">
                                                                                            {{ $t("general.Status") }}
                                                                                            <span class="text-danger">*</span>
                                                                                        </label>
                                                                                        <b-form-group
                                                                                            :class="{
                                            'is-invalid':
                                              $v.editCompany.is_active.$error ||
                                              errors.is_active,
                                            'is-valid':
                                              !$v.editCompany.is_active.$invalid &&
                                              !errors.is_active,
                                          }"
                                                                                        >
                                                                                            <b-form-radio
                                                                                                class="d-inline-block"
                                                                                                v-model="$v.editCompany.is_active.$model"
                                                                                                name="some-radios-com1"
                                                                                                value="active"
                                                                                            >{{
                                                                                                    $t("general.Active")
                                                                                                }}</b-form-radio
                                                                                            >
                                                                                            <b-form-radio
                                                                                                class="d-inline-block m-1"
                                                                                                v-model="$v.editCompany.is_active.$model"
                                                                                                name="some-radios-com1"
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
                                                                                            >{{ errorMessage }}
                                                                                            </ErrorMessage>
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </b-tab>
                                                                <b-tab :title="$t('company.LogoFileUpload')">
                                                                    <div class="row">
                                                                        <input
                                                                            accept="image/png, image/gif, image/jpeg, image/jpg"
                                                                            type="file"
                                                                            id="uploadImageEdit"
                                                                            @change.prevent="onImageChanged"
                                                                            class="input-file-upload position-absolute d-none"
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
                                                    'btn-danger dropzone-close',
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
                                                        </form>
                                                    </b-modal>
                                                    <!--  /edit   -->
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
                                </b-tab>
                                <b-tab :title="$t('general.program')" :disabled="!(companies.length > 0)">
                                    <add_programs_and_modules_to_company :companies="companies"/>
                                </b-tab>
                          </b-tabs>
                        </form>
                      </b-modal>
                      <!--  /edit   -->
                    </td>
                    <td class="do-not-print" v-if="enabled3">
                        <b-button class="btn"   @mouseover="log(data.id)" @mousemove="log(data.id)" :id="'tooltip-button-'+data.id" :variant="$i18n.locale == 'en' ? 'left' : 'right'"
                        > <i class="fe-info" style="font-size: 22px"></i></b-button
                        >
                        <b-tooltip :target="'tooltip-button-'+data.id" :placement="$i18n.locale == 'en' ? 'left' : 'right'"
                        >{{Tooltip}}</b-tooltip>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <th class="text-center" colspan="7">
                      {{ $t("general.notDataFound") }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

              <!--  create company  -->
              <b-modal
                  id="create_company"
                  :title="$t('company.addcompany')"
                  title-class="font-18"
                  dialog-class="modal-full-width"
                  body-class="paddingUnset"
                  :hide-footer="true"
                  @show="resetFormCom"
                  @hidden="resetFormCom"
              >
                  <form>
                      <div class="card">
                          <div class="card-body">
                              <div class="mt-1 d-flex justify-content-end">
                                  <!-- Emulate built in modal footer ok and cancel button actions -->
                                  <b-button
                                      variant="success"
                                      :disabled="!is_disabledCom"
                                      @click.prevent="resetFormCom"
                                      type="button"
                                      :class="[
                          'font-weight-bold px-2',
                          is_disabledCom ? 'mx-2' : '',
                        ]"
                                  >
                                      {{ $t("general.AddNewRecord") }}
                                  </b-button>

                                  <template v-if="!is_disabledCom">
                                      <b-button
                                          variant="success"
                                          type="button"
                                          class="mx-1 font-weight-bold px-3"
                                          v-if="!isLoader"
                                          @click.prevent="AddSubmitCom('edit')"
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
                                      @click.prevent="$bvModal.hide(`create_company`)"
                                  >
                                      {{ $t("general.Cancel") }}
                                  </b-button>
                              </div>
                          </div>
                          <b-tabs nav-class="nav-tabs nav-bordered">
                              <b-tab :title="$t('general.DataEntry')" active>
                                  <div class="row justify-content-between">
                                      <div class="col-7">
                                          <div class="row">
                                              <div class="col-md-6 direction" dir="rtl">
                                                  <div class="form-group">
                                                      <label for="field-1" class="control-label">
                                                          {{ $t("general.Name") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <input
                                                          type="text"
                                                          class="form-control arabicInput"
                                                          v-model.trim="$v.createCompany.name.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.name.$error || errors.name,
                                    'is-valid':
                                      !$v.createCompany.name.$invalid && !errors.name,
                                  }"
                                                      />
                                                      <div
                                                          v-if="!$v.createCompany.name.minLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatleast") }}
                                                          {{ $v.createCompany.name.$params.minLength.min }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.name.maxLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatmost") }}
                                                          {{ $v.createCompany.name.$params.maxLength.max }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <template v-if="errors.name">
                                                          <ErrorMessage
                                                              v-for="(errorMessage, index) in errors.name"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6 direction-ltr" dir="ltr">
                                                  <div class="form-group">
                                                      <label for="field-2" class="control-label">
                                                          {{ $t("general.Name_en") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <input
                                                          type="text"
                                                          class="form-control englishInput"
                                                          v-model.trim="$v.createCompany.name_e.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.name_e.$error || errors.name_e,
                                    'is-valid':
                                      !$v.createCompany.name_e.$invalid &&
                                      !errors.name_e,
                                  }"
                                                          id="field-2"
                                                      />
                                                      <div
                                                          v-if="!$v.createCompany.name_e.minLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatleast") }}
                                                          {{ $v.createCompany.name_e.$params.minLength.min }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.name_e.maxLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatmost") }}
                                                          {{ $v.createCompany.name_e.$params.maxLength.max }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <template v-if="errors.name_e">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.name_e"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label for="field-3" class="control-label">
                                                          {{ $t("login.Emailaddress") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <input
                                                          type="email"
                                                          class="form-control"
                                                          v-model.trim="$v.createCompany.email.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.email.$error || errors.email,
                                    'is-valid':
                                      !$v.createCompany.email.$invalid &&
                                      !errors.email,
                                  }"
                                                          id="field-3"
                                                      />
                                                      <div
                                                          v-if="!$v.createCompany.email.email"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.PleaseEnterValidEmail") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.email.minLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatleast") }}
                                                          {{ $v.createCompany.email.$params.minLength.min }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.email.maxLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatmost") }}
                                                          {{ $v.createCompany.email.$params.maxLength.max }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <template v-if="errors.email">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.email"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label for="field-12" class="control-label">
                                                          {{ $t("general.address") }}
                                                      </label>
                                                      <input
                                                          type="text"
                                                          class="form-control"
                                                          v-model.number="$v.createCompany.address.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.address.$error ||
                                      errors.address,
                                    'is-valid':
                                      !$v.createCompany.address.$invalid &&
                                      !errors.address,
                                  }"
                                                          id="field-12"
                                                      />
                                                      <div
                                                          v-if="!$v.createCompany.address.minLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatleast") }}
                                                          {{ $v.createCompany.address.$params.minLength.min }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.address.maxLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatmost") }}
                                                          {{ $v.createCompany.address.$params.maxLength.max }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <template v-if="errors.address">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.address"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label class="control-label">
                                                          {{ $t("general.mobile_no") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <VuePhoneNumberInput
                                                          v-model="$v.createCompany.phone.$model"
                                                          default-country-code="KW"
                                                          valid-color="#28a745"
                                                          error-color="#dc3545"
                                                          :preferred-countries="['FR', 'EG', 'DE']"
                                                          @update="updatePhoneCom"
                                                      />
                                                      <template v-if="errors.phone">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.phone"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label class="control-label">
                                                          {{ $t("general.contact_person") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <VuePhoneNumberInput
                                                          v-model="$v.createCompany.contact_person.$model"
                                                          default-country-code="KW"
                                                          valid-color="#28a745"
                                                          error-color="#dc3545"
                                                          :preferred-countries="['FR', 'EG', 'DE']"
                                                          @update="updateContactPersonCom"
                                                      />
                                                      <template v-if="errors.contact_person">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.contact_person"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label for="field-11" class="control-label">
                                                          {{ $t("general.website") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <input
                                                          type="url"
                                                          class="form-control"
                                                          v-model.number="$v.createCompany.website.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.website.$error ||
                                      errors.website,
                                    'is-valid':
                                      !$v.createCompany.website.$invalid &&
                                      !errors.website,
                                  }"
                                                          id="field-11"
                                                      />
                                                      <div
                                                          v-if="!$v.createCompany.website.minLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatleast") }}
                                                          {{ $v.createCompany.website.$params.minLength.min }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.website.maxLength"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeatmost") }}
                                                          {{ $v.createCompany.website.$params.maxLength.max }}
                                                          {{ $t("general.letters") }}
                                                      </div>
                                                      <div
                                                          v-if="!$v.createCompany.website.url"
                                                          class="invalid-feedback"
                                                      >
                                                          {{ $t("general.Itmustbeyourlink") }}
                                                      </div>
                                                      <template v-if="errors.website">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.website"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-4">
                                          <div class="row">
                                              <div class="col-md-6" style="height: 67.6px"></div>
                                              <div class="col-md-6" style="height: 67.6px"></div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label for="field-5" class="control-label">
                                                          {{ $t("general.taxnumber") }}
                                                      </label>
                                                      <input
                                                          min="0"
                                                          type="number"
                                                          class="form-control"
                                                          v-model.number="$v.createCompany.tax_id.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.tax_id.$error || errors.tax_id,
                                    'is-valid':
                                      !$v.createCompany.tax_id.$invalid &&
                                      !errors.tax_id,
                                  }"
                                                          id="field-5"
                                                      />
                                                      <template v-if="errors.tax_id">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.tax_id"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label for="field-8" class="control-label">
                                                          {{ $t("general.CommercialRecord") }}
                                                      </label>
                                                      <input
                                                          type="text"
                                                          class="form-control"
                                                          v-model.trim="$v.createCompany.cr.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.cr.$error || errors.cr,
                                    'is-valid':
                                      !$v.createCompany.cr.$invalid && !errors.cr,
                                  }"
                                                          id="field-8"
                                                      />
                                                      <template v-if="errors.cr">
                                                          <ErrorMessage
                                                              v-for="(errorMessage, index) in errors.cr"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>

                                              <div class="col-md-6">
                                                  <div class="form-group">
                                                      <label
                                                          for="field-6"
                                                          class="control-label"
                                                          style="font-size: 10px"
                                                      >
                                                          {{
                                                              $t("general.Valueaddedregistrationnumber")
                                                          }}
                                                      </label>
                                                      <input
                                                          type="number"
                                                          class="form-control"
                                                          v-model.number="$v.createCompany.vat_no.$model"
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.vat_no.$error || errors.vat_no,
                                    'is-valid':
                                      !$v.createCompany.vat_no.$invalid &&
                                      !errors.vat_no,
                                  }"
                                                          id="field-6"
                                                      />
                                                      <template v-if="errors.vat_no">
                                                          <ErrorMessage
                                                              v-for="(
                                      errorMessage, index
                                    ) in errors.vat_no"
                                                              :key="index"
                                                          >{{ errorMessage }}</ErrorMessage
                                                          >
                                                      </template>
                                                  </div>
                                              </div>
                                              <div class="col-md-12">
                                                  <div class="form-group">
                                                      <label class="mr-2">
                                                          {{ $t("general.Status") }}
                                                          <span class="text-danger">*</span>
                                                      </label>
                                                      <b-form-group
                                                          :class="{
                                    'is-invalid':
                                      $v.createCompany.is_active.$error ||
                                      errors.is_active,
                                    'is-valid':
                                      !$v.createCompany.is_active.$invalid &&
                                      !errors.is_active,
                                  }"
                                                      >
                                                          <b-form-radio
                                                              class="d-inline-block"
                                                              v-model="$v.createCompany.is_active.$model"
                                                              name="some-radio-pp"
                                                              value="active"
                                                          >{{ $t("general.Active") }}</b-form-radio
                                                          >
                                                          <b-form-radio
                                                              class="d-inline-block m-1"
                                                              v-model="$v.createCompany.is_active.$model"
                                                              name="some-radio-pp"
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
                                                          >{{ errorMessage }}
                                                          </ErrorMessage>
                                                      </template>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </b-tab>
                              <b-tab
                                  :disabled="!company_id"
                                  :title="$t('company.LogoFileUpload')"
                              >
                                  <div class="row">
                                      <input
                                          accept="image/png, image/gif, image/jpeg, image/jpg"
                                          type="file"
                                          id="uploadImageCreate"
                                          @change.prevent="onImageChanged"
                                          class="input-file-upload position-absolute d-none"
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
              <!--  /create  company -->

            <!-- end .table-responsive-->
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style>
@media print {
    .do-not-print{
       display: none;
    }
    .arrow-sort{
        display: none;
    }
    .bg-soft-success{
        background-color:unset;
        color: #000000 !important;
        border: unset;
    }
    .bg-soft-danger{
        background-color:unset;
        color: #000000 !important;
        border: unset;
    }
}
.tooltip-inner {
    max-width: 750px !important;
    background-color: #eed900;
    color:black;
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
</style>



