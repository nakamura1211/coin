<template>
  <div class="price">
    <div class="main">
      <div class="main__name">{{ name }} <br class="br-sp" />{{ namejp }}</div>
      <div class="main__final-price">最終取引価格</div>
      <div class="main__price">{{ price }}</div>
      <div class="timestamp">{{ timestamp | moment }}</div>
      <button
        @click="
          $router.push({
            name: 'Websocket',
            params: {
              itemId: itemId,
              name: name,
              namejp: namejp,
            },
          })
        "
      >
        Real-time chart
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  props: ["itemId", "name", "namejp"],
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm:ss");
    },
  },

  data() {
    return {
      price: "",
      timestamp: "",
    };
  },
  async created() {
    const item = await axios.get(`/public/v1/ticker?symbol=${this.name}`);
    const coinData = item.data.data;
    this.price = coinData[0].last;
    this.timestamp = coinData[0].timestamp;
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 136px;
}
.main__name {
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 88px;
  color: #f58125;
}
.main__final-price {
  font-size: 48px;
  text-align: center;
  color: white;
  margin-bottom: 32px;
}
.main__price {
  font-size: 56px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 88px;
  color: white;
}
.timestamp {
  font-size: 40px;
  text-align: center;
  color: white;
  margin-bottom: 64px;
}
button {
  background-color: black;
  color: #f58125;
  font-size: 30px;
  width: 250px;
  border-radius: 30px;
}

@media screen and (max-width: 768px) {
  .mein__name {
    font-size: 40px;
  }
  .main__final-price {
    font-size: 40px;
  }
  .main__price {
    font-size: 48px;
  }
  .timestamp {
    font-size: 32px;
  }
}
</style>
