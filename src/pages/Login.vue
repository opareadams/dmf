<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img v-bind:src="computeLogo" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Dough Man Foods</h1>
                </div>                
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="model.email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn> -->
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DMFWebService from '@/services/DMFWebService'
export default {
  data: () => ({
    loading: false,
    model: {
      email: '',
      password: ''
    }
  }),
  computed:{
     computeLogo () {
      return './static/m.png';
    },

  },

  methods: {
    login () {
       let credentials = {
        email: this.model.email,
        password: this.model.password
      };
      
      localStorage.removeItem('TOKEN');

//API CALL
      DMFWebService.auth.login(credentials).then((response) => {

        console.log(response.data);
        localStorage.TOKEN = response.data.data.token;
        localStorage.ROLE = response.data.data.role;

         this.loading = true;
                     setTimeout(() => {
                       if( localStorage.ROLE === 'kitchen'){
                          this.$router.push('/kitchen');
                       }
                       else if(localStorage.ROLE === 'admin'){
                          this.$router.push('/dashboard');
                       }
                       else if(localStorage.ROLE === 'dispatcher'){
                          this.$router.push('/dispatchOrders');
                       }
                          
                      
                     }, 10000);

      })


    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.3)) 0% 0% / cover, url(../../static/doughnuts/d6.jpg) no-repeat;
    background-size: cover;
   
  }
</style>
