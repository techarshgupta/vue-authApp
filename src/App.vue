<template>
  <div>
    <comp-header/>
    <router-view/>
  </div>
</template>


<script>
  import compHeader from './components/Header/Header.vue';

  export default {
    components:{
      compHeader
    },
    created() {
      this.$store.dispatch('refreshToken')
    }
  }
</script>


<style>
  @import './assets/style.css';

</style>