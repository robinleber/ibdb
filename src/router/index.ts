import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import SignUp from "@/views/SignUp/SignUp.vue";
import Dashboard from "@/views/Home/Children/Dashboard/Dashboard.vue";
import Books from "@/views/Home/Children/Books/Books.vue";
import Authors from "@/views/Home/Children/Authors/Authors.vue";
import Favorites from '@/views/Home/Children/Favorites/Favorites';
import Profile from "@/views/Home/Children/Profile/Profile.vue";
import Settings from "@/views/Home/Children/Settings/Settings.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "*",
        redirect: "Login",
    },
    {
        path: "/",
        redirect: "Login",
    },
    {
        path: "/home",
        redirect: "Dashboard",
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: "/books",
                name: "Books",
                component: Books,
            },
            {
                path: "/authors",
                name: "Authors",
                component: Authors,
            },
            {
                path: "/favorites",
                name: "Favorites",
                component: Favorites,
            },
            {
                path: "/profile",
                name: "Profile",
                component: Profile,
            },
            {
                path: "/settings",
                name: "Settings",
                component: Settings,
            },
        ],
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            requiresAuth: false,
        },
        component: Login,
    },
    {
        path: "/signUp",
        name: "SignUp",
        meta: {
            requiresAuth: false,
        },
        component: SignUp,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    if (isAuthenticated && to.path == "/") next("Home");
    if (isAuthenticated && !requiresAuth) next("Home");
    if (requiresAuth && !isAuthenticated) next("Login");
    else next();
})

export default router;
