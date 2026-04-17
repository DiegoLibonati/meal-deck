import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonFilterProps } from "@/types/props";
import type { ButtonFilterComponent } from "@/types/components";

import ButtonFilter from "@/components/ButtonFilter/ButtonFilter";

import { mealStore } from "@/stores/mealStore";

const defaultProps: ButtonFilterProps = {
  id: "all",
  ariaLabel: "Show all meals",
  text: "All",
};

const renderComponent = (
  props: Partial<ButtonFilterProps> = {}
): ButtonFilterComponent => {
  const element = ButtonFilter({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ButtonFilter", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    mealStore.setCurrentFilter("all");
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute to the provided filter id", () => {
      renderComponent({ id: "breakfast" });
      expect(screen.getByRole("button")).toHaveAttribute("id", "breakfast");
    });

    it("should set the aria-label attribute", () => {
      renderComponent({ ariaLabel: "Show breakfast meals" });
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Show breakfast meals"
      );
    });

    it("should display the provided text content", () => {
      renderComponent({ text: "Breakfast" });
      expect(screen.getByRole("button")).toHaveTextContent("Breakfast");
    });
  });

  describe("behavior", () => {
    it("should update mealStore currentFilter to 'breakfast' on click", async () => {
      const user = userEvent.setup();
      renderComponent({
        id: "breakfast",
        ariaLabel: "Show breakfast meals",
        text: "Breakfast",
      });
      await user.click(screen.getByRole("button"));
      expect(mealStore.get("currentFilter")).toBe("breakfast");
    });

    it("should update mealStore currentFilter to 'lunch' on click", async () => {
      const user = userEvent.setup();
      renderComponent({
        id: "lunch",
        ariaLabel: "Show lunch meals",
        text: "Lunch",
      });
      await user.click(screen.getByRole("button"));
      expect(mealStore.get("currentFilter")).toBe("lunch");
    });

    it("should update mealStore currentFilter to 'shakes' on click", async () => {
      const user = userEvent.setup();
      renderComponent({
        id: "shakes",
        ariaLabel: "Show shakes",
        text: "Shakes",
      });
      await user.click(screen.getByRole("button"));
      expect(mealStore.get("currentFilter")).toBe("shakes");
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const element = renderComponent();
      expect(typeof element.cleanup).toBe("function");
    });

    it("should not update mealStore after cleanup is called", async () => {
      const user = userEvent.setup();
      const element = renderComponent({
        id: "breakfast",
        ariaLabel: "Show breakfast meals",
        text: "Breakfast",
      });
      element.cleanup?.();
      await user.click(element);
      expect(mealStore.get("currentFilter")).toBe("all");
    });
  });
});
