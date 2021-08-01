<template>
  <div class="header">
    <div class="header__logo">
      CryptoApp
    </div>
    <ul class="header__nav">
      <li class="header__list" @click="$router.push('/',() => {})" v-if="login">
        新規登録
      </li>
      <li class="header__list" @click="$router.push('/login',() => {})" v-if="login">
        ログイン
      </li>
      <li
        class="header__list"
        @click="$router.push('/currency', () => {})"
        v-if="logout"
      >
        通貨一覧
      </li>
      <li class="header__list" @click="Logout" v-if="logout">ログアウト</li>
    </ul>
    <div class="menu" @click="openDrawerMenu" :class="{ 'is-active': active }">
      <span class="menu__line--top"></span>
      <span class="menu__line--middle"></span>
      <span class="menu__line--bottom"></span>
    </div>
    <transition name="right">
      <ul class="menu__nav" v-if="drawerFlg">
        <li class="menu__list">
          <span @click="$router.push('/', () => {})"  v-if="login"
            >新規登録</span
          >
        </li>
        <li class="menu__list">
          <span @click="$router.push('/login', () => {})" v-if="login"
            >ログイン</span
          >
        </li>
        <li class="menu__list">
          <span @click="$router.push('/currency', () => {})" v-if="logout">
            通貨一覧</span
          >
        </li>
        <li class="menu__list">
          <span @click="Logout" v-if="logout">ログアウト</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
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
        this.login = false;
      } else {
        this.login = true;
        this.logout = false;
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-bottom: 96px;
  background-color: black;
  color: white;
}
.header__logo {
  margin-left: 32px;
  font-weight: bold;
}
.header__nav {
  display: flex;
}
.header__list {
  margin-right: 32px;
  list-style: none;
  cursor: pointer;
}
.menu,
transition {
  display: none;
}

@media screen and (max-width: 768px) {
  .header__nav {
    display: none;
  }
  .right-enter-active,
  .right-leave-active {
    transform: translate(0px, 0px);
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    list-style-type: none;
  }
  .right-enter,
  .right-leave-to {
    transform: translateX(100%) translateX(0px);
  }

  .menu__nav {
    position: absolute;
    height: 100%;
    width: 50%;
    top: 0;
    right: 0;
    background-color: white;
    text-align: center;
    color: black;
  }

  .menu__list {
    margin-top: 104px;
    font-size: 24px;
    list-style: none;
  }
  .menu {
    display: inline-block;
    width: 32px;
    height: 24px;
    cursor: pointer;
    position: relative;
    right: 20px;
    top: 2px;
  }
  .menu__line--top,
  .menu__line--middle,
  .menu__line--bottom {
    display: inline-block;
    width: 100%;
    height: 4px;
    background-color: white;
    position: absolute;
    transition: 0.5s;
  }
  .menu__line--top {
    top: 0;
  }
  .menu__line--middle {
    top: 10px;
  }
  .menu__line--bottom {
    bottom: 0;
  }
  .menu.is-active span:nth-of-type(1) {
    top: 10px;
    transform: rotate(45deg);
    background-color: black;
  }
  .menu.is-active span:nth-of-type(2) {
    opacity: 0;
  }
  .menu.is-active span:nth-of-type(3) {
    top: 10px;
    transform: rotate(-45deg);
    background-color: black;
  }
  .menu.is-active {
    z-index: 10;
  }
}
</style>
