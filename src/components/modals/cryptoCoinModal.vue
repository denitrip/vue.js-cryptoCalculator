<template>
  <div>
    <b-modal ref="cryptoCoinModal"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             hide-footer
             :title="data.name.toUpperCase()"
             size="sm"
    >
      <b-row class="modal-row">
        <b-col cols="2">
          Rank:
        </b-col>
        <b-col>
          <span class="rcorners">{{data.rank}}</span>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col cols="2">
          Symbol:
        </b-col>
        <b-col>
          <span>{{data.symbol}}</span>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col cols="2">
          Price:
        </b-col>
        <b-col>
          <span>{{data.price}} <span class="dollar">$</span></span>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col cols="2">
          Volume 24H:
        </b-col>
        <b-col>
          <span>{{data.volume24h}}</span>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col cols="2">
          Total supply:
        </b-col>
        <b-col>
          <span>{{data.totalSupply}} <span class="dollar">$</span></span>
        </b-col>
      </b-row>
      <b-row class="modal-row">
        <b-col cols="2">
          PercentChange24h:
        </b-col>
        <b-col v-if="data.percentChange24h <= 0">
          <span class="red">{{data.percentChange24h}} %</span>
        </b-col>
        <b-col v-else>
          <span class="green">{{data.percentChange24h}} %</span>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>

  import Vue from 'vue';
  import {
    handlerResponse
  } from '../../helpers/commonHelpers.js';
  import { mapGetters } from "vuex";
  import { mapMutations } from "vuex";
  import { mapActions } from "vuex";

export default {
  data () {
    return {
      data: {
        name: '',
        id: '',
        symbol: '',
        rank: '',
        price: '',
        totalSupply: '',
        volume24h: '',
        percentChange24h: ''
      },
    }
  },
  methods: {
    loadData(id) {
      this.$http.get(`https://api.udilia.com/coins/v1/cryptocurrencies/${id}`).then(handlerResponse).then((response) => {
        this.data = response;
      });
    }
  },
  computed: {
  },
  mounted() {
    this.$root.$on('openCryptoCoinModal', (data) => {
      this.$refs['cryptoCoinModal'].show();
      this.loadData(data.id);
    })
  },
  beforeDestroy() {
    this.$root.$off('openCryptoCoinModal');
  }
}
</script>

<style scoped>
    .dollar {
      color: lightgreen;
    }
</style>
