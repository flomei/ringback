"use strict";

class Ringback {
    constructor() {
        this.eventCallbacks = {};
    }

    subscribe(eventName, callback, preventMultipleSubscriptions = true) {
        if (typeof eventName !== 'string' || typeof callback !== 'function') {
            return;
        }
        let callbackArray;
        if (!this.eventCallbacks.hasOwnProperty(eventName)) {
            this.eventCallbacks[eventName] = [];
        }
        if (preventMultipleSubscriptions && this.eventCallbacks[eventName].includes(callback)) {
            return;
        }
        callbackArray = this.eventCallbacks[eventName];
        callbackArray.push(callback);
    }

    unsubscribe(eventName, callback) {
        let callbackArray, callbackIndex;
        if (!this.eventCallbacks.hasOwnProperty(eventName)) {
            return;
        }
        callbackArray = this.eventCallbacks[eventName];
        while ((callbackIndex = callbackArray.indexOf(callback)) !== -1) {
            callbackArray.splice(callbackIndex, 1);
        }
    }

    publish(eventName, ...callbackArguments) {
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
