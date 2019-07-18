export default [
  
  ////////Self Made events/////////
  {
    name: 'ORDER_PACKAGED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Order has been marked as packaged'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'ORDER_CANCELLED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: 'Order has been cancelled'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'ORDER_DELIVERED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Order(s) marked as delivered'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'RIDER_ASSIGNED_SUCCESSFULLY',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Rider has been assigned!'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'RIDER_ADDED_SUCCESSFULLY',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Rider has been added!'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'RIDER_ADDED_FAILED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: 'Adding rider failed!'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'RIDER_ASSIGNED_ERROR',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: 'Error assigning a rider'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'USER_CREATED_SUCCESSFULLY',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'User created successfully'
      };
      //this.$router.push('/users');     
    }
  },
  {
    name: 'USER_CREATED_FAILED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: 'Error creating user'
      };
      //this.$router.push('/users');     
    }
  },
  
  ///////////////////////////////
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      this.$router.push({ path: 'dashboard' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully.'
      };
      this.$router.replace({ path: '/login' });
      window.localStorage.clear();
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function (e) {
    }
  },
  {
    name: 'APP_LOGIN_FAILED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: 'Check Username or Password'
      };
      this.$router.replace({ path: '/login' });
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function (e) {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },

];
