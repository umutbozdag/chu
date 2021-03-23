import notifier from "../shared/notifier";

export default function reactive(target) {
  let listener;
  notifier.on("mounted", (data) => {
    listener = data;
  });

  let observable = new Proxy(target, {
    get: function (target, name) {
      return Object.freeze(target[name]);
    },

    set: function (target, name, value) {
      target[name] = value;

      if (listener) {
        console.log(listener, observable);
        notifier.emit("update", listener(observable));
      }

      return true;
    },
  });

  return observable;
}
