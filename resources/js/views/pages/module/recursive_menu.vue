<template>


    <ul v-if="menu.length > 0" class="nested list-unstyled">
    <li v-for="(item,index) in menu" :key="item.id" style="margin: 0 25px;">
    <span v-if="item.type == 'folder'" style="cursor: pointer;">
        <b style="font-size:12px;">({{ (item.childrens ?? []).length }})</b>
        <i @click="clickOnMenuToCollapseChildrens(index)"  class="fa fa-folder" style="color:#d5aa20;font-size:20px"> </i>
            <!-- item.collapsed ?  'fas fa-minus' : 'fas fa-plus' -->
        <span
            @click="clickOnMenuItemToAddInside(item)"
            :class="{
            'without-children': item.childrens.length == 0 ,
            active: tree_item.inside_type=='folder' && item.id == tree_item.inside_id,
            }"
        >
        {{ $i18n.locale == "ar" ? item.name : item.name_e}} <b style="font-size:12px;">(  {{$t('general.IdSort') + " " + item.sort }} )</b>
        </span>

    </span>

    <span v-else>
            <!-- item.collapsed ?  'fas fa-minus' : 'fas fa-plus' -->
        <i class="fa fa-file" style="color:#000" ></i>
        <span
            :class="{
            'without-children': item.childrens.length == 0 ,
            }"
        >
        {{ $i18n.locale == "ar" ? item.page.title : item.page.title_e }} ( {{$t('general.IdSort') + " " +  item.sort }} )
        </span>

    </span>
    <tree_item_action :node_index="index" :module_index="module_index"
      :module_id="item.module_id"
      :node_type="item.type == 'folder' ? 'folder' :'page'"
      :node_id="item.id"
      :node_name="item.type == 'folder' ? ( $i18n.locale == 'ar' ? item.name : item.name_e) : ($i18n.locale == 'ar' ? item.page.title : item.page.title_e )"
      :name_ar="item.type == 'folder' ?item.name : '' "
      :name_en="item.type == 'folder' ?item.name_e : ''"
      :sort="item.sort"
      :icon="''"
      :module_dashboard_id="0"
      />

    <recursive_menu v-show="item.collapsed == 1" :menu="item.childrens" :tree_item="tree_item" :module_index="module_index"/>
</li>
</ul>


</template>

<script>
import tree_item_action from "./tree_item_action"
export default {
  name: 'recursive_menu',
  components: {
    tree_item_action
  },
  props: {
    menu: {
      type: Array,
      required: true
    },
    tree_item: {
        type:Object,
        required: true
    },
    module_index: {
        required: true
    }
  },
  methods:{
    clickOnMenuToCollapseChildrens(index){
        this.$set(this.menu[index], 'collapsed',!this.menu[index]['collapsed'] ? 1 : 0)
    },
    clickOnMenuItemToAddInside(item){
        this.tree_item.inside_name = this.$i18n.locale == 'ar' ? item.name : item.name_e;
        this.tree_item.inside_id = item.id;
        this.tree_item.module_id = item.module_id;
        this.tree_item.inside_type = 'folder'
        this.$emit('update_tree',this.tree_item)

    }

  }
}
</script>

<style>
.active {
    color: #0a15df;
    font-size: 20px;
    font-weight: bold;
}
</style>
