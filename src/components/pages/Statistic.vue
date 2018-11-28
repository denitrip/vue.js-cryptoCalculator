<template>
  <div>
    <b-table bordered striped hover :fields="fields" :items="rowData">
      <template slot="details" slot-scope="row">
        <b-button size="sm" @click.stop="opeModal(row.item)" class="mr-1">
          More info
        </b-button>
      </template>
    </b-table>
    <crypto-coin-modal></crypto-coin-modal>
      <b-pagination class="pos-center" v-if="pagination.total" size="sm" :total-rows="pagination.total" :per-page="pagination.perPage"
                    v-model="pagination.currenctPageState" @input="changePaginateState"
      ></b-pagination>
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
  import cryptoCoinModal from '../modals/cryptoCoinModal';

export default {
  data () {
    return {
      rowData: [],
      pagination: {
        total: 0,
        perPage: 10,
        currenctPageState: 1
      }
    }
  },
  methods: {
    formatData(data) {
      this.rowData = data.map((e)=>{
        e.price = `${e.price} $`
        if (e.percentChange24h <= 0) {
          e._cellVariants = { percentChange24h: 'danger' }
        }
        else {
          e._cellVariants = { percentChange24h: 'success' }
        }
        return e;
      })
    },
    opeModal(event){
      this.$root.$emit('openCryptoCoinModal', event);
    }
  },
  computed: {
    ...mapGetters('statistic', {
      fields: 'fields',
      currencies: 'currencies'
    })
  },
  beforeMount(){
    (async () => {
       await this.$store.dispatch('statistic/loadCurrencies');
        this.formatData(this.currencies);
    })();
  },
  components: {
    cryptoCoinModal
  }
}
</script>

<style scoped>



</style>
