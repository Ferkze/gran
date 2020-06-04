import { Document, Schema, Model, model, DocumentQuery } from 'mongoose'
import { IAccount } from './Account'
import { CategoryInterface } from './Category'
import { IUser } from './User'
import { BUDGET_GROUP, BudgetGroupInterface } from './BudgetGroup'

export enum TransactionType {
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
  creator: IUser['_id'] | IUser
  budgetGroup?: BudgetGroupInterface['id'] | BudgetGroupInterface
  createdAt?: Date
  updatedAt?: Date
}
export interface ITransaction extends Document {
  amount?: number
  date?: Date
  description?: string
  debitAccount?: IAccount['_id'] | IAccount
  creditAccount?: IAccount['_id'] | IAccount
  category: [CategoryInterface]
  type: TransactionType
  creator: IUser['_id'] | IUser
  budgetGroup?: BudgetGroupInterface['id'] | BudgetGroupInterface
  createdAt?: Date
  updatedAt?: Date
}

export interface ITransactionModel extends Model<ITransaction, typeof transactionQueryHelpers> {
  byAccount(accountId: string)
}

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
  category: [{
    type: Schema.Types.ObjectId,
  ref: 'Category'
  }],
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
  budgetGroup: {
    type: Schema.Types.ObjectId,
    ref: BUDGET_GROUP,
    required: false
  },
}, {
  timestamps: true
})

let transactionQueryHelpers = {
  byAccount(this: DocumentQuery<ITransaction[], ITransaction>, accountId: string) {
    return this.where({
      $or: [
        { debitAccount: accountId },
        { creditAccount: accountId }
      ]
    });
  }
}

SchemaTransaction.query = transactionQueryHelpers

export default model<ITransaction, ITransactionModel>('Transaction', SchemaTransaction)