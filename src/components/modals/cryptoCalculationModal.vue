<template>
  <div>
    <b-button @click="openModal">Calculation</b-button>
    <b-modal ref="cryptoCalculationModal"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             hide-footer
             title="Crypto calculator"
             size="lg"
    >
      <b-row>
        <b-col cols="4">
          <label class="typo__label">Your wallet</label>
        </b-col>
        <b-col cols="4">
          <label class="typo__label">Currency</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <input class="form-control" v-model="cryptoData.money"
                 placeholder="Your wallet">
        </b-col>
        <b-col cols="4">
          <multiselect v-model="cryptoData.currency" :max-height="200"
                       label="name" track-by="id"
                       placeholder="Choose currency"
                       :options="currenciesList"
                       :show-labels="false" :multiple="true"
                       :taggable="true" :close-on-select="false"></multiselect>
        </b-col>
        <b-col cols="2">
          <b-button class="btn" variant="success" @click="addCurrency">Add</b-button>
        </b-col>
        <b-col cols="2">
          <b-button class="btn" variant="warning" @click="clearData">Clear</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table class="margin-top-10" bordered striped hover :fields="calculatorFields" :items="rowData" v-if="rowData && rowData.length">
            <template slot="details" slot-scope="row">
              <b-button size="sm" variant="danger" @click.stop="deleteCurrency(row.item)" class="mr-1">
                X
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>

  import Vue from 'vue';
  import {
    handlerResponse,
    setNotifyData
  } from '../../helpers/commonHelpers.js';
  import { mapGetters } from "vuex";
  import { mapMutations } from "vuex";
  import { mapActions } from "vuex";
  import Multiselect from 'vue-multiselect';

export default {
  data () {
    return {
      rowData: [],
        cryptoData: {
          currency: [],
          money: ''
        },
      dataInitial: {
        currency: [],
        money: ''
      }
    }
  },
  methods: {
    openModal(){
      this.$refs['cryptoCalculationModal'].show();
    },
    addCurrency(){
      if (this.cryptoData.money) {
        if (this.cryptoData.currency) {
          this.cryptoData.currency.forEach((e) => {
            this.$http.get(`https://api.udilia.com/coins/v1/cryptocurrencies/${e.id}`).then(handlerResponse).then((response) => {
              if (!this.rowData.filter(e => e.id == response.id).length) {
                this.$notify(setNotifyData('Success', 'Successfully calculated', 'success'));
                const amount = (this.cryptoData.money / response.price).toFixed(2);
                const profit = (this.cryptoData.money * response.percentChange24h / 100).toFixed(2);
                this.rowData.push({
                  id: response.id,
                  name: response.name,
                  amount: !isNaN(amount) ? amount : '-//-',
                  profit: !isNaN(profit) ? profit : '-//-'
                })
              }
              else {
                this.$notify(setNotifyData('Error', `${response.name} is already in list`, 'error'));
              }
            });
          })
        }
      }
      else {
        this.$notify(setNotifyData('Error','Please enter how much money you have!', 'error'));
      }
    },
    deleteCurrency(row){
      this.rowData = this.rowData.filter(e => e.id !== row.id)
    },
    clearData(){
      this.rowData = [];
      this.cryptoData = this.dataInitial;
    }
  },
  computed: {
    ...mapGetters('statistic', {
      currenciesList: 'currenciesList',
      calculatorFields: 'calculatorFields'
    })
  },
  mounted() {
    this.$root.$on('openCryptoCalculationModal', (data) => {
      this.$refs['cryptoCalculationModal'].show();
      this.loadData(data.id);
    })
  },
  beforeDestroy() {
    this.$root.$off('openCryptoCalculationModal');
  },
  components: {
    Multiselect
  }
}
</script>

<style scoped>
    .dollar {
      color: lightgreen;
    }
</style>
