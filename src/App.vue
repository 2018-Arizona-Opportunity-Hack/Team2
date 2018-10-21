<template>
  <div id="app">
  <Piechart/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Piechart from './components/Piechart.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
    Piechart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
