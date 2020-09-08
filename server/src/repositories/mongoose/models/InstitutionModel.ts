import { Document, Schema, model } from 'mongoose'

export const INSTITUTION: string = 'Institution'

export enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution',
}

export interface IInstitution extends Document {
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

const SchemaInstitution = new Schema<IInstitution>({
  name: { type: Schema.Types.String, required: true, unique: true },
  description: { type: Schema.Types.String, required: true },
  type: { type: Schema.Types.String, required: true, enum: [ InstitutionType.BANK, InstitutionType.BROKER, InstitutionType.PAYMENT_INSTITUTION ] },
  colors: {
    primary: Schema.Types.String,
    secondary: Schema.Types.String
  },
  logoUrl: { type: Schema.Types.String, required: false },
}, {
  timestamps: true
})

export default model<IInstitution>(INSTITUTION, SchemaInstitution)