import {
  handlerResponse
} from '../../helpers/commonHelpers.js';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    fields: [
      {key: 'rank', label: 'Rank'},
      {key: 'name', label: 'Name'},
      {key: 'price', label: 'Price'},
      {key: 'percentChange24h', label: 'Percent Change 24h'},
      {key: 'details', label: 'Details'}
    ],
    calculatorFields: [
      {key: 'name', label: 'Name'},
      {key: 'amount', label: 'You can buy'},
      {key: 'profit', label: 'Profit'},
      {key: 'details', label: 'Details'}
    ],
    currencies: [],
    currenciesList: []
  },
  getters: {
    fields(state) {
      return state.fields;
    },
    currenciesList(state) {
      return state.currenciesList;
    },
    calculatorFields(state) {
      return state.calculatorFields;
    },
    currencies(state) {
      return state.currencies;
    }
  },
  mutations: {
    setCurrencyList(state, data) {
      state.currenciesList = data.currencies.map((e)=>{return {id: e.id, name: e.name}})
    },
    setCurrencies(state, data) {
      state.currencies = data.currencies;
    }
  },
  actions: {
    async loadCurrencies(store, payLoad) {
      try {
        const data = await Vue.http.get(`https://api.udilia.com/coins/v1/cryptocurrencies`, {params: payLoad}).then(handlerResponse).then((data)=>{
          store.commit('setCurrencies',data);
          store.commit('setCurrencyList',data);
        });
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}
