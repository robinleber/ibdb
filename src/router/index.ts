import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Books from "../views/Books.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/home",
    name: "Home",
    children: [
      {
        path: "/books",
        name: "Books",
        component: Books
      }
    ],
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
