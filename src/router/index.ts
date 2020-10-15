import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import SignUp from "@/views/SignUp/SignUp.vue";
import Dashboard from "@/views/Home/Children/Dashboard/Dashboard.vue";
import Books from "@/views/Home/Children/Books/Books.vue";
import Authors from "@/views/Home/Children/Authors/Authors.vue";
import Favorites from '@/views/Home/Children/Favorites/Favorites';
import Settings from "@/views/Home/Children/Settings/Settings.vue";
import * as fb from "@/firebase";

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
                path: "/Dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: "/Books",
                name: "Books",
                component: Books,
            },
            {
                path: "/Authors",
                name: "Authors",
                component: Authors,
            },
            {
                path: "/Favorites",
                name: "Favorites",
                component: Favorites,
            },
            {
                path: "/Settings",
                name: "Settings",
                component: Settings,
            },
        ],
        component: Home,
    },
    {
        path: "/Login",
        name: "Login",
        meta: {
            requiresAuth: false,
        },
        component: Login,
    },
    {
        path: "/SignUp",
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
    const isAuthenticated = fb.AUTH.currentUser;
    if (isAuthenticated && to.path == "/") next("Home");
    if (isAuthenticated && !requiresAuth) next("Home");
    if (requiresAuth && !isAuthenticated) next("Login");
    else next();
})

export default router;
