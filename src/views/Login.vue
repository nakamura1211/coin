<template>
  <div class="login">
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
      mailaddress: "",
      password: "",
    };
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          alert("Success!");
          this.$router.push("/currency");
        })
        .catch(() => {
          alert("メールアドレスまたはパスワードが違います");
        });
    },
  },
};
</script>

<style scoped></style>
