<template>
  <div id="app" class="bg-indigo-400">

    <div>
      <Slider v-model="value" />
    </div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Slider from '@vueform/slider/dist/slider.vue2.js'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Slider
  },
  data() {
    return {
      value: 20
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>