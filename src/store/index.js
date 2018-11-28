import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import statistic from './statistic/statistic';

export const store = new Vuex.Store({
  modules: {
    statistic
  },
  //strict: process.env.NODE_ENV !== 'production'
});
