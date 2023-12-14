<template>
  <Layout>
    <PageHeader />
    <div class="row">
      <div class="col-12">
        <div class="card" style="background-color: #dff0fe;">
          <div class="card-body">
            <div class="row justify-content-between align-items-center mb-2">
              <h4 class="header-title">{{ $t("general.Module Tree") }}</h4>
              <div class="col-xs-10 col-md-9 col-lg-7" style="font-weight: 500">
                <div class="d-inline-block" style="width: 22.2%">

                </div>

                <div
                  class="d-inline-block position-relative"
                  style="width: 77%"
                >
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

            <div
              class="row justify-content-between align-items-center mb-2 px-1"
            >
              <div class="col-md-3 d-flex align-items-center mb-1 mb-xl-0">
                <b-button
                  v-b-modal.create_or_edit
                  data-action="create"
                  variant="primary"
                  class="btn-sm mx-1 font-weight-bold click_on_modal_button"
                >
                  {{ $t("general.Create New Module") }}
                  <i class="fas fa-plus"></i>
                </b-button>

                </div>

                <create_new_module @add_new_module="add_new_module_event" @updated_module="updated_module_event" @update_page_or_folder="update_page_or_folder_event"/>
            </div>



            <!-- start .table-responsive-->
            <div
              class="mb-3 custom-table-theme position-relative"
            >
              <!--       start loader       -->
              <loader size="large" v-if="isLoader" />
              <!--       end loader       -->


              <div class="row">




                      <div class="col-9 pt-3" :class="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
                            <ul id="myUL">
                                <li v-for="(node,index) in modules" :key="node.id" style="margin: 0 25px;">
                                  <span>
                                    <i
                                        :class="
                                        node.collapsed
                                          ? 'fas fa-minus' : 'fas fa-plus'
                                      "
                                      @click="collapse_module(node.id,index)"
                                      :style="[node.is_active  == 'active'? '' : 'background-color:#a4a5a5!important']"
                                    ></i>
                                    <span
                                        @click="tree_item.inside_name = $i18n.locale == 'ar' ? node.name : node.name_e;tree_item.inside_id = node.id;tree_item.module_id = node.id;tree_item.inside_type = 'module'"
                                        :class="{
                                        'without-children': !node.haveChildren,
                                        active: node.id == tree_item.inside_id && tree_item.inside_type == 'module',
                                      }"
                                    >
                                    <i :class="node.icon" v-show="node.icon" style="background:none!important;color:#000"></i>
                                      {{ $i18n.locale == "ar" ? node.name : node.name_e }}


                                    </span>



                                   <tree_item_action :node_index="index" :module_index="index"
                                    :node_type="'module'"
                                    :module_id="node.id" :node_id="node.id"
                                    :node_name=" $i18n.locale == 'ar' ? node.name : node.name_e"
                                    :name_ar="node.name"
                                    :module_dashboard_id="node.module_dashboard_id"
                                    :name_en="node.name_e"
                                    :icon="node.icon"
                                   />


                                </span>

                                    <recursive_menu :tree_item="tree_item" :menu="node.childrens" :module_index="index" v-if="node.collapsed && Object.keys(node.childrens ?? []).length" />

                              </li>
                           </ul>
                      </div>


                      <div class="col-3 px-3" v-if="tree_item.inside_id > 0 ">

                        <h4>{{ $t('general.Add inside')  + " ( " + tree_item.inside_name + " )"  }}</h4>


                        <div
                              class="custom-control custom-radio custom-control-inline "
                            >
                              <input
                                type="radio"
                                id="customRadio2"
                                name="customRadio"
                                value="folder"
                                v-model="tree_item.type"
                                class="custom-control-input"
                              />
                              <label
                                class="custom-control-label font-16"
                                for="customRadio2"
                                >{{ $t('general.Add Folder') }}</label
                              >
                            </div>
                        <div
                              class="custom-control custom-radio custom-control-inline mb-2"
                            >
                              <input
                                type="radio"
                                id="customRadio1"
                                name="customRadio"
                                value="page"
                                v-model="tree_item.type"
                                class="custom-control-input"
                              />
                              <label
                                class="custom-control-label font-16"
                                for="customRadio1"
                                >{{ $t('general.Add Page') }}</label
                              >
                            </div>


                        <template v-if="tree_item.type == 'page'">
                          <div class="row">
                            <div class="col-12">
                              <div class="position-relative">
                                <div class="form-group">
                                  <label class="my-1 mr-2">{{
                                    $t("general.screens")
                                  }}</label>
                                  <multiselect
                                    @search-change="asyncFindScreen"
                                    v-model="tree_item.page_id"
                                    :options="screens_limit.map((type) => type.id)"
                                    :custom-label="customLabelFunction"
                                    :class="{
                                      'is-invalid':
                                        $v.tree_item.page_id.$error ||
                                        errors.page_id,
                                    }"
                                  >
                                  </multiselect>
                                  <div
                                    v-if="!$v.tree_item.page_id.required"
                                    class="invalid-feedback"
                                  >
                                    {{ $t("general.fieldIsRequired") }}
                                  </div>

                                  <template v-if="errors.page_id">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.page_id"
                                      :key="index"
                                      >{{ errorMessage }}</ErrorMessage
                                    >
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                        <template v-if="tree_item.type == 'folder'">
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
                                  v-model="$v.tree_item.name.$model"
                                  :class="{
                                    'is-invalid':
                                      $v.tree_item.name.$error || errors.name,
                                    'is-valid':
                                      !$v.tree_item.name.$invalid && !errors.name,
                                  }"

                                  id="field-1"
                                />
                                <div
                                  v-if="!$v.tree_item.name.minLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.tree_item.name.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div
                                  v-if="!$v.tree_item.name.maxLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.tree_item.name.$params.maxLength.max }}
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
                                  v-model="$v.tree_item.name_e.$model"
                                  :class="{
                                    'is-invalid':
                                      $v.tree_item.name_e.$error || errors.name_e,
                                    'is-valid':
                                      !$v.tree_item.name_e.$invalid &&
                                      !errors.name_e,
                                  }"
                                  id="field-2"
                                />
                                <div
                                  v-if="!$v.tree_item.name_e.minLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatleast") }}
                                  {{ $v.tree_item.name_e.$params.minLength.min }}
                                  {{ $t("general.letters") }}
                                </div>
                                <div
                                  v-if="!$v.tree_item.name_e.maxLength"
                                  class="invalid-feedback"
                                >
                                  {{ $t("general.Itmustbeatmost") }}
                                  {{ $v.tree_item.name_e.$params.maxLength.max }}
                                  {{ $t("general.letters") }}
                                </div>
                                <template v-if="errors.name_e">
                                  <ErrorMessage
                                    v-for="(
                                      errorMessage, index
                                    ) in errors.name_e"
                                    :key="index"
                                    >{{ $t(errorMessage) }}</ErrorMessage
                                  >
                                </template>
                              </div>
                            </div>

                          </div>
                        </template>


                        <div class="">
                              <div class="form-group">
                                <label for="field-33" class="control-label">
                                  {{ $t("general.IdSort") }}
                                </label>
                                <div>
                                  <input
                                    type="number"
                                    class="form-control"
                                    data-create="2"
                                    v-model="tree_item.sort"
                                    id="field-33"
                                  />

                                  <div
                                    v-if="!$v.tree_item.sort.required"
                                    class="invalid-feedback"
                                  >
                                    {{ $t("general.fieldIsRequired") }}
                                  </div>
                                  <template v-if="errors.sort">
                                    <ErrorMessage
                                      v-for="(
                                        errorMessage, index
                                      ) in errors.sort"
                                      :key="index"
                                      >{{ $t(errorMessage) }}
                                    </ErrorMessage>
                                  </template>
                                </div>
                              </div>
                            </div>



                        <div class="row justify-content-center mt-2">
                            <!-- disabled button -->
                            <b-button
                              variant="success"
                              type="submit"
                              class="mx-1"
                              v-if="((($v.tree_item.page_id.$error ||
                                          $v.tree_item.name.$error|| $v.tree_item.name_e.$error) && (tree_item.name || tree_item.name_e || tree_item.page_id > 0)) || (!tree_item.name && !tree_item.name_e && !tree_item.page_id))"
                              disabled
                            >
                              {{ $t("general.Add") }}
                            </b-button>


                            <template v-else>
                                <b-button
                                    variant="success"
                                    type="submit"
                                    class="mx-1"

                                    v-if="!isLoader"
                                    @click.prevent="AddNewMenuItem"
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
                            </template>

                        </div>

                      </div>
                    </div>




            </div>
            <!-- end .table-responsive-->
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "../../../components/Page-header";
import adminApi from "../../../api/adminAxios";
import Switches from "vue-switches";

import {
  required,
  minLength,
  maxLength,
  integer,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import ErrorMessage from "../../../components/widgets/errorMessage";
import loader from "../../../components/loader";
import Multiselect from "vue-multiselect";
import Templates from "../email/templates.vue";
import { arabicValue, englishValue } from "../../../helper/langTransform";
import recursive_menu  from "./recursive_menu";
import tree_item_action  from "./tree_item_action";
import create_new_module  from "./create_new_module";
/**
 * Advanced Table component
 */
export default {
  page: {
    title: "Module",
    meta: [{ name: "description", content: "Module" }],
  },
  components: {
    Layout,
    PageHeader,
    Switches,
    tree_item_action,
    create_new_module,
    recursive_menu,
    ErrorMessage,
    loader,
    Multiselect,
    Templates,
  },

  data() {
    return {
      per_page: 50,
      debounce: "",
      search: "",
      debounce: {},
      screens_limit: [],
      old_modules: [],
      modules: [],
      isLoader: false,
      mouseEnter: "",
      current_id: null,
      sort: 0,
      tree_item: {
        inside_type: '',
        inside_name:'',
        sort: 0,
        module_id:0,
        inside_id:0,
        type: 'folder',
        name: "",
        name_e: "",
        page_id: 0,
      },
      setting: {
        name: true,
        name_e: true,
        is_active: true,
        parent_id: true,
        type: true,
      },
      filterSetting: ["name", "name_e"],
      errors: {},

      is_disabled: false,
    };
  },
  validations: {
    tree_item: {
      name: { required($value){
        return this.tree_item.type == 'folder' ? $value : true ;
      }, minLength: minLength(3), maxLength: maxLength(100) },
      name_e: {
        required($value){
            return this.tree_item.type == 'folder' ? $value : true ;
        },
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      page_id: {required($value){
        return this.tree_item.type == 'page' ? $value : true ;
      }},
      sort: {required},

    },
    menu_folder: { required },

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
      this.debounce = setTimeout(async() => {
        this.old_modules = this.modules
        await this.getData();

      }, 900);
    },
    /**
     * watch check All table
     */

  },
  created() {
    this.$on('update_tree', (tree_item) => {
        this.tree_item = tree_item;
    })

  },
   mounted() {
    this.getData();
    this.getLimitScreens('');
    this.init_to_delete_tree_item();
  },
  methods: {
    add_new_module_event(new_module){
        this.modules.unshift(new_module);
    },
    updated_module_event(updated_module){
        this.modules[updated_module.index]['name'] = updated_module.updated_item.name
        this.modules[updated_module.index]['name_e'] = updated_module.updated_item.name_e
        this.modules[updated_module.index]['icon'] = updated_module.updated_item.icon
    },
    update_page_or_folder_event(updated_item){
        this.afterChangeAnyItemInCollection(updated_item.module_id)
    },
    init_to_delete_tree_item(){
        let object = this
        $(document).on('click','.delete_tree_item',function(){
            let item_id = $(this).data('itemid'),
            item_type = $(this).data('itemtype'),
            item_index=$(this).data('itemindex'),
            item_name=$(this).data('itemname'),
            module_id=$(this).data('moduleid');
            object.deleteTreeItem(item_name,item_index,item_type,item_id,module_id)
        })
    },
    asyncFindScreen(query){

        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
            this.getLimitScreens(query)
        },200)
    },
    customLabelFunction(opt){
        if(opt && this.screens_limit.length > 0){
            let lable =  this.screens_limit.find((x) => x.id == opt)
            return lable ? (this.$i18n.locale == 'ar' ? lable.title : lable.title_e) : ''
        }
        return '';

    },
    async getLimitScreens(search) {
        if(this.tree_item.page_id == null){
            this.tree_item.page_id = 0
        }

      await adminApi
        .get(`/screens?per_page=30&search=${search}&columns[1]=name_e&columns[2]=name&selected_screen_id=${this.tree_item.page_id}`)
        .then((res) => {
          this.screens_limit = res.data.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        });
    },
    collapse_module(mod_id,index){
        this.$set(this.modules[index], 'collapsed',!this.modules[index]['collapsed'] ? 1 : 0)
        if(!this.modules[index]['childrens'])
            this.get_children_inside_module(mod_id,index,'collapse_module')
    },
    async get_children_inside_module(mod_id,index,action) {
        await adminApi
        .get(`/project-program-modules/get_children_inside_module/${mod_id}?search=${this.search}`)
        .then((res) => {
            if(action == 'collapse_module')
            this.$set(this.modules[index], 'childrens',res.data.data)
            else if(action =='add_or_update_new_item'){
                this.$set(this.modules[index], 'collapsed', 1)
                this.$set(this.modules[index], 'childrens',this.re_arrange_childrens_in_module(index,res.data.data))
            }

        })
        .catch((err) => {
            console.log(err)
        Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
        });
        });
    },
    re_arrange_childrens_in_module(old_module_index,new_module_menu) {

        let data= []

        new_module_menu.forEach((elment,index) => {
            if(elment.type == 'page'){
                data[index]=elment
            }else{
                let old_elment = this.get_old_elment(elment.id,this.modules[old_module_index].childrens)
                if(old_elment && old_elment.collapsed){
                    elment['collapsed'] = old_elment.collapsed
                }

                if(elment.id == this.tree_item.inside_id && this.tree_item.inside_type == 'folder'){
                    elment['collapsed'] = 1
                }
                if(elment.childrens && elment.childrens.length > 0 ){
                    elment['childrens'] = this.re_arrange_childrens_in_module(old_module_index,elment.childrens)
                }
                data[index]=elment
            }
        })

        return data;

    },
    get_old_elment(id, nestedArray) {
        if(nestedArray)
        for (let i = 0; i < nestedArray.length; i++) {
            const nestedObject = nestedArray[i];
            if (nestedObject.id === id) {
                return nestedObject;
            }

            if (nestedObject.childrens && nestedObject.childrens.length > 0) {
                const foundElement = this.get_old_elment(id, nestedObject.childrens);
                if (foundElement) {
                    return foundElement;
                }
            }
        }

        return null;
    },

    AddNewMenuItem(){
        this.$v.tree_item.$touch();
        if (this.$v.tree_item.$invalid) {
          return;
        } else {
        this.isLoader = true;
        adminApi
            .post(`/project-program-modules/create-new-menu-item`,this.tree_item)
            .then((res) => {
            this.tree_item['sort'] = 1
            this.tree_item['name'] = ''
            this.tree_item['name_e'] = ''
            this.tree_item['page_id'] = 0
            this.afterChangeAnyItemInCollection(res.data.module_id)
            this.errors={}
            this.$v.$reset();
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
    afterChangeAnyItemInCollection(module_id) {
        this.modules.forEach((elment,index) => {
            if(elment.id == module_id){
                this.get_children_inside_module(module_id,index,'add_or_update_new_item')

            }
        })
    },
    deleteTreeItem(node_name,node_index,node_type,node_id,module_id){
        Swal.fire({
          title: `${this.$t("general.Areyousure")} ( ${node_name} )`,
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
              .post(`/project-program-modules/delete_tree_item`,{node_type,node_id})
              .then((res) => {
                if(node_type == 'module')
                    this.modules.splice(node_index ,1)
                else
                    this.afterChangeAnyItemInCollection(module_id)


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

    formatDate(value) {
      return formatDateOnly(value);
    },

    getData() {
      this.isLoader = true;

      let filter = "";
      for (let i = 0; i < this.filterSetting.length; i++) {
        filter += `columns[${i}]=${this.filterSetting[i]}&`;
      }

      adminApi
        .get(
          `project-program-modules?program_modules=1&search=${this.search}&${filter}`
        )
        .then((res) => {
          let l = res.data;
            //   if(this.modules.length == 0)
            this.modules = l.data;
            //   else{
            //     let old_modules = this.modules
            //     this.modules = l.data
            //         l.data.forEach((element,index) => {
            //             this.afterChangeAnyItemInCollection(element.id)
            //         })
            //     }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `${this.$t("general.Error")}`,
            text: `${this.$t("general.Thereisanerrorinthesystem")}`,
          });
        })
        .finally(() => {
            if(this.search.length > 0 || (this.old_modules.length > 0 && this.search.length == 0)){
                this.modules = this.truncate_modules_after_search(this.modules,this.old_modules)
            }
          this.isLoader = false;
        });
    },

    truncate_modules_after_search(new_modules,old_modules){
        let new_filtered_modules=[]
            new_modules.forEach((new_element) =>{
                let matched = 0;
                old_modules.forEach((old_elment) => {
                    if(old_elment.id == new_element.id){
                        matched = 1
                        new_filtered_modules.push(old_elment)
                    }
                })
                if(matched == 0 )
                    new_filtered_modules.push(new_element)

            })

            return new_filtered_modules

    }


  },
};
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
</style>
