<template>
  <v-container fluid>
    <v-layout column>       
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search with Order Number"
              v-model="search"
              single-line
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.orders"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="orderId"
                select-all
                v-model="complex.selected"
                >
                <template v-slot:items="props">
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td>
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
                    <td class="text-xs-left">{{ props.item.billing[0].first_name + ' ' +props.item.billing[0].last_name }}</td>
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
                    <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
                    <td class="text-xs-right">
                      <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                      <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon>
                    <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                    <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
                </template>
                <template v-slot:no-results>
                  <v-alert :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
                </template>  
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { Items as Users } from '@/api/user';
import DMFWebService from '@/services/DMFWebService';
import moment from 'moment';

export default {
  data () {
    return {
      search: '',
      complex: {
        loading: true,
        selected: [],
        orders:[],
        headers: [
          {
            text: '',
          },
          {
            text: 'Order #',
            align: 'right',
            value: 'orderId'
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
      },
      colors: {
        processing: 'rgb(251, 188, 52)',
        pending: 'rgb(251, 188, 52)',
        'on-hold': 'indigo',
        cancelled: 'red',
        completed: 'green',
        true: 'green',
        false: 'rgb(251, 188, 52)'
    }
    };
  },
  beforeCreate(){
    if (localStorage.ROLE_ID  !=  '1' || localStorage.TOKEN) {
      
    }else{
        this.$router.replace({ path: '/login' });
    }
  },
  created(){
    this.getAllOrders();
  },
  methods: {
      getAllOrders(){
        //this.loading = true;

        DMFWebService.orders.listAllOrders().then((response) => {
          console.log(response.data.data);
          this.totalOrders = response.data.data.totalOrders.toString();
          for(var i =0 ; i < response.data.data.orders.length; i++){
            this.complex.orders.push(response.data.data.orders[i]);
          }
        })
      },
      moment: function () {
        return moment();
      },
      getColorByStatus (status) {
        return this.colors[status];
      }
  },
  filters: {
    moment: function (date) {
      return moment(date).startOf('hour').fromNow();
    }
  }
};
</script>
