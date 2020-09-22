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
  institution?: Institution;
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
  date?: string;
  description?: string;
  account?: Account;
  categories: Category[];
  type: TransactionType;
  creator?: User | User["id"];
  budgetGroup?: Group | Group["id"];
  createdAt?: string;
  updatedAt?: string;
}

export interface Group {
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
