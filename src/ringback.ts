"use strict";

type EventArgsMap = Record<string, any[]>;

type CallbacksMap<M extends EventArgsMap> = {
  [Properties in keyof M]: Callback<M, Properties>[];
};

export type Callback<T extends EventArgsMap, EventName extends keyof T> = (
  ...args: T[EventName]
) => void;

export class Ringback<EventArgs extends EventArgsMap> {
  eventCallbacks: CallbacksMap<EventArgs> = {} as CallbacksMap<EventArgs>;

  subscribe<EventName extends keyof EventArgs>(
    eventName: EventName,
    callback: Callback<EventArgs, EventName>,
    preventMultipleSubscriptions = true
  ) {
    if (!this.eventCallbacks[eventName]) {
      this.eventCallbacks[eventName] = [];
    }
    const callbackArray = this.eventCallbacks[eventName];
    if (preventMultipleSubscriptions && callbackArray.includes(callback)) {
      return;
    }
    callbackArray.push(callback);
  }

  unsubscribe<EventName extends keyof EventArgs>(
    eventName: EventName,
    callback: Callback<EventArgs, EventName>
  ) {
    if (!this.eventCallbacks[eventName]) {
      return;
    }
    let callbackIndex: number;
    const callbackArray = this.eventCallbacks[eventName];
    while ((callbackIndex = callbackArray.indexOf(callback)) !== -1) {
      callbackArray.splice(callbackIndex, 1);
    }
  }

  publish<EventName extends keyof EventArgs>(
    eventName: EventName,
    ...callbackArguments: EventArgs[EventName]
  ) {
    this.eventCallbacks[eventName]?.forEach((callback) =>
      callback(...callbackArguments)
    );
  }

  clearAll() {
    const keys = Object.keys(this.eventCallbacks);
    keys.forEach((key) => delete this.eventCallbacks[key]);
  }
}

export default Ringback;
