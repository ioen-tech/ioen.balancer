<template>
  <div v-if="dataSets">
    <Line 
      id="retailer-chart"
      :options="chartOptions"
      :data="chartData"
      :height="250"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import moment from 'moment-timezone'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'ChartComponent',
  props: ['dataSets', 'labels'],
  components: {
    Line
  },
  // data() {

    // const start = moment().hour(12).minute(0)
    // let labels = new Array(288)
    // let data = new Array(288)
    // labels[0] = start.format('hh:mm a')
    // for (let i=1; i<288; i++) {
    //   labels[i] = start.add(5, 'minutes').format('hh:mm a')
    //   data[i] = Math.ceil(Math.random() * 1200) * (Math.round(Math.random()) ? 1 : -1)
    // }
    // return {
    //   chartData: {},
    //   chartOptions: {}
    // }
  // },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          { 
            label: 'My Group Energy',
            backgroundColor: '#94C973',
            borderColor: '#94C973',
            borderWidth: 1,
            data: this.dataSets,
            tension: 0.41,
            pointRadius: 1
          }
        ]
      }
    },
    chartOptions() {
      return {
        plugins: {
          legend: {
            labels: {
              color: 'white',
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
        maintainAspectRatio: false,
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Group Energy',
              color: 'white',
            },
            ticks: {
              color: 'white',
              stepSize: 500
            },
            grid: {
              color :(context) => {
                if(context.tick.value > 400 && context.tick.value < 600) {
                  return '#1891b4'
                } else if (context.tick.value === 0) {
                  return '#ceb180'
                } else if (context.tick.value < -400 && context.tick.value > -600) {
                  return 'green'
                }
              }
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              display: true,
              drawBorder: true
            },
            ticks: {
              color: 'white',
              font: {
                size: 10
              },
              callback: function(value, index, ticks) {
                if (index%24 == 0) {
                  return (this.getLabelForValue(value))
                }
              }
            }
          }
        }
      }
    }
  },
  async created() {

    // this.chartData = {
    //   labels: this.labels,
    //   datasets: [
    //     { 
    //       label: 'My Group Energy',
    //       backgroundColor: '#107869',
    //       borderColor: '#107869',
    //       borderWidth: 1,
    //       data: this.dataSets,
    //       tension: 0.41,
    //       pointRadius: 1
    //     }
    //   ]
    // },
    // this.chartOptions = {
    //   plugins: {
    //     legend: {
    //       labels: {
    //         color: 'white',
    //       }
    //     },
    //     title: {
    //       display: top,
    //       text: 'My Energy',
    //       color: 'white',
    //       font: {
    //         size: 24,
    //         style: 'italic',
    //         family: 'Helvetica Neue'
    //       }
    //     }
    //   },
    //   responsive: true,
    //   scales: {
    //     y: {
    //       display: true,
    //       title: {
    //         display: true,
    //         text: 'Group Energy',
    //         color: 'white',
    //       },
    //       ticks: {
    //         color: 'white',
    //         beginAtZero: true,
    //         stepSize: 500
    //       },
    //       grid: {
    //         color :(context) => {
    //           if(context.tick.value > 400 && context.tick.value < 600) {
    //             return '#ceb180'
    //           } else if (context.tick.value === 0) {
    //             return 'green'
    //           } else if (context.tick.value < -400 && context.tick.value > -600) {
    //             return '#1891b4'
    //           }
    //         }
    //       }
    //     },
    //     x: {
    //       grid: {
    //         display: true,
    //         drawBorder: true
    //       },
    //       ticks: {
    //         color: 'white',
    //         font: {
    //           size: 10
    //         }
    //       }
    //     }
    //   }
    // }

  }
}

</script>