import patchTypes from "../utils/patchTypes";

export default (node, newVNode, type) => {
  switch (type) {
    case patchTypes.REMOVE:
      removeNode(node);
      return undefined;
    case patchTypes.REPLACE:
      replaceNode(node, newVNode);
      return newVNode;
  }
};

const removeNode = (node) => {
  node.remove();
};

const replaceNode = (node, newNode) => {
  node.replaceWith(newNode);
};
