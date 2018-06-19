'use strict';

class Ringback {
  constructor() {
    this.eventCallbacks = {};
  }

  subscribe(eventName, callback, preventMultipleSubscriptions = true) {
    if (typeof eventName !== 'string') {
      throw 'eventName needs to be a string';
    }
    if (typeof callback !== 'function') {
      throw 'callback needs to be a function';
    }
    if (!this.eventCallbacks.hasOwnProperty(eventName)) {
      this.eventCallbacks[eventName] = [];
    }
    const callbackArray = this.eventCallbacks[eventName];
    if (preventMultipleSubscriptions && callbackArray.includes(callback)) {
      return;
    }
    callbackArray.push(callback);
  }

  unsubscribe(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw 'eventName needs to be a string';
    }
    if (typeof callback !== 'function') {
      throw 'callback needs to be a function';
    }
    let callbackIndex;
    if (!this.eventCallbacks.hasOwnProperty(eventName)) {
      return;
    }
    const callbackArray = this.eventCallbacks[eventName];
    while ((callbackIndex = callbackArray.indexOf(callback)) !== -1) {
      callbackArray.splice(callbackIndex, 1);
    }
  }

  publish(eventName, ...callbackArguments) {
    if (typeof eventName !== 'string') {
      throw 'eventName needs to be a string';
    }
    if (!this.eventCallbacks.hasOwnProperty(eventName)) {
      return;
    }
    this.eventCallbacks[eventName].forEach(callback => callback(...callbackArguments));
  }

  clearAll() {
    this.eventCallbacks = {};
  }
}

module.exports = Ringback;
