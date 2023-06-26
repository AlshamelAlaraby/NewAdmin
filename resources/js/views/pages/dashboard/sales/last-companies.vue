<script>
/**
 * Revenue history component
 */
export default {
    props:{
        companies:{
            type: [],
            required: true,
        }
    },
    data() {
        return {
        };
    }
};
</script>

<template>
<div class="card">
    <div class="card-body">
        <b-dropdown class="float-right" variant="black" right toggle-class="arrow-none card-drop">
<!--            <template v-slot:button-content>-->
<!--                <i class="mdi mdi-dots-horizontal"></i>-->
<!--            </template>-->
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item">Settings</a>
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item">Download</a>
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item">Upload</a>
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item">Action</a>
        </b-dropdown>
        <h4 class="header-title mb-3">{{$t('general.LastCompanies')}}</h4>
        <div class="table-responsive mb-0">
            <table class="table table-borderless table-hover table-centered m-0">
                <thead class="thead-light">
                    <tr class="text-center">
                        <th>{{$t('general.companyName')}}</th>
                        <th>{{$t('navbar.dropdown.megamenu.application.list.email')}}</th>
                        <th>{{$t('general.modulesCount')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in companies" :key="data.id">
                        <td>
                            <h5 class="m-0 font-weight-normal">{{ $i18n.locale=='ar'? data.name:data.name_e }}</h5>
                        </td>
                        <td>{{ data.email }}</td>
                        <td>{{ data.modules_count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- end .table-responsive-->
    </div>
</div>
</template>
