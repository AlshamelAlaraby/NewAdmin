<template>
    <Layout>
      <PageHeader />
      <div class="row">
        <div class="col-12">
          <div class="card" style="background-color: #dff0fe;">
            <div class="card-body">
              <div class="row justify-content-between align-items-center mb-2">
                <h4 class="header-title">{{ $t("general.Program Tree") }}</h4>
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
                    {{ $t("general.Create New Program") }}
                    <i class="fas fa-plus"></i>
                  </b-button>

                  </div>

                  <create_new_program @add_new_program="add_new_program_event" @updated_program_or_module="updated_program_event" />
              </div>



              <!-- start .table-responsive-->
              <div
                class="mb-3 custom-table-theme position-relative"
              >
                <!--       start loader       -->
                <loader size="large" v-if="isLoader" />
                <!--       end loader       -->

                <div class="row">

                        <div class="col-7 pt-3" :class="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
                              <ul id="myUL">
                                  <li v-for="(node,index) in programs" :key="node.id" style="margin: 0 25px;">
                                    <span>
                                      <i
                                          :class="
                                          node.collapsed
                                            ? 'fas fa-minus' : 'fas fa-plus'
                                        "
                                        @click="collapse_programs(node.id,index)"
                                        :style="[node.is_active  == 'active'? '' : 'background-color:#a4a5a5!important']"
                                      ></i>
                                      <span
                                          @click="tree_item.inside_name = $i18n.locale == 'ar' ? node.name : node.name_e;tree_item.inside_id = node.id;tree_item.program_id = node.id;tree_item.inside_type = 'program'"
                                          :class="{
                                          'without-children': !node.haveChildren,
                                          active: node.id == tree_item.inside_id && tree_item.inside_type == 'program',
                                        }"
                                      >
                                    <i :class="node.icon" v-show="node.icon" style="background:none!important;color:#000"></i>
                                      {{ $i18n.locale == "ar" ? node.name : node.name_e }}


                                      </span>



                                     <tree_item_action :node_index="index" :programs_index="index"
                                      :node_type="'program'"
                                      :program_id="node.id" :node_id="node.id"
                                      :node_name=" $i18n.locale == 'ar' ? node.name : node.name_e"
                                      :name_ar="node.name"
                                      :name_en="node.name_e"
                                      :icon="node.icon"
                                     />


                                  </span>

                                      <recursive_menu :tree_item="tree_item" :menu="node.childrens" :program_index="index" v-show="node.collapsed && Object.keys(node.childrens ?? []).length" />

                                </li>
                             </ul>
                        </div>


                        <div class="col-5 px-3" v-if="tree_item.inside_id > 0 ">

                          <h4>{{ $t('general.Add inside')  + " ( " + tree_item.inside_name + " )"  }}</h4>


                            <div class="row">
                              <div class="col-12">
                                <div class="position-relative">
                                  <div class="form-group">
                                    <label class="my-1 mr-2">{{
                                      $t("menuitems.module.text")
                                    }}</label>
                                    <multiselect
                                      @search-change="asyncFindModule"
                                      v-model="tree_item.module_id"
                                      :options="modules_limit.map((type) => type.id)"
                                      :custom-label="customLabelFunction"
                                      :class="{
                                        'is-invalid':
                                          $v.tree_item.module_id.$error ||
                                          errors.module_id,
                                      }"
                                    >
                                    </multiselect>
                                    <div
                                      v-if="!$v.tree_item.module_id.required"
                                      class="invalid-feedback"
                                    >
                                      {{ $t("general.fieldIsRequired") }}
                                    </div>

                                    <template v-if="errors.module_id">
                                      <ErrorMessage
                                        v-for="(
                                          errorMessage, index
                                        ) in errors.module_id"
                                        :key="index"
                                        >{{ errorMessage }}</ErrorMessage
                                      >
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </div>


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
                                v-if="((($v.tree_item.module_id.$error ||
                                            $v.tree_item.sort.$error) && ( tree_item.sort || tree_item.module_id > 0)) || (!tree_item.sort && !tree_item.module_id))"
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
  import create_new_program  from "./create_new_program";
  /**
   * Advanced Table component
   */
  export default {
    page: {
      title: "Program",
      meta: [{ name: "description", content: "Program" }],
    },
    components: {
      Layout,
      PageHeader,
      Switches,
      tree_item_action,
      create_new_program,
      recursive_menu,
      ErrorMessage,
      loader,
      Multiselect,
      Templates,
    },

    data() {
      return {
        re_arrange_data: 0,
        per_page: 50,
        debounce: "",
        search: "",
        debounce: {},
        modules_limit: [],
        old_programs: [],
        programs: [],
        isLoader: false,
        mouseEnter: "",
        current_id: null,
        sort: 0,
        tree_item: {
          inside_type: '',
          inside_name:'',
          sort: 1,
          module_id:0,
          inside_id:0,
          type: 'module',
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
        module_id: {required},
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
          this.old_programs = this.programs
          await this.getData();

        }, 900);
      },
      /**
       * watch check All table
       */

    },
    created() {
    //   this.$on('update_tree', (tree_item) => {
    //       this.tree_item = tree_item;
    //   })

    },
     mounted() {
      this.getData();
      this.getLimitModules('');
      this.init_to_delete_tree_item();
    },
    methods: {
      add_new_program_event(new_program){
          this.programs.unshift(new_program);
      },
      updated_program_event(data){
        if(data.type == 'program'){
            this.programs.forEach((elemnt,index) =>{
                if(elemnt.id == data.program_id){
                    this.programs[index]['name'] =data.program.name
                    this.programs[index]['name_e'] =data.program.name_e
                    this.programs[index]['icon'] =data.program.icon
                }
            })
        }else
        this.afterChangeAnyItemInCollection(data.program_id)

      },
      init_to_delete_tree_item(){
          let object = this
          $(document).on('click','.delete_tree_item',function(){
              let item_id = $(this).data('itemid'),
              item_type = $(this).data('itemtype'),
              item_index=$(this).data('itemindex'),
              item_name=$(this).data('itemname'),
              program_id=$(this).data('programid');
              object.deleteTreeItem(item_name,item_index,item_type,item_id,program_id)
          })
      },
      asyncFindModule(query){
          clearTimeout(this.debounce)
          this.debounce = setTimeout(() => {
              this.getLimitModules(query)
          },200)
      },
      customLabelFunction(opt){
          if(opt && this.modules_limit.length > 0){
              let lable =  this.modules_limit.find((x) => x.id == opt)
              return lable ? (this.$i18n.locale == 'ar' ? lable.name : lable.name_e) : ''
          }
          return '';

      },
      async getLimitModules(search) {
        if(this.tree_item.module_id == null){
            this.tree_item.module_id = 0
        }
        await adminApi
          .get(`/project-program-modules?program_modules=1&module_child=1&per_page=10&search=${search}&columns[1]=name_e&columns[2]=name&selected_id=${this.tree_item.module_id}`)
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
      collapse_programs(mod_id,index){
          this.$set(this.programs[index], 'collapsed',!this.programs[index]['collapsed'] ? 1 : 0)

      },
      async get_children_inside_programs(index) {
         this.$set(this.programs[index], 'collapsed', 1)
         this.re_arrange_data = 1
         this.old_programs = this.programs
         this.getData()
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
              this.tree_item['module_id'] = 0
              this.afterChangeAnyItemInCollection(res.data.parent_id)
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
      afterChangeAnyItemInCollection(program_id) {
        this.getLimitModules('')
          this.programs.forEach((elment,index) => {
              if(elment.id == program_id){
                  this.get_children_inside_programs(index)
              }
          })
      },
      deleteTreeItem(node_name,node_index,node_type,node_id,program_id){
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
                .post(`/project-program-modules/delete_tree_item`,{node_type,node_id,action:node_type == 'module' ? 'un_assign_module_to_program' : ''})
                .then((res) => {
                  if(node_type == 'program')
                      this.programs.splice(node_index ,1)
                  else
                      this.afterChangeAnyItemInCollection(program_id)


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
            `project-program-modules?program_parent=1&search=${this.search}&${filter}`
          )
          .then((res) => {
            let l = res.data;
              this.programs = l.data;

          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: `${this.$t("general.Error")}`,
              text: `${this.$t("general.Thereisanerrorinthesystem")}`,
            });
          })
          .finally(() => {
              if((this.search.length > 0 || (this.old_programs.length > 0 && this.search.length == 0) ) || this.re_arrange_data ==1 ){
                  this.programs = this.truncate_programs_after_search(this.programs,this.old_programs)
                  this.re_arrange_data =0 ;
              }
            this.isLoader = false;
          });
      },

      truncate_programs_after_search(new_programs,old_programs){
          let new_filtered_programs=[]
              new_programs.forEach((new_element) =>{
                  let matched = 0;
                  old_programs.forEach((old_elment) => {
                      if(old_elment.id == new_element.id){
                          matched = 1
                          old_elment.childrens = new_element.childrens
                          new_filtered_programs.push(old_elment)
                      }
                  })
                  if(matched == 0 )
                      new_filtered_programs.push(new_element)

              })

              return new_filtered_programs

      },

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
