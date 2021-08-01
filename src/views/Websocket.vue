<template>
  <div class="price">
    <div class="line-chart">
      <div class="chart-area">
        <CompLine :data="chart1.data" :options="chart1.options" />
      </div>
    </div>
  </div>
</template>

<script>
import CompLine from "../components/CompLine.vue";


export default {
  props: ["itemId", "name", "namejp"],
  name: "line-chart",
  components: {
    CompLine,
  },
  data() {
    return {
      message: "",
      price:"",
      chart1: {
        type: "line", 
        data: {
          datasets: [
            {
              label: this.name, 
              backgroundColor: "rgba(245, 129, 37, 0.2)", 
              borderColor: "rgb(245, 129, 37, 1)",
              data: [],
            },
          ],
        },
        options: {
          maintainAspectRatio: false, 
          layout: {
            padding: {
              left: 100,
              right: 100,
              top: 0,
              bottom: 0,
            },
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255,255,255, 0.4)", 
                  zeroLineColor: "white",
                },
                ticks: {
                  fontColor: "white",
                  fontSize: 14,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: "rgba(255,255,255, 0.4)", 
                  zeroLineColor: "white", 
                },
                ticks: {
                  fontColor: "white", 
                  fontSize: 14, 
                },
                type: "realtime", 
                realtime: {
                  duration: 300000,
                  delay: 1000, 
                  refresh: 60000,
                  onRefresh: (chart1) => {
                    chart1.data.datasets.forEach((dataset) => {
                      dataset.data.push({
                        x: Date.now(),
                        y: this.message,
                      });
                    });
                  },
                },
              },
            ],
          },
        },
      },
    };
  },

  async created() {
    const ws = await new WebSocket("wss://api.coin.z.com/ws/public/v1");
    const ws_params = {
      command: "subscribe",
      channel: "ticker",
      symbol: this.name,
    };
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify(ws_params));
    });

    ws.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      this.message = data.last;
    });
  },
};
</script>

<style scoped></style>
