<template>
  <div id="kitchen-app">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
       

        <v-layout row wrap>
                     <v-flex lg4 sm12>
                          <v-card >
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Normal Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>shopping_cart</v-icon>
                              </v-btn>
                            </v-toolbar>

                            <template xs12 v-for="(item) in orders ">    
                                <v-card :key="item.orderId"> 
                                  <!-- <v-card-title  style="height: 40px;"> -->
                                    <v-card-title style="padding-bottom: 0px;">
                                    <div>
                                    
                                      <span class="grey--text"><Strong>Order #{{item.orderId}}</Strong></span><br>
                                      <!-- Order items -->
                                     
                                       <template v-for="(item2) in item.lineItems">
                                        <span :key="item2.id">-{{item2.name}}(x{{item2.quantity}})</span><br :key="item2.id">
                                       </template>

                                        <v-divider v-show="item.customerNote !== '' " ></v-divider>
                                        
                                        <span v-show="item.customerNote !== '' " >NB: {{item.customerNote}}</span><br>
                                        <v-divider v-show="item.customerNote !== '' "  ></v-divider>
                                        <!-- <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular> -->
                                      
                                    </div>
                                                                
                                  </v-card-title>
                                  <v-card-actions style="
                                          padding-top: 0px;
                                          height: 20px;
                                      ">
                                    <v-checkbox :value="item.orderId" v-model="checkPackaged"  flat ></v-checkbox>
                                      <v-btn icon ripple flat>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>     
                                  </v-card-actions>                              
                                </v-card>
                            </template>
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="purple" dark>
                              <v-toolbar-title>Customized Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>shopping_cart</v-icon>
                              </v-btn>
                            </v-toolbar>

                             <v-card>
                              <v-card-title>
                                <div>
                                 
                                  <span class="grey--text"><Strong>Number 10</Strong></span><br>
                                  <span>Whitehaven Beach</span><br>
                                  <span>Whitsunday Island, Whitsunday Islands</span>
                                  <span>Whitsunday Island, Whitsunday Islands</span> 
                                   
                                </div>
                              <!-- <v-card-actions> -->
                                <v-checkbox v-model="notifications" flat></v-checkbox>
                                  <v-btn icon ripple flat>
                                    <v-icon color="grey lighten-1">delete</v-icon>
                                  </v-btn>     
                              <!-- </v-card-actions> -->                                
                              </v-card-title>                            
                            </v-card>



                             <v-card>
                              <v-card-title>
                                <div>
                                  <span class="grey--text">Number 10</span><br>
                                  <span>Whitehaven Beach</span><br>
                                  <span>Whitsunday Island, Whitsunday Islands</span>
                                   <span>Whitsunday Island, Whitsunday Islands</span>
                                    
                                </div>
                              </v-card-title>
                              <v-card-actions>
                                 
                                <v-btn flat color="orange">Share</v-btn>
                                <v-btn flat color="orange">Explore</v-btn>
                              </v-card-actions>
                            </v-card>

                            

                            <v-list two-line subheader>
                                <v-list two-line subheader>
                                  <v-list-tile href="javascript:;">
                                      <v-list-tile-action>
                                        <v-checkbox
                                          v-model="notifications"
                                          readonly
                                        ></v-checkbox>
                                      </v-list-tile-action>
                                      <v-list-tile-content @click="notifications = !notifications">
                                        <v-list-tile-title>Pack of 15 Classic Assorted</v-list-tile-title>
                                        <v-list-tile-sub-title>x1</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile href="javascript:;">
                                      <v-list-tile-action>
                                        <v-checkbox
                                          v-model="notifications2"
                                          readonly
                                        ></v-checkbox>
                                      </v-list-tile-action>
                                      <v-list-tile-content @click="notifications2 = !notifications2">
                                        <v-list-tile-title>Pack of 12 Creamy Deluxe</v-list-tile-title>
                                        <v-list-tile-sub-title>x2</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                  </v-list-tile>
                                </v-list>
                              <v-divider inset></v-divider>
                              <!-- <v-btn color="primary">Packaged</v-btn> -->
                            </v-list>
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="red" dark>
                              <v-toolbar-title>Priority Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>shopping_cart</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-list two-line subheader>
                                <v-list two-line subheader>
                                  <v-list-tile href="javascript:;">
                                      <v-list-tile-action>
                                        <v-checkbox
                                          v-model="notifications"
                                          readonly
                                        ></v-checkbox>
                                      </v-list-tile-action>
                                      <v-list-tile-content @click="notifications = !notifications">
                                        <v-list-tile-title>Pack of 15 Classic Assorted</v-list-tile-title>
                                        <v-list-tile-sub-title>x1</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile href="javascript:;">
                                      <v-list-tile-action>
                                        <v-checkbox
                                          v-model="notifications2"
                                          readonly
                                        ></v-checkbox>
                                      </v-list-tile-action>
                                      <v-list-tile-content @click="notifications2 = !notifications2">
                                        <v-list-tile-title>Pack of 12 Creamy Deluxe</v-list-tile-title>
                                        <v-list-tile-sub-title>x2</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                  </v-list-tile>
                                </v-list>
                              <v-divider inset></v-divider>
                              <!-- <v-btn color="primary">Packaged</v-btn> -->
                            </v-list>
                          </v-card>
                        </v-flex>
                  </v-layout>
<!----------------------------------Second stepper ----------------------------->


    <!------------------>
    <!-- <v-flex lg4 sm12>
        <v-card>
          <v-card-media src="/static/doughnuts/doughnuts.jpg" height="250">
          </v-card-media>
          <v-card-text>
            <div>
                <v-chip color="green" outline>Order # 3288</v-chip>
                  <v-chip color="green" text-color="white">
                  <v-avatar>
                    <v-icon>shopping_cart</v-icon>
                  </v-avatar>
                  <strong><h4>Pack of 15 Classic Assorted</h4></strong>
                </v-chip>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="warning" dark >Packaged</v-btn>
          </v-card-actions>   
        </v-card>
      </v-flex> -->
    <!------------------->
       
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
       loading: false,
       checkPackaged:{},
        orders:[],

        
         notifications: false,
        notifications2: false,
        

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
      },

    watch: {
      
      checkPackaged(val){
       
        this.packageOrder(val);
      }
    },

    methods: {
      getOrders(){
              DMFWebService.orders.listOrdersForToday().then((response) => {

                     //console.log(response.data.data);
                       

                      for(var i =0 ; i < response.data.data.length; i++){
                            this.orders.push(response.data.data[i])
                      }

                  
                    })
      },
      packageOrder(val){
          for(var i =0; i < this.orders.length; i++){
            if(this.orders[i].orderId === val){
              this.orders.splice(i,1);
            }

            

          }

      }
    }
  }
</script>