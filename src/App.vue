<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand">
          <img src="./assets/logos/Bitcoin.svg.png" width="30" height="30" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <crypto-calculation-modal></crypto-calculation-modal>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goToStatistic">Statistic</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goToContacts">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <router-view></router-view>
    </div>
    <notifications group="foo" position="bottom right" :duration="7000"/>
  </div>
</template>

<script>

  import Vue from 'vue';
  import cryptoCalculationModal from './components/modals/cryptoCalculationModal';


export default {
  data () {
    return {
      msg: "Let's get the party started"
    }
  },
  methods: {
    goToStatistic(){
      this.$router.push({path: `/`})
    },
    goToContacts() {
      this.$router.push({path: `/contacts`})
    }
  },
  components: {
    cryptoCalculationModal
  }
}
</script>

<style scoped>

</style>
