import mount from "./vdom/mount";
import render from "./vdom/render";
import notifier from "./shared/notifier";
import diff from "./vdom/diff";
import { isFunction } from "./utils";
import reactive from "./reactivity/reactive";

export default class Chu {
  constructor(options) {
    this.render = options.render; // fn
    this.options = options;
    this.data;
    this.rootEl;
    this.oldVTree;
    this.mounted = false;
    this.$el;

    notifier.on("update", (newVTree) => {
      // TODO: can i remove this condition?
      if (this.mounted) {
        this.diffAndPatch(newVTree);
      }
    });

    this.makeDataReactive();

    console.log("this?", this);
    return this;
  }

  diffAndPatch(newVTree) {
    // this.create();
    const patch = diff(this.oldVTree, newVTree);

    this.rootEl = patch(this.rootEl);
    this.oldVTree = newVTree;

    if (this.options.updated && isFunction(this.options.updated)) {
      this.options.updated();
    }
  }

  makeDataReactive() {
    this.data = reactive(this.options && this.options.data);

    // TODO: make sure every child's data is being reactive
    notifier.on("created", () => {
      if (this.oldVTree.children?.length > 0) {
        this.oldVTree.children.forEach((child) => {
          console.log("CHILD", child);

          if (typeof child.data === "function") {
            child.data = reactive(child.data);
          }
        });
      }
    });
    console.log("makeDataReac", this);
  }

  create() {
    this.oldVTree = this.render(this.data);
    console.log("oldVTreeEE", this.oldVTree);

    // TODO: make sure every child's created method is working if it's present
    if (this.oldVTree.children?.length > 0) {
      this.oldVTree.children.forEach((child) => {
        if (child instanceof Chu) {
          child.oldVTree = child.render(child.data);
          if (child.options?.created) {
            child.options.created();
          }
        }
      });
    }
    if (this.options?.created) {
      this.options.created();
    }

    notifier.emit("created");
    return this.oldVTree;
  }

  $mount(el) {
    this.$el = el;

    this.oldVTree = this.create();

    const app = render(this.oldVTree);
    this.rootEl = mount(app, el);

    notifier.emit("mounted", this.render);

    if (this.options.mounted && isFunction(this.options.mounted)) {
      this.options.mounted();

      if (this.oldVTree.children?.length > 0) {
        this.oldVTree.children.forEach((child) => {
          if (child instanceof Chu) {
            if (child.options?.mounted) {
              notifier.emit("mounted", child.render);
              child.options.mounted(child);
            }
          }
        });
      }
    }

    this.mounted = true;
  }
}
