import { describe, expect, it, vi } from "vitest";
import Ringback from "./ringback";
import { Ringback as NamedRingback } from "./ringback";

describe("Ringback", () => {
  it("should be a function", () => {
    expect(typeof Ringback).toBe("function");
  });

  it("should have a named export", () => {
    expect(typeof NamedRingback).toBe("function");
  });

  it("should handle subscriptions", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    rb.subscribe("foo", spy);
    rb.publish("foo");
    expect(spy).toHaveBeenCalled();
  });

  it("should handle subscriptions with custom arguments", () => {
    const rb = new Ringback<{ foo: [string, number] }>();
    const spy = vi.fn();
    rb.subscribe("foo", spy);
    rb.publish("foo", "bar", 42);
    expect(spy).toHaveBeenCalledWith("bar", 42);
  });

  it("should not allow multiple subscriptions if not configured so", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    rb.subscribe("foo", spy);
    rb.subscribe("foo", spy);
    rb.publish("foo", "bar", 42);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("bar", 42);
  });

  it("should allow multiple subscriptions if configured so", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    rb.subscribe("foo", spy, false);
    rb.subscribe("foo", spy, false);
    rb.publish("foo", "bar", 42);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith("bar", 42);
  });

  it("should correctly unsubscribe", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    rb.subscribe("foo", spy);
    rb.publish("foo");
    expect(spy).toHaveBeenCalledTimes(1);
    rb.unsubscribe("foo", spy);
    rb.publish("foo");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should handle non-existent event on unsubscribe", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    rb.unsubscribe("WOOT", spy);
  });

  it("should handle publishing event without subscriptions", () => {
    const rb = new Ringback<{ WOOT: [] }>();
    rb.publish("WOOT");
  });

  it("should be able to clear all callbacks", () => {
    const rb = new Ringback();
    const spy = vi.fn();
    const spy2 = vi.fn();
    const spy3 = vi.fn();
    rb.subscribe("foo", spy);
    rb.subscribe("foo", spy, false);
    rb.subscribe("bar", spy);
    rb.subscribe("foo", spy2);
    rb.subscribe("bar", spy3);
    rb.clearAll();
    expect(rb.eventCallbacks).toEqual({});
    rb.publish("foo");
    rb.publish("bar");
    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).not.toHaveBeenCalled();
    rb.subscribe("foo", spy);
    rb.publish("foo");
    expect(spy).toHaveBeenCalled();
  });
});
