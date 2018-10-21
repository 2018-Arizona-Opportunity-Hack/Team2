<template>
  <div id="app">
  <Linechart :data ="dicarr"/>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
//import Piechart from './components/Piechart.vue'
//import Donutchart from './components/Donutchart.vue'
import Linechart from './components/Linechart.vue'

var dicarr = {2018:100,2017:1000,2016:1000,2015:1}
export default{
  name: 'app',
  data: () => ({
    dicarr
  }),
  components: {
    HelloWorld,
   Linechart
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
