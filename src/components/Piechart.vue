<template>
  <div class="example">
    <apexcharts width="500" height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
     
  </div>
</template>

<script>
//import VueApexCharts from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'BarExample',
  components: {
    apexcharts: VueApexCharts,
  },
  props: ['data'],
  data: function() {
    //dicarr is dictionary array
    const dicarr = this.data;
    var x_ = [];
    var y_ = [];
        for (var key in dicarr){
            x_.push(key);
            y_.push(dicarr[key]);
          }
    return {
      chartOptions: {
        
        xaxis: {
          
          categories: x_//[year[0],year[1],year[2],year[3]]//dicarr[key]//year
        }
      },
      series: [{
        name: 'series-1',
        data: y_
      }]
    }
  },
 
}
</script>