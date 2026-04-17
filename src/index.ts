import "@/index.css";
import MealDeckPage from "@/pages/MealDeckPage/MealDeckPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const mealDeckPage = MealDeckPage();
  app.appendChild(mealDeckPage);
};

document.addEventListener("DOMContentLoaded", onInit);
