# Ringback – a lightweight event dispatcher

## Functionality

Essentially similar to `EventTarget`, but with the added possibility to attach the same handler more than once to the same event and the ability to call callbacks with arbitrary arguments.

## Installation

Ringback can be installed via npm:
```
npm install ringback
```
## Usage
This package exposes one default class. Import it accordingly.

CommonJS:
```
const Ringback = require('ringback');
```
ES6+:
```
import Ringback from 'ringback';
```

### Methods
#### constructor()

The constructor takes no arguments.
#### subscribe(eventName, callback[, preventMultipleSubscriptions = true])
Adds a callback to a specific event.
* `eventName` is a string value identifying the event.
* `callback` is a function which is to be called once and event with the name of the `eventName` parameter is dispatched.
* If `preventMultipleSubscriptions` is truthy, it is not possible to add a callback more than once to an event of a name. It is `true` by default to be consistent with `EventTarget`.

#### unsubscribe(eventName, callback)
Removes *all* callbacks for a specific event.
* `eventName` is a string value identifying the event.
* `callback` is a function which is to be removed for this event. Be careful that *all* callbacks will be removed, not just one.

#### publish(eventName[, ...callbackArguments])
Calls all callbacks for a certain events with an arbitrary amount of arguments.
* `eventName` is a string value identifying the event.
* `callbackArguments` is an arbitrary list of arguments.

#### clearAll()
Removes all callbacks and essentially resets the whole instance.

### Example
```
import Ringback from 'ringback';

const ringback = new Ringback();

const multiplicationHandler = (factorA, factorB) => {
    console.log(factorA * factorB);
};

ringback.subscribe('multiplication', multiplicationHandler);

ringback.publish('multiplication', 5, 4);
```
This will output 
```
20
```