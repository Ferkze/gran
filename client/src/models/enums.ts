export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference'
}

export enum AccountTypes {
  DEBIT = 'debit',
  CREDIT = 'credit'
}

export enum AccountSubtypes {
  CURRENCY = 'currency',
  DIGITAL_CURRENCY = 'digital-currency',
  CURRENT = 'current-account',
  CREDIT_CARD = 'credit-card',
  BROKER = 'broker-account'
}

export enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution'
}

export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum InvestmentSubType {
  ACOES = 'acoes',
  RENDA_FIXA = 'renda-fixa',
  FIIS = 'fiis',
  FUNDOS = 'fundos'
}

export enum InvestmentType {
  RENDA_FIXA = 'renda-fixa',
  RENDA_VARIAVEL = 'renda-variavel'
}
