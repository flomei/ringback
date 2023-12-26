# Ringback – a lightweight typed event dispatcher

## Preamble

You probably don't need this. This was used ages ago and mainly served me to
get a hang of npm.

## Functionality

Essentially similar to `EventTarget`, but with the added possibility to attach the same handler more than once to the same event and the ability to call callbacks with arbitrary arguments.

## Installation

Ringback can be added to your project via npm:

```sh
npm install ringback
```

## Usage

This package exposes one named class `Ringback`. It is also the default export.  
it accordingly.

CommonJS:

```typescript
const { Ringback } = require("ringback");
// or
const Ringback = require("ringback");
```

ESM:

```typescript
import { Ringback } from "ringback";
// or
import Ringback from "ringback";
```

### Methods

#### constructor()

The constructor takes no arguments.

#### subscribe(eventName, callback[, preventMultipleSubscriptions = true])

Adds a callback to a specific event.

- `eventName` is a string value identifying the event.
- `callback` is a function which is to be called once and event with the name of the `eventName` parameter is dispatched.
- If `preventMultipleSubscriptions` is truthy, it is not possible to add a callback more than once to an event of a name. It is `true` by default to be consistent with `EventTarget`.

#### unsubscribe(eventName, callback)

Removes _all_ callbacks for a specific event.

- `eventName` is a string value identifying the event.
- `callback` is a function which is to be removed for this event. Be careful that _all_ callbacks will be removed, not just one.

#### publish(eventName[, ...callbackArguments])

Calls all callbacks for a certain events with an arbitrary amount of arguments.

- `eventName` is a string value identifying the event.
- `callbackArguments` is an arbitrary list of arguments.

#### clearAll()

Removes all callbacks and essentially resets the whole instance to its original state.

### Typing

If you're using TypeScript, you can optionally pass a type to the `Ringback` constructor that describes _all_ events and
their associated arguments passed to the callbacks.

```typescript
const rb = new Ringback<{
  foo: [string, number];
  bar: [string[], "some" | "thing"];
  whoop: [];
}>();

rb.subscribe("foo", (a: string, b: number) => {
  /* ... */
});
rb.subscribe("bar", (a: string[], b: "some" | "thing") => {
  /* ... */
});
rb.subscribe("whoop", () => {
  /* ... */
});

rb.publish("foo", "bar", 42);
rb.publish("bar", ["la", "le", "lu"], "some");
rb.publish("whoop");
```

### Examples

#### Call callbacks with arguments

```javascript
import { Ringback } from "ringback";

const dispatcher = new Ringback();

const multiplicationHandler = (factorA, factorB) => {
  console.log(factorA * factorB);
};

dispatcher.subscribe("multiplication", multiplicationHandler);

dispatcher.publish("multiplication", 5, 4);

/*
    Outputs:
    20
*/
```

#### Adding multiple identical callbacks to the same event

```javascript
import Ringback from "ringback";

const dispatcher = new Ringback();

const logA = () => {
  console.log("A");
};

const logB = () => {
  console.log("B");
};

dispatcher.subscribe("logA", logA);
dispatcher.subscribe("logA", logA);

dispatcher.subscribe("logB", logB);
dispatcher.subscribe("logB", logB, false);
/* This callback will be added,
   because preventMultipleSubscriptions is false */
dispatcher.subscribe("logB", logB);
/* This callback will NOT be added,
   because preventMultipleSubscriptions is true */

dispatcher.publish("logA");
dispatcher.publish("logB");

/*
    Outputs:
    "A"
    "B"
    "B"
*/
```
