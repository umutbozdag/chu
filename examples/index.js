import Chu from "../src/Chu";
import h from "../src/vdom/h";
import reactive from "../src/reactivity/reactive";
import text from "./text";
import input from "./input";

const index = (data) => {
  return h("div", null, `parent ${data.count}`, text, input);
};

new Chu({
  data: {
    count: 10,
  },
  render: index,
  mounted() {
    console.log("index mounted", this);
  },
  updated() {},
  created() {},
}).$mount(document.getElementById("app"));
