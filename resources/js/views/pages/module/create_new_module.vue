<template>
    <div>
        <!--  create   -->
        <b-modal id="create_or_edit"
            :title="`${action == 'create' ? $t('general.Add Module') : $t('general.Update') + ' ( ' + edit_node.name + ')'}`"
            title-class="font-18" body-class="p-4 " :hide-footer="true" size="md" @show="resetModal">
            <form>
                <div class="mb-3 d-flex justify-content-end">
                    <template v-if="action == 'create'">
                        <b-button variant="success" :disabled="!is_disabled" @click.prevent="resetModal" type="button"
                            :class="[
                                'font-weight-bold px-2',
                                is_disabled ? 'mx-2' : '',
                            ]">
                            {{ $t("general.AddNewRecord") }}
                        </b-button>
                        <template v-if="!is_disabled">
                            <b-button variant="success" type="button" class="mx-1" v-if="!isLoader"
                                @click.prevent="addSubmit">
                                {{ $t("general.Add") }}
                            </b-button>

                            <b-button variant="success" class="mx-1" disabled v-else>
                                <b-spinner small></b-spinner>
                                <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>
                        </template>
                    </template>

                    <template v-else>
                        <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader" @click.prevent="editSubmit">
                            {{ $t("general.Edit") }}
                        </b-button>

                        <b-button variant="success" class="mx-1" disabled v-else>
                            <b-spinner small></b-spinner>
                            <span class="sr-only">{{ $t("login.Loading") }}...</span>
                        </b-button>
                    </template>

                    <b-button @click.prevent="$bvModal.hide(`create_or_edit`)" variant="danger" type="button">
                        {{ $t("general.Cancel") }}
                    </b-button>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <template>
                            <div class="row">
                                <template
                                    v-if="action == 'create' || edit_node.type == 'module' || (action == 'edit' && create_or_edit.name && create_or_edit.name_e)">
                                    <div class="col-12 direction" dir="rtl">
                                        <div class="form-group">
                                            <label for="field-21" class="control-label">
                                                {{ $t("general.Name") }}
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input type="text" class="form-control arabicInput"
                                                v-model="$v.create_or_edit.name.$model" :class="{
                                                    'is-invalid':
                                                        $v.create_or_edit.name.$error || errors.name,
                                                    'is-valid':
                                                        !$v.create_or_edit.name.$invalid && !errors.name,
                                                }" id="field-21" />
                                            <div v-if="!$v.create_or_edit.name.minLength" class="invalid-feedback">
                                                {{ $t("general.Itmustbeatleast") }}
                                                {{ $v.create_or_edit.name.$params.minLength.min }}
                                                {{ $t("general.letters") }}
                                            </div>
                                            <div v-if="!$v.create_or_edit.name.maxLength" class="invalid-feedback">
                                                {{ $t("general.Itmustbeatmost") }}
                                                {{ $v.create_or_edit.name.$params.maxLength.max }}
                                                {{ $t("general.letters") }}
                                            </div>
                                            <template v-if="errors.name">
                                                <ErrorMessage v-for="(errorMessage, index) in errors.name" :key="index">{{
                                                    $t(errorMessage) }}</ErrorMessage>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-12 direction-ltr" dir="ltr">
                                        <div class="form-group">
                                            <label for="field-22" class="control-label">
                                                {{ $t("general.Name_en") }}
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input type="text" class="form-control englishInput"
                                                v-model="$v.create_or_edit.name_e.$model" :class="{
                                                    'is-invalid':
                                                        $v.create_or_edit.name_e.$error || errors.name_e,
                                                    'is-valid':
                                                        !$v.create_or_edit.name_e.$invalid &&
                                                        !errors.name_e,
                                                }" id="field-22" />
                                            <div v-if="!$v.create_or_edit.name_e.minLength" class="invalid-feedback">
                                                {{ $t("general.Itmustbeatleast") }}
                                                {{ $v.create_or_edit.name_e.$params.minLength.min }}
                                                {{ $t("general.letters") }}
                                            </div>
                                            <div v-if="!$v.create_or_edit.name_e.maxLength" class="invalid-feedback">
                                                {{ $t("general.Itmustbeatmost") }}
                                                {{ $v.create_or_edit.name_e.$params.maxLength.max }}
                                                {{ $t("general.letters") }}
                                            </div>
                                            <template v-if="errors.name_e">
                                                <ErrorMessage v-for="(
                                      errorMessage, index
                                  ) in errors.name_e" :key="index">{{ $t(errorMessage) }}</ErrorMessage>
                                            </template>
                                        </div>
                                    </div>
                                </template>

                                <div class="col-md-12" v-if="action == 'create' || (action == 'edit' && edit_node.type == 'module')">
                                  <label class="my-1 mr-2">{{
                                    $t("general.Dashboard")
                                  }}</label>
                                  <multiselect
                                  @search-change="asyncFindDashboard"
                                    v-model="create_or_edit.module_dashboard_id"
                                    :options="dashboards_limit.map((type) => type.id)"
                                    :custom-label="customLabelFunction"
                                    :class="{
                                      'is-invalid':
                                        $v.create_or_edit.module_dashboard_id.$error ||
                                        errors.module_dashboard_id,
                                    }"
                                  >
                                  </multiselect>
                                  <div
                                    v-if="!$v.create_or_edit.module_dashboard_id.required"
                                    class="invalid-feedback"
                                  >
                                    {{ $t("general.fieldIsRequired") }}
                                  </div>

                                  <template v-if="errors.module_dashboard_id">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.module_dashboard_id"
                                      :key="index"
                                      >{{ errorMessage }}</ErrorMessage
                                    >
                                  </template>
                                </div>


                                <div class="col-md-12"
                                    v-if="action == 'create' || (action == 'edit' && edit_node.type == 'module')">
                                    <div class="form-group">
                                        <label for="field-2" class="control-label">
                                            {{ $t("general.icon") }}
                                        </label>
                                        <div style="height:200px;overflow-y:scroll">
                                            <div class="d-flex justify-content-between mb-3">
                                                <input type="text" class='form-control' v-model="filter_icon_input" @keyup="filter_icons"  :placeholder="$t('general.Filter Icons')">
                                                <a class="btn btn-danger mx-1"  v-show="create_or_edit.icon"  @click.prevent="create_or_edit.icon = ''"><i class="far fa-times-circle"></i></a>
                                            </div>
                                            <i v-for="icon in icons" :class="[icon,'mx-1',create_or_edit.icon == icon ? 'text-info font-weight-bold' : '']"  :key="icon" @click.prevent="create_or_edit.icon = icon" style="cursor: pointer;font-size:23px"></i>


                                            <template v-if="errors.icon">
                                                <ErrorMessage v-for="(
                                                errorMessage, index
                                                ) in errors.icon" :key="index">{{ $t(errorMessage) }}
                                                </ErrorMessage>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12" v-if="action == 'edit' && edit_node.type != 'module'">
                                    <div class="form-group">
                                        <label for="field-332" class="control-label">
                                            {{ $t("general.IdSort") }}
                                        </label>
                                        <div>
                                            <input type="number" class="form-control" data-create="2"
                                                v-model="create_or_edit.sort" id="field-332" />

                                            <div v-if="!$v.create_or_edit.sort.required" class="invalid-feedback">
                                                {{ $t("general.fieldIsRequired") }}
                                            </div>
                                            <template v-if="errors.sort">
                                                <ErrorMessage v-for="(
                                  errorMessage, index
                                ) in errors.sort" :key="index">{{ $t(errorMessage) }}
                                                </ErrorMessage>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </template>
                    </div>
                </div>
            </form>
        </b-modal>
        <!--  /create   -->
    </div>
</template>


<script>
import adminApi from "../../../api/adminAxios";
import {
    required,
    minLength,
    maxLength,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import font_awsome_icons from '../icons/font_awsome_icons';
import Multiselect from "vue-multiselect";

/**
* Advanced Table component
*/
export default {

    components: {
        ErrorMessage,
        loader,
        Multiselect,
    },

    data() {
        return {
            icons:  font_awsome_icons,
            filter_icon_input: '',
            dashboards_limit: [],
            debounce: '',
            action: 'create',
            edit_node: {
                index: 0,
                name: '',
                id: 0,
                type: '',
                module_id: 0,
            },
            isLoader: false,
            create_or_edit: {
                name: "",
                name_e: "",
                parent_id: null,
                module_dashboard_id: 0,
                sort: 1,
                is_active: "active",
                search: "",
                icon: "",
                is_module: 1,
            },
            errors: {},
            is_disabled: false,
        };
    },
    validations: {
        create_or_edit: {
            name: {
                required(value) {
                    let check_name_ar =this.action == 'create' ||  (this.edit_node.type != 'page' && this.action == 'edit') ;
                    return  check_name_ar ? (value ?? '') : true;
                }, minLength: minLength(3), maxLength: maxLength(100)
            },
            name_e: {
                required(value) {
                    let check_name_en = this.action == 'create' ||  (this.edit_node.type != 'page' && this.action == 'edit');
                    return  check_name_en ? (value ?? '') : true;
                },
                minLength: minLength(3),
                maxLength: maxLength(100),
            },
            module_dashboard_id: { required(value) {
                    let check_module_dashboard_id =this.action == 'create' ||  (this.edit_node.type == 'module' && this.action == 'edit') ;
                    return  check_module_dashboard_id ? (value ?? 0) : true;
                }
            },
            icon: {},
            sort: {
                required(value) {
                    let check_sort = this.action == 'edit' && this.edit_node.type != 'module';
                    return check_sort ? (value == 0 ? true : value) : true
                }
            },
            is_active: { required },
            is_module: { required },
        },

    },

    beforeMount() {
        this.get_action_type()
        this.getLimitDashboards('')
    },
    methods: {
        asyncFindDashboard(query){

            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.getLimitDashboards(query)
            },200)
        },
        customLabelFunction(opt){
            if(opt && this.dashboards_limit.length > 0){
                let lable =  this.dashboards_limit.find((x) => x.id == opt)
                return lable ? (this.$i18n.locale == 'ar' ? lable.name : lable.name_e) : ''
            }
            return '';

        },
        async getLimitDashboards(search) {
            if(this.create_or_edit.module_dashboard_id == null){
                this.create_or_edit.module_dashboard_id = 0
            }

        await adminApi
            .get(`project-program-modules/module_dashboards?search=${search}&selected_module_dashboard_id=${this.create_or_edit.module_dashboard_id}`)
            .then((res) => {
                this.dashboards_limit = res.data.data.data;
            })
            .catch((err) => {
            Swal.fire({
                icon: "error",
                title: `${this.$t("general.Error")}`,
                text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
            });
        },
        filter_icons() {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                if(this.filter_icon_input){
                    let new_filtered_icons = []
                    font_awsome_icons.forEach(icon => {
                        if(icon.toLowerCase().includes(this.filter_icon_input.toLowerCase()))
                            new_filtered_icons.push(icon)
                    })

                    this.icons = new_filtered_icons
                }else{
                    this.icons = font_awsome_icons
                }
            },200)
        },
        get_action_type() {
            let object = this;
            $(document).on('click', '.click_on_modal_button', function () {

                object.action = $(this).data('action');
                if (object.action == 'create') {
                    object.resetModal()
                }
                object.edit_node.index = $(this).data('index');
                object.edit_node.name = $(this).data('name');
                object.edit_node.id = $(this).data('nodeid');
                object.edit_node.type = $(this).data('type');
                object.edit_node.module_id = $(this).data('moduleid');
                object.create_or_edit.name = $(this).data('namear');
                object.create_or_edit.name_e = $(this).data('nameen');
                object.create_or_edit.sort = $(this).data('sort');
                object.create_or_edit.icon = $(this).data('icon');
                object.create_or_edit.module_dashboard_id = $(this).data('moduledashboardid');

                console.log($(this).data('moduledashboardid'))
            })
        },
        resetModal() {
            this.edit_node = {
                index: 0,
                name: '',
                id: 0,
                type: '',
                module_id: 0,
            }
            this.create_or_edit = {
                name: "",
                name_e: "",
                parent_id: null,
                module_dashboard_id: 0,
                is_active: "active",
                sort: 1,
                icon: "",
                is_module: 1,
            };

            this.is_disabled = false;
            this.$nextTick(() => {
                this.$v.$reset();
            });

            this.errors = {};
        },

        addSubmit() {

            this.$v.create_or_edit.$touch();
            if (this.$v.create_or_edit.$invalid) {
                return;
            } else {
                this.isLoader = true;
                this.errors = {};
                this.is_disabled = false;
                adminApi
                    .post(`/project-program-modules`, this.create_or_edit)
                    .then((res) => {

                        this.is_disabled = true;
                        this.$emit('add_new_module', res.data)

                        this.$bvModal.hide(`create_or_edit`);

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
                        console.log(err)
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

        editSubmit() {
            this.$v.create_or_edit.$touch();
            if (this.$v.create_or_edit.$invalid) {
                return;
            } else {

                this.isLoader = true;
                this.errors = {};
                adminApi
                    .post(`/project-program-modules/edit_tree_item`, {
                        ...this.create_or_edit,
                        search: undefined,
                        node_id: this.edit_node.id,
                        node_type: this.edit_node.type,
                    })
                    .then((res) => {
                        this.$bvModal.hide(`create_or_edit`);
                        if(this.edit_node.type == 'module'){
                            this.$emit('updated_module' , {index : this.edit_node.index, updated_item:res.data})
                        }else{
                            this.$emit('update_page_or_folder',{index : this.edit_node.index, module_id:res.data.module_id})
                        }
                        this.edit_node = {
                            index: 0,
                            name: '',
                            id: 0,
                            type: '',
                            module_id: 0,
                        }

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


    },
};
</script>

