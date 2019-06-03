import axios from 'axios'
import Vue from 'vue';
import Router from 'vue-router';
import paths from '../router/paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();

  document.title = to.meta.title;
  
  next();
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

// Base URL of VATAPP Web API
const DMF_API_BASE_URL = process.env.DMF_API_BASE_URL


// Add request interceptor to automatically set Authorization header token
axios.interceptors.request.use(function (config) {
  // Set content type and accept headers
  config.headers.common['Accept'] = 'application/json'
  config.headers.common['Content-Type'] = 'application/json'
  if (localStorage.getItem('TOKEN')) {
    config.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('TOKEN')
   
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor to automatically redirect to login if 401 error occurs
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return Promise.resolve(response)
}, function (error) {
  // Do something with response error

  if (error.response && error.response.status === 401) { //expired token
    window.getApp.$emit('APP_LOGIN_FAILED');

  } else if (error.response && error.response.status === 403) {
    window.location.pathname = '/error/403'
  // } else if (error.response && error.response.status === 404) {
  //  window.location.pathname = '/error/404'
  }
  else if(error.response.status === 417){ //wrong credential error for login
    window.getApp.$emit('APP_LOGIN_FAILED');
  }
  return Promise.reject(error)
})

export default {
  baseUrl: DMF_API_BASE_URL,
  axios: axios,

  //auth and registration
  //=============================================================================
  auth: {
    login (credentials) {
      return axios.post(`${DMF_API_BASE_URL}/auth/login`, credentials)
    },
    listAllUsers(){
      return axios.get(`${DMF_API_BASE_URL}/users`)
    },
    registerUser (user) {
      return axios.post(`${DMF_API_BASE_URL}/register`, user)
    }
    //orders
//=============================================================================
  },
  orders:{
    listAllOrders(page=1, limit=15){
      return axios.get(`${DMF_API_BASE_URL}/orders?page=${page}&limit=${limit}`)
    },
    listOrdersForToday(){
      return axios.get(`${DMF_API_BASE_URL}/orders/top/5`)
    },
    listOrdersByStatus(status){
      return axios.get(`${DMF_API_BASE_URL}/orders/status/${status}`)
    },
    listOrdersByLimit(limit){
      return axios.get(`${DMF_API_BASE_URL}/orders/limit/${limit}`)
    },
    updateOrderStatus(orderId,status){
      return axios.put(`${DMF_API_BASE_URL}/orders/${orderId}/status/${status}`)
    },
    getOrderSummary(){
      return axios.get(`${DMF_API_BASE_URL}/orders/summary`)
    },
    packageOrder(orderId){
      return axios.post(`${DMF_API_BASE_URL}/orders/${orderId}/packaged`)
    },
    cancelOrder(statusBody){
      return axios.post(`${DMF_API_BASE_URL}/orders/${orderId}`,statusBody)
    }
 


  /*
    update (id, role) {
      return axios.patch(`${DMF_API_BASE_URL}/roles/${id}`, role)
    },
    delete (id) {
      return axios.delete(`${DMF_API_BASE_URL}/roles/${id}`)
    }
  }*/
  }
}