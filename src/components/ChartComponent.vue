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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          { 
            label: 'Grid',
            backgroundColor: '#ff00ff',
            borderColor: '#ff00ff',
            data: [30, 20, 12, 5, 10, 50, 35, 10, 25, 30, 28, 70],
          },
          { 
            label: 'Produced',
            backgroundColor: '#0000ff',
            borderColor: '#0000ff',
            data: [5, 40, 32, 25, 80, 30, 25, 15, 18, 20, 38, 40]
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
            text: 'Retailers Graph',
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
            ticks: {color: 'white', beginAtZero: true}
          },
          x: {
            ticks: {color: 'white', beginAtZero: true}
          }
        }
      }
    }
  }
}

</script>