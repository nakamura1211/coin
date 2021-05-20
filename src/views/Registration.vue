<template>
  <div class="registration">
    <div class="header">
      <div class="header__logo">
        CryptoApp
      </div>
      <ul class="header__nav">
        <li
          class="header__list"
          @click="$router.push('/currency')"
          v-if="logout"
        >
          通貨一覧
        </li>
        <li class="header__list" @click="$router.push('/')">新規登録</li>
        <li class="header__list" @click="$router.push('/login')">ログイン</li>
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
          <span @click="$router.push('/')">新規登録</span>
        </li>
        <li class="menu__list">
          <span @click="$router.push('/login')">ログイン</span>
        </li>
      </ul>
    </transition>
    <div class="authentication">
      <div class="authentication__title">
        CryptoApp
      </div>
      <form @submit.prevent="onSubmit">
        <div class="authentication__form">
          <ValidationProvider
            name="メールアドレス"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              type="email"
              class="authentication__list"
              placeholder="メールアドレス"
              v-model="from.mailaddress"
            />
            <div class="text-danger__1">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            name="パスワード"
            rules="required|min: 8"
            v-slot="{ errors }"
          >
            <input
              type="password"
              class="authentication__list"
              placeholder="パスワード"
              v-model="from.password"
            />
            <div class="text-danger__2">{{ errors[0] }}</div>
          </ValidationProvider>
          <button @click="signUp">登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { ValidationProvider, localize, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
for (let rule in rules) {
  extend(rule, rules[rule]);
}
import ja from "vee-validate/dist/locale/ja";
localize("ja", ja);

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      drawerFlg: false,
      active: false,
      from: { mailaddress: "", password: "" },
      logout: false,
    };
  },
  methods: {
    openDrawerMenu() {
      this.drawerFlg = !this.drawerFlg;
      this.active = !this.active;
    },
    onSubmit() {
      // Submit処理
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.from.mailaddress,
          this.from.password
        )
        .then((user) => {
          alert("Create account: ", user.email);
          this.$router.push("/login");
        })
        .catch(() => {
          alert("登録済みです");
          this.$router.push("/login");
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

<style scoped>
.text-danger__1 {
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 24px;
  margin-bottom: 24px;
}
.text-danger__2 {
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 24px;
}
</style>
