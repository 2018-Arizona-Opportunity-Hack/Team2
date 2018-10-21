<template>
  <div class="example">
    <apexcharts width="500" height="350" type="donut" :options="chartOptions" :series="series"></apexcharts>
    <div>
       <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script>
//import VueApexCharts from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'DonutExample',
  components: {
    apexcharts: VueApexCharts,
  },
  props:['data'],
  data: function() {
      const dicarr = this.data;
      var label = [];
      var content = [];
      for (var key in dicarr){
          label.push(key);
          content.push(dicarr[key]);
      }
    return {
      chartOptions: {
        labels: label
      },
      series: content
    }
  }
  
}
</script>