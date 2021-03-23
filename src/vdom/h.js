import Chu from "../Chu";
export default (type, props = {}, ...children) => {
  return {
    type,
    props,
    // flat children array so rendering elements with `.map` will work
    children: children
      .map((child) => {
        // if (child instanceof Chu) {
        //   return child.render(child.data);
        // }
        return child;
      })
      .flat(),
  };
};
