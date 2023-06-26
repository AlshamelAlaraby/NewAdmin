<script>
import ErrorMessage from "../../components/widgets/errorMessage";
import adminApi from "../../api/adminAxios";
import Switches from "vue-switches";
import {
  required,
  minLength,
  maxLength,
  integer,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import loader from "../../components/loader";
import { formatDateOnly } from "../../helper/startDate";

/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Partner",
    meta: [{ name: "description", content: "Partner" }],
  },
  components: {
    Switches,
    loader,
    ErrorMessage,
  },
  data() {
    return {
      enabled3: true,
      isLoader: false,
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
      this.$bvModal.hide(`partner-create`);
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
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.is_disabled = false;
    },
    AddSubmit() {
      this.$v.create.$touch();

      if (this.$v.create.$invalid && !this.isVaildPhone) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        if (!this.create.name_e) {
          this.create.name_e = this.create.name;
        }
        if (!this.create.name) {
          this.create.name = this.create.name_e;
        }

        adminApi
          .post(`/partners`, this.create)
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
    },
    updatePhone(e) {
      this.create.phone_code = e.countryCallingCode;
      this.create.country_code = e.countryCode;
      this.isVaildPhone = e.isValid;
    },
    formatDate(value) {
      return formatDateOnly(value);
    },
  },
};
</script>

<template>
  <!--  create   -->
  <b-modal
    id="partner-create"
    :title="$t('partner.addpartner')"
    title-class="font-18"
    size="lg"
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

        <b-button variant="danger" type="button" @click.prevent="$bvModal.hide(`partner-create`)">
          {{ $t("general.Cancel") }}
        </b-button>
      </div>
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
              <ErrorMessage v-for="(errorMessage, index) in errors.name" :key="index">{{
                errorMessage
              }}</ErrorMessage>
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
              <ErrorMessage v-for="(errorMessage, index) in errors.name_e" :key="index">{{
                errorMessage
              }}</ErrorMessage>
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
              <ErrorMessage v-for="(errorMessage, index) in errors.email" :key="index">{{
                errorMessage
              }}</ErrorMessage>
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
              default-country-code="EG"
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
                :class="['fas custom-eye', !isEye ? 'fa-eye-slash' : 'fas fa-eye active']"
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
                'is-invalid': $v.create.repeatPassword.$error || errors.repeatPassword,
                'is-valid': !$v.create.repeatPassword.$invalid && !errors.repeatPassword,
              }"
              id="field-6"
            />
            <div v-if="!$v.create.repeatPassword.sameAs" class="invalid-feedback">
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
            <b-form-group
              :class="{
                'is-invalid': $v.create.is_active.$error || errors.is_active,
                'is-valid': !$v.create.is_active.$invalid && !errors.is_active,
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
              <ErrorMessage v-for="(errorMessage, index) in errors.is_active" :key="index"
                >{{ errorMessage }}
              </ErrorMessage>
            </template>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
  <!--  /create   -->
</template>

<style scoped>
@media print {
  .do-not-print {
    display: none;
  }
  .arrow-sort {
    display: none;
  }
}
</style>
