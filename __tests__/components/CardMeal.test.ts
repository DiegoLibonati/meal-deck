import { screen } from "@testing-library/dom";

import type { CardMealProps } from "@/types/props";
import type { CardMealComponent } from "@/types/components";

import CardMeal from "@/components/CardMeal/CardMeal";

const defaultProps: CardMealProps = {
  name: "American pancakes",
  amount: "$15",
  description: "Easy, American-style, fluffy pancakes.",
  imgSrc: "https://example.com/pancakes.jpg",
};

const renderComponent = (
  props: Partial<CardMealProps> = {}
): CardMealComponent => {
  const element = CardMeal({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("CardMeal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a div with the card-meal class", () => {
      const element = renderComponent();
      expect(element).toHaveClass("card-meal");
    });

    it("should render an image with the correct src", () => {
      renderComponent({ imgSrc: "https://example.com/img.jpg" });
      const img = document.querySelector<HTMLImageElement>("img");
      expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    });

    it("should render an image with the meal name as alt text", () => {
      renderComponent({ name: "Pancakes" });
      const img = document.querySelector<HTMLImageElement>("img");
      expect(img).toHaveAttribute("alt", "Pancakes");
    });

    it("should render the meal name in an h2 heading", () => {
      renderComponent({ name: "American pancakes" });
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "American pancakes"
      );
    });

    it("should render the meal amount in an h3 heading", () => {
      renderComponent({ amount: "$15" });
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "$15"
      );
    });

    it("should render the meal description in a paragraph", () => {
      renderComponent({
        description: "Easy, American-style, fluffy pancakes.",
      });
      expect(
        screen.getByText("Easy, American-style, fluffy pancakes.")
      ).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should render with an empty description", () => {
      renderComponent({ description: "" });
      const p = document.querySelector<HTMLParagraphElement>("p");
      expect(p).toHaveTextContent("");
    });

    it("should render with a non-monetary amount string", () => {
      renderComponent({ amount: "Free" });
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Free"
      );
    });

    it("should use the name for both the heading and the image alt", () => {
      renderComponent({ name: "Prawn & egg on toast" });
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Prawn & egg on toast"
      );
      const img = document.querySelector<HTMLImageElement>("img");
      expect(img).toHaveAttribute("alt", "Prawn & egg on toast");
    });
  });
});
