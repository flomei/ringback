export declare type Callback = (...args: any) => {};
declare class Ringback {
    eventCallbacks: Record<string, Callback[]>;
    constructor();
    subscribe(eventName: string, callback: Callback, preventMultipleSubscriptions?: boolean): void;
    unsubscribe(eventName: string, callback: any): void;
    publish(eventName: string, ...callbackArguments: any[]): void;
    clearAll(): void;
}
export default Ringback;
