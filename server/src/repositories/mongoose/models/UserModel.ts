import { Document, Schema, model, Model, DocumentQuery, Types } from 'mongoose'
import { User } from '../../../models/entities/User'
import { AccountSchema, IAccount } from './AccountSchema'
import { BudgetSchema, IBudget } from './BudgetModel'

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const USER: string = 'User'

export const UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	accounts: [AccountSchema],
	budgets: [BudgetSchema]
}, {
	timestamps: true
})

export interface UserDocument extends Document, User {}

export interface UserDocumentModel extends Document, User {
	accounts: Types.DocumentArray<IAccount>
	budgets: IBudget[]
}

export interface UserModel extends Model<UserDocument> {
  findById(id: string): DocumentQuery<UserDocumentModel, UserDocumentModel>
}

export default model<UserDocument, UserModel>(USER, UserSchema)