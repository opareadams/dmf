<template>
  <div id="kitchen-app">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
       

        <v-layout row wrap>
                     <v-flex lg4 sm12>
                          <v-card >
                            <v-toolbar color="brown lighten-2" dark>
                              <v-toolbar-title>Normal Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>fastfood</v-icon>
                              </v-btn>
                             
                            </v-toolbar>
                            <v-progress-linear v-show="loading" indeterminate value="15" color="primary"></v-progress-linear>


                            <template xs12 v-for="(item) in orders.slice(0, 5) ">    
                                <v-card :key="item.orderId"> 
                                  <!-- <v-card-title  style="height: 40px;"> -->
                                    <v-card-title style="padding-bottom: 0px;">
                                    <div>
                                    
                                      <span class="grey--text"><Strong>Order #{{item.orderId}}</Strong></span><br>
                                      <!-- Order items -->
                                     
                                       <template v-for="(item2) in item.lineItems">
                                        <span :key="item2.id">-{{item2.name}}(x{{item2.quantity}})</span><br :key="item2.id">
                                       </template>

                                        <v-chip label color="pink" text-color="white" v-show="item.customerNote !== '' ">
                                          <v-icon left>label</v-icon>NB: {{item.customerNote}}
                                        </v-chip>
                                        <!-- <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular> -->
                                      
                                    </div>
                                                                
                                  </v-card-title>
                                  <v-card-actions style="
                                          padding-top: 0px;
                                          height: 20px;
                                      ">
                                    <v-checkbox :value="item.orderId" v-model="checkPackaged" flat ></v-checkbox>

                                      <v-btn icon ripple @click="$set(cancelPackage, item.orderId, true)" flat>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>
                                      <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                
                                          <v-card>
                                            <v-card-title>
                                              <span class="headline">Confirmation</span>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text>
                                              Are you sure you want to cancel this order?
                                            </v-card-text>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                              <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>     
                                  </v-card-actions>                              
                                </v-card>
                            </template>
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown lighten-1" dark>
                              <v-toolbar-title>Customized Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>fastfood</v-icon>
                              </v-btn>
                            </v-toolbar>
                          <v-progress-linear v-show="loading" indeterminate value="15" color="green"></v-progress-linear>


                              <template xs12 v-for="(item) in customizedOrders.slice(0, 5) ">    
                                <v-card :key="item.orderId"> 
                                  <!-- <v-card-title  style="height: 40px;"> -->
                                    <v-card-title style="padding-bottom: 0px;">
                                    <div>
                                    
                                      <span class="grey--text"><Strong>Order #{{item.orderId}}</Strong></span><br>
                                      <!-- Order items -->
                                     
                                       <template v-for="(item2) in item.lineItems">
                                        <span :key="item2.id">-{{item2.name}}(x{{item2.quantity}})</span><br :key="item2.id">
                                       </template>
                                       
                                        <v-chip label color="pink" text-color="white" v-show="item.customerNote !== '' ">
                                          <v-icon left>label</v-icon>NB: {{item.customerNote}}
                                        </v-chip>
                                        <!-- <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular> -->
                                      
                                    </div>
                                                                
                                  </v-card-title>
                                  <v-card-actions style="
                                          padding-top: 0px;
                                          height: 20px;
                                      ">
                                    <v-checkbox :value="item.orderId" v-model="checkPackaged" flat ></v-checkbox>

                                      <v-btn icon ripple @click="$set(cancelPackage, item.orderId, true)" flat>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>
                                      <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                
                                          <v-card>
                                            <v-card-title>
                                              <span class="headline">Confirmation</span>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text>
                                              Are you sure you want to cancel this order?
                                            </v-card-text>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                              <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>     
                                  </v-card-actions>                              
                                </v-card>
                            </template>
     
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Priority Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>fastfood</v-icon>
                              </v-btn>
                            </v-toolbar>
                           <v-progress-linear v-show="loading" indeterminate value="15" color="red"></v-progress-linear>

                            
                            
                            <template xs12 v-for="(item) in priorityOrders.slice(0, 5) ">    
                                <v-card :key="item.orderId"> 
                                  <!-- <v-card-title  style="height: 40px;"> -->
                                    <v-card-title style="padding-bottom: 0px;">
                                    <div>
                                    
                                      <span class="grey--text"><Strong>Order #{{item.orderId}}</Strong></span><br>
                                      <!-- Order items -->
                                     
                                       <template v-for="(item2) in item.lineItems">
                                        <span :key="item2.id">-{{item2.name}}(x{{item2.quantity}})</span><br :key="item2.id">
                                       </template>
                                       
                                        <v-chip label color="pink" text-color="white" v-show="item.customerNote !== '' ">
                                          <v-icon left>label</v-icon>NB: {{item.customerNote}}
                                        </v-chip>
                                        <!-- <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular> -->
                                      
                                    </div>
                                                                
                                  </v-card-title>
                                  <v-card-actions style="
                                          padding-top: 0px;
                                          height: 20px;
                                      ">
                                    <v-checkbox :value="item.orderId" v-model="checkPackaged" flat ></v-checkbox>

                                      <v-btn icon ripple @click="$set(cancelPackage, item.orderId, true)" flat>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>
                                      <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                
                                          <v-card>
                                            <v-card-title>
                                              <span class="headline">Confirmation</span>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text>
                                              Are you sure you want to cancel this order?
                                            </v-card-text>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                              <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>     
                                  </v-card-actions>                              
                                </v-card>
                            </template>
                          </v-card>
                        </v-flex>
                  </v-layout>

       
      </v-layout>
    </v-container>
  </div>
</template>

<script>
 import VWidget from '@/components/VWidget';
 import DMFWebService from '@/services/DMFWebService';

 export default {
   components: {
     VWidget
   },
    data () {
      return {
        loading: true,
        checkPackaged:{},
        cancelPackage:{},
        orders:[],
        priorityOrders:[],
        customizedOrders:[],
        tempOrders:[],
        countQueue:null,
        timer: '',
      }
    },
    watch: {
      
      checkPackaged(val){
        this.packageOrder(val);
      },
      orders(){
        this.loading =false;
      }
     
    },
    beforeCreate(){
     if (localStorage.ROLE_ID || localStorage.TOKEN) {
     
        }
        else{
          this.$router.replace({ path: '/login' });
        }
    },
    created(){
        this.getOrders();
        //this.timer = setInterval(this.getOrders, 20000)
    },
    methods: {
      getOrders(){
              this.loading = true;
              DMFWebService.orders.listOrdersForToday().then((response) => {
                     this.orders = response.data.data;
                     this.priorityOrders = []; //reset priority order queue
                     this.customizedOrders=[];

                     //--------process priority orders --------//

                     for(var i =0; i < this.orders.length; i++){
                       if(this.orders[i].total > 1000){//if true(i.e 1000 cedis plus), priority order found
                           this.priorityOrders.push(this.orders[i]);
                  
                      }
                     }
                    
                      //-----------------------------------------//
                      //--------process customized orders --------//

                      for(var i=0; i <this.orders.length; i++){
                        for(var j=0; j<this.orders[i].lineItems.length; j++){
                          if(this.orders[i].lineItems[j].name === 'Custom Shaped Doughnut' || this.orders[i].lineItems[j].name === 'Letter Written on Doughnut' ){
                            this.customizedOrders.push(this.orders[i])
                          }
                        }
                      }
                       //-----------------------------------------//


                      this.countQueue = this.orders.length - 5; //-----to determine number of orders still in the queue
                      if(this.countQueue <0){
                        localStorage.QUEUED = 0;
                      }else{
                          localStorage.QUEUED = this.countQueue;
                      }
                      
                      
                    })
      },
      packageOrder(val){
         
         DMFWebService.orders.packageOrder(val).then((response) => {
           
            if(response.status === 200){
              
              //remove from main order queue
              for(var i =0; i < this.orders.length; i++){
                if(this.orders[i].orderId === val){
                  this.orders.splice(i,1);
                  window.getApp.$emit('ORDER_PACKAGED');
                }
             }

             //remove from priority order queue if any
              for(var i =0; i < this.priorityOrders.length; i++){
                if(this.priorityOrders[i].orderId === val){
                  this.priorityOrders.splice(i,1);
                 // window.getApp.$emit('ORDER_PACKAGED');
                }
             }

             //remove from customize order queue if any
              for(var i =0; i < this.customizedOrders.length; i++){
                if(this.customizedOrders[i].orderId === val){
                  this.customizedOrders.splice(i,1);
                //  window.getApp.$emit('ORDER_PACKAGED');
                }
             }

            }

         })          

      },
      cancelOrder(val){
        DMFWebService.orders.cancelOrder(val).then((response) => {

          if(response.status === 200){

            for(var i =0; i < this.orders.length; i++){
                if(this.orders[i].orderId === val){
                  this.orders.splice(i,1);
                  window.getApp.$emit('ORDER_CANCELLED');
                }

              }

            //remove from priority order queue if any
              for(var i =0; i < this.priorityOrders.length; i++){
                if(this.priorityOrders[i].orderId === val){
                  this.priorityOrders.splice(i,1);
                 // window.getApp.$emit('ORDER_PACKAGED');
                }
             }

             //remove from customize order queue if any
              for(var i =0; i < this.customizedOrders.length; i++){
                if(this.customizedOrders[i].orderId === val){
                  this.customizedOrders.splice(i,1);
                //  window.getApp.$emit('ORDER_PACKAGED');
                }
             }

          }



        })


        
      }
    }
  }
</script>