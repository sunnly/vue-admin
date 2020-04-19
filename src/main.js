import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import {Button,Radio} from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.component(Button.name, Button);
// Vue.component(Radio.name, Radio);

import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
