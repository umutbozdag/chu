import Chu from "../src/Chu";
import h from "../src/vdom/h";
import reactive from "../src/reactivity/reactive";

let input = new Chu({
  data: {
    text: "",
  },
  render: (data) => {
    return h("div", null, `hello ${data.text}`);
  },
  mounted() {
    console.log("input mounted", this);
    // TODO: this.data.text returns undefined and changing it won't trigger reactivity
    // this.data.text = "SELAMLARS";
  },
  updated() {},
  created() {
    console.log("input created!");
  },
});

export default input;
