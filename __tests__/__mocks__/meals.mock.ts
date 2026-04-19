import type { Meal } from "@/types/app";

import { mockBreakfasts } from "@tests/__mocks__/breakfasts.mock";
import { mockLunchs } from "@tests/__mocks__/lunchs.mock";
import { mockShakes } from "@tests/__mocks__/shakes.mock";

export const mockMeals: Meal[] = [
  ...mockBreakfasts,
  ...mockLunchs,
  ...mockShakes,
];
