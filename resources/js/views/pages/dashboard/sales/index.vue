<script>
import Layout from "../../../layouts/main";

import WidgetChart from "../../../../components/widgets/Widget-chart";
import PageHeader from "../../../../components/Page-header";
import RevenueReport from "../../../../components/widgets/Revenue-report";
import ProductsSales from "../../../../components/widgets/Products-sales";
import MarketingReports from "../../../../components/widgets/Marketing-reports";
import Portlet from "../../../../components/widgets/Portlet";
import RevenueHistory from "../../../../components/widgets/Revenue-history";
import Projections from "../../../../components/widgets/Projections";
import LastCompanies from "./last-companies";
import {formatDateOnly} from "../../../../helper/startDate";
import adminApi from "../../../../api/adminAxios";
import Swal from "sweetalert2";
import {dynamicSortString} from "../../../../helper/tableSort";

/**
 * Sales-Dashboard component
 */
export default {
  page: {
    title: "Admin-Dashboard",
      meta: [{ name: "Admin Dashboard", content: 'Admin Dashboard' }],
  },
  components: {
    Layout,
    WidgetChart,
    PageHeader,
    RevenueReport,
    ProductsSales,
    MarketingReports,
    Portlet,
    RevenueHistory,
    Projections,
      LastCompanies
  },
    mounted() {
        this.getData();
    },
  data() {
    return {
      title: "Welcome !",
      items: [
        {
          text: "Minton",
        },
        {
          text: "Dashboards",
        },
        {
          text: "Sales",
          active: true,
        },
      ],
      tableTitle: "Top Selling Products",
      productData: [
        {
          name: "ASOS Ridley High Waist",
          price: "$79.49",
          quantity: 82,
          amount: "$6,518.18",
          date: "Sep 1, 2018",
          sales: 54,
          productid: 200125,
        },
        {
          name: "Marco Lightweight Shirt",
          price: "$128.50",
          quantity: 37,
          amount: "$4,754.50",
          date: "Sep 15, 2018",
          sales: 28,
          productid: 200130,
        },
        {
          name: "Half Sleeve Shirt",
          price: "$39.99",
          quantity: 64,
          amount: "$2,559.36",
          date: "Nov 1, 2018",
          sales: 55,
          productid: 200140,
        },
        {
          name: "Lightweight Jacket",
          price: "$20.00",
          quantity: 184,
          amount: "$3,680.00",
          date: "Nov 15, 2018",
          sales: 85,
          productid: 200250,
        },
        {
          name: "Marco Shoes",
          price: "$28.49",
          quantity: 69,
          amount: "$1,965.81",
          date: "Jan 1, 2019",
          sales: 49,
          productid: 200256,
        },
        {
          name: "ASOS Ridley High Waist",
          price: "$79.49",
          quantity: 82,
          amount: "$6,518.18",
          date: "Sep 1, 2018",
          sales: 54,
          productid: 200125,
        },
        {
          name: "Half Sleeve Shirt",
          price: "$39.99",
          quantity: 64,
          amount: "$2,559.36",
          date: "Nov 1, 2018",
          sales: 55,
          productid: 200140,
        },
        {
          name: "Lightweight Jacket",
          price: "$20.00",
          quantity: 184,
          amount: "$3,680.00",
          date: "Nov 15, 2018",
          sales: 85,
          productid: 200250,
        },
      ],
        latestCompanies:[],
      widgetData: [],
    };
  },
    methods: {
        /**
         *  get Data document type
         */
        getData() {
            this.isLoader = true;
            adminApi
                .get(
                    `/statics`
                )
                .then((res) => {
                    let l = res.data;
                    this.latestCompanies = l.data.latest_companies;
                    this.widgetData = [
                        {
                            number: l.data.companies,
                            text: "Companies",
                            chartColor: "#1abc9c",
                        },
                        {
                            number: l.data.partners,
                            text: "Partners",
                            chartColor: "#3bafda",
                        },
                        {
                            number: l.data.modules,
                            text: "Modules",
                            chartColor: "#f672a7",
                        },
                    ]
                    console.log(l.data)
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: `${this.$t("general.Error")}`,
                        text: `${this.$t("general.Thereisanerrorinthesystem")}`,
                    });
                })
                .finally(() => {
                    this.isLoader = false;
                });
        },
    },

};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
      <div class="row">
          <div v-for="widget in widgetData"
               :key="widget.text" class="col-xl-4 col-md-6">
              <div class="widget-simple text-center card">
                  <div class="card-body">
                      <h3 class="text-success counter mt-0">{{ widget.number }}</h3>
                      <p class="text-muted mb-0">{{ widget.text }}</p>
                  </div>
              </div>
          </div>
      </div>
<!--    <div class="row">-->
<!--      <div-->
<!--        v-for="widget in widgetData"-->
<!--        :key="widget.text"-->
<!--        class="col-xl-3 col-md-6"-->
<!--      >-->
<!--        <WidgetChart-->
<!--          :number="widget.number"-->
<!--          :text="widget.text"-->
<!--          :chart-color="widget.chartColor"-->
<!--        />-->
<!--      </div>-->
<!--      &lt;!&ndash; end col &ndash;&gt;-->
<!--    </div>-->
    <!-- end row -->
<!--    <div class="row">-->
<!--      <div class="col-xl-4 col-lg-6">-->
<!--        <RevenueReport />-->
<!--      </div>-->
<!--      &lt;!&ndash; end col &ndash;&gt;-->
<!--      <div class="col-xl-4 col-lg-6">-->
<!--        <ProductsSales />-->
<!--      </div>-->
<!--      &lt;!&ndash; end col &ndash;&gt;-->
<!--      <div class="col-xl-4 col-lg-6">-->
<!--        <MarketingReports />-->
<!--      </div>-->
<!--      &lt;!&ndash; end col &ndash;&gt;-->
<!--    </div>-->
    <!-- end row -->
<!--    <div class="row">-->
<!--      &lt;!&ndash; Table &ndash;&gt;-->
<!--      <div class="col-xl-12">-->
<!--        <Portlet :headertitle="tableTitle">-->
<!--          <div class="card-body pt-0">-->
<!--            <div class="table-responsive mb-0">-->
<!--              <table class="table table-hover table-centered mb-0">-->
<!--                <thead>-->
<!--                  <tr>-->
<!--                    <th>Product Id</th>-->
<!--                    <th>Product Name</th>-->
<!--                    <th>Price</th>-->
<!--                    <th>Quantity</th>-->
<!--                    <th>Amount</th>-->
<!--                    <th>Date</th>-->
<!--                    <th>Sales</th>-->
<!--                  </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                  <tr v-for="sellingData in productData" :key="sellingData.id">-->
<!--                    <td>{{ sellingData.productid }}</td>-->
<!--                    <td>{{ sellingData.name }}</td>-->
<!--                    <td>{{ sellingData.price }}</td>-->
<!--                    <td>{{ sellingData.quantity }}</td>-->
<!--                    <td>{{ sellingData.amount }}</td>-->
<!--                    <td>{{ sellingData.date }}</td>-->
<!--                    <td>{{ sellingData.sales }}</td>-->
<!--                  </tr>-->
<!--                </tbody>-->
<!--              </table>-->
<!--            </div>-->
<!--          </div>-->
<!--        </Portlet>-->
<!--      </div>-->
<!--    </div>-->
    <!-- end row -->
    <div class="row">
      <div class="col-xl-12">
        <LastCompanies :companies="latestCompanies" />
      </div>
      <!-- end col -->
<!--      <div class="col-xl-4">-->
<!--        <Projections />-->
<!--      </div>-->
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
