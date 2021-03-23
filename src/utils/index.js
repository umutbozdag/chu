export const zip = (...arr) =>
  Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) =>
    arr.map((a) => a[i])
  );

export const isAttribute = (prop) => {
  return !prop.startsWith("on");
};

export const isTextNode = (vNode) => {
  return typeof vNode === "string";
};

export const isFunction = (vNode) => {
  return typeof vNode === "function";
};

export const isEvent = (prop) => {
  return !isAttribute(prop);
};

export const normalizeEventName = (prop) => {
  return prop.toLowerCase().substring(2);
};
