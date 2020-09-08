export enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution',
}

export interface Institution {
	id: string
  name: string
  description: string
  type: InstitutionType
  colors: {
    primary: string
    secondary: string
  },
  logoUrl: string
  createdAt: Date
  updatedAt: Date
}