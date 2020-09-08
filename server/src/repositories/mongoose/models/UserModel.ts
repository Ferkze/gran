import { Document, Schema, model, Types } from 'mongoose'
import { AccountSchema, IAccount} from './AccountModel'
import { BudgetSchema, IBudget } from './BudgetModel'

export const USER: string = 'User'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  accounts?: IAccount[] | IAccount['_id']
  budgets?: IBudget[] | IBudget['_id']
  createdAt: number
  updatedAt: number
}

export const UserSchema = new Schema<IUser>({
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


export default model<IUser>(USER, UserSchema)