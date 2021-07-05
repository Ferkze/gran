import { Document, Schema, model, Model, DocumentQuery, Types, FilterQuery } from 'mongoose'
import { User } from '../../../models/entities/User'
import { AccountSchema, IAccount } from './AccountSchema'
import { IPlanning, PlanningSchema } from './PlanningSchema'

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const USER: string = 'User'

export const UserSchema = new Schema<User>({
	username: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	accounts: [AccountSchema],
	plannings: [PlanningSchema]
}, {
	timestamps: true
})

export interface UserDocument extends Document, User {
	getUser(): User
}

export interface UserDocumentModel extends Document, User {
	accounts: Types.DocumentArray<IAccount>
	plannings: Types.DocumentArray<IPlanning>
	getUser(): User
}

export interface UserModel extends Model<UserDocument> {
	findOne(conditions: FilterQuery<Pick<UserDocument, "_id" | "plannings" | "createdAt" | "updatedAt" | "accounts" | "username" | "email" | "password">>, projection: any): DocumentQuery<UserDocumentModel, UserDocumentModel>
  findById(id: string): DocumentQuery<UserDocumentModel, UserDocumentModel>
}

UserSchema.methods.getUser = function () {
	return {
		id: this._id,
		username: this.username,
		email: this.email,
		password: this.password,
		firstName: this.firstName,
		lastName: this.lastName,
		accounts: this.accounts,
		budgets: this.budgets,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	}
}

export default model<UserDocument, UserModel>(USER, UserSchema)