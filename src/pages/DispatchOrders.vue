<template>
  <v-container fluid>
    <v-layout column>       
        <v-flex lg12>
          <v-spacer></v-spacer>
                    
             <!--------------------ADD RIDER DIALOG BOX ------------------------------->    
            <v-dialog v-model="addRiderDialogBox"  max-width="450px">
                <v-btn color="primary" dark slot="activator">Add Rider</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Rider</span>
                  </v-card-title>
                   
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <!-- <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal first name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field
                            label="Legal last name"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                          ></v-text-field>
                        </v-flex> -->
                        <v-flex xs12>
                          <v-text-field v-model="addRider.name" prepend-icon="account_circle" label="Name" placeholder="eg. John Smith" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field v-model="addRider.number" prepend-icon="phone_iphone" label="Number" type="number" placeholder="eg. 0244123123(with no spaces and no +233)" required></v-text-field>
                        </v-flex>
                       
                      </v-layout>
                    </v-container>
                    
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="addRiders()">Save</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="addRiderDialogBox = false">Close</v-btn>
                    
                  </v-card-actions>
                </v-card>
          </v-dialog>

   <!--------------------END OF ADD RIDER DIALOG BOX ------------------------------->    
          <v-spacer></v-spacer>
          <v-btn icon  @click="getAllOrders">
            <v-icon class="text--secondary">refresh</v-icon>
          </v-btn>
                 
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
               
                <v-dialog v-model="deliveredDialogBox" persistent max-width="350px">
                  
                  <v-btn slot="activator"> 
                       <v-icon  >done_all</v-icon>  Mark Delivered
                  </v-btn>
                
                  <v-card>
                    <v-card-title>
                      <span class="headline">Confirmation</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      Mark {{numberOfSelectedOrders}} order(s) as delivered?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="markAsDelivered()" :loading="complex.loading2">Yes</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="deliveredDialogBox = false">No</v-btn>        
                    </v-card-actions>
                  </v-card>
                </v-dialog>    
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.orders"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="orderId"
                select-all
                v-model="complex.selected"
                :loading="complex.loading"
                >
                
                <template slot="items" slot-scope="props">
                   <!--------------------------------------------------------------------------------------------------->
                  <!---------------------------V-IF Display records with coloured rows--------------------------------->
                  <tr v-if="props.item.rider.length === 0" style="background-color:#039BE5; color: white;">
                    <td>
                      <!-- <v-checkbox
                      disabled
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>        -->
                    </td>
                  
                    <td class="text-xs-left">
                     
                     <v-list-tile-sub-title ><v-icon>receipt</v-icon> {{ props.item.orderId }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title ><v-icon>access_time</v-icon> {{ props.item.createdAt | timeFormat }} </v-list-tile-sub-title>
                     <v-list-tile-sub-title >({{ props.item.createdAt | moment }})</v-list-tile-sub-title>
                       
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
                            <v-progress-linear v-show="complex.loadingRiders" indeterminate value="15" color="primary"></v-progress-linear>

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
                            <v-btn color="blue darken-1" flat @click="assignRider(riders.selectedId, props.item.orderId, props.item.billing[0].phone)" :loading="complex.loading2">Assign</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="$set(riders.dialogBox,props.item.orderId, false)">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                            
                    </td>
                    <td class="text-xs-left">
                      <template v-for="(item) in props.item.lineItems">
                        <v-list-tile-sub-title :key="item.id + Math.random()" > {{item.sku}} (x{{item.quantity}})  </v-list-tile-sub-title>
                      </template>                  
                      <v-icon v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                    </td>
                    <td class="text-xs-left">
                      <v-list-tile-sub-title><v-icon style="font-size: 15px;">account_box</v-icon>{{ props.item.shipping[0].first_name + ' ' +props.item.shipping[0].last_name }}</v-list-tile-sub-title>
                       <v-list-tile-sub-title><v-icon style="font-size: 15px;">phone_iphone</v-icon>{{ props.item.billing[0].phone}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title><v-icon style="font-size: 15px;">my_location</v-icon>{{ props.item.shipping[0].address_1}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.shipping[0].address_2 + ' ' + props.item.shipping[0].city}} </v-list-tile-sub-title>
                         <v-list-tile-sub-title><v-icon style="font-size: 15px;">location_on</v-icon>{{ props.item.zone}}</v-list-tile-sub-title>

                    </td>
                    <td>
                        <v-btn depressed outline icon fab dark color="white" small @click="$set(orderDialog, props.item.orderId, true)">
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
                                                            <span><v-icon  style="font-size: 15px;">phone</v-icon>{{props.item.billing[0].phone}}</span><br>
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
                                                          <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(props.item.total)+parseFloat(props.item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                          </v-card>
                                                        </v-flex>
                                                          <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                          <v-card style="border: 1px solid #F5F5F5;">
                                                          <p style="text-align:center; margin-bottom:0px" v-if="props.item.couponLines.length !== 0">{{props.item.couponLines[0].code}}</p>
                                                          <template v-else>
                                                            <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                            </template>
                                                          </v-card>
                                                        </v-flex>
                                                          <v-flex xs4 style=" padding-left:0px ">
                                                          <v-card style="border: 1px solid #F5F5F5;">
                                                          <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(props.item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                          </v-card>
                                                        </v-flex>
                                                      </v-layout>
                                                </v-card>
                                                </v-flex>

                                                <!-----------Payment Mode ------------>
                                                <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                                <v-card v-if="props.item.paymentMethodTitle==='Mobile Money Transfer' || props.item.paymentMethodTitle==='Visa' " style="border: 1px solid black;" color="green" class="white--text">
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
                    <!--<td class="text-xs-left">{{ props.item.paymentMethodTitle }}</td>
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
                    </td>
                    <td class="text-xs-right">{{ props.item.total.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</td>
                    <td class="text-xs-right">{{ props.item.createdAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.updatedAt | moment }}</td>
                    <td class="text-xs-right">{{ props.item.assignedAt| moment }}</td>
                      <td>
                        <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white"> </v-chip>
                    </td>-->
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
                  
                    <td class="text-xs-left">
                     
                     <v-list-tile-sub-title ><v-icon>receipt</v-icon> {{ props.item.orderId }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title ><v-icon>access_time</v-icon> {{ props.item.createdAt | timeFormat }} </v-list-tile-sub-title>
                     <v-list-tile-sub-title >({{ props.item.createdAt | moment }})</v-list-tile-sub-title>
                       
                    </td>
                    <td class="text-cs-right">
                     
                      <!-- <template v-for="(rider) in props.item.rider">
                           <v-list-tile-sub-title :key="rider.id" > <v-chip color="primary" outline>{{rider.name}}</v-chip>  </v-list-tile-sub-title>
                      </template>
                    -->
                       <v-btn flat @click="$set(riders.dialogBox, props.item.orderId, true)">
                          <!-- <v-icon>person_add</v-icon> -->
                          <template v-for="(rider) in props.item.rider">
                           <v-list-tile-sub-title :key="rider.id" > <v-chip color="primary" outline>{{rider.name}}</v-chip>  </v-list-tile-sub-title>
                          </template>
                        </v-btn>
                      <v-dialog v-model="riders.dialogBox[props.item.orderId]" scrollable max-width="300px">
                        <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                       
                        <v-card>
                          <v-card-title>Select Rider To Assign (Order #{{ props.item.orderId}})</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                              <v-progress-linear v-show="complex.loadingRiders" indeterminate value="15" color="primary"></v-progress-linear>

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
                            <v-btn color="blue darken-1" flat @click="assignRider(riders.selectedId, props.item.orderId, props.item.billing[0].phone)" :loading="complex.loading2">Assign</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="$set(riders.dialogBox,props.item.orderId, false)">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                            <v-icon>assignment_turned_in</v-icon>
                            {{ props.item.assignedAt| timeFormat }}
                            ({{ props.item.assignedAt| moment }})
                    </td>
                    <td class="text-xs-left">
                      <template v-for="(item) in props.item.lineItems">
                        <v-list-tile-sub-title :key="item.id+Math.random()" > {{item.sku}} (x{{item.quantity}})  </v-list-tile-sub-title>
                        <v-icon :key="item.id+Math.random()" v-show="props.item.packaged" color="green">fa fa-archive </v-icon>
                      </template>                  
                      
                    </td>
                    <td class="text-xs-left">
                      <v-list-tile-sub-title><v-icon style="font-size: 15px;">account_box</v-icon>{{ props.item.shipping[0].first_name + ' ' +props.item.shipping[0].last_name }}</v-list-tile-sub-title>
                       <v-list-tile-sub-title><v-icon style="font-size: 15px;">phone_iphone</v-icon>{{ props.item.billing[0].phone}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title><v-icon style="font-size: 15px;">my_location</v-icon>{{ props.item.shipping[0].address_1}}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.shipping[0].address_2 + ' ' + props.item.shipping[0].city}} </v-list-tile-sub-title>
                         <v-list-tile-sub-title><v-icon style="font-size: 15px;">location_on</v-icon>{{ props.item.zone}}</v-list-tile-sub-title>

                    </td>
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
                                                          <span><v-icon  style="font-size: 15px;">phone</v-icon>{{props.item.billing[0].phone}}</span><br>
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
                                                        <p style="text-align:center; margin-bottom:0px">GHS{{(parseFloat(props.item.total)+parseFloat(props.item.discountTotal)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                        </v-card>
                                                      </v-flex>
                                                        <v-flex xs4 style="padding-right:0px; padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px" v-if="props.item.couponLines.length !== 0">{{props.item.couponLines[0].code}}</p>
                                                        <template v-else>
                                                          <p style="text-align:center; margin-bottom:0px">No Discount</p>
                                                          </template>
                                                        </v-card>
                                                      </v-flex>
                                                        <v-flex xs4 style=" padding-left:0px ">
                                                        <v-card style="border: 1px solid #F5F5F5;">
                                                        <p style="text-align:center; margin-bottom:0px">GHS{{parseFloat(props.item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</p>
                                                        </v-card>
                                                      </v-flex>
                                                    </v-layout>
                                              </v-card>
                                              </v-flex>

                                              <!-----------Payment Mode ------------>
                                              <v-flex xs12 style="padding-top: 0px; padding-bottom: 0px;">
                                              <v-card v-if="props.item.paymentMethodTitle==='Mobile Money Transfer' || props.item.paymentMethodTitle==='Visa' " style="border: 1px solid black;" color="green" class="white--text">
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
                   <!-- <td class="text-xs-left">{{ props.item.paymentMethodTitle }}</td>
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
                    </td>-->
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
import axios from 'axios';

export default {
  data () {
    return {
      search: '',
      complex: {
        loading: false,
        loading2: false,
        loadingRiders: true,
        selected: [],
        orders:[],
        headers: [
          
          {
            text: 'Order ID',
            // align: 'right',
           sortable: false,
            value: 'orderId'
          },
           {text: 'Rider',value:'rider'},
          { text: 'Details' , value: 'lineItems'},
          { text: 'Customer', value: 'shipping'},
          { text: 'Action', value: 'action'},
         /* { text: 'Payment Method' , value: 'paymentMethodTitle'},
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
           },*/
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
    addRider:{
      name:'',
      number:''
    },
    riders: {
        selectedId: '',
        dialogBox:{},
        listOfRiders:[],
        dialog: false        
      },
      orderDialog:{},
      deliveredDialogBox:false,
      addRiderDialogBox:false,
      timer: '',
      selectedDeliveredOrders:[],
      numberOfSelectedOrders:0

      
    };
  },
    watch: {
      
     'complex.selected'(array){
          
        
        for(var i =0; i < array.length; i++){

          if(array[i].rider.length==0){ //remove the order which has not been assigned from the generally selected orders
            array.splice(i,1);
          }
        }

        //  console.log(array);
          this.selectedDeliveredOrders = array;
          this.numberOfSelectedOrders = this.selectedDeliveredOrders.length;
         
     },
      orders(){
        this.complex.loading =false;
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
    this.getAllOrders();
    this.getRiders();
   // this.timer = setInterval(this.getAllOrders, 20000)
  },
  methods: {
      getAllOrders(){
        this.complex.loading = true;
        DMFWebService.orders.listPackagedOrders().then((response) => {
          
          //this.totalOrders = response.data.meta.total_orders.toString();
        
            this.complex.orders = response.data.data;
            
          
          this.complex.loading = false;
        })

        //---get riders as well-----//
        this.getRiders();
      },
      getRiders(){
        DMFWebService.riders.listRiders().then((response) =>{

          if(response.status === 200){
            this.riders.listOfRiders = response.data.data;
            this.complex.loadingRiders =false;
          }
           
            
        })
      },
      addRiders(){

        let body = {
          name:'',
          telephone:''
        }

        body.name = this.addRider.name;
        body.telephone = this.addRider.number;
         
         console.log(body)
        DMFWebService.riders.addRider(body).then((response) =>{
                 if(response.status === 201){
                    window.getApp.$emit('RIDER_ADDED_SUCCESSFULLY');

                    this.addRiderDialogBox=false;

                    this.addRider.name = '';
                    this.addRider.number = '';
                 }else{
                     window.getApp.$emit('RIDER_ADDED_FAILED');
                 }
        })
      },
      assignRider(riderId,orderId,customerPhoneNumber){
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
        this.complex.loading2 = true;
        DMFWebService.orders.assignRiderToOrder(body,orderId).then((response) =>{
          if(response.status === 200){
              console.log("Rider Assigned successfully!");

             window.getApp.$emit('RIDER_ASSIGNED_SUCCESSFULLY');
              this.getAllOrders();
              this.complex.loading2 = false;
             this.riders.dialogBox[orderId]=false;
             this.riders.selectedId =false;

             //Send SMS
             this.sendSMS (body.telephone, orderId, 'rider');
             
             this.sendSMS (customerPhoneNumber, orderId, 'customer');
          }else{
            console.log("Error!");
            this.complex.loading2 = false;
            window.getApp.$emit('RIDER_ASSIGNED_ERROR');
          }
                
        })
       
      },
      markAsDelivered(){
        let statusBody={
          status:'delivered'
        };
        for(var i =0; i < this.selectedDeliveredOrders.length; i++ ){

            DMFWebService.orders.updateOrderStatus(statusBody,this.selectedDeliveredOrders[i].orderId).then((response) =>{
                if(response.status === 200){
              
                   console.log('marked as delivered')
                }
            })

          for(var j=0; j<this.complex.orders.length; j++){
                  
                  if(this.selectedDeliveredOrders[i].orderId === this.complex.orders[j].orderId){
                    
                      this.complex.orders.splice(j,1);
                   }
                }

                window.getApp.$emit('ORDER_DELIVERED');
        }

        this.deliveredDialogBox = false
      },

      sendSMS (telephone, orderId, receipientType) {
        var smsBody='';
         var itemsString='';
        console.log('telephone is '+telephone)
        console.log('receipient type is '+receipientType);
        //-------format phone number -------//
        if(telephone.charAt(0) === '0'){
            telephone = '+233'+telephone.slice(1);
            console.log("the new tel is "+telephone)
        }
       
        //----------------------------------//


        // ------- getting order details to sms --------//
        var deliveryDetails={
          custOrderId:'',
          custName:'',
          custPhone:'',
          custZone:'',
          items:[],
          amount:0,
          paymentType:''
        }
         

        for(var i=0; i < this.complex.orders.length; i++){
          if(orderId === this.complex.orders[i].orderId){

            deliveryDetails.custOrderId=orderId;
            deliveryDetails.custName= this.complex.orders[i].shipping[0].first_name + ' ' + this.complex.orders[i].shipping[0].last_name;
            deliveryDetails.custPhone= this.complex.orders[i].billing[0].phone;
            deliveryDetails.custZone=this.complex.orders[i].zone;
            deliveryDetails.items = this.complex.orders[i].lineItems;
            deliveryDetails.amount = this.complex.orders[i].total;
            deliveryDetails.paymentType = this.complex.orders[i].paymentMethodTitle;

            for(var j=0; j<deliveryDetails.items.length; j++){
              itemsString+='Item'+parseInt(j+1) +':' + deliveryDetails.items[j].sku + '\n'+''
            }

            if(receipientType === 'customer'){ //-------for customer ------//
                smsBody = 
                'Hello '+ this.complex.orders[i].shipping[0].first_name + '\n'+
                ' your order #'+deliveryDetails.custOrderId+' is on its way! Thanks for shopping with us';
              }
              else{//-------for rider ------//
                   smsBody = 
                  // 'Order Id: '+ deliveryDetails.custOrderId + '\n'+''+ 
                  // 'Name: '+ deliveryDetails.custName + '\n'+ 
                  // 'Phone: '+ deliveryDetails.custPhone + '\n'+
                  // 'Zone: '+ deliveryDetails.custZone + '\n'+
                  'Customer: '+ deliveryDetails.custName + '\n'+
                  itemsString + '\n'+
                  'Amount: '+ deliveryDetails.amount + '\n'+
                  'PaymentMode: '+ deliveryDetails.paymentType;        
              }

             
          }
        }
        
        // ---------------------------------------------//

        console.log(smsBody);
       
        var baseUrl = 'https://api.hubtel.com/v1/messages/send?';
    
                var request = require("request");

                      var options = { method: 'GET',
                        url: baseUrl,
                        qs:
                        { From: 'DMF',
                          To: telephone,
                          Content: smsBody,
                          ClientID: 'ljezyych',
                          ClientSecret: 'qvdzibmm' } };

                      request(options, function (error, response, body) {
                        //if (error) throw new Error(error);
                     //   console.log(response);
                    //console.log(body);
                    });
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
    },
    timeFormat(date){
      return moment(date).format('DD MMM hh:mm a');
    }
  }
};
</script>
