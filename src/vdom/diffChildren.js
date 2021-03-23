import { zip } from "../utils";
import diff from "./diff";
import render from "./render";

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];

  for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
    childPatches.push(diff(oldVChild, newVChild));
  }

  const additionalPatches = [];

  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push((node) => {
      node.appendChild(render(additionalVChild));
      return node;
    });
  }
  return (parent) => {
    for (const [patch, child] of zip(childPatches, parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch(parent);
    }
    return parent;
  };
};

export default diffChildren;
