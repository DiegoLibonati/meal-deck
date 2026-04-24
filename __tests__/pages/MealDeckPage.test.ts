import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import MealDeckPage from "@/pages/MealDeckPage/MealDeckPage";

import { mealStore } from "@/stores/mealStore";

import { mockMeals } from "@tests/__mocks__/meals.mock";
import { mockBreakfasts } from "@tests/__mocks__/breakfasts.mock";
import { mockLunchs } from "@tests/__mocks__/lunchs.mock";
import { mockShakes } from "@tests/__mocks__/shakes.mock";

let page: Page | null = null;

jest.mock("@/constants/meals", () => {
  const mockData = jest.requireActual("@tests/__mocks__/meals.mock");
  const { mockMeals } = mockData;
  return {
    __esModule: true,
    default: mockMeals,
  };
});

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
    jest.clearAllMocks();
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
      expect(cards).toHaveLength(mockMeals.length);
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
      expect(cards).toHaveLength(mockBreakfasts.length);
    });

    it("should render only lunch meals when the lunch button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show lunch meals" })
      );
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(mockLunchs.length);
    });

    it("should render only shakes when the shakes button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Show shakes" }));
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(mockShakes.length);
    });

    it("should return to all meals when the all button is clicked after filtering", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show breakfast meals" })
      );
      await user.click(screen.getByRole("button", { name: "Show all meals" }));
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(mockMeals.length);
    });

    it("should re-render meals when mealStore state changes externally", () => {
      renderPage();
      mealStore.setCurrentFilter("breakfast");
      const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
      expect(cards).toHaveLength(mockBreakfasts.length);
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
      expect(cards).toHaveLength(mockMeals.length);
    });
  });
});
