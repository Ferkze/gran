import { Category, CategoryType } from "./Category";

export interface Budget {
  id?: any;
  type: CategoryType;
  value: number;
  category: Category['id'];
  createdAt?: Date
  updatedAt?: Date
}
export interface CalculatedBudget extends Budget {
  current: number
}

export interface BudgetWithCategory {
  id?: string;
  type: CategoryType;
  value: number;
  category: Category;
  createdAt?: Date
  updatedAt?: Date
}