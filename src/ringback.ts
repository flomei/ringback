'use strict';

export type Callback = (...args: any) => {};

class Ringback {
  eventCallbacks: Record<string, Callback[]>;

  constructor() {
    this.eventCallbacks = {};
  }

  subscribe(eventName: string, callback: Callback, preventMultipleSubscriptions = true) {
    if (!this.eventCallbacks[eventName]) {
      this.eventCallbacks[eventName] = [];
    }
    const callbackArray = this.eventCallbacks[eventName];
    if (preventMultipleSubscriptions && callbackArray.includes(callback)) {
      return;
    }
    callbackArray.push(callback);
  }

  unsubscribe(eventName: string, callback: Callback) {
    let callbackIndex;
    if (!this.eventCallbacks[eventName]) {
      return;
    }
    const callbackArray = this.eventCallbacks[eventName];
    while ((callbackIndex = callbackArray.indexOf(callback)) !== -1) {
      callbackArray.splice(callbackIndex, 1);
    }
  }

  publish(eventName: string, ...callbackArguments: any[]) {
    if (!this.eventCallbacks[eventName]) {
      return;
    }
    this.eventCallbacks[eventName].forEach(callback => callback(...callbackArguments));
  }

  clearAll() {
    this.eventCallbacks = {};
  }
}

export default Ringback;