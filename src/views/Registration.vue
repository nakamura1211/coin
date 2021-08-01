<template>
  <div class="registration">
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
    };
  },
  methods: {
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
