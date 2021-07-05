import { Document, Schema, Model, model, DocumentQuery, Query } from 'mongoose'
import { Transaction, TransactionType } from '../../../models/entities/Transaction'
// import { GROUP, IGroup } from './Group'

export const TRANSACTION: string = 'Transaction'

export interface ITransaction extends Transaction, Document {
  getTransaction(): Transaction
}

export interface ITransactionModel extends Model<ITransaction, TransactionQueryHelpers> {
  byAccount(account: string)
  byCategory(category: string)
}

const SchemaTransaction = new Schema<Transaction>({
  amount: { type: Number, required: true },
  date: { type: Schema.Types.Date, required: false, default: Date.now },
  description: { type: Schema.Types.String, required: false },
  paid: { type: Schema.Types.Boolean, required: false, default: true },
  type: { type: Schema.Types.String, required: true,
    enum: [ TransactionType.CREDIT, TransactionType.DEBIT, TransactionType.TRANSFERENCE ]
  },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: false }
}, {
  timestamps: true
})

interface TransactionQueryHelpers {
  byAccount(name: string): Query<any, Document<Transaction>> & TransactionQueryHelpers;
  byCategory(name: string): Query<any, Document<Transaction>> & TransactionQueryHelpers;
}

SchemaTransaction.query.byAccount = function( account: string): DocumentQuery<ITransaction[], ITransaction, {}> {
  return this.where({ account });
}

SchemaTransaction.query.byCategory = function( category: string): DocumentQuery<ITransaction[], ITransaction, {}> {
  return this.where({ category });
}

SchemaTransaction.methods.getTransaction = function() {
  return {
    id: this._id,
    amount: this.amount,
    date: new Date(this.date),
    paid: this.paid,
    description: this.description,
    account: this.account,
    category: this.category,
    type: this.type,
    user: this.user,
    group: this.group,
    createdAt: new Date(this.createdAt),
    updatedAt: new Date(this.updatedAt),
  }
}

export default model<ITransaction, ITransactionModel>(TRANSACTION, SchemaTransaction)