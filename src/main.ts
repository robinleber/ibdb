import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
/**
 * Import Axios
 */
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
/**
 * Import Element UI
 */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
/**
 * Import Vue Material
 */
/* @ts-ignore */
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);

/**
 * Import Firebase
 */
import { firestorePlugin } from "vuefire";
import firebase from "firebase";
import "firebase/firestore";
/**
 * Use Firebase
 */
Vue.use(firestorePlugin);
// Configure firebase connection
const firebaseConfig = {
    apiKey: "AIzaSyCx2AB7A8mV7wceJa1o7fGetUTLtBdk180",
    authDomain: "ibdb-a3662.firebaseapp.com",
    databaseURL: "https://ibdb-a3662.firebaseio.com",
    projectId: "ibdb-a3662",
    storageBucket: "ibdb-a3662.appspot.com",
    messagingSenderId: "749530552418",
    appId: "1:749530552418:web:6f474f640c61129253593b",
};
firebase.initializeApp(firebaseConfig);
// Export database-configuration
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

const app = "";

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        firebase.auth().useDeviceLanguage;
        new Vue({
            router,
            render: (h) => h(App),
        }).$mount("#app");
    }
});
