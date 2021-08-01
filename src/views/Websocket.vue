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
import axios from "axios";


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
      // chart1 start
      chart1: {
        type: "line", // チャート計上 line -> 折れ線グラフ
        data: {
          // チャートデータの設定
          datasets: [
            {
              // データセット(複数指定可能)
              label: this.name, // データラベル
              backgroundColor: "rgba(245, 129, 37, 0.2)", // 背景色(fill)
              borderColor: "rgb(245, 129, 37, 1)",
              data: [], // データ格納用配列
            },
          ],
        },
        options: {
          // チャートオプションの設定
          maintainAspectRatio: false, // リサイズ時にアスペクト比を固定するか(True=固定)
          layout: {
            // チャートレイアウト
            padding: {
              left: 100,
              right: 100,
              top: 0,
              bottom: 0,
            },
          },
          scales: {
            // スケールの設定
            yAxes: [
              {
                gridLines: {
                  // 補助線
                  color: "rgba(255,255,255, 0.4)", // 補助線の色
                  zeroLineColor: "white", // y=0（Ｘ軸の色）
                },
                ticks: {
                  // 目盛り
                  fontColor: "white", // 目盛りの色
                  fontSize: 14, // フォントサイズ
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  // 補助線
                  color: "rgba(255,255,255, 0.4)", // 補助線の色
                  zeroLineColor: "white", // y=0（Ｘ軸の色）
                },
                ticks: {
                  // 目盛り
                  fontColor: "white", // 目盛りの色
                  fontSize: 14, // フォントサイズ
                },
                // x軸の設定
                type: "realtime", // リアルタイム描画
                realtime: {
                  duration: 300000,
                  delay: 1000, // 滑らかに表示したい場合？
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
    const item = await axios.get(`/public/v1/ticker?symbol=${this.name}`);
    const coinData = item.data.data;
    this.price = coinData[0].last;
    console.log(item);
  },
};
</script>

<style scoped></style>
