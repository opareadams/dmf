<template>
  <div id="pageDashboard">

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="startDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="dateRange.start_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateRange.start_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="updateStartDate(dateRange.start_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs11 sm2>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="endDateMenu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="End Date"
              v-model="dateRange.end_date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="dateRange.end_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="updateEndDate(dateRange.end_date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs11 sm2>
           <v-btn outline color="primary" @click="getRiderReport()">Pull Records</v-btn>
        </v-flex>
        <v-flex xs11 sm2>
          <v-progress-circular v-show="loading2" indeterminate :width="3" color="red"></v-progress-circular>
        </v-flex>
      </v-layout>

      <v-layout row wrap>

        <!-- Recent Orders -->
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Rider"
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
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.report"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="_id.id"
                select-all
                v-model="complex.selected"
                :loading="loading"
                hide-actions
                >
                <template slot="items" slot-scope="props">
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td>
                    <td class="text-xs-right">
                      {{ props.item._id[0].name }}     
                    </td>
                    <td class="text-xs-center">{{ props.item.total_orders_assigned }}</td>
                    <td class="text-xs-center">{{ props.item.total_orders_delivered }}</td>
                    <td class="text-xs-center">{{ props.item.total_cash_collected }}</td>
                    <td class="text-xs-center">{{ props.item.total_slydepay_value }}</td>
                    <td class="text-xs-center">{{ props.item.total_amount }}</td>
                    
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>  
        <!-- Recent Payments -->
       <!-- <v-flex lg12 sm12 xs12>
          <plain-table></plain-table>
        </v-flex> -->

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import DMFWebService from '@/services/DMFWebService';
import moment from 'moment';

export default {
  components: {
    VWidget,
    PlainTable,
    PlainTableOrder    
  },
  data: () => ({
    summary:[],
    dateRange: {
      start_date: '2019-01-01',
      end_date:'2019-12-01'
    },
    addRider:{
      name:'',
      number:''
    },
   
    loading: false,
    loading2:false,
    startDateMenu:false,
    endDateMenu: false,
    search: '',
    complex: {
        selected: [],
        page: 1,
        report:[],
        headers: [
          {
            text: 'Rider',
            align: 'right',
            sortable: false,
            value: '_id.0.name'
          },
          { text: 'Orders Assigned' , value: 'total_orders_assigned'},
          { text: 'Orders Delivered' , value: 'total_orders_delivered'},
          { text: 'Cash Collected via COD', value: 'total_cash_collected'},
          { text: 'Cash Value in Slydepay' , value: 'total_slydepay_value'},
          { text: 'Total Cash', value: 'total_amount' , align: 'left'}
      ],
    }, 
    colors: {
        processing: 'rgb(251, 188, 52)',
        pending: 'rgb(251, 188, 52)',
        'on-hold': 'indigo',
        cancelled: 'red',
        failed: 'red',
        completed: 'green',
        true: 'green',
        false: 'rgb(251, 188, 52)'
    }
  }),
  beforeCreate(){
   if (localStorage.ROLE_ID || localStorage.TOKEN) {
     
    }
    else{
        this.$router.replace({ path: '/login' });
    }

  },
  created(){
    //this.dateRange.start_date = moment().startOf('year').format('YYYY-MM-DD');
    this.dateRange.start_date = moment().format("YYYY-MM-DD");
    this.dateRange.end_date = moment().endOf("year").format('YYYY-MM-DD');
    this.getRiderReport();
  },
  methods: {
      getRiderReport(){
        this.loading = true;
        this.loading2 = true;
        DMFWebService.riders.ridersReport(`${this.dateRange.start_date}T00:00:00`,`${this.dateRange.end_date}T23:59:59`).then((response) => {
            this.complex.report = [];
            for(var i =0 ; i < response.data.data.length; i++){
              if(response.data.data[i]._id.length ===0){

              }else{
                  this.complex.report.push(response.data.data[i]);
              }
              
            }

            //console.log(this.complex.report);
        });
        this.loading = false;
        this.loading2 = false;
      },
      updateStartDate (newStartDate) {
        this.dateRange.start_date = newStartDate; 
        this.startDateMenu = false;       
      },
      updateEndDate (newEndDate) {
        this.dateRange.end_date = newEndDate;
        this.endDateMenu = false;  
       // this.getRiderReport();
      },
      moment: function () {
        return moment();
      }
  },
  filters: {
    moment: function (date) {
      return moment(date).startOf('second').fromNow();
    }
  }
};
</script>
