<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            title="150"
            sub-title="Orders"
            color="indigo"      
          >
          </mini-statistic>  
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            title="15"
            sub-title="Pending Orders"
            color="red"      
          >
          </mini-statistic>           
        </v-flex>          
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            title="260"
            sub-title="Orders Delivered"
            color="light-blue"      
          >
          </mini-statistic>            
        </v-flex>        
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            title="GHS 50,000.00"
            sub-title="Revenue"
            color="purple"      
          >
          </mini-statistic>             
        </v-flex>   
        <!-- mini statistic  end -->   
        <!-- Circle statistic -->
        <v-flex lg4 sm12 xs12 v-for="(item,index) in trending" :key="'c-trending'+index">
          <circle-statistic
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :color="item.linear.color"
            :value="item.linear.value"
          >
          </circle-statistic>            
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
                    <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white" ></v-chip>
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
                <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
                <td class="text-xs-right">
                  <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                  <v-icon v-show="!props.item.packaged" color="orange">fa fa-clock-o fa-sm</v-icon>
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
        { text: 'Delivery Date', value: 'delivery' , align: 'right'},
        { text: 'Packaged', value: 'packaged', align: 'right'},
        { text: 'Amount (GHS)', value: 'amount' , align: 'right'},
        { text: 'Date/Time' , value: 'date' , align: 'right'}
      ], 
    colors: {
        processing: 'rgb(251, 188, 52)',
        cancelled: 'red',
        delivered: 'green',
        true: 'green',
        false: 'rgb(251, 188, 52)'
    },
    trending: [
      {
        subheading: 'Pending Orders',
        percent: 15,
        icon: {
          label: 'email',
          color: 'info'
        },
        linear: {
          value: 15,
          color: 'orange'
        }
      },        
      {
        subheading: 'Cancelled Orders',
        percent: 90,
        icon: {
          label: 'list',
          color: 'primary'
        },
        linear: {
          value: 90,
          color: 'red'
        }
      },        
      {
        subheading: 'Delivered Orders',
        percent: 100,
        icon: {
          label: 'bug_report',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'success'
        }
      },       
      {
        subheading: 'Total Payments',
        percent: 100,
        icon: {
          label: 'bug_report',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'teal'
        }
      }, 
      {
        subheading: 'Cash Payments',
        percent: 100,
        icon: {
          label: 'bug_report',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'purple'
        }
      },
      {
        subheading: 'Momo Payments',
        percent: 100,
        icon: {
          label: 'bug_report',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'info'
        }
      },       
    ]    
  }),
  beforeCreate(){
    if (localStorage.ROLE_ID  !=  '1' || localStorage.TOKEN) {
      
    }else{
        this.$router.replace({ path: '/login' });
      }
    },
  created(){
    this.getRecentOrders();
  },
  methods: {
      getRecentOrders(){
        DMFWebService.orders. listOrdersByLimit(10).then((response) => {
          console.log(response.data.data);
        
          for(var i =0 ; i < response.data.data.length; i++){
                this.orders.push(response.data.data[i])
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
    activity () {
      return API.getActivity();
    },
    posts () {
      return API.getPost(3);
    },
    siteTrafficData () {
      return API.getMonthVisit;
    },
    locationData () {
      return API.getLocation;
    }
  },

};
</script>
