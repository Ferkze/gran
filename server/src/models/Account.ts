import { Document, Schema, model } from 'mongoose'
import { IUser } from './User'

export enum AccountTypes {
  DEBIT = 'debit',
  CREDIT = 'credit'
}

export enum AccountSubtypes {
  CURRENCY = 'currency',
  DIGITAL_CURRENCY  = 'digital-currency',
  CURRENT = 'current-account',
  CREDIT_CARD = 'credit-card',
  BROKER = 'broker-account'
}

export type Account = {
  _id: string
  name?: string
  main?: boolean
  institution?: string
  unregisteredInstitution?: string
  type?: AccountTypes
  subtype?: AccountSubtypes
  startingBalance?: number
  owner?: IUser['_id']
  createdAt?: string
  updatedAt?: string
}
export type IAccount = Document & Account

export const AccountSchema = new Schema({
  name: String,
  startingBalance: Number,
  main: Boolean,
  institution: String,
  unregisteredInstitution: String,
  type: {
    type: String,
    enum: [ AccountTypes.CREDIT, AccountTypes.DEBIT ]
  },
  subtype: {
    type: String,
    enum: [ AccountSubtypes.BROKER, AccountSubtypes.CURRENT, AccountSubtypes.CURRENCY, AccountSubtypes.CREDIT_CARD, AccountSubtypes.DIGITAL_CURRENCY ]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

export default model<IAccount>('Account', AccountSchema)