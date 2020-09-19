import { Document, Schema, Model, model, DocumentQuery } from 'mongoose'
import { IAccount } from './AccountModel'
import { ICategory } from './CategoryModel'
import { IUser } from './UserModel'
import { GROUP, IGroup } from './Group'

export const TRANSACTION: string = 'Transaction'

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference',
}

export interface ITransaction extends Document {
  amount: number
  date: Date
  description: string
  account?: IAccount['_id'] | IAccount
  categories: [ICategory]
  type: TransactionType
  creator: IUser['_id'] | IUser
  group?: IGroup['id'] | IGroup
  createdAt: Date
  updatedAt: Date
}

export interface ITransactionModel extends Model<ITransaction, typeof transactionQueryHelpers> {
  byAccount(accountId: string)
}

const SchemaTransaction = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  description: { type: Schema.Types.String, required: false },
  date: { type: Schema.Types.Date, default: Date.now },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: false, },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  type: { type: Schema.Types.String, required: true, enum: [ TransactionType.CREDIT, TransactionType.DEBIT, TransactionType.TRANSFERENCE ] },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  group: { type: Schema.Types.ObjectId, ref: GROUP, required: false }
}, {
  timestamps: true
})

let transactionQueryHelpers = {
  byAccount(this: DocumentQuery<ITransaction[], ITransaction>, accountId: string) {
    return this.where({ account: accountId }).populate('account');
  }
}

SchemaTransaction.query = transactionQueryHelpers

export default model<ITransaction, ITransactionModel>(TRANSACTION, SchemaTransaction)