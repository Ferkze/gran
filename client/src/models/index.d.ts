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
  color?: {
    primary: string;
    secondary: string;
  };
  main: boolean;
  institution?: Institution | Institution["id"];
  unregisteredInstitution?: string;
  type: AccountTypes;
  subtype?: AccountSubtypes;
  startingBalance?: number;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name?: string;
  type?: CategoryType;
  colors?: {
    primary?: string;
    secondary?: string;
  };
  creator?: User | User["id"];
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id?: string;
  amount?: number;
  date?: Date | string;
  description?: string;
  debitAccount?: Account;
  creditAccount?: Account;
  categories: Category[];
  type: TransactionType;
  creator?: User | User["id"];
  budgetGroup?: BudgetGroup | BudgetGroup["id"];
  createdAt?: string;
  updatedAt?: string;
}

export interface BudgetGroup {
  id: string;
  name: string;
  description?: string;
  creator?: User | User["id"];
  members?: User[] | User["id"];

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
