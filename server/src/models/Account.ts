import { Document, Schema, model } from 'mongoose'
import { IUser } from './User'

export enum AccountTypes {
  DEBIT = 'debit',
  CREDIT = 'credit'
}

export enum AccountSubtypes {
  CURRENCY = 'currency',
  CURRENT = 'current-account',
  CREDIT_CARD = 'credit-card',
  BROKER = 'broker-account'
}

export type Account = {
  _id: string
  name?: string
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

export default model<IAccount>('Account', AccountSchema)