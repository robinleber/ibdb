import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import Dashboard from "@/views/Home/Children/Dashboard/Dashboard.vue"
import Books from "@/views/Home/Children/Books/Books.vue"
import Authors from "@/views/Home/Children/Authors/Authors.vue"
import Profile from "@/views/Home/Children/Profile/Profile.vue"
import Settings from "@/views/Home/Children/Settings/Settings.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/home",
    redirect: "Dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/books",
        name: "Books",
        component: Books
      },
      {
        path: "/authors",
        name: "Authors",
        component: Authors
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings
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
