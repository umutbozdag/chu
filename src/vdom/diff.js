import render from "./render";
import patch from "./patch";
import patchTypes from "../utils/patchTypes";
import diffChildren from "./diffChildren";
import diffProps from "./diffProps";

const diff = (oldVTree, newVTree) => {
  // newVTree is empty
  if (newVTree === undefined) {
    return (node) => {
      return patch(node, null, patchTypes.REMOVE);
    };
  }

  // at least one of them is string
  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    if (oldVTree !== newVTree) {
      // could be 2 cases:
      // 1. both trees are string and they have different values
      // 2. one of the trees is text node and
      //    the other one is elem node
      return (node) => {
        let newVNode = render(newVTree);

        return patch(node, newVNode, patchTypes.REPLACE);
      };
    } else {
      // both trees are string and they have same values
      return (node) => node;
    }
  }

  // trees are completely different (type's are different)
  // in this case remove oldVTree and create newVTree completely from scratch
  if (oldVTree.type !== newVTree.type) {
    return (node) => {
      let newVNode = render(newVTree);

      return patch(node, newVNode, patchTypes.REPLACE);
    };
  }

  // oldVTree and newVTree are virtual dom elements
  // they have the same type
  // their props and children could be changed

  // TODO: oldVTree and newVTree returns undefined if el has multiple children
  const patchProps = diffProps(oldVTree.props, newVTree.props);

  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return (node) => {
    patchProps(node);
    patchChildren(node);
    return node;
  };
};

export default diff;
