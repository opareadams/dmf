<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="primary" dark flat dense cad>
              <v-toolbar-title class="subheading">User Form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
                    <v-form v-model="valid">
                      <v-subheader class="pa-0 mt-3">USER DETAIL</v-subheader>
                      <v-text-field
                        label="User Name"
                        name="username"
                        placeholder="John Smith"
                        v-model="formModel.name"
                        v-validate="'required'"
                        data-vv-name="fullname"     
                        :error-messages="errors.collect('fullname')"  
                        required
                      ></v-text-field>    
                      <v-text-field
                        label="Email"
                        placeholder="john.smith@gmail.com"
                        name="email"
                        v-validate="'required|email'"
                        data-vv-name="email"     
                        :error-messages="errors.collect('email')"        
                        v-model="formModel.email"
                        required
                      ></v-text-field>    
                      <v-text-field
                        label="Password"
                        placeholder="Password"
                        v-validate="'required'"
                        data-vv-name="password"     
                        :error-messages="errors.collect('password')"                
                        v-model="formModel.password"
                        
                        required
                      ></v-text-field>    
                      <!-- <v-subheader class="pa-0 mt-3">ROLE</v-subheader> -->
                      <v-select
                        :items="roles"
                        v-validate="'required'"
                        data-vv-name="role"     
                        :error-messages="errors.collect('role')"           
                        v-model="formModel.role"
                        label="Role"
                        auto
                        required
                        item-text="name"
                        item-value="id"
                      ></v-select>
                    
                    <div class="form-btn">
                      <v-btn outline @click="createUser" color="primary">Create User</v-btn>
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
              <v-toolbar-title class="subheading">List of Users</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
             <v-progress-linear v-show="loading" indeterminate value="15" color="primary"></v-progress-linear>
            <v-card-text class="">
              <v-list-tile avatar v-for="item in users" :key="item._id" @click="handleClick">
                  <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">account_box</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.username }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.role }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                  </v-list-tile-action>
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
    formModel: {
      name:null,
      email:null,
      password:null,
      role:null
    },
    roles:[
      {name: 'admin',id:1},
      {name: 'kitchen',id:2},
      {name: 'dispatcher',id:3},
    ],  
      users:[],  
    valid: true,
    loading: true,
  }),
    mounted () {
    this.$validator.localize('en', this.dictionary);
  },  
  created(){
    this.getAllUsers();
  },
  methods: {
    createUser(){
       this.$validator.validateAll();

      var roleName='';

      for(var i=0; i< this.roles.length; i++){
        if(this.formModel.role === this.roles[i].id){
          roleName = this.roles[i].name;
        }
      }
      
      let body={
          username:this.formModel.name,
          email:this.formModel.email,
          password:this.formModel.password,
          role:roleName,
          roleId:this.formModel.role

        };
      
       DMFWebService.auth.registerUser(body).then((response) => {
         if(response.status === 201){
           console.log('user created successfully!');
           window.getApp.$emit('USER_CREATED_SUCCESSFULLY');
         }
         else{
           window.getApp.$emit('USER_CREATED_FAILED');
         }


       })

    },
    getAllUsers(){

      DMFWebService.auth.listAllUsers().then((response) => {
          console.log(response)
          if(response.status === 200){
            this.loading = false;
            this.users = response.data.data;
          }
          

      })

    },
    // submit () {
    //   this.$validator.validateAll();
    // },
    clear () {
      this.formModel = {};
      this.$validator.reset();
    },
    handleClick (e) {
      return false;
    }    
  }
};
</script>