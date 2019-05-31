<template>
  <div id="kitchen-app">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
       

        <v-layout row wrap>
                     <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Normal Orders</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>shopping_cart</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-list three-line subheader>
                                <v-list three-line subheader>

                                   <template xs12 v-for="(item) in orders ">                               
                                      <!-- <v-layout row wrap > -->
                                   
                                          <v-list-tile avatar :key="item.orderId">
                                            <v-list-tile-action>
                                              <v-checkbox v-model="notifications"></v-checkbox>
                                            </v-list-tile-action>
                                            <v-list-tile-content > 
                                               <v-list-tile-sub-title :key="item.orderId">Order #{{item.orderId}}</v-list-tile-sub-title>
                                                <template v-for="(item2) in item.lineItems">
                                                  <v-list-tile-sub-title :key="item2.name" >-{{item2.name}}(x{{item2.quantity}})  </v-list-tile-sub-title>
                                                
                                                </template>
                                              <v-list-tile-sub-title :key="item.customerNote" >NB: {{item.customerNote}} </v-list-tile-sub-title>

                                                <!-- <v-list-tile-sub-title :key="item.quantity">Location: </v-list-tile-sub-title> -->
                                            </v-list-tile-content>

                                             <!-- <v-list-tile-content>
                                              <v-list-tile-sub-title>Pack of 15 Classic Assorted</v-list-tile-sub-title>
                                              <v-list-tile-sub-title>x1</v-list-tile-sub-title>
                                               <v-list-tile-sub-title>Pack of 15 Classic Assorted</v-list-tile-sub-title>
                                              <v-list-tile-sub-title>x1</v-list-tile-sub-title>
                                            </v-list-tile-content> -->
                                            
                                            <v-list-tile-action>
                                              <v-btn icon ripple>
                                                <v-icon color="grey lighten-1">delete</v-icon>
                                              </v-btn>
                                            </v-list-tile-action>
                                          </v-list-tile>

                                           <v-divider inset :key="item.orderId"></v-divider>
                                      <!-- </v-layout> -->
                                   </template>
                              
                                </v-list>
                              
                              <!-- <v-btn color="primary">Packaged</v-btn> -->
                            </v-list>
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Customized Orders</v-toolbar-title>
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

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown" dark>
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
      //   step: 1,
      //  e13: 1,
      //   e1: 1,
      //   steps: 2,

         notifications: false,
        notifications2: false,
        orders:[],

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
      // steps (val) {
      //   if (this.e1 > val) {
      //     this.e1 = val
      //   }
      // }
    },

    methods: {
      getOrders(){
              DMFWebService.orders.listOrdersForToday().then((response) => {

                     // console.log(response.data.data);
                       

                      for(var i =0 ; i < response.data.data.length; i++){
                            this.orders.push(response.data.data[i])
                      }

                  
                    })
      }
    }
  }
</script>