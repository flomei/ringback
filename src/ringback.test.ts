import Ringback from './ringback';

describe('Ringback', () => {
  it('should be a function', () => {
    expect(typeof Ringback).toBe('function');
  });

  it('should handle subscriptions', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.subscribe('foo', spy);
    ringback.publish('foo');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle subscriptions with custom arguments', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.subscribe('foo', spy);
    ringback.publish('foo', 'bar', 42);
    expect(spy).toHaveBeenCalledWith('bar', 42);
  });

  it('should not allow multiple subscriptions if not configured so', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.subscribe('foo', spy);
    ringback.subscribe('foo', spy);
    ringback.publish('foo', 'bar', 42);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('bar', 42);
  });

  it('should allow multiple subscriptions if configured so', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.subscribe('foo', spy, false);
    ringback.subscribe('foo', spy, false);
    ringback.publish('foo', 'bar', 42);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('bar', 42);
  });

  it('should correctly unsubscribe', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.subscribe('foo', spy);
    ringback.publish('foo');
    expect(spy).toHaveBeenCalledTimes(1);
    ringback.unsubscribe('foo', spy);
    ringback.publish('foo');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handle non-existent event on unsubscribe', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    ringback.unsubscribe('WOOT', spy);
  });

  it('should handle publishing event without subscriptions', () => {
    const ringback = new Ringback();
    ringback.publish('WOOT');
  });

  it('should be able to clear all callbacks', () => {
    const ringback = new Ringback();
    const spy = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    ringback.subscribe('foo', spy);
    ringback.subscribe('foo', spy, false);
    ringback.subscribe('bar', spy);
    ringback.subscribe('foo', spy2);
    ringback.subscribe('bar', spy3);
    ringback.clearAll();
    expect(ringback.eventCallbacks).toEqual({});
    ringback.publish('foo');
    ringback.publish('bar');
    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();
  });
});