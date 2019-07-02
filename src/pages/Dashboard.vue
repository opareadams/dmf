<template>
  <div id="pageDashboard">

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="startDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="dateRange.start_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateRange.start_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="updateStartDate(dateRange.start_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="endDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="End Date"
              v-model="dateRange.end_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateRange.end_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="regenerateSummaryReport(dateRange.end_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.totalOrders"
            sub-title="Total Orders"
            color="light-blue"  
            icon="fa-list-ul"    
          >
          </mini-statistic>  
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.pendingOrders"
            sub-title="Pending Orders"
            color="orange"   
            icon="fa fa-clock-o"   
          >
          </mini-statistic>           
        </v-flex>          
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.deliveredOrders"
            sub-title="Orders Delivered"
            color="green" 
            icon="motorcycle"        
          >
          </mini-statistic>            
        </v-flex>        
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.revenue"
            sub-title="Total Revenue (GHS)"
            color="indigo" 
            icon="fa-money"             
          >
          </mini-statistic>             
        </v-flex>   
        <!-- mini statistic  end -->   
        <!-- Circle statistic -->
        <v-flex lg4 sm12 xs12 >
          <v-card>
            <v-card-title>
              <div class="layout row ma-0 justify-space-between pb-1">
                <div class="subheading">Pending Orders</div>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="justify-center row layout ma-0">
                <v-progress-circular
                  :size="150"
                  :width="15"
                  :rotate="-90"
                  :value="pendingOrdersPieChart"
                  color="orange"
                >
                  {{ pendingOrdersPieChart }}
                </v-progress-circular>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="caption">Total Amount: GHS {{ pendingOrdersAmount }}</div>
            </v-card-actions>
          </v-card>              
        </v-flex>  

        <v-flex lg4 sm12 xs12 >
          <v-card>
            <v-card-title>
              <div class="layout row ma-0 justify-space-between pb-1">
                <div class="subheading">Cancelled Orders</div>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="justify-center row layout ma-0">
                <v-progress-circular
                  :size="150"
                  :width="15"
                  :rotate="-90"
                  :value="cancelledOrdersPieChart"
                  color="red"
                >
                  {{ cancelledOrdersPieChart }}
                </v-progress-circular>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="caption">Total Amount: GHS {{ cancelledOrdersAmount }}</div>
            </v-card-actions>
          </v-card>              
        </v-flex>  

        <v-flex lg4 sm12 xs12 >
          <v-card>
            <v-card-title>
              <div class="layout row ma-0 justify-space-between pb-1">
                <div class="subheading">Delivered Orders</div>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="justify-center row layout ma-0">
                <v-progress-circular
                  :size="150"
                  :width="15"
                  :rotate="-90"
                  :value="deliveredOrdersPieChart"
                  color="success"
                >
                  {{ deliveredOrdersPieChart }}
                </v-progress-circular>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="caption">Total Amount: GHS {{ deliveredOrdersAmount }}</div>
            </v-card-actions>
          </v-card>              
        </v-flex> 

        <!-- Recent Orders -->
        <v-flex lg12 sm12 xs12 >
          <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title><h4>Recent Orders</h4></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>      
            </v-toolbar>
            <v-divider></v-divider>
            <v-data-table
              :headers="headers"
              :items="orders"
              :loading="loading"
              hide-actions
              class="elevation-0 table-striped"
            >
              <template slot="items" slot-scope="props">
                <td>
                    <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white"> </v-chip>
                </td>
                <td class="text-xs-right">
                  {{ props.item.orderId }}     
                </td>
                <td class="text-xs-left">
                  <template v-for="(item) in props.item.lineItems">
                    <v-list-tile-sub-title :key="item.id" >- {{item.name}} (x{{item.quantity}})  </v-list-tile-sub-title>
                  </template>  
                  <v-chip label color="pink" text-color="white" v-show="props.item.customerNote !== '' ">
                    <v-icon left>label</v-icon> NB: {{props.item.customerNote}} 
                  </v-chip>                
                </td>
                <td class="text-xs-left">{{ props.item.shipping[0].first_name + ' ' +props.item.shipping[0].last_name }}</td>
                <td class="text-xs-left">{{ props.item.paymentMethodTitle }}</td>
                <td class="text-xs-left">
                  <div v-show="props.item.shipping[0].address_1" >                  
                    {{props.item.shipping[0].address_1}} 
                  </div>
                  <div v-show="props.item.shipping[0].address_2">                  
                     {{props.item.shipping[0].address_2}} 
                  </div>
                  <div v-show="props.item.shipping[0].city">                  
                    {{props.item.shipping[0].city}} 
                  </div>
                  <div>
                    <v-chip color="green" text-color="white" v-show="props.item.zone != null ">
                      <v-icon left>location_on</v-icon> {{props.item.zone}}
                    </v-chip>
                  </div>
                </td>
                <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
                <td class="text-xs-right">
                  <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                  <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon>
                <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
              </template>
              <template v-slot:footer>
                <td :colspan="headers.length">
                    <v-chip label small color="red" text-color="white">cancelled</v-chip>
                    <v-chip label small color="green" text-color="white">completed</v-chip>
                    <v-chip label small color="rgb(251, 188, 52)" text-color="white">processing</v-chip>
                    <v-chip label small color="rgb(251, 188, 52)" text-color="white">pending</v-chip>
                    <v-chip label small color="indigo" text-color="white">on-hold</v-chip>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>  
        <!-- Recent Payments -->
       <!-- <v-flex lg12 sm12 xs12>
          <plain-table></plain-table>
        </v-flex> -->

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import PostListCard from '@/components/widgets/card/PostListCard';
import ProfileCard from '@/components/widgets/card/ProfileCard';
import PostSingleCard from '@/components/widgets/card/PostSingleCard';
import WeatherCard from '@/components/widgets/card/WeatherCard';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import VCircle from '@/components/circle/VCircle';
import BoxChart from '@/components/widgets/chart/BoxChart';
import ChatWindow from '@/components/chat/ChatWindow';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';
import DMFWebService from '@/services/DMFWebService';
import moment from 'moment';

export default {
  components: {
    VWidget,
    MiniStatistic,
    ChatWindow,
    VCircle,
    WeatherCard,
    PostSingleCard,
    PostListCard,
    ProfileCard,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder    
  },
  data: () => ({
    orders:[],
    summary:[],
    dateRange: {
      start_date: '2019-01-01',
      end_date:'2019-12-01'
    },
    totalOrders: 0,
    pendingOrders: "0",
    deliveredOrders: "0",
    revenue: "0",
    deliveredOrdersAmount: "0",
    pendingOrdersPieChart: "0",
    pendingOrdersAmount: "0",
    deliveredOrdersPieChart:"0",
    cancelledOrdersAmount:"0",
    cancelledOrdersPieChart:"0",
    color: Material,
    selectedTab: 'tab-1', 
    loading: false,
    startDateMenu:false,
    endDateMenu: false,
    headers: [
       {
        text: '',
        value: 'status'
       },
        {
          text: 'Order #',
          align: 'right',
          sortable: true,
          value: 'orderId'
        },
        { text: 'Order Details' , value: 'lineItems'},
        { text: 'Customer', value: 'shipping'},
        { text: 'Payment Method' , value: 'paymentMethodTitle'},
        { text: 'Delivery Address', value: 'shipping' , align: 'left'},
        { text: 'Delivery Date', value: 'deliveryDate' , align: 'right'},
        { text: 'Packaged', value: 'packaged', align: 'right'},
        { text: 'Amount (GHS)', value: 'total' , align: 'right'},
        { text: 'Date/Time' , value: 'createdAt' , align: 'right'}
      ], 
    colors: {
        processing: 'rgb(251, 188, 52)',
        pending: 'rgb(251, 188, 52)',
        'on-hold': 'indigo',
        cancelled: 'red',
        completed: 'green',
        true: 'green',
        false: 'rgb(251, 188, 52)'
    }
  }),
  beforeCreate(){
    if (localStorage.ROLE_ID  !=  '1' || localStorage.TOKEN) {
      
    }else{
        this.$router.replace({ path: '/login' });
    }
  },
  created(){
    this.getSummary();
    this.getRecentOrders();
  },
  methods: {
      getSummary(){
        DMFWebService.orders.getOrderSummary(this.dateRange.start_date, this.dateRange.end_date).then((response) => {
          if (response.data.data.length == 0) {
              this.totalOrders = '0';
              this.pendingOrders = '0';
              this.deliveredOrders = '0';
              this.deliveredOrdersAmount = '0';
              this.pendingOrdersAmount = '0';
              this.cancelledOrdersAmount = '0';
              this.revenue = '0';
              this.pendingOrdersPieChart = 0.00;
              this.deliveredOrdersPieChart = 0.00;
              this.cancelledOrdersPieChart = 0.00;
              return;
          }               
          
          this.totalOrders = 0;
          this.summary = response.data.data;

          /**
           * Get Pending Orders Summary
           */
          const pendingOrdersSummary = this.summary.find(function(element) {
            return element._id.status == "pending";
          });

          if (pendingOrdersSummary != null) {
            this.pendingOrders = pendingOrdersSummary.count.toString();
            this.pendingOrdersAmount = pendingOrdersSummary.total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.totalOrders += pendingOrdersSummary.count;
          }


          /**
           * Get Cancelled Orders Summary
           */
          const cancelledOrdersSummary = this.summary.find(function(element) {
            return element._id.status == "cancelled";
          });

          if (cancelledOrdersSummary != null) {
            this.cancelledOrdersAmount = cancelledOrdersSummary.total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.totalOrders += cancelledOrdersSummary.count;
          }

          /**
           * Get Completed Orders Summary
           */
          const completedOrdersSummary = this.summary.find(function(element) {
            return element._id.status == "completed";
          });
          
          if (completedOrdersSummary != null) {
            this.totalOrders += completedOrdersSummary.count;
          }

          /**
           * Get Delivered Orders Summary
           */
          const deliveredOrdersSummary = this.summary.find(function(element) {
            return element._id.status == "delivered";
          });


          if (deliveredOrdersSummary != null) {
            this.deliveredOrders = deliveredOrdersSummary.count.toString();
            this.deliveredOrdersAmount = deliveredOrdersSummary.total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.revenue = (deliveredOrdersSummary.total_amount + completedOrdersSummary.total_amount).toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.totalOrders += deliveredOrdersSummary.count;
          } else {
            this.deliveredOrders = 0;
            this.revenue = completedOrdersSummary.total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
          }
          
          this.pendingOrdersPieChart = ((parseInt(this.pendingOrders)/ this.totalOrders)*100).toFixed(2);
          this.deliveredOrdersPieChart = (( parseInt(this.deliveredOrders) / this.totalOrders)*100).toFixed(2);
          this.cancelledOrdersPieChart = (( cancelledOrdersSummary.count / this.totalOrders)*100).toFixed(2);
          this.totalOrders = this.totalOrders.toString();
        })
      },
      getRecentOrders(){
        this.loading = true;
        DMFWebService.orders.listAllOrdersWithPagination().then((response) => {
          for(var i =0 ; i < response.data.data.orders.length; i++){
                this.orders.push(response.data.data.orders[i])
          }
          this.loading = false;
        })

      },
      getColorByStatus (status) {
        return this.colors[status];
      },
      updateStartDate (newStartDate) {
        this.dateRange.start_date = newStartDate; 
        this.startDateMenu = false;       
      },
      regenerateSummaryReport (newEndDate) {
        this.dateRange.end_date = newEndDate;
        this.endDateMenu = false;  
        this.getSummary();
      },
      moment: function () {
        return moment();
      }
  },
  filters: {
    moment: function (date) {
      return moment(date).startOf('hour').fromNow();
    }
  }
};
</script>
