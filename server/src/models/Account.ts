import { Document, Schema, model } from 'mongoose'
import { IUser } from './User'
import { INSTITUTION } from './Institution'

export const ACCOUNT = 'Account'

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
  name: string
  colors?: {
    primary?: string,
    secondary?: string
  },
  main: boolean
  institution?: string
  unregisteredInstitution?: string
  type?: AccountTypes
  subtype?: AccountSubtypes
  startingBalance: number
  owner?: IUser['_id'] | IUser
  createdAt?: string
  updatedAt?: string
}
export type IAccount = Document & Account

export const AccountSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  colors: {
    primary: Schema.Types.String,
    secondary: Schema.Types.String
  },
  startingBalance: {
    type: Schema.Types.Number,
    required: false,
    default: 0
  },
  main: {
    type: Schema.Types.Boolean,
    default: false
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: INSTITUTION
  },
  unregisteredInstitution: {
    type: Schema.Types.String
  },
  type: {
    type: Schema.Types.String,
    default: AccountTypes.DEBIT,
    enum: [ AccountTypes.CREDIT, AccountTypes.DEBIT ]
  },
  subtype: {
    type: Schema.Types.String,
    default: AccountSubtypes.CURRENCY,
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

export default model<IAccount>(ACCOUNT, AccountSchema)