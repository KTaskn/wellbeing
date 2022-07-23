<template>
  <div>
    <h1>Hello world</h1>
    <v-btn @click="call">calc</v-btn>

    <v-container class="grey lighten-5">
      <v-row class="mb-6" justify="center" no-gutters>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">行動</th>
                  <th class="text-left">必要経費</th>
                  <th class="text-left">消費時間</th>
                  <th class="text-left">幸福度</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ent in actions" :key="ent.label">
                  <td>
                    <v-form ref="form">
                      <v-text-field v-model="ent.label"></v-text-field>
                    </v-form>
                  </td>
                  <td>
                    <v-form ref="form">
                      <v-text-field v-model="ent.required_time"></v-text-field>
                    </v-form>
                  </td>
                  <td>
                    <v-form ref="form">
                      <v-text-field v-model="ent.required_cost"></v-text-field>
                    </v-form>
                  </td>
                  <td>
                    <v-form ref="form">
                      <v-text-field v-model="ent.happiness"></v-text-field>
                    </v-form>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-icon> mdi-plus </v-icon>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Action from "../interfaces/action";
import actions from "../data/actions";
import { loadScript } from "vue-plugin-load-script";

interface Data {
  actions: Array<Action>;
}

export default Vue.extend({
  name: "CTop",
  props: {},
  mounted: function () {
    this.actions = actions;
  },
  data: function (): Data {
    return {
      actions: [],
    };
  },
  methods: {
    call: function () {
      let fuga: string = "123";
      console.log(fuga);
      loadScript("https://unpkg.com/javascript-lp-solver/prod/solver.js")
        .then(() => {
          console.log("ok");
          var model = {
            optimize: "capacity",
            opType: "max",
            constraints: {
              plane: { max: 44 },
              person: { max: 512 },
              cost: { max: 300000 },
            },
            variables: {
              brit: {
                capacity: 20000,
                plane: 1,
                person: 8,
                cost: 5000,
              },
              yank: {
                capacity: 30000,
                plane: 1,
                person: 16,
                cost: 9000,
              },
            },
          };
          const results = solver.Solve(model);
          console.log(results);
        })
        .catch(() => console.log("err"));
    },
  },
});
</script>