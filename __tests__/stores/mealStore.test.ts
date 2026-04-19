import { MealStore } from "@/stores/mealStore";

import { mockMeals } from "@tests/__mocks__/meals.mock";
import { mockBreakfasts } from "@tests/__mocks__/breakfasts.mock";
import { mockLunchs } from "@tests/__mocks__/lunchs.mock";
import { mockShakes } from "@tests/__mocks__/shakes.mock";

describe("MealStore", () => {
  let store: MealStore;

  beforeEach(() => {
    store = new MealStore({ meals: mockMeals, currentFilter: "all" });
  });

  describe("initialization", () => {
    it("should initialize with all meals", () => {
      expect(store.get("meals")).toEqual(mockMeals);
    });

    it("should initialize with currentFilter set to 'all'", () => {
      expect(store.get("currentFilter")).toBe("all");
    });
  });

  describe("setCurrentFilter", () => {
    it("should set meals to allMeals when filter is 'all'", () => {
      store.setCurrentFilter("breakfast");
      store.setCurrentFilter("all");
      expect(store.get("meals")).toEqual(mockMeals);
      expect(store.get("currentFilter")).toBe("all");
    });

    it("should set meals to breakfasts when filter is 'breakfast'", () => {
      store.setCurrentFilter("breakfast");
      expect(store.get("meals")).toEqual(mockBreakfasts);
      expect(store.get("currentFilter")).toBe("breakfast");
    });

    it("should set meals to lunchs when filter is 'lunch'", () => {
      store.setCurrentFilter("lunch");
      expect(store.get("meals")).toEqual(mockLunchs);
      expect(store.get("currentFilter")).toBe("lunch");
    });

    it("should set meals to shakes when filter is 'shakes'", () => {
      store.setCurrentFilter("shakes");
      expect(store.get("meals")).toEqual(mockShakes);
      expect(store.get("currentFilter")).toBe("shakes");
    });

    it("should notify meals subscribers when filter changes", () => {
      const mockListener = jest.fn();
      store.subscribe("meals", mockListener);
      store.setCurrentFilter("breakfast");
      expect(mockListener).toHaveBeenCalledWith(mockBreakfasts);
    });

    it("should notify currentFilter subscribers when filter changes", () => {
      const mockListener = jest.fn();
      store.subscribe("currentFilter", mockListener);
      store.setCurrentFilter("lunch");
      expect(mockListener).toHaveBeenCalledWith("lunch");
    });

    it("should update both meals and currentFilter in a single call", () => {
      store.setCurrentFilter("shakes");
      expect(store.get("meals")).toEqual(mockShakes);
      expect(store.get("currentFilter")).toBe("shakes");
    });
  });
});
