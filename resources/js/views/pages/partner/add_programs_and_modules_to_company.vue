<template>
    <div class="mb-3 custom-table-theme position-relative">
        <!--       start loader       -->
        <!-- <loader size="large" v-if="isLoader" /> -->
        <!--       end loader       -->

        <div class="row">

            <div class="col-7 pt-3" :class="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
                <ul id="myUL">
                    <li v-for="(node, index) in companies" :key="node.id" style="margin: 0 25px;">
                        <span>
                            <i :class="node.collapsed
                                ? 'fas fa-minus' : 'fas fa-plus'
                                " @click="collapse_item('company', node.id, index)"></i>
                            <span @click="tree_item.inside_name = $i18n.locale == 'ar' ? node.name : node.name_e;
                            tree_item.inside_id = node.id;
                            tree_item.company_id = node.id;
                            tree_item.parent_index = index;
                            tree_item.inside_type = 'company';
                            action = 'create';
                            tree_item.type = 'program'" :class="{
    'without-children': !node.haveChildren,
    active: node.id == tree_item.inside_id && tree_item.inside_type == 'company' && action == 'create',
}">
                                {{ $i18n.locale == "ar" ? node.name : node.name_e }}


                            </span>



                            <!-- <tree_item_action :node_index="index" :programs_index="index"
                                      :node_type="'program'"
                                      :program_id="node.id" :node_id="node.id"
                                      :node_name=" $i18n.locale == 'ar' ? node.name : node.name_e"
                                      :name_ar="node.name"
                                      :name_en="node.name_e"
                                      :icon="node.icon"
                                     /> -->


                        </span>
                        <!-- end companies list  -->







                        <ul :class="[node.collapsed ? 'd-block' : 'd-none']">
                            <li v-for="(program_node, prog_index) in node.programs" :key="program_node.id"
                                style="margin: 0 25px;">
                                <span>
                                    <i :class="program_node.collapsed
                                        ? 'fas fa-minus' : 'fas fa-plus'

                                        " @click="collapse_item('program', node.id, index, prog_index)"></i>
                                    <span @click="setProgramData(program_node, node.id, index)" :class="{
                                        active: program_node.id == tree_item.inside_id && action == 'create' && tree_item.inside_type == 'program' && tree_item.company_id == node.id,
                                    }">
                                        <i :class="program_node.icon" v-show="program_node.icon"
                                            style="background:none!important;color:#000"></i>

                                        {{ $i18n.locale == "ar" ? program_node.name : program_node.name_e }}


                                    </span>


                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm dropdown-toggle " data-toggle="dropdown"
                                            style="padding: 0;" aria-expanded="false">
                                            <i class="fa fa-exclamation"
                                                style="color:#fff;font-size: 13px;border-radius: 50%;background-color: #424242;padding:2px 6px"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-custom">

                                            <a class="dropdown-item text-black delete_tree_item" href="#"
                                                @click.prevent="attach_or_detach_companies_with_programs('detach', node.id, program_node.id)">
                                                <div class="d-flex justify-content-between align-items-center text-black">
                                                    <i class="fa fa-trash text-danger bg-white"></i>
                                                </div>
                                            </a>
                                        </div>
                                    </div>



                                </span>
                                <!-- end programs list  -->






                                <ul :class="[program_node.collapsed ? 'd-block' : 'd-none']">
                                    <li v-for="(module_node, module_index) in program_node.modules" :key="module_node.id"
                                        style="margin: 0 25px;">
                                        <span>
                                            <i :class="[module_node.project_program_module.icon ?? 'fab fa-medium-m']"
                                                style="color:#000000;    font-size: 15px;
                                            background: #ff6868;
                                            padding: 3px;
                                            border-radius: 50%;"> </i>

                                            <span :class="{
                                                active: module_node.project_program_module.id == tree_item.module_id && action != 'create',
                                            }">
                                                {{ $i18n.locale == "ar" ? module_node.project_program_module.name :
                                                    module_node.project_program_module.name_e }}
                                            </span>


                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm dropdown-toggle "
                                                    data-toggle="dropdown" style="padding: 0;" aria-expanded="false">
                                                    <i class="fa fa-exclamation"
                                                        style="color:#fff;font-size: 13px;border-radius: 50%;background-color: #424242;padding:2px 6px"></i>
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-custom">
                                                    <a class="dropdown-item click_on_modal_button" href="#"
                                                        data-action="edit"
                                                        @click="setModuleDataForEdit(node.id, $i18n.locale == 'ar' ? module_node.project_program_module.name : module_node.project_program_module.name_e,
                                                            program_node.id, program_node.company_program_id, index, module_node)">

                                                        <div
                                                            class="d-flex justify-content-between align-items-center text-black">

                                                            <i class="fa fa-edit text-info bg-white"></i>
                                                        </div>
                                                    </a>
                                                    <a class="dropdown-item text-black delete_tree_item" href="#"
                                                        @click.prevent="deleteCompanyModule(module_node.id, node.id, index)">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center text-black">
                                                            <i class="fa fa-trash text-danger bg-white"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>


                                        </span>
                                        <!-- end modules list  -->

                                    </li>
                                </ul>










                            </li>
                        </ul>








                    </li>
                </ul>
            </div>


            <div class="col-5 px-3" v-if="tree_item.inside_id > 0">

                <h4>{{ (action == 'create' ? $t('general.Add inside') : $t("general.Edit")) + " ( " + tree_item.inside_name +
                    " )" }}</h4>


                <template v-if="tree_item.type == 'module'">
                    <div class="row">
                        <div class="col-md-6" v-if="action == 'create'">
                            <div class="position-relative">
                                <div class="form-group module_select">
                                    <label class="my-1 mr-2">{{
                                        $t("menuitems.module.text")
                                    }}</label>
                                    <multiselect @search-change="asyncFindModule" v-model="tree_item.module_id"
                                        :options="modules_limit.map((type) => type.id)"
                                        :custom-label="customLabelFunctionForModules" :class="{
                                            'is-invalid':
                                                $v.tree_item.module_id.$error ||
                                                errors.project_program_module_id,
                                        }">
                                    </multiselect>
                                    <div v-if="!$v.tree_item.module_id.required" class="invalid-feedback">
                                        {{ $t("general.fieldIsRequired") }}
                                    </div>

                                    <template v-if="errors.project_program_module_id">
                                        <ErrorMessage v-for="(
                                          errorMessage, index
                                        ) in errors.project_program_module_id" :key="index">{{ errorMessage }}
                                        </ErrorMessage>
                                    </template>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.allowed_users_no") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control"
                                    v-model.trim="$v.tree_item.allowed_users_no.$model" :class="{
                                        'is-invalid':
                                            $v.tree_item.allowed_users_no.$error ||
                                            errors.allowed_users_no,
                                        'is-valid':
                                            !$v.tree_item.allowed_users_no.$invalid &&
                                            !errors.allowed_users_no,
                                    }" />
                                <template v-if="errors.allowed_users_no">
                                    <ErrorMessage v-for="(
                                errorMessage, index
                            ) in errors.allowed_users_no" :key="index">{{ errorMessage }}</ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.allowed_employee") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control"
                                    v-model.trim="$v.tree_item.allowed_employee.$model" :class="{
                                        'is-invalid':
                                            $v.tree_item.allowed_employee.$error ||
                                            errors.allowed_employee,
                                        'is-valid':
                                            !$v.tree_item.allowed_employee.$invalid &&
                                            !errors.allowed_employee,
                                    }" />
                                <template v-if="errors.allowed_employee">
                                    <ErrorMessage v-for="(
                                errorMessage, index
                            ) in errors.allowed_employee" :key="index">{{ errorMessage }}</ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.out_site") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control" v-model.trim="$v.tree_item.out_site.$model"
                                    :class="{
                                        'is-invalid':
                                            $v.tree_item.out_site.$error || errors.out_site,
                                        'is-valid':
                                            !$v.tree_item.out_site.$invalid && !errors.out_site,
                                    }" />
                                <template v-if="errors.out_site">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.out_site" :key="index">{{
                                        errorMessage
                                    }}</ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.startDate") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <date-picker v-model="tree_item.custom_date_start" type="datetime"
                                    :default-value="tree_item.custom_date_start" @change="start_date" confirm></date-picker>
                                <div v-if="!$v.tree_item.start_date.required" class="invalid-feedback">
                                    {{ $t("general.fieldIsRequired") }}
                                </div>
                                <template v-if="errors.start_date">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.start_date" :key="index">{{
                                        errorMessage }}
                                    </ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.endDate") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <date-picker v-model="tree_item.custom_date_end" type="datetime" @change="end_date"
                                    confirm></date-picker>
                                <template v-if="errors.end_date">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.end_date" :key="index">{{
                                        errorMessage
                                    }}
                                    </ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">
                                    {{ $t("general.document_types") }}
                                    <span class="text-danger">*</span>
                                </label>
                                <multiselect :multiple="true" v-model="$v.tree_item.document_types.$model"
                                    :options="document_types.map((type) => type.id)" :custom-label="customLabelFunctionForDocumentTypes">
                                </multiselect>
                                <template v-if="errors.document_types">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.document_types" :key="index">{{
                                        errorMessage }}</ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="mr-2">
                                    Is Web ?
                                    <span class="text-danger">*</span>
                                </label>
                                <b-form-group :class="{
                                    'is-invalid':
                                        $v.tree_item.is_web.$error || errors.is_web,
                                    'is-valid':
                                        !$v.tree_item.is_web.$invalid && !errors.is_web,
                                }">
                                    <b-form-radio class="d-inline-block" v-model="$v.tree_item.is_web.$model"
                                        name="some-radios" value="1">{{ $t("general.Active") }}
                                    </b-form-radio>
                                    <b-form-radio class="d-inline-block m-1" v-model="$v.tree_item.is_web.$model"
                                        name="some-radios" value="0">{{ $t("general.Inactive") }}
                                    </b-form-radio>
                                </b-form-group>
                                <template v-if="errors.is_web">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.is_web" :key="index">{{
                                        errorMessage }}
                                    </ErrorMessage>
                                </template>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="mr-2">
                                    {{ $t('general.Status') }}
                                    <span class="text-danger">*</span>
                                </label>
                                <b-form-group>
                                    <b-form-radio class="d-inline-block" v-model="$v.tree_item.status.$model"
                                        name="some-radios-status-create" value="1">{{ $t("general.Active") }}
                                    </b-form-radio>
                                    <b-form-radio class="d-inline-block m-1" v-model="$v.tree_item.status.$model"
                                        name="some-radios-status-create" value="0">{{ $t("general.Inactive") }}
                                    </b-form-radio>
                                </b-form-group>
                                <template v-if="errors.status">
                                    <ErrorMessage v-for="(errorMessage, index) in errors.status" :key="index">{{
                                        errorMessage }}
                                    </ErrorMessage>
                                </template>
                            </div>
                        </div>



                        <div class="row justify-content-center mt-2 col-12" v-if="action == 'create'">
                            <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader"
                                @click.prevent="AddSubmitModuleToProgram">
                                {{ $t("general.Add") }}
                            </b-button>

                            <b-button variant="success" class="mx-1" disabled v-else>
                                <b-spinner small></b-spinner>
                                <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>
                        </div>
                        <div class="row justify-content-center mt-2 col-12" v-else>
                            <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader"
                                @click.prevent="editSubmitProgram">
                                {{ $t("general.Edit") }}
                            </b-button>

                            <b-button variant="success" class="mx-1" disabled v-else>
                                <b-spinner small></b-spinner>
                                <span class="sr-only">{{ $t("login.Loading") }}...</span>
                            </b-button>
                        </div>
                    </div>

                </template>
                <template v-else>
                    <div class="row">
                        <div class="col-12">
                            <div class="position-relative">
                                <div class="form-group">
                                    <label class="my-1 mr-2">{{
                                        $t("general.Programs")
                                    }}</label>
                                    <multiselect @search-change="asyncFindProgram" v-model="tree_item.program_id"
                                        @remove="(e) => { tree_item.program_id = 0 }"
                                        :options="programs_limit.map((type) => type.id)"
                                        :custom-label="customLabelFunctionForPrograms" :class="{
                                            'is-invalid':
                                                $v.tree_item.program_id.$error ||
                                                errors.program_id,
                                        }">
                                    </multiselect>

                                    <div v-if="!$v.tree_item.program_id.required" class="invalid-feedback">
                                        {{ $t("general.fieldIsRequired") }}
                                    </div>
                                    <template v-if="errors.program_id">
                                        <ErrorMessage v-for="(
                                          errorMessage, index
                                        ) in errors.program_id" :key="index">{{ errorMessage }}</ErrorMessage>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center mt-2">

                        <b-button variant="success" type="submit" class="mx-1" v-if="!isLoader"
                            @click.prevent="attach_or_detach_companies_with_programs('attach')">
                            {{ $t("general.Add") }}
                        </b-button>

                        <b-button variant="success" class="mx-1" disabled v-else>
                            <b-spinner small></b-spinner>
                            <span class="sr-only">{{ $t("login.Loading") }}...</span>
                        </b-button>
                    </div>

                </template>




                <!-- disabled button -->
                <!-- <b-button variant="success" type="submit" class="mx-1"
                        v-if="((($v.tree_item.module_id.$error ||
                            $v.tree_item.sort.$error) && (tree_item.sort || tree_item.module_id > 0)) || (!tree_item.sort && !tree_item.module_id))"
                        disabled>
                        {{ $t("general.Add") }}
                    </b-button> -->


                <!-- <template v-else> -->

                <!-- </template> -->


            </div>
        </div>

    </div>
</template>

<script>
import ErrorMessage from "../../../components/widgets/errorMessage";
import adminApi from "../../../api/adminAxios";
import {
    required,
    minLength,
    maxLength,
    integer,
    email,
    sameAs, minValue, url,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
// import loader from "../../../components/loader";
import { formatDateOnly, formatDateTime } from "../../../helper/startDate";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";
import loader from "../../../components/loader";

export default {
    name: 'add_programs_and_modules_to_company',
    props: ['companies'],
    components: {
        // loader,
        ErrorMessage,
        DatePicker,
        Multiselect,
    },
    data() {
        return {
            isLoader: false,
            errors: [],
            action: 'create',
            modules_limit: [],
            programs_limit: [],
            document_types: [],
            tree_item: {
                inside_type: '',
                inside_name: '',
                company_id: 0,
                inside_id: 0,
                type: '',

                out_site: 5,
                company_program_id: 0,
                allowed_employee: 5,
                module_node_id: 0,
                program_id: 0,
                module_id: 0,
                allowed_users_no: 5,
                start_date: '',
                end_date: '',
                custom_date_start: new Date(),
                custom_date_end: "",
                document_types: [],
                is_web: 1,
                status: 1
            }
        }
    },
    validations: {
        tree_item: {
            company_id: { required, integer },
            program_id: {
                required(value) {
                    return this.tree_item.type == 'program' ? value : true;
                }, integer
            },
            module_id: {
                required(value) {
                    return this.tree_item.type != 'program' ? value : true;
                }, integer
            },

            allowed_users_no: {
                required(value) {
                    return this.tree_item.type != 'program' ? value : true;
                }, integer
            },
            out_site: {
                required(value) {
                    return this.tree_item.type != 'program' ? value : true;
                }
            },
            allowed_employee: {
                required(value) {
                    return this.tree_item.type != 'program' ? value : true;
                }
            },
            start_date: {
                required(value) {
                    return this.tree_item.type != 'program' ? value : true;
                }
            },
            end_date: {},
            document_types: {},
            is_web: {},
            status: {}
        }
    },
    mounted() {
        this.getLimitPrograms('');
        this.docType();
        this.tree_item.custom_date_end = this.next_year()
    },
    methods: {
        setProgramData(program_node, node_id, index) {
            if (this.tree_item.inside_id != program_node.id) {
                this.tree_item.inside_id = program_node.id;
                this.tree_item.inside_type = 'program';
                this.getLimitModules('')
            }
            this.tree_item.inside_name = this.$i18n.locale == 'ar' ? program_node.name : program_node.name_e;
            this.tree_item.program_id = program_node.id;
            this.tree_item.company_program_id = program_node.company_program_id;
            this.tree_item.company_id = node_id;
            this.tree_item.parent_index = index;
            this.action = 'create';
            this.tree_item.type = 'module'
        },
        collapse_item(item_type, company_id, index, child_index = 0) {
            if (item_type == 'company')
                this.$set(this.companies[index], 'collapsed', !this.companies[index]['collapsed'] ? 1 : 0)
            else
                this.$set(this.companies[index]['programs'][child_index], 'collapsed', !this.companies[index]['programs'][child_index]['collapsed'] ? 1 : 0)


            if ((item_type == 'company' && !this.companies[index]['programs']))
                this.get_children_inside_company_or_program(company_id, index)
        },
        re_arrange_companies_node(company_id) {
            this.companies.forEach((element, index) => {
                if (element.id == company_id) {
                    this.get_children_inside_company_or_program(company_id, index)
                }
            })

        },
        get_children_inside_company_or_program(company_id, index) {

            adminApi.get(`company-project-program-modules/get_programs_and_modules_for_company/${company_id}`).then((res) => {
                let company_item = this.companies[index]

                if (Object.keys(this.companies[index].programs ?? []).length > 0) {
                    let new_filtered_programs = []
                    res.data.data.forEach((new_element) => {
                        let matched = 0;
                        this.companies[index].programs.forEach((old_elment) => {
                            if (old_elment.id == new_element.id) {
                                matched = 1
                                old_elment.modules = new_element.modules
                                new_filtered_programs.push(old_elment)
                            }
                        })
                        if (matched == 0)
                            new_filtered_programs.push(new_element)
                    })

                    this.$set(company_item, 'programs', new_filtered_programs)

                } else {
                    this.$set(company_item, 'programs', res.data.data)
                }

                this.$set(this.companies, index, company_item)

            })
        },
        async docType() {
          await adminApi
              .get(`/document-type`)
              .then((res) => {
                  let l = res.data;
                  this.document_types = l.data;
              })
              .catch((err) => {
                  Swal.fire({
                      icon: "error",
                      title: `${this.$t("general.Error")}`,
                      text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                  });
              });
      },
        start_date(e) {
            if (e) {
                this.tree_item.start_date = formatDateTime(e);
            } else {
                this.tree_item.start_date = null;
            }
        },
        end_date(e) {
            if (e) {
                this.tree_item.end_date = formatDateTime(e);
            } else {
                this.tree_item.end_date = null;
            }
        },
        AddSubmitModuleToProgram(type = null) {
            this.tree_item.start_date = formatDateTime(this.tree_item.custom_date_start)
            this.tree_item.end_date = formatDateTime(this.tree_item.custom_date_end)
            this.$v.tree_item.$touch();

            if (this.$v.tree_item.$invalid) {
                return;
            } else {
                this.isLoader = true;
                this.errors = {};

                adminApi
                    .post(`/company-project-program-modules`, {
                        out_site: this.tree_item.out_site,
                        company_program_id: this.tree_item.company_program_id,
                        allowed_employee: this.tree_item.allowed_employee,
                        module_id: undefined,
                        allowed_users_no: this.tree_item.allowed_users_no,
                        start_date: this.tree_item.start_date,
                        end_date: this.tree_item.end_date,
                        is_web: this.tree_item.is_web,
                        status: this.tree_item.status,
                        company_id: this.tree_item.company_id,
                        project_program_module_id: this.tree_item.module_id,
                        document_types: this.tree_item.document_types,
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

                        this.get_children_inside_company_or_program(this.tree_item.company_id, this.tree_item.parent_index)
                        this.resetModuleForm()
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
        next_year() {
            const today = new Date();
            const nextYear = new Date();
            nextYear.setFullYear(today.getFullYear() + 1);
            return nextYear;
        },
        resetModuleForm(type = null) {

            this.tree_item["out_site"] = 5
            this.tree_item["module_id"] = 0
            this.tree_item["allowed_users_no"] = 5
            this.tree_item["allowed_employee"] = 5
            this.tree_item["start_date"] = formatDateTime(new Date())
            this.tree_item["end_date"] = formatDateTime(this.next_year())
            this.tree_item["custom_date_end"] = this.next_year()
            this.tree_item["custom_date_start"] = new Date()
            this.tree_item["is_web"] = 1
            this.tree_item["status"] = 1
            this.tree_item["program_id"] = 0
            this.tree_item["document_types"] = []

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },

        editSubmitProgram() {
            this.$v.tree_item.$touch();

            if (this.$v.tree_item.$invalid) {
                return;
            } else {
                this.isLoader = true;
                this.errors = {};
                adminApi
                    .put(`/company-project-program-modules/${this.tree_item.module_node_id}`, {
                        out_site: this.tree_item.out_site,
                        company_program_id: this.tree_item.company_program_id,
                        allowed_employee: this.tree_item.allowed_employee,
                        module_id: undefined,
                        allowed_users_no: this.tree_item.allowed_users_no,
                        start_date: this.tree_item.start_date,
                        end_date: this.tree_item.end_date,
                        is_web: this.tree_item.is_web,
                        status: this.tree_item.status,
                        company_id: this.tree_item.company_id,
                        project_program_module_id: this.tree_item.module_id,
                        document_types: this.tree_item.document_types,
                    }).then((res) => {

                        setTimeout(() => {
                            Swal.fire({
                                icon: "success",
                                text: `${this.$t("general.Editsuccessfully")}`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }, 500);
                        this.get_children_inside_company_or_program(this.tree_item.company_id, this.tree_item.parent_index)
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
        deleteCompanyModule(id, company_id, company_index) {

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
                        .delete(`/company-project-program-modules/${id}`)
                        .then((res) => {
                            this.get_children_inside_company_or_program(company_id, company_index)

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

        },
        asyncFindModule(query) {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.getLimitModules(query)
            }, 200)
        },
        asyncFindProgram(query) {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.getLimitPrograms(query)
            }, 200)
        },

        async getLimitModules(search) {
            if (this.tree_item.module_id == null) {
                this.tree_item.module_id = 0
            }
            await adminApi
                .get(`/project-program-modules?program_modules=1&per_page=10&search=${search}&columns[1]=name_e&columns[2]=name&selected_id=${this.tree_item.module_id}&inside_id=${this.tree_item.inside_type == 'program' ? this.tree_item.inside_id : ''}`)
                .then((res) => {
                    this.modules_limit = res.data.data;
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: `${this.$t("general.Error")}`,
                        text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                    });
                });
        },

        async getLimitPrograms(search) {
            if (this.tree_item.program_id == null) {
                this.tree_item.program_id = 0
            }
            await adminApi
                .get(`/project-program-modules?program_parent=1&per_page=10&search=${search}&columns[1]=name_e&columns[2]=name&selected_id=${this.tree_item.program_id}&inside_id=${this.tree_item.inside_id}`)
                .then((res) => {
                    this.programs_limit = res.data.data;
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: `${this.$t("general.Error")}`,
                        text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                    });
                });
        },
        customLabelFunctionForDocumentTypes(opt) {
            return this.$i18n.locale == 'ar'? this.document_types.find((x) => x.id == opt).name: this.document_types.find((x) => x.id == opt).name_e
        },
        customLabelFunctionForModules(opt) {
            if (opt && this.modules_limit.length > 0) {

                let lable
                this.modules_limit.forEach((ele, index) => {
                    if (ele.id == opt) {
                        lable = ele
                    }
                    if (this.tree_item.inside_type == 'program' && ele.parent_id == this.tree_item.inside_id) {
                        $(`#null-${index}`).addClass('active_select')
                    } else {
                        $(`#null-${index}`).removeClass("active_select")
                    }

                })
                return lable ? (this.$i18n.locale == 'ar' ? lable.name : lable.name_e) : ''
            }
            return '';
        },
        customLabelFunctionForPrograms(opt) {
            if (opt && this.programs_limit.length > 0) {
                let lable;
                this.programs_limit.forEach((ele, index) => {
                    if (ele.id == opt) {
                        lable = ele
                    }
                    $(`#null-${index}`).removeClass("active_select")
                })
                return lable ? (this.$i18n.locale == 'ar' ? lable.name : lable.name_e) : ''
            }
            return '';
        },

        attach_or_detach_companies_with_programs(action, delete_company_id = null, deleted_program_id = null) {

            if (action == 'attach')
                this.$v.tree_item.$touch();

            if (this.$v.tree_item.$invalid && action == 'attach') {
                return;
            } else {
                this.isLoader = true;
                this.errors = {};
                if (action == 'attach')
                    this.$set(this.companies[this.tree_item.parent_index], 'collapsed', 1)
                adminApi.post('company-project-program-modules/attach_or_detach_companies_with_programs', {
                    company_id: delete_company_id ?? this.tree_item.company_id,
                    program_id: deleted_program_id ?? this.tree_item.program_id,
                    action,
                }).then((res) => {

                    setTimeout(() => {
                        Swal.fire({
                            icon: "success",
                            text: `${action == 'attach' ? this.$t("general.Addedsuccessfully") : this.$t("general.Deleted")}`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }, 500);
                    this.re_arrange_companies_node(delete_company_id ?? this.tree_item.company_id)

                    this.$nextTick(() => {
                        this.$v.$reset();
                    });
                }).catch((err) => {
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

        setModuleDataForEdit(company_id, name, program_node_id, company_program_id, parent_index, module_node) {
            this.tree_item.company_id = company_id;
            this.tree_item.module_node_id = module_node.id;
            this.tree_item.inside_name = name;
            this.tree_item.inside_id = program_node_id;
            this.tree_item.program_id = program_node_id;
            this.tree_item.company_program_id = company_program_id;
            this.tree_item.parent_index = parent_index;
            this.tree_item.inside_type = 'program';
            this.tree_item.type = 'module';
            this.action = 'edit_module';
            this.tree_item.document_types = [];

            module_node.document_types.forEach((element) => {
                this.tree_item.document_types.push(element.id)
            })
            this.tree_item.out_site = module_node.out_site,
                this.tree_item.allowed_employee = module_node.allowed_employee,
                this.tree_item.module_id = module_node.project_program_module.id,
                this.tree_item.allowed_users_no = module_node.allowed_users_no,
                this.tree_item.start_date = formatDateTime(module_node.start_date),
                this.tree_item.end_date = module_node.end_date

                    ? formatDateTime(module_node.end_date)
                    : null;
            this.tree_item.custom_date_start = new Date(module_node.start_date),

                this.tree_item.custom_date_end = module_node.end_date
                    ? new Date(module_node.end_date)
                    : null;
            this.tree_item.is_web = module_node.is_web,
                this.tree_item.status = module_node.status
        }

    },



}
</script>

<style scoped lang="scss">
#myUL {
    list-style-type: none;
}

#myUL {
    margin: 0;
    padding: 0;

    span {
        i {
            padding: 2px;
            background-color: #6dc6f5;
            color: #fff;
            border-radius: 50%;
            font-size: 18px;
            line-height: 17px;
            font-weight: 600;
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
    color: #0a15df;
    font-size: 24px;
    font-weight: bold;
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
            font-size: 19px;
            font-weight: bold;
        }
    }
}

.tooltip-inner {
    max-width: 750px !important;
    background-color: #eed900;
    color: black;
}

li {
    list-style: none !important;
}
</style>
