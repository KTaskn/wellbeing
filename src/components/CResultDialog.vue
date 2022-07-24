<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">結果</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <h2>悲観的結果</h2>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">行動</th>
                      <th class="text-left">回数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ent in negativeResult" :key="ent.id">
                      <td>{{ ent.label }}</td>
                      <td>{{ ent.times }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col>
              <h2>楽観的結果</h2>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">行動</th>
                      <th class="text-left">回数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ent in positiveResult" :key="ent.id">
                      <td>{{ ent.label }}</td>
                      <td>{{ ent.times }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="$emit('setPDialog', false)"
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
  name: "CResultDialog",
  props: {
    pDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    negativeResult: {
      type: Object,
    },
    positiveResult: {
      type: Object,
    },
  },
  data: function() {
    return {
      dialog: this.pDialog,
      results: undefined,
    };
  },
  watch: {
    pDialog: function (val) {
      console.log("watching pDialog")
      this.dialog = val
    }
  }
});
</script>
