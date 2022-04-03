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
        if (!this.eventCallbacks[eventName]) {
            return;
        }
        let callbackIndex;
        const callbackArray = this.eventCallbacks[eventName];
        while ((callbackIndex = callbackArray.indexOf(callback)) !== -1) {
            callbackArray.splice(callbackIndex, 1);
        }
    }
    publish(eventName, ...callbackArguments) {
        var _a;
        (_a = this.eventCallbacks[eventName]) === null || _a === void 0 ? void 0 : _a.forEach(callback => callback(...callbackArguments));
    }
    clearAll() {
        const keys = Object.keys(this.eventCallbacks);
        keys.forEach((key) => delete this.eventCallbacks[key]);
    }
}
exports.default = Ringback;
