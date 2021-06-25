export enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution',
}

export interface Institution {
  id?: any
  name: string
  description: string
  type: InstitutionType
  colors: {
    primary: string
    secondary: string
  },
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}