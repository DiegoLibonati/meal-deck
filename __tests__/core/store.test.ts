import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {}

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore({ count: 0, name: "initial" });
  });

  describe("initialization", () => {
    it("should initialize state with provided values", () => {
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should initialize listeners for each key without throwing", () => {
      expect(() => store.subscribe("count", jest.fn())).not.toThrow();
    });
  });

  describe("getState", () => {
    it("should return the current state", () => {
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should reflect updates after setState", () => {
      store.setState({ count: 5 });
      expect(store.getState().count).toBe(5);
    });
  });

  describe("get", () => {
    it("should return the value for the given key", () => {
      expect(store.get("count")).toBe(0);
      expect(store.get("name")).toBe("initial");
    });

    it("should return the updated value after setState", () => {
      store.setState({ count: 42 });
      expect(store.get("count")).toBe(42);
    });
  });

  describe("setState", () => {
    it("should update only the provided keys", () => {
      store.setState({ count: 10 });
      expect(store.getState().count).toBe(10);
      expect(store.getState().name).toBe("initial");
    });

    it("should merge successive partial updates", () => {
      store.setState({ count: 5 });
      store.setState({ name: "updated" });
      expect(store.getState()).toEqual({ count: 5, name: "updated" });
    });

    it("should notify listeners when value changes", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 1 });
      expect(mockListener).toHaveBeenCalledWith(1);
    });

    it("should not notify listeners when value does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should notify all listeners subscribed to the same key", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      store.setState({ count: 7 });
      expect(mockListener1).toHaveBeenCalledWith(7);
      expect(mockListener2).toHaveBeenCalledWith(7);
    });

    it("should notify listeners independently per key", () => {
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setState({ count: 3 });
      expect(mockCountListener).toHaveBeenCalledWith(3);
      expect(mockNameListener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should call the listener with the new value on state change", () => {
      const mockListener = jest.fn();
      store.subscribe("name", mockListener);
      store.setState({ name: "changed" });
      expect(mockListener).toHaveBeenCalledWith("changed");
    });

    it("should return an unsubscribe function", () => {
      const unsubscribe = store.subscribe("count", jest.fn());
      expect(typeof unsubscribe).toBe("function");
    });

    it("should stop calling the listener after unsubscribing", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.setState({ count: 99 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not affect other listeners when one unsubscribes", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      unsubscribe1();
      store.setState({ count: 5 });
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(5);
    });
  });
});
