import { Document, Schema, model } from 'mongoose'

export const INSTITUTION = 'Institution'

enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution',
}

export type Institution = {
  name?: string
  description?: string
  type?: InstitutionType
  colors?: {
    primary: string
    secondary?: string
  },
  logoURL?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface IInstitution extends Institution, Document {}

const SchemaInstitution = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
  },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ InstitutionType.BANK, InstitutionType.BROKER, InstitutionType.PAYMENT_INSTITUTION ]
  },
  colors: {
    primary: Schema.Types.String,
    secondary: Schema.Types.String
  },
  logoURL: {
    type: Schema.Types.String,
    required: false,
  },
}, {
  timestamps: true
})

export default model<IInstitution>(INSTITUTION, SchemaInstitution)