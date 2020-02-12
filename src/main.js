import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import echarts from "echarts";
import axios from "axios";

import apiConfig from "./../api.config";
axios.defaults.baseURL = apiConfig.baseURL;

Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

// import VTypewriter from "v-typewriter";
// Vue.use(VTypewriter);
import "element-ui/lib/theme-chalk/index.css";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
