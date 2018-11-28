<template>
  <div class="card">
    <div class="box">
      <div class="img">
        <img src="../../assets/logos/author.jpg">
      </div>
      <h2>Denis Puchko<br><span>Frontend developer</span></h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et.</p>
      <span>
        <img src="../../assets/logos/codewars.svg" width="200">
      </span>
    </div>
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
    }
  },
  methods: {

  },
  computed: {
  },
  beforeMount(){
  },
  components: {
  }
}
</script>

<style scoped>



</style>
