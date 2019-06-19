<template>
  <div id="kitchen-app">
    <v-container grid-list-lg fluid>
      <!-- <v-layout row wrap> -->
       

        <v-layout row wrap>
                     <v-flex lg4 sm12  >
                          <v-card  >
                            <v-toolbar color="brown lighten-2" dark>
                              <v-toolbar-title >Normal Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-text-field label="Search"
                                v-model="searchText"
                               v-show="searchBarVisible"
                               

                               ></v-text-field>

                              <v-btn icon  @click="searchBarVisible = !searchBarVisible">
                                <v-icon>search</v-icon>
                              </v-btn>                            
                            </v-toolbar>
                            <v-progress-linear v-show="loading" indeterminate value="15" color="primary"></v-progress-linear>

                            <div style="height: 1000px;overflow: auto;">
                            <template  v-for="(item) in filteredOrders.slice(0, 5) ">    
                              
                               <v-flex :key="item._id" xs12 style="padding-bottom: 20px"> 
                                <v-card style="border: 1px solid grey;" color=""  > 
                                
                                    <v-layout row wrap  
                                     >
                                      <!----------Customer details ----->
                                      <v-flex xs12 style="padding-bottom: 0px">
                                        <v-card style="border: 1px solid #F5F5F5;">
                                           <v-layout row wrap>
                                                <v-flex xs6>
                                                 
                                                    <span><v-icon style="font-size: 15px;">person</v-icon>{{item.shipping[0].first_name}} {{item.shipping[0].last_name}}</span><br>
                                                    <span><v-icon  style="font-size: 15px;">phone</v-icon>{{item.billing[0].phone}}</span><br>
                                                    <span> <v-icon  style="font-size: 15px;">location_on</v-icon>{{item.zone}}</span>
                                                 
                                                </v-flex>
                                                <v-flex xs6>
                                                
                                                  <span><v-icon  style="font-size: 15px;">assignment</v-icon><strong> #{{item.orderId}}</strong></span><br>
                                                  <span><v-icon  style="font-size: 15px;">timelapse</v-icon>{{item.createdAt | timeFormat}} <br> ({{item.createdAt | moment}})</span>
              
                                                  
                                                </v-flex>
                                           </v-layout>
                                        </v-card>
                                      </v-flex>

                                        <!----------Order details -------->
                                        <template v-for="(item2) in item.lineItems">
                                          <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;" :key="item2.id">
                                            <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                              
                                                <v-flex xs8>
                                               
                                                  <span style="margin-left:10px">{{item2.name}} </span><br>
                                                  <span style="margin-left:10px">x{{item2.quantity}}</span>
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
                                                   <span style="margin-left:10px">{{item.customerNote}}</span>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!----------Price details-------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Subtotal</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Discount</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
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
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(item.total)+parseFloat(item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px" v-if="item.couponLines.length !== 0">{{item.couponLines[0].code}}</p>
                                                   <template v-else>
                                                     <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                    </template>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!-----------Payment Mode ------------>
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card v-if="item.paymentMethodTitle==='Mobile Money Transfer' || item.paymentMethodTitle==='Visa' " style="border: 1px solid black;" color="green" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Paid via {{item.paymentMethodTitle}}</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         <template v-if="item.paymentMethodTitle==='Cash on delivery'">
                                           <v-card  style="border: 1px solid #F5F5F5;" color="red darken-4" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Not Paid({{item.paymentMethodTitle}})</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </template>
                                         </v-flex>

                                         <!--------Mark as Packaged button ------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid grey;">
                                              <v-layout row wrap>
                                                <v-flex xs2>
                                                </v-flex>
                                                <v-flex xs7>
                                                   <v-spacer></v-spacer>
                                                   <v-btn  color="deep-orange darken-1" class="white--text" @click="packageOrder(item.orderId)">Mark As Packaged</v-btn>
                                                  
                                                </v-flex>
                                                <v-flex xs3>
                                                  <v-menu
                                                    offset-y
                                                    top
                                                    :nudge-left="90"
                                                    >
                                                    
                                                       <v-btn icon ripple flat slot="activator">
                                                          <v-icon >more_vert</v-icon>
                                                      </v-btn>
                                                      <v-list>
                                                       
                                                       
                                                         <v-btn @click="$set(cancelPackage, item.orderId, true)" flat style="padding-left:0px; padding-right:0px; padding-top:0px; padding-bottom:0px;">
                                                            <v-icon color="grey lighten-1">delete</v-icon><span style="font-size: 12px;">Cancel Order</span>
                                                          </v-btn>
                                                       

                                                            <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                                                            <v-card>
                                                              <v-card-title>
                                                                <span class="headline">Confirmation</span>
                                                              </v-card-title>
                                                              <v-divider></v-divider>
                                                              <v-card-text>
                                                                Are you sure you want to cancel this order? {{item.orderId}}
                                                              </v-card-text>
                                                              <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                                                <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                                              </v-card-actions>
                                                            </v-card>
                                                          </v-dialog>    
                                                        
                                                      </v-list>
                                                    </v-menu>      
                                                </v-flex>
                                                
                                              </v-layout>
                                         </v-card>
                                         </v-flex>
                                  </v-layout>                      
                                </v-card>
                               </v-flex>
                            </template>
                            </div>
                          </v-card>
                        </v-flex>
<!-------------------------------------------------------------------------------------------------------------------------------------->
<!-----------------------------------------------Customized Orders--------------------------------------------------------------------->


                         <v-flex lg4 sm12>
                          <v-card >
                          <!-- <v-card style="border-radius:0px 30px;"> -->
                            <v-toolbar color="brown lighten-1" dark>
                              <v-toolbar-title>Customized Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>fastfood</v-icon>
                              </v-btn>
                            </v-toolbar>
                          <v-progress-linear v-show="loading" indeterminate value="15" color="green"></v-progress-linear>

                             <div style="height: 1000px;overflow: auto;">
                              <template xs12 v-for="(item) in customizedOrders.slice(0, 5) ">    
                               <v-flex :key="item._id" xs12 style="padding-bottom: 20px"> 
                                <v-card style="border: 1px solid grey;" color="" > 
                                
                                    <v-layout row wrap>
                                      <!----------Customer details ----->
                                      <v-flex xs12 style="padding-bottom: 0px">
                                        <v-card style="border: 1px solid #F5F5F5;">
                                           <v-layout row wrap>
                                                <v-flex xs6>
                                                 
                                                    <span><v-icon style="font-size: 15px;">person</v-icon>{{item.shipping[0].first_name}} {{item.shipping[0].last_name}}</span><br>
                                                    <span><v-icon  style="font-size: 15px;">phone</v-icon>{{item.billing[0].phone}}</span><br>
                                                    <span> <v-icon  style="font-size: 15px;">location_on</v-icon>{{item.zone}}</span>
                                                 
                                                </v-flex>
                                                <v-flex xs6>
                                                
                                                  <span><v-icon  style="font-size: 15px;">assignment</v-icon><strong> #{{item.orderId}}</strong></span><br>
                                                  <span><v-icon  style="font-size: 15px;">timelapse</v-icon>{{item.createdAt | timeFormat}} <br> ({{item.createdAt | moment}})</span>
              
                                                  
                                                </v-flex>
                                           </v-layout>
                                        </v-card>
                                      </v-flex>

                                        <!----------Order details -------->
                                        <template v-for="(item2) in item.lineItems">
                                          <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;" :key="item2.id">
                                            <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                              
                                                <v-flex xs8>
                                               
                                                  <span style="margin-left:10px">{{item2.name}} </span><br>
                                                  <span style="margin-left:10px">x{{item2.quantity}}</span>
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
                                                   <span style="margin-left:10px">{{item.customerNote}}</span>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!----------Price details-------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Subtotal</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Discount</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
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
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(item.total)+parseFloat(item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px" v-if="item.couponLines.length !== 0">{{item.couponLines[0].code}}</p>
                                                   <template v-else>
                                                     <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                    </template>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!-----------Payment Mode ------------>
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card v-if="item.paymentMethodTitle==='Mobile Money Transfer' || item.paymentMethodTitle==='Visa' " style="border: 1px solid black;" color="green" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Paid via {{item.paymentMethodTitle}}</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         <template v-if="item.paymentMethodTitle==='Cash on delivery'">
                                           <v-card  style="border: 1px solid #F5F5F5;" color="red darken-4" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Not Paid({{item.paymentMethodTitle}})</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </template>
                                         </v-flex>

                                         <!--------Mark as Packaged button ------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid grey;">
                                              <v-layout row wrap>
                                                <v-flex xs2>
                                                </v-flex>
                                                <v-flex xs7>
                                                   <v-spacer></v-spacer>
                                                   <v-btn  color="deep-orange darken-1" class="white--text" @click="packageOrder(item.orderId)">Mark As Packaged</v-btn>
                                                  
                                                </v-flex>
                                                <v-flex xs3>
                                                  <v-menu
                                                    offset-y
                                                    top
                                                    :nudge-left="90"
                                                    >
                                                    
                                                       <v-btn icon ripple flat slot="activator">
                                                          <v-icon >more_vert</v-icon>
                                                      </v-btn>
                                                      <v-list>
                                                       
                                                       
                                                         <v-btn @click="$set(cancelPackage, item.orderId, true)" flat style="padding-left:0px; padding-right:0px; padding-top:0px; padding-bottom:0px;">
                                                            <v-icon color="grey lighten-1">delete</v-icon><span style="font-size: 12px;">Cancel Order</span>
                                                          </v-btn>
                                                       

                                                            <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                                                            <v-card>
                                                              <v-card-title>
                                                                <span class="headline">Confirmation</span>
                                                              </v-card-title>
                                                              <v-divider></v-divider>
                                                              <v-card-text>
                                                                Are you sure you want to cancel this order? {{item.orderId}}
                                                              </v-card-text>
                                                              <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                                                <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                                              </v-card-actions>
                                                            </v-card>
                                                          </v-dialog>    
                                                        
                                                      </v-list>
                                                    </v-menu>      
                                                </v-flex>
                                                
                                              </v-layout>
                                         </v-card>
                                         </v-flex>
                                  </v-layout>                      
                                </v-card>
                               </v-flex>
                            </template>
                          </div>
                          </v-card>
                        </v-flex>
<!------------------------------------------------------------------------------------------------------------------------>
<!-----------------------------------------------Priority Orders--------------------------------------------------------------------->


                         <v-flex lg4 sm12>
                          <v-card>
                          <!-- <v-card style="border-radius:30px 30px 0px 0px;"> -->
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Priority Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>fastfood</v-icon>
                              </v-btn>
                            </v-toolbar>
                           <v-progress-linear v-show="loading" indeterminate value="15" color="red"></v-progress-linear>                    
                            
                            <div style="height: 1000px;overflow: auto;  background-color: transparent;">
                            <template xs12 v-for="(item) in priorityOrders.slice(0, 5) ">    
                               <v-flex :key="item._id" xs12 style="padding-bottom: 20px"> 
                                <v-card style="border: 1px solid grey;" color="" > 
                                
                                    <v-layout row wrap>
                                      <!----------Customer details ----->
                                      <v-flex xs12 style="padding-bottom: 0px">
                                        <v-card style="border: 1px solid #F5F5F5;">
                                           <v-layout row wrap>
                                                <v-flex xs6>
                                                 
                                                    <span><v-icon style="font-size: 15px;">person</v-icon>{{item.shipping[0].first_name}} {{item.shipping[0].last_name}}</span><br>
                                                    <span><v-icon  style="font-size: 15px;">phone</v-icon>{{item.billing[0].phone}}</span><br>
                                                    <span> <v-icon  style="font-size: 15px;">location_on</v-icon>{{item.zone}}</span>
                                                 
                                                </v-flex>
                                                <v-flex xs6>
                                                
                                                  <span><v-icon  style="font-size: 15px;">assignment</v-icon><strong> #{{item.orderId}}</strong></span><br>
                                                  <span><v-icon  style="font-size: 15px;">timelapse</v-icon>{{item.createdAt | timeFormat}} <br> ({{item.createdAt | moment}})</span>
              
                                                  
                                                </v-flex>
                                           </v-layout>
                                        </v-card>
                                      </v-flex>

                                        <!----------Order details -------->
                                        <template v-for="(item2) in item.lineItems">
                                          <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;" :key="item2.id">
                                            <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                              
                                                <v-flex xs8>
                                               
                                                  <span style="margin-left:10px">{{item2.name}} </span><br>
                                                  <span style="margin-left:10px">x{{item2.quantity}}</span>
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
                                                   <span style="margin-left:10px">{{item.customerNote}}</span>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!----------Price details-------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid #F5F5F5;">
                                              <v-layout row wrap>
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Subtotal</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">Discount</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
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
                                                 <v-flex xs4 style="padding-right:0px">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(item.total)+parseFloat(item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px" v-if="item.couponLines.length !== 0">{{item.couponLines[0].code}}</p>
                                                   <template v-else>
                                                     <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                    </template>
                                                   </v-card>
                                                 </v-flex>
                                                  <v-flex xs4 style=" padding-left:0px ">
                                                   <v-card style="border: 1px solid #F5F5F5;">
                                                   <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                   </v-card>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </v-flex>

                                         <!-----------Payment Mode ------------>
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card v-if="item.paymentMethodTitle==='Mobile Money Transfer' || item.paymentMethodTitle==='Visa' " style="border: 1px solid black;" color="green" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Paid via {{item.paymentMethodTitle}}</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         <template v-if="item.paymentMethodTitle==='Cash on delivery'">
                                           <v-card  style="border: 1px solid #F5F5F5;" color="red darken-4" class="white--text">
                                              <v-layout row wrap>
                                                 <v-flex xs12>
                                                   <p style="text-align:center; margin-bottom:0px">Not Paid({{item.paymentMethodTitle}})</p>
                                                 </v-flex>
                                              </v-layout>
                                         </v-card>
                                         </template>
                                         </v-flex>

                                         <!--------Mark as Packaged button ------->
                                         <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                         <v-card style="border: 1px solid grey;">
                                              <v-layout row wrap>
                                                <v-flex xs2>
                                                </v-flex>
                                                <v-flex xs7>
                                                   <v-spacer></v-spacer>
                                                   <v-btn  color="deep-orange darken-1" class="white--text" @click="packageOrder(item.orderId)">Mark As Packaged</v-btn>
                                                  
                                                </v-flex>
                                                <v-flex xs3>
                                                  <v-menu
                                                    offset-y
                                                    top
                                                    :nudge-left="90"
                                                    >
                                                    
                                                       <v-btn icon ripple flat slot="activator">
                                                          <v-icon >more_vert</v-icon>
                                                      </v-btn>
                                                      <v-list>
                                                       
                                                       
                                                         <v-btn @click="$set(cancelPackage, item.orderId, true)" flat style="padding-left:0px; padding-right:0px; padding-top:0px; padding-bottom:0px;">
                                                            <v-icon color="grey lighten-1">delete</v-icon><span style="font-size: 12px;">Cancel Order</span>
                                                          </v-btn>
                                                       

                                                            <v-dialog v-model="cancelPackage[item.orderId]" persistent max-width="350px">
                                                            <v-card>
                                                              <v-card-title>
                                                                <span class="headline">Confirmation</span>
                                                              </v-card-title>
                                                              <v-divider></v-divider>
                                                              <v-card-text>
                                                                Are you sure you want to cancel this order? {{item.orderId}}
                                                              </v-card-text>
                                                              <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" flat @click="cancelOrder(item.orderId)" :loading="loading">Yes</v-btn>
                                                                <v-btn color="blue darken-1" flat @click.native="$set(cancelPackage,item.orderId, false)">No</v-btn>        
                                                              </v-card-actions>
                                                            </v-card>
                                                          </v-dialog>    
                                                        
                                                      </v-list>
                                                    </v-menu>      
                                                </v-flex>
                                                
                                              </v-layout>
                                         </v-card>
                                         </v-flex>
                                  </v-layout>                      
                                </v-card>
                               </v-flex>
                            </template>
                            </div>
                          </v-card>
                        </v-flex>
                  </v-layout>

       
      <!-- </v-layout> -->
    </v-container>
  </div>
</template>

<script>
 import VWidget from '@/components/VWidget';
 import DMFWebService from '@/services/DMFWebService';
 import moment from 'moment';

 export default {
   components: {
     VWidget
   },
    data () {
      return {
        searchText:'',
        searchBarVisible:false,
        loading: true,
        loadingButton:false,
        checkPackaged:{},
        cancelPackage:{},
        orders:[],
        priorityOrders:[],
        customizedOrders:[],
        tempOrders:[],
        countQueue:null,
        timer: '',
        offsetTop: 0,
        moreMenuItems: [
        { title: 'Cancel Order' }
        // { title: 'Click Me' },
        // { title: 'Click Me' },
        // { title: 'Click Me 2' }
      ]
      }
    },
    computed:{
      filteredOrders(){
        return this.orders.filter(order =>{
         
          if(order.shipping[0].first_name.toLowerCase().match(this.searchText.toLowerCase())){
            return order.shipping[0].first_name.toLowerCase().match(this.searchText.toLowerCase());
           
          }
          if(order.number.toLowerCase().match(this.searchText.toLowerCase())){
              return order.number.toLowerCase().match(this.searchText.toLowerCase());
             
          }
          
          //return order.number.match(this.searchText);
        });
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
        this.timer = setInterval(this.getOrders, 20000)
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
        let body={
          status:'cancelled'
        };
       
        DMFWebService.orders.cancelOrder(body, val).then((response) => {

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
      },
      //  moment() {
      //   return moment();
      // },
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      overWriteState(){

      }
    },
    filters: {
    moment (date) {
      return moment(date).startOf('hour').fromNow();
    },
    timeFormat(date){
      return moment(date).format('DD MMM hh:mm a');
    }

  }
  }
</script>