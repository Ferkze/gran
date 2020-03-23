import { Document, Schema, model } from 'mongoose'
import { IAccount } from './Account'
import Category, { CategoryInterface } from './Category'

enum TransactionType {
  'DEBIT',
  'CREDIT',
  'TRANSFERENCE',
}

export type Transaction = {
  amount?: number
  date?: Date
  account: IAccount
  category: CategoryInterface
  type: TransactionType
  createdAt?: string
  updatedAt?: string
}
export interface ITransaction extends Transaction, Document {}

const SchemaTransaction = new Schema({
  amount: Number,
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  category: Category.schema,
  date: Date,
  type: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export default model<ITransaction>('Transaction', SchemaTransaction)