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
                            <v-list two-line subheader>
                                <v-list two-line subheader>
                                   <!-------   one order row---------> 
                                   <v-list-tile avatar>
                                    <v-list-tile-action>
                                      <v-checkbox v-model="notifications"></v-checkbox>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                      <v-list-tile-title>Pack of 15 Classic Assorted</v-list-tile-title>
                                      <v-list-tile-sub-title>x1 (NB:)</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                      <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>
                                    </v-list-tile-action>
                                  </v-list-tile>
                                  <!-------   one order row---------> 
                                    <v-divider inset></v-divider>
                                    <!-------   one order row---------> 
                                   <v-list-tile avatar>
                                    <v-list-tile-action>
                                      <v-checkbox v-model="notifications"></v-checkbox>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                      <v-list-tile-title>Pack of 15 Classic Assorted</v-list-tile-title>
                                      <v-list-tile-sub-title>x1 (NB:)</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                      <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                      </v-btn>
                                    </v-list-tile-action>
                                  </v-list-tile>
                                  <!-------   one order row---------> 


                    

                         
                                </v-list>
                              <v-divider inset></v-divider>
                              <!-- <v-btn color="primary">Packaged</v-btn> -->
                            </v-list>
                          </v-card>
                        </v-flex>

                         <v-flex lg4 sm12>
                          <v-card>
                            <v-toolbar color="brown" dark>
                              <v-toolbar-title>Special Orders</v-toolbar-title>
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
                              <v-toolbar-title>Order #3292</v-toolbar-title>
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

 export default {
   components: {
     VWidget
   },
    data () {
      return {
        step: 1,
       e13: 1,
        e1: 1,
        steps: 2,

         notifications: false,
          notifications2: false,

        items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Pack of 6 Classic Assorted × 2', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      }
    },

    methods: {
      onInput (val) {
        this.steps = parseInt(val)
      },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      }
    }
  }
</script>