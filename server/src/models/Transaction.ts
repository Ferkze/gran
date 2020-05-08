import { Document, Schema, model } from 'mongoose'
import { IAccount } from './Account'
import Category, { CategoryInterface } from './Category'
import { UserInterface } from './User'

enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference',
}

export type Transaction = {
  amount?: number
  date?: Date
  description?: string
  debitAccount?: IAccount['_id']
  creditAccount?: IAccount['_id']
  category: CategoryInterface
  type: TransactionType
  creator: UserInterface['_id']
  createdAt?: Date
  updatedAt?: Date
}
export interface ITransaction extends Transaction, Document {}

const SchemaTransaction = new Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: false
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now
  },
  creditAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: false,
  },
  debitAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: false,
  },
  category: Category.schema,
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ TransactionType.CREDIT, TransactionType.DEBIT, TransactionType.TRANSFERENCE ]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
})

export default model<ITransaction>('Transaction', SchemaTransaction)