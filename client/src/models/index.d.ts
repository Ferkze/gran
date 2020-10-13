import {
  AccountTypes,
  AccountSubtypes,
  TransactionType,
  InstitutionType,
  CategoryType,
} from "./enums";

export interface User {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  accounts?: Account[] | Account["id"][];
  createdAt?: string;
  updatedAt?: string;
}

export interface Account {
  id?: string;
  name: string;
  main: boolean;
  institution?: Institution;
  unregisteredInstitution?: string;
  type: AccountTypes;
  subtype?: AccountSubtypes;
  startingBalance?: number;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;

  balance?: number
}

export interface Planning {
  id?: string;
  month: number
  year: number
  budgets: Budget[]
}

export interface PlanningFilter {
  group?: Group['id']
  month?: number
  year?: number
}

export interface Budget {
  id?: string;
  type: string;
  icon?: string;
  category: string;
  current: number;
  value: number;
}

export interface BudgetProgress {
  incomesProgress: number
  incomesTotal: number
  expensesProgress: number
  expensesTotal: number
}

export interface Category {
  id: string;
  icon: string;
  name: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id?: string;
  amount: number;
  date: string;
  description: string;
  account: Account['id'];
  category: Category['id'];
  type: TransactionType;
  user: User | User["id"];
  group?: Group["id"];
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFilter {
  group?: Group['id']
  month?: number
  year?: number
}

export interface Group {
  id?: string;
  name: string;
  creator: User | User['id'];
  members: User[] | User['id'][];
  plannings: Planning[]
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Institution {
  id: string;
  name?: string;
  description?: string;
  type?: InstitutionType;
  colors?: {
    primary: string;
    secondary?: string;
  };
  logoURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppStatus {
  code?: string;
  message?: string;
  type?: string;
}
