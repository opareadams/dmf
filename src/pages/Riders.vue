<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="primary" dark flat dense cad>
              <v-toolbar-title class="subheading">Rider Form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
                    <v-form v-model="valid">
                      <v-subheader class="pa-0 mt-3">RIDER DETAIL</v-subheader>
                      <v-text-field
                        label="Name"
                        name="name"
                        placeholder="John Smith"
                        v-model="addRider.name"
                        v-validate="'required'"
                        data-vv-name="fullname"     
                        :error-messages="errors.collect('fullname')"  
                        required
                      ></v-text-field>    
                      <v-text-field
                        label="Number"
                        type="number"
                        placeholder="eg. 0244123123(with no spaces and no +233)"
                        name="number"
                        v-validate="'required'"
                        data-vv-name="number"     
                        :error-messages="errors.collect('number')"        
                        v-model="addRider.number"
                        required
                      ></v-text-field>    
                     
                      <!-- <v-subheader class="pa-0 mt-3">ROLE</v-subheader> -->
                     
                    
                    <div class="form-btn">
                      <v-btn outline @click="addRiders" color="primary">Create Rider</v-btn>
                      <v-btn outline @click="clear">Clear</v-btn>
                    </div>
                </v-form>     
            </v-card-text>       
          </v-card>
        </v-flex>           
        <v-flex lg6> <!------  ------>
          <!-- <event-form></event-form> -->
          <v-card class="mb-4">
            <v-toolbar color="primary" dark flat dense cad>
              <v-toolbar-title class="subheading">List of Riders ({{numberOfRiders}})</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
             <v-progress-linear v-show="loading" indeterminate value="15" color="primary"></v-progress-linear>
            <v-card-text class="">
              <v-list-tile avatar v-for="item in riders" :key="item._id" @click="handleClick">
                  <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">account_box</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.telephone }}</v-list-tile-sub-title>
                    
                  </v-list-tile-content>
                 
                    <!----------EDIT RIDER ------------>
                      <v-btn icon ripple @click="$set(editRiderDialogBox, item._id, true)">
                      <v-icon color="grey lighten-1">edit</v-icon>
                    </v-btn>
                        <v-dialog v-model="editRiderDialogBox[item._id]"  max-width="450px">
                                
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">Edit Rider</span>
                                  </v-card-title>
                                  
                                  <v-divider></v-divider>
                                  <v-card-text>
                                    <v-container grid-list-md>
                                      <v-layout wrap>
                                        
                                        <v-flex xs12>
                                          <v-text-field v-model="item.name" prepend-icon="account_circle" label="Name"  required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                          <v-text-field v-model="item.telephone" prepend-icon="phone_iphone" label="Number" type="number" placeholder="eg. 0244123123(with no spaces and no +233)" required></v-text-field>
                                        </v-flex>
                                      
                                      </v-layout>
                                    </v-container>
                                    
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click.native="editRider(item._id,item.name,item.telephone)">Save</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="close(item._id)">Close</v-btn>
                                    
                                  </v-card-actions>
                                </v-card>
                        </v-dialog>
                 <!---------END EDIT RIDER ------>

                 <!-----------DELETE RIDER -------------->
                  <v-btn icon ripple @click="$set(deleteRiderDialogBox, item._id, true)">
                      <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                  <v-dialog v-model="deleteRiderDialogBox[item._id]" persistent max-width="350px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Confirmation</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          Are you sure you want to cancel this rider?
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="deleteRider(item._id)">Yes</v-btn>
                          <v-btn color="blue darken-1" flat @click.native="$set(deleteRiderDialogBox,item._id, false)">No</v-btn>        
                        </v-card-actions>
                      </v-card>
                  </v-dialog>   

                  <!----------END DELETE RIDER -------------> 
              </v-list-tile>
            </v-card-text>
            </v-card>


        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import EventForm from '@/components/widgets/form/EventForm';
import ContactForm from '@/components/widgets/form/ContactForm';
import PaymentForm from '@/components/widgets/form/PaymentForm';
import ShipmentForm from '@/components/widgets/form/ShipmentForm';
import Countries from '@/api/country';
import DMFWebService from '@/services/DMFWebService';
export default {
  components: {
    VWidget,
    ContactForm,
    PaymentForm,
    ShipmentForm,
    EventForm
  },
   data: () => ({
     numberOfRiders:0,
      editRiderDialogBox:{},
      deleteRiderDialogBox:{},
     addRider:{
      name:'',
      number:''
    },
    
      riders:[],  
    valid: true,
    loading: true,
  }),
    mounted () {
    this.$validator.localize('en', this.dictionary);
  },  
  beforeCreate(){
     if (localStorage.ROLE_ID || localStorage.TOKEN) {
     
        }
        else{
          this.$router.replace({ path: '/login' });
        }

    },
  created(){
    this.getAllRiders();
  },
  methods: {
         addRiders(){

              this.$validator.validateAll();

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

                          this.getAllRiders();
                      }else{
                          window.getApp.$emit('RIDER_ADDED_FAILED');
                        
                      }
              })
            },
    editRider(id,name,telephone){
      let body = {
        rider_id:'',
        name:'',
        telephone:''
      }

      body.rider_id = id;
      body.name = name;
      body.telephone = telephone;

       DMFWebService.riders.updateRider(body).then((response) => {
            if(response.status === 200){
               window.getApp.$emit('RIDER_UPDATED_SUCCESSFULLY');
               
                 this.editRiderDialogBox[id]= false;
            }else{
              window.getApp.$emit('RIDER_UPDATED_FAILED');
               this.editRiderDialogBox[id]= false;
            }
       })
    },
    deleteRider(receivedId){
      let body = {
        id:''
      }

      body.id = receivedId;
     
      console.log(body);
       DMFWebService.riders.deleteRider(body).then((response) => {
            if(response.status === 200){
              console.log(response);
               window.getApp.$emit('RIDER_DELETED_SUCCESSFULLY');
               
                 this.deleteRiderDialogBox[receivedId]= false;
                 this.getAllRiders();
            }else{
              window.getApp.$emit('RIDER_DELETED_FAILED');
              this.deleteRiderDialogBox[receivedId]= false;
            }
       })
    },
    getAllRiders(){

      DMFWebService.riders.listRiders().then((response) => {
          
          if(response.status === 200){
            this.loading = false;
            this.riders = response.data.data;

            this.numberOfRiders = response.data.data.length;
          }
          

      })

    },
    // submit () {
    //   this.$validator.validateAll();
    // },
    clear () {
      this.addRider = {};
      this.$validator.reset();
    },
    close(id){
      this.getAllRiders();
      this.editRiderDialogBox[id]= false;
    },
    handleClick (e) {
      return false;
    }    
  }
};
</script>