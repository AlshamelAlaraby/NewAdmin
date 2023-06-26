<script>
import ErrorMessage from "../../components/widgets/errorMessage";
import Partner from "../../components/create/partner";
import adminApi from "../../api/adminAxios";
import {
  required,
  minLength,
  maxLength,
  integer,
  email,
  sameAs,
  url,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import loader from "../../components/loader";
import Multiselect from "vue-multiselect";
import { formatDateOnly } from "../../helper/startDate";

/**
 * Advanced Table component
 */

// start validation image/png

export default {
  components: {
    loader,
    ErrorMessage,
    Multiselect,
    Partner
  },
  data() {
    return {
      partners: [],
      enabled3: true,
      isLoader: false,
      create: {
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
        is_active: null,
      },
      errors: {},
      isCheckAll: false,
      checkAll: [],
      images: [],
      media: {},
      company_id: null,
      isVaildPhone: false,
      saveImageName: [],
      showPhoto: "./images/img-1.png",
      idDelete: null,
      printLoading: true,
      printObj: {
        id: "printMe",
      },
    };
  },
  validations: {
    create: {
      name: { required, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
      email: { required, email, minLength: minLength(3), maxLength: maxLength(100) },
      phone: { required, integer },
      tax_id: { required, minLength: minLength(1), maxLength: maxLength(10), integer },
      vat_no: { required, minLength: minLength(1), maxLength: maxLength(10), integer },
      url: { required, url, minLength: minLength(10), maxLength: maxLength(200) },
      website: { required, url, minLength: minLength(10), maxLength: maxLength(200) },
      cr: { required, minLength: minLength(3), maxLength: maxLength(100) },
      address: { required, minLength: minLength(10), maxLength: maxLength(200) },
      partner_id: { required, integer },
      is_active: { required },
    },
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
        if (ew == 32) return true;
        if (48 <= ew && ew <= 57) return false;
        if (65 <= ew && ew <= 90) return false;
        if (97 <= ew && ew <= 122) return false;
        return true;
      });
    });
  },
  methods: {
    showPartnerModal(){
      if (this.create.partner_id == 0) {
        this.$bvModal.show("partner-create");
        setTimeout(() => {
          this.create.partner_id = null;
        }, 400);
      }
    },
    formatDate(value) {
      return formatDateOnly(value);
    },

    /**
     *  reset Modal (create)
     */
    resetModalHidden() {
      this.create = {
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
        is_active: null,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      this.isDrop = false;
      this.image = "";
      this.dropDownSenders = [];
      this.$bvModal.hide(`company-create`);
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      await this.getPartner();
      this.create = {
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
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      this.company_id = null;
    },
    /**
     *  create company
     */
    resetForm() {
      this.create = {
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
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.company_id = null;
      this.isVaildPhone = false;
    },
    AddSubmit() {
      if (!this.create.name) {
        this.create.name = this.create.name_e;
      }
      if (!this.create.name_e) {
        this.create.name_e = this.create.name;
      }

      this.$v.create.$touch();

      if (this.$v.create.$invalid && !this.isVaildPhone) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        if (!this.create.name) {
          this.create.name = this.create.name_e;
        }
        if (!this.create.name_e) {
          this.create.name_e = this.create.name;
        }

        adminApi
          .post(`/companies`, this.create)
          .then((res) => {
            this.company_id = res.data.data.id;
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
     *  get parent
     */
    async getPartner() {
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
    updatePhone(e) {
      this.create.phone_code = e.countryCallingCode;
      this.create.country_code = e.countryCode;
      this.isVaildPhone = e.isValid;
    },
    /**
     *  start Image ceate
     */
    changeCompanyPhoto() {
      document.getElementById("uploadImageCreateCompany").click();
    },
    onImageCompanyChanged(e) {
      const file = e.target.files[0];
      this.addCompanyImage(file);
    },
    addCompanyImage(file) {
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
                .post(`/companies/${this.company_id}`, { old_media, media: new_media })
                .then((res) => {
                  this.images = res.data.data.media;
                  this.showPhoto = this.images[this.images.length - 1].webp;
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
                    .post(`/companies/${this.company_id}`, {
                      old_media,
                      media: new_media,
                    })
                    .then((res) => {
                      this.images = res.data.data.media;
                      this.showPhoto = this.images[this.images.length - 1].webp;
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
  },
};
</script>

<template>
  <div>
    <Partner @created="getPartner" />
    <!--  create   -->
    <b-modal
      id="company-create"
      :title="$t('company.addcompany')"
      title-class="font-18"
      dialog-class="modal-full-width"
      body-class="paddingUnset"
      :hide-footer="true"
      @show="resetModal"
      @hidden="resetModalHidden"
    >
      <form @submit.stop.prevent="AddSubmit">
        <div class="card">
          <div class="card-body">
            <div class="mt-1 d-flex justify-content-end">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button
                variant="success"
                :disabled="!company_id"
                @click.prevent="resetForm"
                type="button"
                :class="['font-weight-bold px-2', company_id ? 'mx-2' : '']"
              >
                {{ $t("general.AddNewRecord") }}
              </b-button>

              <template v-if="!company_id">
                <b-button
                  variant="success"
                  type="button"
                  class="mx-1 font-weight-bold px-3"
                  v-if="!isLoader"
                  @click.prevent="AddSubmit"
                >
                  {{ $t("general.Save") }}
                </b-button>

                <b-button variant="success" class="mx-1" disabled v-else>
                  <b-spinner small></b-spinner>
                  <span class="sr-only">{{ $t("login.Loading") }}...</span>
                </b-button>
              </template>

              <b-button
                variant="danger"
                class="font-weight-bold"
                type="button"
                @click.prevent="resetModalHidden"
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
                    <div class="col-md-6">
                      <div class="form-group position-relative">
                        <label class="control-label">
                          {{ $t("partner.partner") }}
                          <span class="text-danger">*</span>
                        </label>

                        <multiselect
                        @input="showPartnerModal"
                          v-model="create.partner_id"
                          :options="partners.map((type) => type.id)"
                          :custom-label="
                            (opt) =>
                              $i18n.locale
                                ? partners.find((x) => x.id == opt).name
                                : partners.find((x) => x.id == opt).name_e
                          "
                        >
                        </multiselect>

                        <div
                          v-if="!$v.create.partner_id.integer"
                          class="invalid-feedback"
                        >
                          {{ $t("general.fieldIsInteger") }}
                        </div>
                        <template v-if="errors.partner_id">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.partner_id"
                            :key="index"
                            >{{ errorMessage }}</ErrorMessage
                          >
                        </template>
                      </div>
                    </div>
                    <div class="col-md-6"></div>
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
                          v-model="$v.create.phone.$model"
                          default-country-code="EG"
                          valid-color="#28a745"
                          error-color="#dc3545"
                          :preferred-countries="['FR', 'EG', 'DE']"
                          @update="updatePhone"
                        />
                        <template v-if="errors.phone">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.phone"
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
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.number="$v.create.address.$model"
                          :class="{
                            'is-invalid': $v.create.address.$error || errors.address,
                            'is-valid': !$v.create.address.$invalid && !errors.address,
                          }"
                          id="field-12"
                        />
                        <div v-if="!$v.create.address.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.address.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.address.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.address.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
                        <template v-if="errors.address">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.address"
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
                          v-model.number="$v.create.website.$model"
                          :class="{
                            'is-invalid': $v.create.website.$error || errors.website,
                            'is-valid': !$v.create.website.$invalid && !errors.website,
                          }"
                          id="field-11"
                        />
                        <div v-if="!$v.create.website.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.website.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.website.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.website.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.website.url" class="invalid-feedback">
                          {{ $t("general.Itmustbeyourlink") }}
                        </div>
                        <template v-if="errors.website">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.website"
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
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="$v.create.tax_id.$model"
                          :class="{
                            'is-invalid': $v.create.tax_id.$error || errors.tax_id,
                            'is-valid': !$v.create.tax_id.$invalid && !errors.tax_id,
                          }"
                          id="field-5"
                        />
                        <div v-if="!$v.create.tax_id.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.tax_id.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.tax_id.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.tax_id.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.tax_id.integer" class="invalid-feedback">
                          {{ $t("general.fieldIsInteger") }}
                        </div>
                        <template v-if="errors.tax_id">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.tax_id"
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
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="$v.create.cr.$model"
                          :class="{
                            'is-invalid': $v.create.cr.$error || errors.cr,
                            'is-valid': !$v.create.cr.$invalid && !errors.cr,
                          }"
                          id="field-8"
                        />
                        <div v-if="!$v.create.cr.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.cr.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.cr.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.cr.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
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
                        <label for="field-10" class="control-label">
                          {{ $t("general.companysystempath") }}
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="url"
                          class="form-control"
                          v-model.number="$v.create.url.$model"
                          :class="{
                            'is-invalid': $v.create.url.$error || errors.url,
                            'is-valid': !$v.create.url.$invalid && !errors.url,
                          }"
                          id="field-10"
                        />
                        <div v-if="!$v.create.url.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.url.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.url.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.url.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.url.url" class="invalid-feedback">
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
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          for="field-6"
                          class="control-label"
                          style="font-size: 10px"
                        >
                          {{ $t("general.Valueaddedregistrationnumber") }}
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="$v.create.vat_no.$model"
                          :class="{
                            'is-invalid': $v.create.vat_no.$error || errors.vat_no,
                            'is-valid': !$v.create.vat_no.$invalid && !errors.vat_no,
                          }"
                          id="field-6"
                        />
                        <div v-if="!$v.create.vat_no.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.vat_no.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.vat_no.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.vat_no.$params.maxLength.max }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.vat_no.integer" class="invalid-feedback">
                          {{ $t("general.fieldIsInteger") }}
                        </div>
                        <template v-if="errors.vat_no">
                          <ErrorMessage
                            v-for="(errorMessage, index) in errors.vat_no"
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
                            'is-invalid': $v.create.is_active.$error || errors.is_active,
                            'is-valid':
                              !$v.create.is_active.$invalid && !errors.is_active,
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
                            v-for="(errorMessage, index) in errors.is_active"
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
                  id="uploadImageCreateCompany"
                  @change.prevent="onImageCompanyChanged"
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
                          :class="['dropzone-previews col-4 position-relative mb-2']"
                          v-for="(photo, index) in images"
                          :key="photo.id"
                        >
                          <div
                            :class="[
                              'card mb-0 shadow-none border',
                              images.length - 1 == index ? 'bg-primary' : '',
                            ]"
                          >
                            <div class="p-2">
                              <div class="row align-items-center">
                                <div class="col-auto" @click="showPhoto = photo.webp">
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
                                    $i18n.locale == 'ar' ? 'dropzone-close-rtl' : '',
                                  ]"
                                  data-dz-remove
                                  @click.prevent="deleteImageCreate(photo.id, index)"
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
                        @click="changeCompanyPhoto"
                        variant="success"
                        type="button"
                        class="mx-1 font-weight-bold px-3"
                        v-if="!isLoader"
                      >
                        {{ $t("general.Add") }}
                      </b-button>
                      <b-button variant="success" class="mx-1" disabled v-else>
                        <b-spinner small></b-spinner>
                        <span class="sr-only">{{ $t("login.Loading") }}...</span>
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
  </div>
</template>

<style>
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
