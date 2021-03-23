import { isAttribute } from "../utils";

const diffProps = (oldProps, newProps) => {
  const patches = [];

  // Check newProps if it's null?
  if (newProps) {
    // set all the props in oldProps to newProps

    Object.entries(newProps)
      .filter(([key, val]) => isAttribute(key))
      .forEach(([key, val]) => {
        patches.push((node) => {
          node.setAttribute(key, val);
          return node;
        });
      });

    // to keep patches array updated, we have to check every prop in oldProps if it's included in newProps too
    // if it's not included, then remove that prop (prop is not used in newProps anymore)
    Object.keys(oldProps)
      .filter(([key, val]) => isAttribute(key))
      .forEach((key) => {
        patches.push((node) => {
          if (!(key in newProps)) {
            node.removeAttribute(key);
            return node;
          }
        });
      });
  }

  // apply all patches

  return (node) => {
    patches.forEach((patch) => {
      patch(node);
    });
    return node;
  };
};

export default diffProps;
