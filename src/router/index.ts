import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home/Home.vue";
import Login from "@/views/Login/Login.vue";
import SignUp from "@/views/SignUp/SignUp.vue";
import Dashboard from "@/views/Home/Children/Dashboard/Dashboard.vue";
import Books from "@/views/Home/Children/Books/Books.vue";
import Authors from "@/views/Home/Children/Authors/Authors.vue";
import Profile from "@/views/Home/Children/Profile/Profile.vue";
import Settings from "@/views/Home/Children/Settings/Settings.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "*",
        redirect: "/login",
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
        name: "signUp",
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
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    // If path requires authentication and no user is logged in, route to login
    // => Home-Page can't be opened when no user is logged in
    if (requiresAuth && !currentUser) {
        next("Login");
    }
    // If path don't requires authentication and a user is logged in, route to moneytor
    // => Login- and Sign-Up-Page can't be opened when a user is logged in
    else if (!requiresAuth && currentUser) {
        next("Home");
    } else {
        next();
    }
});

export default router;
