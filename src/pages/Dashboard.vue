<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.totalOrders"
            sub-title="Total Orders"
            color="light-blue"      
          >
          </mini-statistic>  
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.pendingOrders"
            sub-title="Pending Orders"
            color="orange"      
          >
          </mini-statistic>           
        </v-flex>          
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.deliveredOrders"
            sub-title="Orders Delivered"
            color="green"      
          >
          </mini-statistic>            
        </v-flex>        
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            :title="this.deliveredOrdersAmount"
            sub-title="Total Revenue (GHS)"
            color="indigo"      
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
                  {{ pendingOrdersPieChart.toFixed(2) }}
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
                  {{ cancelledOrdersPieChart.toFixed(2) }}
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
                  {{ deliveredOrdersPieChart.toFixed(2) }}
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
                    <v-list-tile-sub-title :key="item.name" >- {{item.name}} (x{{item.quantity}})  </v-list-tile-sub-title>
                  </template>                  
                  <v-list-tile-sub-title v-show="props.item.customerNote" :key="props.item.customerNote" >                  
                    <br>
                    NB: {{props.item.customerNote}} 
                  </v-list-tile-sub-title>
                </td>
                <td class="text-xs-left">{{ props.item.billing[0].first_name + ' ' +props.item.billing[0].last_name }}</td>
                <td class="text-xs-left">{{ props.item.paymentMethodTitle }}</td>
                <td class="text-xs-left">
                  <v-list-tile-sub-title v-show="props.item.shipping[0].address_1" :key="props.item.customerNote" >                  
                    {{props.item.shipping[0].address_1}} 
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title v-show="props.item.shipping[0].address_2" :key="props.item.customerNote" >                  
                     {{props.item.shipping[0].address_2}} 
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title v-show="props.item.shipping[0].city" :key="props.item.customerNote" >                  
                    {{props.item.shipping[0].city}} 
                  </v-list-tile-sub-title>
                <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
                <td class="text-xs-right">
                  <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                  <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon>
                <td class="text-xs-right">{{ props.item.total }}</td>
                <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
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
    totalOrders: null,
    color: Material,
    selectedTab: 'tab-1', 
    headers: [
       {
        text: '',
       },
        {
          text: 'Order #',
          align: 'right',
          sortable: true,
          value: 'id'
        },
        { text: 'Order Details' , value: 'order'},
        { text: 'Customer', value: 'customer'},
        { text: 'Payment Method' , value: 'method'},
        { text: 'Delivery Address', value: 'delivery' , align: 'left'},
        { text: 'Delivery Date', value: 'delivery' , align: 'right'},
        { text: 'Packaged', value: 'packaged', align: 'right'},
        { text: 'Amount (GHS)', value: 'amount' , align: 'right'},
        { text: 'Date/Time' , value: 'date' , align: 'right'}
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
    this.getRecentOrders();
    this.getSummary();
  },
  methods: {
      getRecentOrders(){
        DMFWebService.orders.listAllOrders().then((response) => {
          console.log(response.data.data);
          this.totalOrders = response.data.data.totalOrders.toString();
          for(var i =0 ; i < response.data.data.orders.length; i++){
                this.orders.push(response.data.data.orders[i])
          }
        })
      },
      getSummary(){
        DMFWebService.orders.getOrderSummary().then((response) => {
         for(var i =0 ; i < response.data.data.length; i++){
                this.summary.push(response.data.data[i])
          }
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
  },
  computed: {
    pendingOrdersPieChart () {
      return (this.summary[1].count / this.totalOrders)*100;
    },
    pendingOrders () {
      return this.summary[1].count.toString();
    },
    pendingOrdersAmount () {
      return this.summary[1].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    deliveredOrdersPieChart () {
      return (this.summary[2].count / this.totalOrders)*100;
    },
    deliveredOrders () {
      return this.summary[2].count.toString();
    },
    deliveredOrdersAmount () {
      return this.summary[2].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    cancelledOrdersAmount () {
      return this.summary[3].total_amount.toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    cancelledOrdersPieChart () {
      return (this.summary[3].count / this.totalOrders)*100;
    }
  },

};
</script>
