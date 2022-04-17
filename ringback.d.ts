declare type EventArgsMap = Record<string, any[]>;
declare type CallbacksMap<M extends EventArgsMap> = {
    [Properties in keyof M]: Callback<M, Properties>[];
};
export declare type Callback<T extends EventArgsMap, EventName extends keyof T> = (...args: T[EventName]) => void;
declare class Ringback<EventArgs extends EventArgsMap> {
    eventCallbacks: CallbacksMap<EventArgs>;
    subscribe<EventName extends keyof EventArgs>(eventName: EventName, callback: Callback<EventArgs, EventName>, preventMultipleSubscriptions?: boolean): void;
    unsubscribe<EventName extends keyof EventArgs>(eventName: EventName, callback: Callback<EventArgs, EventName>): void;
    publish<EventName extends keyof EventArgs>(eventName: EventName, ...callbackArguments: EventArgs[EventName]): void;
    clearAll(): void;
}
export default Ringback;
