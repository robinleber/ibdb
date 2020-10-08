import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Import Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// Import Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// Import Vue Material
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);

// Import Vuelidate
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

import { AUTH } from "./firebase";

const app = "";
AUTH.onAuthStateChanged(user => {
    if (!app) {
        new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }

    if (user) store.dispatch("fetchUserProfile", user);
});
