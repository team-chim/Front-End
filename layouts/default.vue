<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
export default {

}
</script>


<style>
.container {
  min-width : 100vw;
  min-height: calc((10/16)*100vw);
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
