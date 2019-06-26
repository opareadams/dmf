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
                :loading="loading"
                >
                <template slot="items" slot-scope="props">
                   <!--------------------------------------------------------------------------------------------------->
                  <!---------------------------V-IF Display records with coloured rows--------------------------------->
                  <tr v-if="props.item.rider.length === 0" style="background-color:#039BE5; color: white;">
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td>
                  
                    <td class="text-xs-right">
                      {{ props.item.orderId }}     
                    </td>
                    <td class="text-cs-right">
                     
                      <template v-for="(rider) in props.item.rider">
                           <v-list-tile-sub-title :key="rider.id" > {{rider.name}} </v-list-tile-sub-title>
                      </template>
                   
                       <v-btn color="white" flat icon  @click="$set(riders.dialogBox, props.item.orderId, true)">
                          <v-icon>person_add</v-icon>
                        </v-btn>
                      <v-dialog v-model="riders.dialogBox[props.item.orderId]" scrollable max-width="300px">
                        <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                       
                        <v-card>
                          <v-card-title>Select Rider To Assign (Order #{{ props.item.orderId}})</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>

                            <v-radio-group v-model="riders.selectedId" column>
                              <template v-for="(rider) in riders.listOfRiders">
                                 <v-radio :key="rider._id" :label="rider.name" :value="rider._id"></v-radio>
                              </template>
                              <!-- <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                              <v-radio label="Bahrain" value="bahrain"></v-radio> -->
                              
                            </v-radio-group>
                            
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-btn color="blue darken-1" flat @click="assignRider(riders.selectedId, props.item.orderId)" :loading="loading2">Assign</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="$set(riders.dialogBox,props.item.orderId, false)">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                            
                    </td>
                    <td class="text-xs-left">
                      <template v-for="(item) in props.item.lineItems">
                        <v-list-tile-sub-title :key="item.id" >- {{item.name}} (x{{item.quantity}})  </v-list-tile-sub-title>
                      </template>                  
                      <!-- <v-chip label color="blue-grey darken-1" text-color="white" v-show="props.item.customerNote !== '' ">
                        <v-icon left>label</v-icon> NB: {{props.item.customerNote}} 
                      </v-chip>   -->
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
                      <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon></td>
                    <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                    <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.updatedAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.assignedAt| moment }}</td>
                      <td>
                        <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white"> </v-chip>
                    </td>
                  </tr>
                  <!--------------------------------------------------------------------------------------------------->
                  <!---------------------------V-ELSE Display records w/o coloured rows--------------------------------->
                  <tr v-else >
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td>
                  
                    <td class="text-xs-right">
                      {{ props.item.orderId }}     
                    </td>
                    <td class="text-cs-right">
                     
                      <template v-for="(rider) in props.item.rider">
                           <v-list-tile-sub-title :key="rider.id" > <v-chip color="primary" outline>{{rider.name}}</v-chip>  </v-list-tile-sub-title>
                      </template>
                   
                       <v-btn color="primary" flat icon  @click="$set(riders.dialogBox, props.item.orderId, true)">
                          <v-icon>person_add</v-icon>
                        </v-btn>
                      <v-dialog v-model="riders.dialogBox[props.item.orderId]" scrollable max-width="300px">
                        <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                       
                        <v-card>
                          <v-card-title>Select Rider To Assign (Order #{{ props.item.orderId}})</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>

                            <v-radio-group v-model="riders.selectedId" column>
                              <template v-for="(rider) in riders.listOfRiders">
                                 <v-radio :key="rider._id" :label="rider.name" :value="rider._id"></v-radio>
                              </template>
                              <!-- <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                              <v-radio label="Bahrain" value="bahrain"></v-radio> -->
                              
                            </v-radio-group>
                            
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-btn color="blue darken-1" flat @click="assignRider(riders.selectedId, props.item.orderId)" :loading="loading2">Assign</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="$set(riders.dialogBox,props.item.orderId, false)">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                            
                    </td>
                    <td class="text-xs-left">
                      <template v-for="(item) in props.item.lineItems">
                        <v-list-tile-sub-title :key="item.id" >- {{item.name}} (x{{item.quantity}})  </v-list-tile-sub-title>
                      </template>                  
                      <!-- <v-chip label color="blue-grey darken-1" text-color="white" v-show="props.item.customerNote !== '' ">
                        <v-icon left>label</v-icon> NB: {{props.item.customerNote}} 
                      </v-chip>   -->
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
                      <v-icon v-show="!props.item.packaged" color="rgb(251, 188, 52)">fa fa-clock-o fa-sm</v-icon></td>
                    <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                    <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.updatedAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.assignedAt| moment }}</td>
                      <td>
                        <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white"> </v-chip>
                    </td>
                  </tr>
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
        loading: false,
        loading2: false,
        selected: [],
        orders:[],
        headers: [
          
          {
            text: 'Order #',
            align: 'right',
           sortable: false,
            value: 'orderId'
          },
           {text: 'Rider',value:'rider'},
          { text: 'Order Details' , value: 'lineItems'},
          { text: 'Customer', value: 'shipping'},
          { text: 'Payment Method' , value: 'paymentMethodTitle'},
          { text: 'Delivery Address', value: 'shipping' , align: 'left'},
          { text: 'Delivery Date', value: 'deliveryDate' , align: 'right'},
          { text: 'Packaged', value: 'packaged', align: 'right'},
          { text: 'Amount (GHS)', value: 'total' , align: 'right'},
          { text: 'Created' , value: 'createdAt' , align: 'right'},
          { text: 'Packaged' , value: 'updatedAt' , align: 'right'},
           { text: 'Assigned' , value: 'assignedAt' , align: 'right'},
           {
            text: 'Status',
            value: 'status'
          },
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
    },
    riders: {
        selectedId: '',
        dialogBox:{},
        listOfRiders:[],
        dialog: false        
      },
      timer: '',
      
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
    this.getRiders();
    this.timer = setInterval(this.getAllOrders, 20000)
  },
  methods: {
      getAllOrders(){
        this.loading = true;
        DMFWebService.orders.listPackagedOrders().then((response) => {
          
          //this.totalOrders = response.data.meta.total_orders.toString();
        
            this.complex.orders = response.data.data;
            
          
          this.loading = false;
        })
      },
      getRiders(){
        DMFWebService.riders.listRiders().then((response) =>{
           
            this.riders.listOfRiders = response.data.data;
        })
      },
      assignRider(riderId,orderId){
        //get the details of the rider to build rider object
        let body = {
          id:'',
          name:'',
          telephone:''
        }
        for(var i =0; i < this.riders.listOfRiders.length; i++){
         
          if(riderId === this.riders.listOfRiders[i]._id){
            body.id=this.riders.listOfRiders[i]._id;
            body.name = this.riders.listOfRiders[i].name;
            body.telephone = this.riders.listOfRiders[i].telephone;
          }
        }
        this.loading2 = true;
        DMFWebService.orders.assignRiderToOrder(body,orderId).then((response) =>{
          if(response.status === 200){
              console.log("Rider Assigned successfully!");

             window.getApp.$emit('RIDER_ASSIGNED_SUCCESSFULLY');
              this.getAllOrders();
              this.loading2 = false;
             this.riders.dialogBox[orderId]=false;
             this.riders.selectedId =false;
          }else{
            console.log("Error!");
            this.loading2 = false;
            window.getApp.$emit('RIDER_ASSIGNED_ERROR');
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
      return moment(date).startOf('second').fromNow();
    }
  }
};
</script>
