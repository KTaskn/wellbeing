<template>
  <v-container class="grey lighten-5">
    <h1>しあわせな毎日を送ろう</h1>

    <c-budget-dialog :pDialog="flagBudgetDialog" @budget="(val) => {
      setBudget(val)
      openHolidayDialog(val)
    }"/>
    <c-holiday-dialog :pDialog="flagHolidayDialog" @holiday="setHoliday"/>
    <c-result-dialog :pDialog="flagResultDialog" 
      :positiveResult="positiveResult" 
      :negativeResult="negativeResult"
      @setPDialog="() => {flagResultDialog = false}"
      />


    <v-overlay :value="inCalculation">
      <h1>計算中...</h1>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>


    <v-text-field v-model="budget" label="予算（円）"></v-text-field>
    <v-text-field v-model="holiday" label="休暇時間（hour）"></v-text-field>

    <v-btn @click="setTemplate">テンプレートを使う</v-btn>
    <v-btn @click="initList">リストを初期化する</v-btn>
    <v-btn @click="call">計算する</v-btn>


    <v-row class="mb-6" justify="center" no-gutters>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">行動</th>
                <th class="text-left">消費時間（hour）</th>
                <th class="text-left">必要経費（円）</th>
                <th class="text-left">短期的幸福度（継続時間 hour）</th>
                <th class="text-left">長期的幸福度（継続時間 月）</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ent in actions" :key="ent.id">
                <td>
                  <v-text-field
                    v-model="ent.label"
                    label="行動"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="ent.required_time"
                    label="消費時間（hour）"
                    :rules="[isNumber]"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="ent.required_cost"
                    label="必要経費（円）"
                    :rules="[isNumber]"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="ent.wellbeing_short"
                    label="短期的幸福度（継続時間 hour）"
                    :rules="[isNumber]"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="ent.wellbeing_long"
                    label="長期的幸福度（継続時間 月）"
                    :rules="[isNumber]"
                  ></v-text-field>
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
import templateActions from "../data/actions";
import { loadScript } from "vue-plugin-load-script";

import CBudgetDialog from './CBudgetDialog.vue'
import CHolidayDialog from "./CHolidayDialog.vue";
import CResultDialog from "./CResultDialog.vue";

interface Data {
  flagBudgetDialog: Boolean;
  flagHolidayDialog: Boolean;
  flagResultDialog: Boolean;
  actions: Array<Action>;
  budget: number;
  holiday: number;
  solver: (() => {}) | undefined;
  inCalculation: Boolean;
  positiveResult: Object;
  negativeResult: Object;
}

export default Vue.extend({
  name: "CTop",
  components: {
    CBudgetDialog,
    CHolidayDialog,
    CResultDialog
  },
  props: {},
  mounted: function () {
    this.initList()
    this.load_solver()
  },
  data: function (): Data {
    return {
      flagBudgetDialog: true,
      flagHolidayDialog: false,
      flagResultDialog: false,
      actions: [],
      budget: 100000,
      holiday: 96,
      solver: undefined,
      inCalculation: false,
      positiveResult: undefined,
      negativeResult: undefined,
    };
  },
  methods: {
    setTemplate: function () {
      this.actions = templateActions;
    },
    initList: function () {
      const sample: Action = {
        id: 1,
        label: "喫茶店でコーヒーを飲む",
        required_cost: 600,
        required_time: 1.0,
        wellbeing_short: 1.0,
        wellbeing_long: 1.0
      }
      this.actions = [sample];
    },
    openHolidayDialog: function () {
      console.log("openHolidayDialog")
      this.flagHolidayDialog = true
    },
    setBudget: function (val: number) {
      console.log("setBudget")
      this.budget = val
    },
    setHoliday: function (val: number) {
      console.log("setHoliday")
      this.holiday = val
    },
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
      this.inCalculation = true
      setTimeout(() => {
        this.positiveResult = this.calc(this.calc_dea_positive(this.actions))
        this.negativeResult = this.calc(this.calc_dea_negative(this.actions))
        this.flagResultDialog = true
        this.inCalculation = false
      }, 3000)
    },
    calc_dea_negative: function (actions: Array<Action>): Array<Action> {
      const results = actions.map((ent, idx): Action => {
        let variables = Object.assign(
            this.dea_vars_u(actions, idx),
            this.dea_vars_v(actions, idx)
          )
        let model = {
          optimize: "target",
          opType: "min",
          constraints: {
            st_1: { equal: 1.0 },
            st_2: { max: 0.0 },
            st_3: { equal: 1.0 },
          },
          variables: variables
        };
        const results = this.solver?.Solve(model);
        ent.score = results.result
        return ent
      })
      return results
    },
    calc_dea_positive: function (actions: Array<Action>): Array<Action> {
      const results = actions.map((ent, idx): Action => {
        let variables = Object.assign(
            this.dea_vars_u(actions, idx),
            this.dea_vars_v(actions, idx)
          )
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
        ent.score = results.result
        return ent
      })
      return results
    },
    dea_vars_u: function(actions: Array<Action>, target) {
      // u_short: {sum_y_val: 0.0, target_y_val: 0.0}
      // u_long: {sum_y_val: 0.0, target_y_val: 0.0}
      return {
        u_short: {
          st_2: actions.map(
              (ent: Action): number => ent.wellbeing_short as number
            ).reduce((result:number, ent: number) => result + ent),
          target: actions[target].wellbeing_short,
          st_3: actions[0].wellbeing_short,
        },
        u_long: {
          st_2: actions.map(
              (ent: Action): number => ent.wellbeing_long as number
            ).reduce((result:number, ent: number) => result + ent),
          target: actions[target].wellbeing_long,
          st_3: actions[0].wellbeing_long,
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
    actions_obj: function (acts: Array<Action>) {
      return acts.reduce((
        result: Object,
        val: Action
      ) => {
        result[val.id] = {
          label: val.label,
          score: val.score,
          required_cost: val.required_cost,
          required_time: val.required_time,
        }
        // 最大時間制限
        result[val.id]["max_" + val.id] = val.required_time
        return result;
      },
      {});
    },
    ints: function (actions: Array<Action>) {
      return actions.reduce(function (
        result: Object,
        val: Action
      ) {
        result[val.id] = 1;
        return result;
      },
      {})
    },
    calc: function (actions: Array<Action>) {
      console.log(actions.map((ent) => ent.score))
      const variables = this.actions_obj(actions)
      const constraints = Object.assign({
          required_cost: { max: Number(this.budget), min: Number(this.budget) * 0.9 },
          required_time: { equal: Number(this.holiday)},
        }, // 時間の制限
        actions.reduce((result, ent) => {
          result["max_" + ent.id] = {
            max: this.holiday / 5.0
          }
          return result
        }, {})
      )
      const ints = this.ints(actions)
      console.log(variables)
      console.log(constraints)
      console.log(ints)
      let model = {
        optimize: "score",
        opType: "max",
        constraints: constraints,
        variables: variables,
        ints: ints,
        options: {
            timeout: 10000
        }
      };
      const results = this.solver?.Solve(model);
      const ret = Object.keys(results).reduce(function (result, key) {
        if (key in variables) {
          let k: number = key
          result[k] = {
              label: variables[k].label,
              times: results[key],
              time: results[key] * variables[k].required_time
            }
        }
        return result
      }, {})
      return ret
    },
    isNumber: function(val) {
      const pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
      return pattern.test(val);
    }
  },
});
</script>