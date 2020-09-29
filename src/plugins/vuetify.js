import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  iconfont: "md",
  theme: {
    primary: "#3f88c9",
    secondary: "#665ef1"
  }
};

export default new Vuetify(opts);
