<template>


<div class="btn-group">
    <button
    type="button"
    class="btn btn-sm dropdown-toggle "
    data-toggle="dropdown"
    style="padding: 0;"
    aria-expanded="false"
    >
    <i class="fa fa-exclamation" style="color:#fff;font-size: 13px;border-radius: 50%;background-color: #424242;padding:2px 6px"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-custom">
    <a
        class="dropdown-item click_on_modal_button"
        href="#"
        data-action="edit"
        :data-index="module_index"
        :data-moduledashboardid="module_dashboard_id"
        :data-name="node_name"
        :data-nodeid="node_id"
        :data-type="node_type"
        :data-moduleid="module_id"
        :data-namear="name_ar"
        :data-nameen="name_en"
        :data-sort="sort"
        :data-icon="icon"

        @click="$bvModal.show(`create_or_edit`)"
    >
        <div
        class="d-flex justify-content-between align-items-center text-black"
        >

        <i
            class="fa fa-edit text-info bg-white"
        ></i>
        </div>
    </a>
    <a
        class="dropdown-item text-black delete_tree_item"
        href="#"
        :data-itemid="node_id"
        :data-itemtype="node_type"
        :data-itemindex="node_index"
        :data-itemname="node_name"
        :data-moduleid="module_id"
    >
        <div
        class="d-flex justify-content-between align-items-center text-black"
        >
        <i class="fa fa-trash text-danger bg-white"></i>
        </div>
    </a>
    </div>
</div>

</template>

<script>
export default {
  name: 'tree_item_action',
  props:['node_index','node_id','node_type','node_name','module_id','name_ar','name_en','sort','icon','module_index','module_dashboard_id']

}
</script>


