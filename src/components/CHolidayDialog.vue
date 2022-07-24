<template>
  <v-dialog v-model="dialog" max-width="300px">
    <v-card>
      <v-card-title>
        <span class="text-h5">休暇時間を入力しよう</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="holiday" :rules="[isInteger]" label="休暇時間(hour)" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="() => {
              if (isInteger(holiday)) {
                dialog = false
                $emit('holiday', holiday)
              }
            }"
          >
            OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "CHolidayDialog",
  props: {
    pDialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: function() {
    return {
      dialog: this.pDialog,
      holiday: undefined
    };
  },
  methods: {
    isInteger: function(val) {
      const pattern = /^[-]?([1-9]\d*|0)$/;
      return pattern.test(val);
    }
  },
  watch: {
    pDialog: function (val) {
      console.log("watching pDialog")
      this.dialog = val
    }
  }
});
</script>
