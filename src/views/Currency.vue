<template>
  <div class="currency">
    <div class="header">
      <div class="header__logo">
        CryptoApp
      </div>
      <ul class="header__nav">
        <li class="header__list" @click="$router.push('/currency')">
          通貨一覧
        </li>
        <li class="header__list" @click="$router.push('/')" v-if="login">
          新規登録
        </li>
        <li class="header__list" @click="$router.push('/login')" v-if="login">
          ログイン
        </li>
        <li class="header__list" @click="Logout" v-if="logout">ログアウト</li>
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
          <span @click="$router.push('/currency')" v-if="logout">
            通貨一覧</span
          >
        </li>
        <li class="menu__list">
          <span @click="Logout" v-if="logout">ログアウト</span>
        </li>
      </ul>
    </transition>
    <ul class="currency__nav">
      <li
        class="currency__list"
        v-for="(branddata, index) in branddatas"
        :key="index"
      >
        <span
          @click="
            $router.push({
              name: 'Price',
              params: {
                itemId: branddata.itemId,
                name: branddata.name,
                namejp: branddata.namejp,
              },
            })
          "
          >{{ branddata.name }} {{ branddata.namejp }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      branddatas: [
        { itemId: 0, name: "BTC", namejp: "ビットコイン" },
        { itemId: 1, name: "ETH", namejp: "イーサリアム" },
        { itemId: 2, name: "BCH", namejp: "ビットコインキャッシュ" },
        { itemId: 3, name: "LTC", namejp: "ライトコイン" },
        { itemId: 4, name: "XRP", namejp: "リップル" },
      ],
      drawerFlg: false,
      active: false,
      logout: false,
      login: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.logout = true;
      } else {
        // No user is signed in.
      }
    });
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
.currency__list {
  font-size: 32px;
  text-align: center;
  margin-bottom: 80px;
  color: #f58125;
}
.currency__list span {
  display: inline-block;
  cursor: pointer;
}
</style>
