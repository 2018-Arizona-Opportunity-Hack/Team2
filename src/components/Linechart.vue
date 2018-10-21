<template>
  <div class="example">
    <apexcharts width="500" height="350" type="line" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
//import VueApexCharts from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'LineExample',
  components: {
    apexcharts: VueApexCharts,
  },
  props: ['data'],
  data: function() {
      const dicarr = this.data;
    var x_ = [];
    var y_ = [];
        for (var key in dicarr){
            x_.push(key[0]);
            y_.push(dicarr[key]);
          }
    return {
      chartOptions: {
        xaxis: {
          type: 'monthtime',
          categories: ['01/2003', '02/2003','03/2003','04/2003','05/2003','06/2003','07/2003','08/2003'],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
  
}
</script>