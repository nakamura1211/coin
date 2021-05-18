import Vue from "vue";
import VueRouter from "vue-router";
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue";
import Currency from "../views/Currency.vue";
import Price from "../views/Price.vue";
import Websocket from "../views/Websocket.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/currency",
    name: "Currency",
    component: Currency,
    meta: { requiresAuth: true },
  },
  {
    path: "/price/:itemId/:name/:namejp",
    name: "Price",
    component: Price,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/websocket/:itemId/:name/:namejp",
    name: "Websocket",
    component: Websocket,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({ name: "Login" });
      }
    });
  } else {
    next();
  }
});

export default router;
