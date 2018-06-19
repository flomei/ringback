const test = require('tape');
const Ringback = require('./ringback');

test('Is a function', t => {
  t.plan(1);
  t.equals(typeof Ringback, 'function', 'Yepp, it’s a function!');
});

test('subscribe() throws error if eventName is not a string', t => {
  t.plan(5);
  const rb = new Ringback();
  t.throws(() => rb.subscribe(true),
    'Calling subscribe() with eventName not being a string throws an error');
  t.throws(() => rb.subscribe('eventName', true),
    'Calling subscribe() with callback not being a function throws an error');
  t.throws(() => rb.unsubscribe(true),
    'Calling unsubscribe() with eventName not being a string throws an error');
  t.throws(() => rb.unsubscribe('eventName', true),
    'Calling unsubscribe() with callback not being a function throws an error');
  t.throws(() => rb.publish(true),
    'Calling publish() with eventName not being a string');
});

test('Subscription', t => {
  t.plan(1);
  const rb = new Ringback();
  const onEvent = () => {
    t.pass('Subscriptions work');
  };
  rb.subscribe('testEvent', onEvent);
  rb.publish('testEvent');
});

test('Same event handler on same event', t => {
  t.plan(1);
  const rb = new Ringback();
  const onEvent = () => {
    t.pass(`Subscription works`);
  };
  rb.subscribe('testEvent', onEvent);
  rb.subscribe('testEvent', onEvent);
  rb.subscribe('testEvent', onEvent);
  rb.publish('testEvent');
});

test('Same event handler on same event with multiple subscriptions allowed', t => {
  t.plan(3);
  let count = 1;
  const rb = new Ringback();
  const onEvent = () => {
    t.pass(`Subscription #${count++} works`);
  };
  rb.subscribe('testEvent', onEvent);
  rb.subscribe('testEvent', onEvent);
  rb.subscribe('testEvent', onEvent, false);
  rb.subscribe('testEvent', onEvent);
  rb.subscribe('testEvent', onEvent, false);
  rb.publish('testEvent');
});

test('Remove Subscription', t => {
  t.plan(1);
  const rb = new Ringback();
  const onEvent = () => {
    t.fail('Unsubscribe does not work');
    t.end();
  };
  rb.subscribe('testEvent', onEvent);
  rb.unsubscribe('testEvent', onEvent);
  rb.publish('testEvent');
  t.pass('Unsubscribe works');
});

test('Clear all subscriptions', t => {
  t.plan(1);
  const rb = new Ringback();
  const onEvent = () => {
    t.fail('Unsubscribe does not work');
  };
  rb.subscribe('testEvent_1', onEvent);
  rb.subscribe('testEvent_2', onEvent);
  rb.subscribe('testEvent_3', onEvent);
  rb.clearAll();
  rb.publish('testEvent_1');
  rb.publish('testEvent_2');
  rb.publish('testEvent_3');
  t.pass('Clearing all subscriptions works');
});

test('Callback arguments', t => {
  t.plan(3);
  const rb = new Ringback();
  const onEvent = (a, b, c) => {
    t.equal(a, 1, 'First argument was passed correctly');
    t.equal(b, 2, 'Second argument was passed correctly');
    t.equal(c, 3, 'Third argument was passed correctly');
  };
  rb.subscribe('testEvent', onEvent);
  rb.publish('testEvent', 1, 2, 3);
});