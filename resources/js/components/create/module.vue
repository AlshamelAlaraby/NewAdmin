<script>
import adminApi from "../../api/adminAxios";
import Switches from "vue-switches";
import { required, minLength, maxLength, integer } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/widgets/errorMessage";
import loader from "../../components/loader";
import Multiselect from "vue-multiselect";
import { formatDateOnly } from "../../helper/startDate";
import TreeBrowser from "../../components/create/menuComp.vue";

/**
 * Advanced Table component
 */
export default {
  components: {
    Switches,
    ErrorMessage,
    loader,
    Multiselect,
    TreeBrowser,
  },
  updated() {
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
  },
  data() {
    return {
      modules: [],
      enabled3: true,
      isLoader: false,
      rootNodes: [],
      childNodes: [],
      Tooltip: "",
      mouseEnter: "",
      current_id: null,
      create: {
        name: "",
        name_e: "",
        parent_id: null,
        is_active: "active",
        search: "",
      },
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
      is_active: { required },
    },
  },
  methods: {
    
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
              .post(`/modules/bulk-delete`, { ids: id })
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
              .delete(`/modules/${id}`)
              .then((res) => {
                this.checkAll = [];
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
    setChildNodes(result) {
      adminApi.get(`/modules/child-nodes/${result.node.id}`).then((res) => {
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
    setParentsIds(node, parents) {
      if (node.parent) {
        parents.push(node.parent.id);
        this.setParentsIds(node.parent, parents);
      }
    },
    formatDate(value) {
      return formatDateOnly(value);
    },

    resetModalHidden() {
      this.create = { name: "", name_e: "", parent_id: null, is_active: "active" };
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
      await this.getRootNodes();
      this.create = { name: "", name_e: "", parent_id: null, is_active: "active" };
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
      this.create = { name: "", name_e: "", parent_id: null, is_active: "active" };
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
        if (this.create.parent_id == null) {
          this.create.parent_id = 0;
        }
        adminApi
          .post(`/modules`, this.create)
          .then((res) => {
            this.$emit("created");
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

    async getRootNodes() {
      await adminApi
        .get(`/modules/root-nodes`)
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
  },
};
</script>

<template>
  <!--  create   -->
  <b-modal
    id="module-create"
    :title="$t('module.addmodule')"
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
        <b-button @click.prevent="$bvModal.hide(`module-create`)" variant="danger" type="button">
          {{ $t("general.Cancel") }}
        </b-button>
      </div>
      <div class="row">
        <div class="col-8">
          <TreeBrowser
            @deleteClicked="deleteModule($event.id, true)"
            :currentNodeId="create.parent_id"
            @onClick="setCreateCurrentNode"
            @nodeExpanded="setChildNodes"
            :nodes="rootNodes"
          />
        </div>
        <div class="col-4">
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
                    >{{ $t(errorMessage) }}</ErrorMessage
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
                  <ErrorMessage
                    v-for="(errorMessage, index) in errors.is_active"
                    :key="index"
                    >{{ $t(errorMessage) }}
                  </ErrorMessage>
                </template>
              </div>
            </div>
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
}
</style>
