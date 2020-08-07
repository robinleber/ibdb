import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
/**
 * Import Axios
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
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
import "vue-material/dist/theme/default-dark.css";
Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
