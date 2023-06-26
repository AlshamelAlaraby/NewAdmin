<script>
import adminApi from "../../api/adminAxios";
import Switches from "vue-switches";
import { required, minLength, maxLength, integer } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/widgets/errorMessage";
import loader from "../../components/loader";
import Multiselect from "vue-multiselect";
import { formatDateOnly } from "../../helper/startDate";

/**
 * Advanced Table component
 */
export default {
  components: {
    Switches,
    ErrorMessage,
    loader,
    Multiselect,
  },
  data() {
    return {
      screens: [],
      buttons: [],
      serials: [],
      enabled3: true,
      isLoader: false,
      screen_id: null,
      documents: [],
      screenDocuments: [],
      screenButtons: [],
      Tooltip: "",
      mouseEnter: "",
      create: {
        name: "",
        name_e: "",
        title: "",
        title_e: "",
        serial_id: "",
        search: "",
      },
      errors: {},
      english: "",
      isCheckAll: false,
      is_disabled: false,
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
      title: { required, minLength: minLength(3), maxLength: maxLength(100) },
      title_e: { required, minLength: minLength(3), maxLength: maxLength(100) },
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
    formatDate(value) {
      return formatDateOnly(value);
    },
    addDocument(id) {
      this.isLoader = true;
      adminApi
        .post(`/screenDocumentType/add`, {
          screen_id: this.screen_id,
          documentType_id: id,
        })
        .then((res) => {
          this.isLoader = false;
          this.getScreenDocumentTypes();
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
          if (err.response.status == 422) {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.ExistBefore")}`,
            });
            this.isLoader = false;
            return;
          }
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    deleteDocument(id) {
      this.isLoader = true;
      adminApi
        .delete(`/screenDocumentType/remove/${this.screen_id}/${id}`)
        .then((res) => {
          this.isLoader = false;
          this.getScreenDocumentTypes();
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              text: `${this.$t("general.DeletedSuccessfully")}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }, 500);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getScreenDocumentTypes() {
      await adminApi
        .get(`/screens/screen-documents/${this.screen_id}`)
        .then((res) => {
          this.screenDocuments = res.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    addButton(id) {
      this.isLoader = true;
      adminApi
        .post(`/screen-button`, {
          screen_id: this.screen_id,
          button_id: id,
        })
        .then((res) => {
          this.isLoader = false;
          this.getScreenButtons();
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
          if (err.response.status == 422) {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.ExistBefore")}`,
            });
            this.isLoader = false;
            return;
          }
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    deleteButton(id) {
      this.isLoader = true;
      adminApi
        .delete(`/screen-button/remove/${this.screen_id}/${id}`)
        .then((res) => {
          this.isLoader = false;
          this.getScreenButtons();
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              text: `${this.$t("general.DeletedSuccessfully")}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }, 500);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getScreenButtons() {
      await adminApi
        .get(`/screens/screen-buttons/${this.screen_id}`)
        .then((res) => {
          this.screenButtons = res.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    resetModalHidden() {
      this.create = { name: "", name_e: "", title: "", title_e: "", serial_id: "" };
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.errors = {};
      this.serials = [];
      this.documents = [];
      this.screenDocuments = [];
      this.buttons = [];
      this.screenButtons = [];

      this.screen_id = null;
    },
    /**
     *  hidden Modal (create)
     */
    async resetModal() {
      await this.getParent();
      await this.getDocuments();
      await this.getButtons();
      this.create = { name: "", name_e: "", title: "", title_e: "", serial_id: "" };
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
      this.create = { name: "", name_e: "", title: "", title_e: "", serial_id: "" };
      this.is_disabled = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.screen_id = null;
    },
    AddSubmit() {
      if (!this.create.name) {
        this.create.name = this.create.name_e;
      }
      if (!this.create.name_e) {
        this.create.name_e = this.create.name;
      }
      if (!this.create.title) {
        this.create.title = this.create.title_e;
      }
      if (!this.create.title_e) {
        this.create.title_e = this.create.title;
      }

      this.$v.create.$touch();

      if (this.$v.create.$invalid) {
        return;
      } else {
        this.isLoader = true;
        this.errors = {};
        this.is_disabled = false;
        adminApi
          .post(`/screens`, this.create)
          .then((res) => {
            this.$emit("created");
            this.is_disabled = true;
            this.screen_id = res.data.data.id;
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
    async getParent() {
      await adminApi
        .get(`/serials`)
        .then((res) => {
          this.serials = res.data.data;
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
     *  get parent
     */
    async getDocuments() {
      await adminApi
        .get(`/document-type`)
        .then((res) => {
          this.documents = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    async getButtons() {
      await adminApi
        .get(`/buttons`)
        .then((res) => {
          this.buttons = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
  },
};
</script>
<template>
  <!--  create   -->
  <b-modal
    id="screen-create"
    :title="$t('general.addScreen')"
    title-class="font-18"
    body-class="paddingUnset"
    dialog-class="modal-full-width"
    :hide-footer="true"
    size="lg"
    @show="resetModal"
    @hidden="resetModalHidden"
  >
    <form>
      <div class="card">
        <div class="card-body">
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
              @click.prevent="$bvModal.hide(`screen-create`)"
            >
              {{ $t("general.Cancel") }}
            </b-button>
          </div>
          <b-tabs nav-class="nav-tabs nav-bordered">
            <b-tab :title="$t('general.DataEntry')" active>
              <div class="row">
                <div class="col-8">
                  <!--                                    <div class="col-md-6 position-relative">-->
                  <!--                                        <div class="form-group">-->
                  <!--                                            <label class="my-1 mr-2" >{{ $t('general.serial') }}</label>-->
                  <!--                                            <multiselect-->
                  <!--                                                v-model="create.serial_id"-->
                  <!--                                                :options="serials.map(type => type.id)"-->
                  <!--                                                :custom-label="opt => $i18n.locale ? serials.find(x => x.id == opt).name : serials.find(x => x.id == opt).name_e">-->
                  <!--                                            </multiselect>-->

                  <!--                                            <template v-if="errors.serial_id">-->
                  <!--                                                <ErrorMessage v-for="(errorMessage,index) in errors.serial_id" :key="index">{{ errorMessage }}</ErrorMessage>-->
                  <!--                                            </template>-->

                  <!--                                        </div>-->
                  <!--                                    </div>-->
                  <!--                                    <div class="col-md-6"></div>-->
                  <div class="row">
                    <div class="col-md-6 direction">
                      <div class="form-group">
                        <label for="field-1" class="control-label">
                          {{ $t("general.Name") }}
                          <span class="text-danger">*</span>
                        </label>
                        <div dir="rtl">
                          <input
                            type="text"
                            class="form-control arabicInput"
                            v-model="$v.create.name.$model"
                            :class="{
                              'is-invalid': $v.create.name.$error || errors.name,
                              'is-valid': !$v.create.name.$invalid && !errors.name,
                            }"
                            id="field-1"
                          />
                        </div>
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
                            >{{ errorMessage }}
                          </ErrorMessage>
                        </template>
                      </div>
                    </div>

                    <div class="col-md-6 direction">
                      <div class="form-group">
                        <label for="field-1" class="control-label">
                          {{ $t("general.title") }}
                          <span class="text-danger">*</span>
                        </label>
                        <div dir="rtl">
                          <input
                            type="text"
                            class="form-control arabicInput"
                            v-model="$v.create.title.$model"
                            :class="{
                              'is-invalid': $v.create.title.$error || errors.title,
                              'is-valid': !$v.create.title.$invalid && !errors.title,
                            }"
                          />
                        </div>
                        <div v-if="!$v.create.title.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.title.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.title.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.title.$params.maxLength.max }}
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
                    <div class="col-md-6 direction-ltr">
                      <div class="form-group">
                        <label for="field-2" class="control-label">
                          <span class="text-danger">*</span>
                          {{ $t("general.Name_en") }}
                        </label>
                        <div dir="ltr">
                          <input
                            type="text"
                            class="form-control englishInput"
                            v-model="$v.create.name_e.$model"
                            :class="{
                              'is-invalid': $v.create.name_e.$error || errors.name_e,
                              'is-valid': !$v.create.name_e.$invalid && !errors.name_e,
                            }"
                            id="field-2"
                          />
                        </div>
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
                            >{{ errorMessage }}
                          </ErrorMessage>
                        </template>
                      </div>
                    </div>
                    <div class="col-md-6 direction-ltr">
                      <div class="form-group">
                        <label for="field-2" class="control-label">
                          <span class="text-danger">*</span>
                          {{ $t("general.title_en") }}
                        </label>
                        <div dir="ltr">
                          <input
                            type="text"
                            class="form-control englishInput"
                            v-model="$v.create.title_e.$model"
                            :class="{
                              'is-invalid': $v.create.title_e.$error || errors.title_e,
                              'is-valid': !$v.create.title_e.$invalid && !errors.title_e,
                            }"
                          />
                        </div>
                        <div v-if="!$v.create.title_e.minLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatleast") }}
                          {{ $v.create.title_e.$params.minLength.min }}
                          {{ $t("general.letters") }}
                        </div>
                        <div v-if="!$v.create.title_e.maxLength" class="invalid-feedback">
                          {{ $t("general.Itmustbeatmost") }}
                          {{ $v.create.title_e.$params.maxLength.max }}
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
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab :disabled="!screen_id" :title="$t('general.AddFile')">
              <div class="col-md-6 mb-4 p-0 position-relative">
                <div class="form-group">
                  <label class="my-1 mr-2">{{ $t("general.DocumentType") }}</label>
                  <multiselect
                    @select="addDocument"
                    :options="documents.map((type) => type.id)"
                    :custom-label="
                      (opt) =>
                        $i18n.locale
                          ? documents.find((x) => x.id == opt).name
                          : documents.find((x) => x.id == opt).name_e
                    "
                  >
                  </multiselect>
                </div>
              </div>
              <!-- start .table-responsive-->
              <div class="table-responsive mb-3 custom-table-theme position-relative">
                <!--       start loader       -->
                <loader size="large" v-if="isLoader" />
                <!--       end loader       -->

                <table class="table table-borderless table-hover table-centered m-0">
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
                  <tbody v-if="screenDocuments.length > 0">
                    <tr
                      v-for="(data, index) in screenDocuments"
                      :key="data.id"
                      class="body-tr-custom"
                    >
                      <td>
                        {{ data.name }}
                      </td>
                      <td>
                        {{ data.name_e }}
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
                              @click.prevent="deleteDocument(data.id)"
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
            <b-tab :disabled="!screen_id" :title="$t('general.AddButton')">
              <div class="col-md-6 mb-4 p-0 position-relative">
                <div class="form-group">
                  <label class="my-1 mr-2">{{ $t("general.Button") }}</label>
                  <multiselect
                    @select="addButton"
                    :options="buttons.map((type) => type.id)"
                    :custom-label="
                      (opt) =>
                        $i18n.locale
                          ? buttons.find((x) => x.id == opt).name
                          : buttons.find((x) => x.id == opt).name_e
                    "
                  >
                  </multiselect>
                </div>
              </div>

              <!-- start .table-responsive-->
              <div class="table-responsive mb-3 custom-table-theme position-relative">
                <!--       start loader       -->
                <loader size="large" v-if="isLoader" />
                <!--       end loader       -->

                <table class="table table-borderless table-hover table-centered m-0">
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
                  <tbody v-if="screenButtons.length > 0">
                    <tr
                      v-for="(data, index) in screenButtons"
                      :key="data.id"
                      class="body-tr-custom"
                    >
                      <td>
                        {{ data.name }}
                      </td>
                      <td>
                        {{ data.name_e }}
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
                              @click.prevent="deleteButton(data.id)"
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
            <!-- <b-tab :disabled="!screen_id" :title="$t('general.DocumentType')">
                                          </b-tab> -->
          </b-tabs>
        </div>
      </div>
    </form>
  </b-modal>
  <!--  /create   -->
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
