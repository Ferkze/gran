import { Document, Schema, model } from 'mongoose'
import { Institution } from '../../../models/entities/Institution'

export const INSTITUTION: string = 'Institution'

export enum InstitutionType {
  BROKER = 'broker',
  BANK = 'bank',
  PAYMENT_INSTITUTION = 'payment-institution',
}

export interface IInstitution extends Document, Institution {
  getInstitution(): Institution
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

SchemaInstitution.methods.getInstitution = function () {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    colors: this.colors,
    logoUrl: this.logoUrl,
    type: this.type,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

export default model<IInstitution>(INSTITUTION, SchemaInstitution)