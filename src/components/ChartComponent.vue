<template>
  <Line 
    id="retailer-chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'ChartComponent',
  components: {
    Line
  },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
          { 
            label: 'Neighbour Traded',
            backgroundColor: '#107869',
            borderColor: '#107869',
            data: [30, 20, 12, 5, 10, 50],
          },
          { 
            label: 'Retailer Traded',
            backgroundColor: '#4169E1',
            borderColor: '#4169E1',
            data: [5, 40, 32, 25, 60, 30]
          }
        ]
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          },
          title: {
            display: top,
            text: 'My Energy',
            color: 'white',
            font: {
              size: 24,
              style: 'italic',
              family: 'Helvetica Neue'
            }
          }
        },
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: 'white',
              callback: function(value, index, ticks) {
                return value + ' kwH';
              }
            }
          },
          x: {
            ticks: {color: 'white'}
          }
        }
      }
    }
  }
}

</script>