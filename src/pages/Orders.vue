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
              placeholder="Search Order By Id"
              v-model="search"
              single-line
              hide-details
              class="hidden-sm-and-down"
              @keyup.enter="searchOrder(search)"
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
               
                v-model="complex.selected"
                :loading="loading"
                :pagination.sync="complex.pagination"
                :total-items="complex.pagination.totalItems"
                hide-actions
                >
                <template slot="items" slot-scope="props">
                    <!-- <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td> -->
                    <td>
                      <v-list-tile-sub-title ><v-icon>receipt</v-icon> {{ props.item.orderId }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title ><v-icon>access_time</v-icon> {{ props.item.createdAt | timeFormat }} </v-list-tile-sub-title>
                     <v-list-tile-sub-title >({{ props.item.createdAt | moment }})</v-list-tile-sub-title>
                      <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white">{{ props.item.status }} </v-chip>
                    </td>
                   
                     <td class="text-xs-left">
                        <template v-for="(item) in props.item.lineItems">
                            <v-list-tile-sub-title :key="item.id+Math.random()" > {{item.sku}} (x{{item.quantity}})  </v-list-tile-sub-title>
                              <v-icon :key="item.id+Math.random()" v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                               <v-icon :key="item.id+Math.random()" v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon>
                          
                        </template>  
                              
                      </td>
                    <td class="text-xs-left">
                      <v-list-tile-sub-title><v-icon style="font-size: 15px;">account_box</v-icon>{{ props.item.shipping[0].first_name + ' ' +props.item.shipping[0].last_name }}</v-list-tile-sub-title>
                       <v-list-tile-sub-title><v-icon style="font-size: 15px;">phone_iphone</v-icon>{{ props.item.shipping[0].address_2}}(receiver)</v-list-tile-sub-title>
                       <v-list-tile-sub-title><v-icon style="font-size: 15px;">phone_iphone</v-icon>{{ props.item.billing[0].phone}}(sender)</v-list-tile-sub-title>
                        <!-- <v-list-tile-sub-title><v-icon style="font-size: 15px;">my_location</v-icon>{{ props.item.shipping[0].address_1}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.shipping[0].address_2 + ' ' + props.item.shipping[0].city}} </v-list-tile-sub-title>-->
                         <v-list-tile-sub-title><v-icon style="font-size: 15px;">location_on</v-icon>{{ props.item.zone}}</v-list-tile-sub-title> 

                   </td>                    
                  <td class="text-xs-left">
                     <v-list-tile-sub-title>{{ props.item.paymentMethodTitle }}</v-list-tile-sub-title>

                     </td>
                    <!-- <td class="text-xs-left">
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
                    </td> -->
                    <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
                    <!-- <td class="text-xs-right">
                      <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                      <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon>
                    </td> -->
                    <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                    <!-- <td class="text-xs-right">{{ props.item.createdAt | moment }}</td> -->
                    <td>
                      <v-btn depressed outline icon fab dark color="primary" small @click="$set(orderDialog, props.item.orderId, true)">
                            <v-icon>fa fa-eye</v-icon>
                      </v-btn>
                      <v-dialog v-model="orderDialog[props.item.orderId]" scrollable  max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span class="headline">Order Details</span>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <!-- <v-container grid-list-md> -->
                                <v-layout wrap>
                                    <v-flex  xs12 style="padding-bottom: 20px"> 
                                      <v-card style="border: 1px solid grey;" color=""  > 
                                      
                                          <v-layout row wrap  
                                          >
                                            <!----------Customer details ----->
                                            <v-flex xs12 style="padding-bottom: 0px">
                                              <v-card style="border: 1px solid #F5F5F5;">
                                                <v-layout row wrap>
                                                      <v-flex xs6>
                                                      
                                                          <span><v-icon style="font-size: 15px;">person</v-icon>{{props.item.shipping[0].first_name}} {{props.item.shipping[0].last_name}}</span><br>
                                                          <span><v-icon  style="font-size: 15px;">phone</v-icon>{{props.item.billing[0].phone}}(sender)</span><br>
                                                            <span><v-icon  style="font-size: 15px;">phone</v-icon>{{props.item.shipping[0].address_2}}(receiver)</span><br>

                                                          <span> <v-icon  style="font-size: 15px;">location_on</v-icon>{{props.item.zone}}</span>
                                                      
                                                      </v-flex>
                                                      <v-flex xs6>
                                                      
                                                        <span><v-icon  style="font-size: 15px;">assignment</v-icon><strong> #{{props.item.orderId}}</strong></span><br>
                                                        <span><v-icon  style="font-size: 15px;">timelapse</v-icon>{{props.item.createdAt | timeFormat}} <br> ({{props.item.createdAt | moment}})</span>
                    
                                                        
                                                      </v-flex>
                                                </v-layout>
                                              </v-card>
                                            </v-flex>

                                              <!----------Order details -------->
                                              <template v-for="(item2) in props.item.lineItems">
                                                <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;" :key="item2.id+Math.random()">
                                                  <v-card style="border: 1px solid #F5F5F5;">
                                                    <v-layout row wrap>
                                                    
                                                      <v-flex xs8>
                                                    
                                                        <span style="margin-left:10px">(x{{item2.quantity}}){{item2.name}} </span><br>
                                                        
                                                      </v-flex>
                                                      <v-flex xs4>
                                                          <span style="margin-left:0px">GHS{{parseFloat(item2.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} </span><br>
                                                      </v-flex>
                                                      
                                                    </v-layout>
                                                  </v-card>
                                                </v-flex>
                                              </template>

                                              <!----------Order Note Heading -------->
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card style="border: 1px solid #F5F5F5;">
                                                    <v-layout row wrap>
                                                      <v-flex xs8>
                                                        <span style="margin-left:10px"><u>Order Note</u></span>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </v-flex>

                                              <!----------Order Note Content-------->
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card style="border: 1px solid #F5F5F5;" color="grey lighten-1">
                                                    <v-layout row wrap>
                                                      <v-flex xs8>
                                                        <span style="margin-left:10px">{{props.item.customerNote}}</span>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </v-flex>

                                              <!----------Price details-------->
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card style="border: 1px solid #F5F5F5;">
                                                    <v-layout row wrap>
                                                      <v-flex xs3 style="padding-right:0px">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">Shipping</p>
                                                        </v-card>
                                                      </v-flex>
                                                      <v-flex xs3 style="padding-right:0px">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">Subtotal</p>
                                                        </v-card>
                                                      </v-flex>
                                                        <v-flex xs3 style="padding-right:0px; padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">Discount</p>
                                                        </v-card>
                                                      </v-flex>
                                                        <v-flex xs3 style=" padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">Total</p>
                                                        </v-card>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </v-flex>

                                                <!----------Price Values-------->
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card style="border: 1px solid #F5F5F5;">
                                                    <v-layout row wrap>
                                                       <v-flex xs3 style="padding-right:0px">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(props.item.shippingTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                        </v-card>
                                                      </v-flex>
                                                      <v-flex xs3 style="padding-right:0px">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(props.item.total)+parseFloat(props.item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                        </v-card>
                                                      </v-flex>
                                                      <v-flex xs3 style="padding-right:0px; padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px" v-if="props.item.couponLines.length !== 0">{{props.item.couponLines[0].code}}</p>
                                                        <template v-else>
                                                          <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                          </template>
                                                        </v-card>
                                                      </v-flex>
                                                        <v-flex xs3 style=" padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(props.item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                        </v-card>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </v-flex>

                                              <!-----------Payment Mode ------------>
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card v-if="props.item.paymentMethod==='slydepay'" style="border: 1px solid black;" color="green" class="white--text">
                                                    <v-layout row wrap>
                                                      <v-flex xs12>
                                                        <p style="text-align:center; margin-bottom:0px">Paid via {{props.item.paymentMethodTitle}}</p>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              <template v-if="props.item.paymentMethodTitle==='Cash on delivery'">
                                                <v-card  style="border: 1px solid #F5F5F5;" color="red darken-4" class="white--text">
                                                    <v-layout row wrap>
                                                      <v-flex xs12>
                                                        <p style="text-align:center; margin-bottom:0px">Not Paid({{props.item.paymentMethodTitle}})</p>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </template>
                                              </v-flex>

                                              
                                        </v-layout>                      
                                      </v-card>
                                    </v-flex>
                                </v-layout>
                            <!-- </v-container> -->
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="$set(orderDialog,props.item.orderId, false)">Close</v-btn>
                            
                          </v-card-actions>
                        </v-card>
                        
                      </v-dialog>
                    </td>
                </template>
              </v-data-table>
               <div class="text-xs-center pt-2">
                  <v-pagination 
                    v-model="complex.page" 
                    :length="complex.pagination.totalPages"
                    @input="onPageChange"
                    :total-visible="6"></v-pagination>
                </div>
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
       orderDialog:{},
      complex: {
        loading: false,
        selected: [],
        page: 1,
        orders:[],
        pagination: {},
        headers: [
          {
            text: 'Order',
            value: 'status'
          },
          // {
          //   text: 'Order #',
          //   align: 'right',
          //   sortable: true,
          //   value: 'orderId'
          // },
          { text: 'Order Details' , value: 'lineItems'},
          { text: 'Customer', value: 'shipping.first_name'},
          { text: 'Payment Method' , value: 'paymentMethodTitle'},
        //  { text: 'Delivery Address', value: 'shipping' , align: 'left'},
          { text: 'Delivery Date', value: 'deliveryDate' , align: 'right'},
        //  { text: 'Packaged', value: 'packaged', align: 'right'},
          { text: 'Amount (GHS)', value: 'total' , align: 'right'},
          {text: 'Action',value:'action'}
        //  { text: 'Date/Time' , value: 'createdAt' , align: 'right'}
      ],
      },
      colors: {
        processing: 'green',
        pending: 'yellow darken-3',
        'on-hold': 'indigo',
        cancelled: 'red',
        failed: 'red',
        completed: 'green',
        true: 'green',
        false: 'rgb(251, 188, 52)',
        delivered: 'green darken-4'
    }
    };
  },
  beforeCreate(){
    if (localStorage.ROLE_ID || localStorage.TOKEN) {
     
        }
        else{
          this.$router.replace({ path: '/login' });
        }

  },
  created(){
    this.getAllOrders();
  },
  methods: {
      getAllOrders(pageNumber = 1){
        this.loading = true;
        this.complex.orders = [];

        DMFWebService.orders.listAllOrdersWithPagination(pageNumber).then((response) => {          
          for(var i =0 ; i < response.data.data.orders.length; i++){
                this.complex.orders.push(response.data.data.orders[i])
          }

          this.complex.page = response.data.data.currentPageNumber;
          this.complex.pagination.rowsPerPage = response.data.data.ordersPerPage;
          this.complex.pagination.totalItems = response.data.data.totalOrders;
          this.complex.pagination.totalPages = response.data.data.totalPages;
          this.complex.pagination.sortBy = 'deliveryDate';
          this.complex.pagination.descending = true;

          this.loading = false;
        })
      },
      searchOrder (orderId) {
        console.log(orderId);
        this.loading = true;
        this.complex.orders = [];
        
        if(orderId.length === 0){
          return this.getAllOrders();
        }

        DMFWebService.orders.searchOrder(orderId).then((response) => {
          console.log(response.data.data)          
          for(var i =0 ; i < response.data.data.length; i++){
              
                this.complex.orders.push(response.data.data[i])
          }
          this.loading = false;
        })

        console.log("orders", this.complex.orders)
      },
      moment: function () {
        return moment();
      },
      getColorByStatus (status) {
        return this.colors[status];
      },
      onPageChange (newPage) {
        this.getAllOrders(newPage);
      }
  },
  filters: {
    moment: function (date) {
      return moment(date).startOf('second').fromNow();
    },
     timeFormat(date){
      return moment(date).format('DD MMM hh:mm a');
    }
  }
};
</script>
