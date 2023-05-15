<template>
  <div v-if="dataSets">
    <Scatter
      id="retailer-chart"
      :options="chartOptions"
      :data="chartData"
      :height="250"
      :plugins="gridBackground"
    />
  </div>
</template>

<script>
import { Line, Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js'
import moment from 'moment-timezone'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler )

export default {
  name: 'ChartComponent',
  props: ['dataSets', 'labels'],
  components: {
    Scatter
  },
  data() {
    return {
      gridBackground:[]
    }
  },
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
        plugins:
        {
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const arr = (tooltipItem.label + "").split(".")
                const min = Math.round(((parseInt(arr[1], 10)/10000000000) * 60))
                let fmin = min
                if ((min+"").length == 1) {
                  fmin = '0' + min
                }
                if (arr[0] > 11) {
                  const t = arr[0] % 12
                  if (t == 0) {
                    return arr[0] + ':' + fmin + ' pm'
                  } else {
                    return t + ':' + fmin + ' pm'
                  }
                } else {
                  return arr[0] + ':' + fmin + ' am'
                }
              },
              title: function(tooltipItem) {
                return 'Group Energy'
              }
            }
          },
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
        showLine: true,
        scales: {
          y: {
            min: -3500,
            max: 3500,
            display: true,
            title: {
              display: true,
              text: 'Group Energy',
              color: 'white',
            },
            ticks: {
              color: 'white',
              stepSize: 500,
              font: {
                size: 10
              },
            },
            grid: {
              color :(context) => {
                if(context.tick.value > 400 && context.tick.value < 600) {
                  return 'rgba(189,155,25,0.3)'
                } else if (context.tick.value === 0) {
                  return '#ceb180'
                } else if (context.tick.value < -400 && context.tick.value > -600) {
                  return 'rgba(189,155,25,0.3)'
                } else {
                  return 'rgba(108,122,137,0.3)'
                }
              }
            },
            beginAtZero: true,
          },
          x: {
            min: 0,
            max: 24,
            grid: {
              display: true,
              drawBorder: true
            },
            ticks: {
              stepSize: 6,
              color: 'white',
              font: {
                size: 10
              },
              callback: function(value, index, ticks) {
                if (value == 18) {
                  return '6pm'
                } else if (value == 0) {
                  return '12am'
                } else if (value == 12) {
                  return value + 'pm'
                } else if (value ==24) {
                  return '12am'
                } else {
                  return value + 'am'
                }
              }
            }
          }
        }
      }
    }
  },
  async created() {

    const config = {
      id: 'gridBackGround',
      beforeDraw:(chart, args, options) => {
        const {ctx, chartArea: {top, right, bottom, left, width, height}, scales: {x, y} } = chart
        ctx.save()

        bgColors(3500, 500, 'rgba(11,127,171,0.5)')
        bgColors(500, -500, 'rgba(189,155,25,0.5)')
        bgColors(-500, -3500, 'rgba(27,163,156,0.5)')

        // background
        function bgColors(bracketLow, bracketHigh, color) {
          ctx.fillStyle = color
          ctx.fillRect(left, y.getPixelForValue(bracketHigh), width, y.getPixelForValue(bracketLow)-y.getPixelForValue(bracketHigh))
          ctx.restore()
        }
      }
    }
    this.gridBackground.push(config)
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