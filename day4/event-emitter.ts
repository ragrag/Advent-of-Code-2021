import EventEmitter from "https://deno.land/x/events/mod.ts";

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(100);

const Events = {
  turn: Symbol("turn"),
  finish: Symbol("finish"),
};

export { Events, eventEmitter };
