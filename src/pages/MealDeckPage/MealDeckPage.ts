import type { Page } from "@/types/pages";

import ButtonFilter from "@/components/ButtonFilter/ButtonFilter";
import CardMeal from "@/components/CardMeal/CardMeal";

import { mealStore } from "@/stores/mealStore";

const MealDeckPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "w-full h-full min-h-screen bg-primary";

  main.innerHTML = `
    <section class="flex flex-col items-center justify-center w-full h-full">
      <article class="flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center mt-6">
          <h1 class="text-4xl">Our Menu</h1>
          <div class="w-24 h-1 rounded-lg bg-secondary"></div>
        </div>

        <div class="flex flex-row mt-6 filters">
        </div>
      </article>
    </section>

    <section class="flex flex-row flex-wrap items-center justify-center mt-6 meals">
    </section>
  `;

  const filters = main.querySelector<HTMLDivElement>(".filters");

  const filterAll = ButtonFilter({
    id: "all",
    ariaLabel: "Show all meals",
    text: "All",
  });
  const filterBreakfast = ButtonFilter({
    id: "breakfast",
    ariaLabel: "Show breakfast meals",
    text: "Breakfast",
  });
  const filterLunch = ButtonFilter({
    id: "lunch",
    ariaLabel: "Show lunch meals",
    text: "Lunch",
  });
  const filterShake = ButtonFilter({
    id: "shakes",
    ariaLabel: "Show shakes",
    text: "Shakes",
  });

  filters?.append(filterAll, filterBreakfast, filterLunch, filterShake);

  const renderMeals = (): void => {
    const { meals } = mealStore.getState();

    const sectionMeals = main.querySelector<HTMLElement>(".meals");
    sectionMeals?.replaceChildren();

    meals.forEach((meal) => {
      const cardMeal = CardMeal({
        amount: meal.amount,
        description: meal.description,
        imgSrc: meal.imgSrc,
        name: meal.name,
      });

      sectionMeals?.append(cardMeal);
    });
  };

  renderMeals();

  const unsubscribe = mealStore.subscribe("meals", renderMeals);

  main.cleanup = (): void => {
    unsubscribe();

    filterAll.cleanup?.();
    filterBreakfast.cleanup?.();
    filterLunch.cleanup?.();
    filterShake.cleanup?.();
  };

  return main;
};

export default MealDeckPage;
