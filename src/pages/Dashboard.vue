<template>
  <div id="pageDashboard">

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
            :return-value.sync="date"
          >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="dateRange.start_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateRange.start_dat" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
            :return-value.sync="date"
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
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
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
            :title="this.deliveredOrdersAmount"
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
    dateRange: {},
    totalOrders: "0",
    pendingOrders: "0",
    deliveredOrders: "0",
    deliveredOrdersAmount: "0",
    pendingOrdersPieChart: "0",
    pendingOrdersAmount: "0",
    deliveredOrdersPieChart:"0",
    cancelledOrdersAmount:"0",
    cancelledOrdersPieChart:"0",
    color: Material,
    selectedTab: 'tab-1', 
    loading: false,
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
        this.loading = true;
        this.dateRange.start_date = '2019-01-01';        
        this.dateRange.end_date = '2019-12-01';

        DMFWebService.orders.getOrderSummary(this.dateRange).then((response) => {
          for(var i =0 ; i < response.data.data.length; i++){
                  this.summary.push(response.data.data[i])
            }
          this.pendingOrders = this.summary[1].count.toString();
          this.deliveredOrders = this.summary[2].count.toString();
          this.deliveredOrdersAmount = this.summary[2].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
          this.pendingOrdersAmount = this.summary[1].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
          this.cancelledOrdersAmount = this.summary[3].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
        })
      },
      getRecentOrders(){
        DMFWebService.orders.listAllOrdersWithPagination().then((response) => {
          this.totalOrders = response.data.data.totalOrders.toString();
          for(var i =0 ; i < response.data.data.orders.length; i++){
                this.orders.push(response.data.data.orders[i])
          }
          this.pendingOrdersPieChart = ((this.summary[1].count / this.totalOrders)*100).toFixed(2);
          this.deliveredOrdersPieChart = ((this.summary[2].count / this.totalOrders)*100).toFixed(2);
          this.cancelledOrdersPieChart = ((this.summary[3].count / this.totalOrders)*100).toFixed(2);
          this.loading = false;
        })

      },
      getColorByStatus (status) {
        return this.colors[status];
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
