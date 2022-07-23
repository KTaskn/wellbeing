<template>
  <v-container class="grey lighten-5">
    <h1>Hello world</h1>

    <v-form ref="form">
      <v-text-field v-model="budget" label="予算"></v-text-field>
    </v-form>
    <v-form ref="form">
      <v-text-field v-model="holiday" label="休暇"></v-text-field>
    </v-form>
    <v-btn @click="call">calc</v-btn>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">行動</th>
                <th class="text-left">消費時間</th>
                <th class="text-left">必要経費</th>
                <th class="text-left">幸福度</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ent in actions" :key="ent.id">
                <td>
                  <v-form ref="form">
                    <v-text-field
                      v-model="ent.label"
                      label="行動"
                    ></v-text-field>
                  </v-form>
                </td>
                <td>
                  <v-form ref="form">
                    <v-text-field
                      v-model="ent.required_time"
                      label="消費時間"
                    ></v-text-field>
                  </v-form>
                </td>
                <td>
                  <v-form ref="form">
                    <v-text-field
                      v-model="ent.required_cost"
                      label="必要経費"
                    ></v-text-field>
                  </v-form>
                </td>
                <td>
                  <v-form ref="form">
                    <v-text-field
                      v-model="ent.happiness"
                      label="幸福度"
                    ></v-text-field>
                  </v-form>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn @click="addRow" class="mx-2" fab dark color="indigo">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Action from "../interfaces/action";
import actions from "../data/actions";
import { loadScript } from "vue-plugin-load-script";

interface Data {
  actions: Array<Action>;
  budget: number;
  holiday: number;
  solver: (() => {}) | undefined;
}

export default Vue.extend({
  name: "CTop",
  props: {},
  mounted: function () {
    this.actions = actions;
    this.load_solver()
  },
  data: function (): Data {
    return {
      actions: [],
      budget: 300000,
      holiday: 800,
      solver: undefined,
    };
  },
  methods: {
    addRow: function () {
      let tailId: number = this.actions
        .map((ent): number => ent.id)
        .reduce((a, b) => (a > b ? a : b));
      this.actions.push({
        id: tailId + 1,
        label: "",
        required_time: undefined,
        required_cost: undefined,
        wellbeing_long: undefined,
        wellbeing_short: undefined
      });
    },
    load_solver: function () {
      loadScript("https://unpkg.com/javascript-lp-solver/prod/solver.js")
        .then(() => {
          console.log("load")
          this.solver = solver;
        })
        .catch(() => console.log("err"));
    },
    call: function () {
      this.calc_dea();
    },
    calc_dea: function () {
      this.actions.map((ent, idx) => {
        let variables = Object.assign(
            this.dea_vars_u(this.actions, idx),
            this.dea_vars_v(this.actions, idx)
          )
        console.log(variables)
        let model = {
          optimize: "target",
          opType: "max",
          constraints: {
            st_1: { equal: 1.0 },
            st_2: { max: 0.0 },
          },
          variables: variables
        };
        const results = this.solver?.Solve(model);
        console.log(results);
      })
    },
    dea_vars_u: function(actions: Array<Action>, target) {
      // u_short: {sum_y_val: 0.0, target_y_val: 0.0}
      // u_long: {sum_y_val: 0.0, target_y_val: 0.0}
      return {
        u_short: {
          st_2: actions.map(
              (ent: Action): number => ent.wellbeing_short as number
            ).reduce((result:number, ent: number) => result + ent),
          target: actions[target].wellbeing_short
        },
        u_long: {
          st_2: actions.map(
              (ent: Action): number => ent.wellbeing_long as number
            ).reduce((result:number, ent: number) => result + ent),
          target: actions[target].wellbeing_long
        }
      }
    },
    dea_vars_v: function(actions: Array<Action>, target) {
      // v_cost: {sum_x: 0.0, target_x: 0.0}
      // v_time: {sum_x: 0.0, target_x: 0.0}
      return {
        v_cost: {
          st_2: actions.map(
            (ent: Action): number => ent.required_cost as number
          ).reduce((result:number, ent: number) => result + ent),
          st_1: actions[target].required_cost
        },
        v_time: {
          st_2: -actions.map(
            (ent: Action): number => ent.required_time as number
          ).reduce((result:number, ent: number) => result + ent),
          st_1: actions[target].required_time
        },
      }
    },
    actions_obj: function () {
      return this.actions.reduce(function (
        result: Object,
        val: Action
      ) {
        result[val.id] = val;
        return result;
      },
      {});
    },
    ints: function () {
      return this.actions.reduce(function (
        result: Object,
        val: Action
      ) {
        result[val.id] = 1;
        return result;
      },
      {})
    },
    calc: function () {
      let model = {
        optimize: "happiness",
        opType: "max",
        constraints: {
          required_cost: { max: this.budget },
          required_time: { max: this.holiday },
        },
        variables: this.actions_obj(),
        ints: this.ints(),
      };
      const results = this.solver?.Solve(model);
      console.log(results);
    },
  },
});
</script>