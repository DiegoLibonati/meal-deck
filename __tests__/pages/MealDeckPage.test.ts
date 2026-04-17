import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import MealDeckPage from "@/pages/MealDeckPage/MealDeckPage";

import { mealStore } from "@/stores/mealStore";
import allMeals from "@/constants/meals";
import breakfasts from "@/constants/breakfasts";
import lunchs from "@/constants/lunchs";
import shakes from "@/constants/shakes";

let page: Page | null = null;

const renderPage = (): Page => {
  page = MealDeckPage();
  document.body.appendChild(page);
  return page;
};

describe("MealDeckPage", () => {
  afterEach(() => {
    page?.cleanup?.();
    document.body.innerHTML = "";
    mealStore.setCurrentFilter("all");
    page = null;
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      renderPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the page heading 'Our Menu'", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Our Menu"
      );
    });

    it("should render the All filter button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Show all meals" })
      ).toBeInTheDocument();
    });

    it("should render the Breakfast filter button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Show breakfast meals" })
      ).toBeInTheDocument();
    });

    it("should render the Lunch filter button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Show lunch meals" })
      ).toBeInTheDocument();
    });

    it("should render the Shakes filter button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Show shakes" })
      ).toBeInTheDocument();
    });

    it("should render all meals on initial load", () => {
      renderPage();
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(allMeals.length);
    });
  });

  describe("filtering", () => {
    it("should render only breakfast meals when the breakfast button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show breakfast meals" })
      );
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(breakfasts.length);
    });

    it("should render only lunch meals when the lunch button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show lunch meals" })
      );
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(lunchs.length);
    });

    it("should render only shakes when the shakes button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Show shakes" }));
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(shakes.length);
    });

    it("should return to all meals when the all button is clicked after filtering", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show breakfast meals" })
      );
      await user.click(screen.getByRole("button", { name: "Show all meals" }));
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(allMeals.length);
    });

    it("should re-render meals when mealStore state changes externally", () => {
      renderPage();
      mealStore.setCurrentFilter("breakfast");
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(breakfasts.length);
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const element = renderPage();
      expect(typeof element.cleanup).toBe("function");
    });

    it("should unsubscribe from mealStore after cleanup so meals no longer re-render", () => {
      const element = renderPage();
      element.cleanup?.();
      mealStore.setCurrentFilter("breakfast");
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(allMeals.length);
    });
  });
});
