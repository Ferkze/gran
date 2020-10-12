import { Document, Schema, Model, model, DocumentQuery } from 'mongoose'
import { Transaction, TransactionType } from '../../../models/entities/Transaction'
// import { GROUP, IGroup } from './Group'

export const TRANSACTION: string = 'Transaction'

export interface ITransaction extends Transaction, Document {
}

export interface ITransactionModel extends Model<ITransaction, typeof transactionQueryHelpers> {
  byAccount(account: string)
  byCategory(category: string)
}

const SchemaTransaction = new Schema<ITransaction>({
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

let transactionQueryHelpers = {
  byAccount(this: DocumentQuery<ITransaction[], ITransaction>, account: string) {
    return this.where({ account });
  },
  byCategory(this: DocumentQuery<ITransaction[], ITransaction>, category: string) {
    return this.where({ category });
  }
}

SchemaTransaction.query = transactionQueryHelpers

export default model<ITransaction, ITransactionModel>(TRANSACTION, SchemaTransaction)