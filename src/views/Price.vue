<template>
  <div class="price">
    <div class="header">
      <div class="header__logo">
        CryptoApp
      </div>
      <ul class="header__nav">
        <li class="header__list" @click="$router.push('/currency')">
          通貨一覧
        </li>
        <li class="header__list" @click="$router.push('/')">新規登録</li>
        <li class="header__list" @click="$router.push('/login')">ログイン</li>
        <li class="header__list" @click="Logout">ログアウト</li>
      </ul>
      <div
        class="menu"
        @click="openDrawerMenu"
        :class="{ 'is-active': active }"
      >
        <span class="menu__line--top"></span>
        <span class="menu__line--middle"></span>
        <span class="menu__line--bottom"></span>
      </div>
    </div>
    <transition name="right">
      <ul class="menu__nav" v-if="drawerFlg">
        <li class="menu__list">
          <span @click="$router.push('/currency')">通貨一覧</span>
        </li>
        <li class="menu__list">
          <span @click="$router.push('/')">新規登録</span>
        </li>
        <li class="menu__list">
          <span @click="$router.push('/login')">ログイン</span>
        </li>
        <li class="menu__list"><span @click="Logout">ログアウト</span></li>
      </ul>
    </transition>

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
import firebase from "firebase";
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
      drawerFlg: false,
      active: false,
    };
  },
  async created() {
    const item = await axios.get(`/public/v1/ticker?symbol=${this.name}`);
    const coinData = item.data.data;
    this.price = coinData[0].last;
    this.timestamp = coinData[0].timestamp;
  },
  methods: {
    openDrawerMenu() {
      this.drawerFlg = !this.drawerFlg;
      this.active = !this.active;
    },
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
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
