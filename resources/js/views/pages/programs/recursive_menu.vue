<template>


    <ul v-if="menu.length > 0" class="nested list-unstyled">
    <li v-for="(item,index) in menu" :key="item.id" style="margin: 0 25px;">
    <span>
        <i   :class="[item.icon ?? 'fab fa-medium-m']" style="color:#000000;    font-size: 15px;
            background: #ff6868;
            padding: 3px;
            border-radius: 50%;"> </i>
        <!-- @click="clickOnMenuToCollapseChildrens(index)" -->
            <!-- item.collapsed ?  'fas fa-minus' : 'fas fa-plus' -->
            <!-- @click="clickOnMenuItemToAddInside(item)" -->

        <span style="font-size:18px;font-weight:bold">

        {{ $i18n.locale == "ar" ? item.name : item.name_e}} <b style="font-size:12px;">(  {{$t('general.IdSort') + " " + item.sort }} )</b>
        </span>

    </span>

    <tree_item_action :node_index="index" :program_index="program_index"
      :program_id="item.parent_id"
      :node_type="'module'"
      :node_id="item.id"
      :node_name="$i18n.locale == 'ar' ? item.name : item.name_e"
      :name_ar="item.name"
      :name_en="item.name_e"
      :sort="item.sort"
      :module_dashboard_id="item.module_dashboard_id"
      :icon="''"
      />

    <!-- <recursive_menu v-show="item.collapsed == 1" :menu="item.childrens" :tree_item="tree_item" :program_index="program_index"/> -->
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
    program_index: {
        required: true
    }
  },
  methods:{
    // clickOnMenuToCollapseChildrens(index){
    //     this.$set(this.menu[index], 'collapsed',!this.menu[index]['collapsed'] ? 1 : 0)
    // },
    // clickOnMenuItemToAddInside(item){
    //     this.tree_item.inside_name = this.$i18n.locale == 'ar' ? item.name : item.name_e;
    //     this.tree_item.inside_id = item.id;
    //     this.tree_item.program_id = item.program_id;
    //     this.tree_item.inside_type = 'folder'
    //     this.$emit('update_tree',this.tree_item)

    // }

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
