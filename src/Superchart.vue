<template>
  <div id="app">
  
  <div id = "button">
   <input type="radio" id="line" value="line" v-model="picked">
 <label for="line">line</label>
 <br>
 <input type="radio" id="donut" value="donut" v-model="picked">
 <label for="donut">donut</label>
 <br>
 <input type="radio" id="bar" value="bar" v-model="picked">
 <label for="bar">bar</label>
 <br>
 <span>pick: {{ picked }}</span>
</div>

  <div v-if="picked === 'line'">
    <Linechart :data ="dicarr"/>
  </div>
  <div v-if="picked === 'bar'">
    <Piechart :data ="dicarr"/>
  </div>
  <div v-if="picked === 'donut'">
    <Donutchart :data ="dicarr"/>
  </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Piechart from './components/Piechart.vue'
import Donutchart from './components/Donutchart.vue'
import Linechart from './components/Linechart.vue'

var dicarr = {2018:100,2017:1000,2016:1000,2015:1}
export default{
  name: 'app',
  props:['data'],
  data: () => ({
    dicarr,
    picked: "1"

  }),
  components: {
    HelloWorld,
   Donutchart,
    Piechart, 
    Linechart
  },
  computed:{
    
    radioButtonValue:{
      get:function(){
        return this.value
      },
      set: function(){
        this.$emit("change",this.line)
      }
    }
  },
  methods:{
    changeValue:function(newValue){
      this.picked = newValue;
    }
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
