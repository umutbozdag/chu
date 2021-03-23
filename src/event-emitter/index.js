class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(fn);

    return () => this.off(event, fn);
  }

  off(event, fn) {
    const eventIdx = this.events[event].indexOf(fn);

    if (eventIdx > -1) {
      this.events[event].splice(eventIdx, 1);
    }
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((fn) => fn(data));
  }

  removeAllListeners() {
    Object.keys(this.events).forEach((event) => {
      this.events[event].splice(0, this.events[event].length);
    });
  }
}

// EXAMPLE

// const myEvent = new EventEmitter();

// let s = myEvent.on("hello", () => console.log("hi"));

// myEvent.emit("hello");

// myEvent.removeAllListeners();

export default EventEmitter;
