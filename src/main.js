import Vue from "vue";
import App from "@/App.vue";
import "@/plugins/vuetify";
import "@/sw";

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/email-signature/sw.js", {
    scope: "/email-signature/"
  });
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
