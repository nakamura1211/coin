import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";


Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAfhxfh5FQuAmIW1VVbiSKrn5GE-YDkHdQ",
  authDomain: "vue-coin.firebaseapp.com",
  projectId: "vue-coin",
  storageBucket: "vue-coin.appspot.com",
  messagingSenderId: "994069929599",
  appId: "1:994069929599:web:0042075a3aaf2fffeb294a",
  measurementId: "G-C1X74061C0",
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");