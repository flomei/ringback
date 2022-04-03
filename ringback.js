'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Ringback {
    constructor() {
        this.eventCallbacks = {};
    }
    subscribe(eventName, callback, preventMultipleSubscriptions = true) {
        if (!this.eventCallbacks[eventName]) {
            this.eventCallbacks[eventName] = [];
        }
        const callbackArray = this.eventCallbacks[eventName];
        if (preventMultipleSubscriptions && callbackArray.includes(callback)) {
            return;
        }
        callbackArray.push(callback);
    }
    unsubscribe(eventName, callback) {
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
        if (!this.eventCallbacks.hasOwnProperty(eventName)) {
            return;
        }
        this.eventCallbacks[eventName].forEach(callback => callback(...callbackArguments));
    }
    clearAll() {
        this.eventCallbacks = {};
    }
}
exports.default = Ringback;
