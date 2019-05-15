<template>
  <div id="kitchen-app">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-subheader>Horizontal Step </v-subheader>
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="step > 1">Name of step 1</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="step > 2">Name of step 2</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Name of step 3</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>


        <v-flex sm12>
         
              <v-card class="mb-3">
                <v-card-text>
                  <div>{{ typeof steps }}</div>

                  <v-text-field
                    :value="steps"
                    hint="This demo has a maximum of 6 steps"
                    label="# of steps"
                    max="6"
                    min="1"
                    persistent-hint
                    type="number"
                    @input="onInput"
                  ></v-text-field>
                </v-card-text>
              </v-card>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <template v-for="n in steps">
                    <v-stepper-step
                      :key="`${n}-step`"
                      :complete="e1 > n"
                      :step="n"
                      editable
                    >
                      Step {{ n }}
                    </v-stepper-step>

                    <v-divider
                      v-if="n !== steps"
                      :key="n"
                    ></v-divider>
                  </template>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content
                    v-for="n in steps"
                    :key="`${n}-content`"
                    :step="n"
                  >
                    <v-card
                      class="mb-5"
                      color="grey lighten-1"
                      height="200px"
                    ></v-card>

                    <v-btn
                      color="primary"
                      @click="nextStep(n)"
                    >
                      Continue
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
 
        </v-flex>
        <!-- <v-flex sm12>
          <v-subheader>Vertical Step </v-subheader>
          <v-stepper v-model="e13" vertical>
            <v-stepper-step step="1" complete>
              Name of step 1
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn color="primary" @click.native="e13 = 2">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step step="2" complete>Name of step 2</v-stepper-step>
            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn color="primary" @click.native="e13 = 3">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step step="3" :rules="[() => false]">
              Ad templates
              <small>Alert message</small>
            </v-stepper-step>
            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn color="primary" @click.native="e13 = 4">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step step="4">View setup instructions</v-stepper-step>
            <v-stepper-content step="4">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn color="primary" @click.native="e13 = 1">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
 import VWidget from '@/components/VWidget';
// export default {
//   components: {
//     VWidget
//   },
//   data () {
//     return {
//       step: 1,
//       e13: 1,
//     };
//   },
//   computed: {
//   },  
//   methods: {
//   }
// };

 export default {
   components: {
     VWidget
   },
    data () {
      return {
        step: 1,
       e13: 1,
        e1: 1,
        steps: 2
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