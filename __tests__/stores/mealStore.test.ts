import { MealStore } from "@/stores/mealStore";

import allMeals from "@/constants/meals";
import breakfasts from "@/constants/breakfasts";
import lunchs from "@/constants/lunchs";
import shakes from "@/constants/shakes";

describe("MealStore", () => {
  let store: MealStore;

  beforeEach(() => {
    store = new MealStore({ meals: allMeals, currentFilter: "all" });
  });

  describe("initialization", () => {
    it("should initialize with all meals", () => {
      expect(store.get("meals")).toEqual(allMeals);
    });

    it("should initialize with currentFilter set to 'all'", () => {
      expect(store.get("currentFilter")).toBe("all");
    });
  });

  describe("setCurrentFilter", () => {
    it("should set meals to allMeals when filter is 'all'", () => {
      store.setCurrentFilter("breakfast");
      store.setCurrentFilter("all");
      expect(store.get("meals")).toEqual(allMeals);
      expect(store.get("currentFilter")).toBe("all");
    });

    it("should set meals to breakfasts when filter is 'breakfast'", () => {
      store.setCurrentFilter("breakfast");
      expect(store.get("meals")).toEqual(breakfasts);
      expect(store.get("currentFilter")).toBe("breakfast");
    });

    it("should set meals to lunchs when filter is 'lunch'", () => {
      store.setCurrentFilter("lunch");
      expect(store.get("meals")).toEqual(lunchs);
      expect(store.get("currentFilter")).toBe("lunch");
    });

    it("should set meals to shakes when filter is 'shakes'", () => {
      store.setCurrentFilter("shakes");
      expect(store.get("meals")).toEqual(shakes);
      expect(store.get("currentFilter")).toBe("shakes");
    });

    it("should notify meals subscribers when filter changes", () => {
      const mockListener = jest.fn();
      store.subscribe("meals", mockListener);
      store.setCurrentFilter("breakfast");
      expect(mockListener).toHaveBeenCalledWith(breakfasts);
    });

    it("should notify currentFilter subscribers when filter changes", () => {
      const mockListener = jest.fn();
      store.subscribe("currentFilter", mockListener);
      store.setCurrentFilter("lunch");
      expect(mockListener).toHaveBeenCalledWith("lunch");
    });

    it("should update both meals and currentFilter in a single call", () => {
      store.setCurrentFilter("shakes");
      expect(store.get("meals")).toEqual(shakes);
      expect(store.get("currentFilter")).toBe("shakes");
    });
  });
});
