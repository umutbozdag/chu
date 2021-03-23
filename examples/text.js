import Chu from "../src/Chu";
import h from "../src/vdom/h";
import reactive from "../src/reactivity/reactive";

const myComp = (data) => {
  return h("div", null, `hello ${data.count}`);
};

let comp = new Chu({
  data: {
    count: 0,
  },
  render: myComp,
  mounted() {
    console.log("text mounted!", this);
    setTimeout(() => {
      this.data.count = 15;
    }, 2000);
  },
  updated() {},
  created() {},
});

export default comp;
