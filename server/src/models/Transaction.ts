import { Document, Schema, model } from 'mongoose'
import { IAccount, ACCOUNT } from './Account'
import Category, { CategoryInterface, CATEGORY } from './Category'
import { UserInterface, USER } from './User'

enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference',
}

export type Transaction = {
  amount?: number
  date?: Date
  description?: string
  debitAccount?: IAccount['_id'] | IAccount
  creditAccount?: IAccount['_id'] | IAccount
  category: [CategoryInterface]
  type: TransactionType
  creator: UserInterface['_id'] | UserInterface
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
    ref: ACCOUNT,
    required: false,
  },
  debitAccount: {
    type: Schema.Types.ObjectId,
    ref: ACCOUNT,
    required: false,
  },
  category: [{
    type: Schema.Types.ObjectId,
  ref: CATEGORY
  }],
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ TransactionType.CREDIT, TransactionType.DEBIT, TransactionType.TRANSFERENCE ]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: USER,
    required: true,
  },
}, {
  timestamps: true
})

export default model<ITransaction>('Transaction', SchemaTransaction)