<template>
  <div class="login">
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

    <div class="authentication">
      <div class="authentication__title">
        CryptoApp
      </div>
      <div class="authentication__form">
        <input
          type="email"
          class="authentication__list"
          placeholder="メールアドレス"
          v-model="mailaddress"
        />
        <input
          type="password"
          class="authentication__list"
          placeholder="パスワード"
          v-model="password"
        />
        <button @click="login">ログイン</button>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      drawerFlg: false,
      active: false,
      mailaddress: "",
      password: "",
    };
  },
  methods: {
    openDrawerMenu() {
      this.drawerFlg = !this.drawerFlg;
      this.active = !this.active;
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          alert("Success!");
          this.$router.push("/currency");
        })
        .catch(() => {
          alert("新規登録してください");
        });
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

<style scoped></style>
