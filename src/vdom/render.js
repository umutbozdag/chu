import Chu from "../Chu";
import { normalizeEventName, isTextNode, isFunction } from "../utils";

const render = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

const renderElem = ({ type, props = {}, children }) => {
  console.log(type, props, children);

  let el;
  if (isFunction(type)) {
    let convertedFn = type();
    el = document.createElement(convertedFn.type);
  } else {
    el = document.createElement(type);
  }

  // check if it has props
  if (props) {
    //  add props (attributes) to vnode
    Object.keys(props)
      .filter((prop) => !prop.startsWith("on"))
      .forEach((prop) => {
        el.setAttribute(prop, props[prop]);
      });

    // add events to vnode
    Object.keys(props)
      .filter((prop) => prop.startsWith("on"))
      .forEach((prop) => {
        // remove 'on' part and lowercase the event name
        const eventName = normalizeEventName(prop);
        el.addEventListener(eventName, props[prop]);
      });
  }

  for (const child of children) {
    if (!(child instanceof Chu)) {
      if (isTextNode(child)) {
        el.appendChild(document.createTextNode(child));
      } else if (typeof child === "function") {
        el.appendChild(renderElem(child()));
      } else {
        el.appendChild(renderElem(child));
      }
    } else {
      // If the child is an instance of Chu class
      el.appendChild(renderElem(child.render(child.data)));
    }
  }

  return el;
};

export default render;
