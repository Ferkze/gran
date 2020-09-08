import { Document, Schema, model } from 'mongoose'
import { IUser } from './UserModel'

export const CATEGORY = 'Category'

enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface ICategory extends Document {
  name: string
  creator: IUser | IUser['_id']
  type: CategoryType
  colors: {
    primary: string
    secondary: string
  }
  createdAt: Date
  updatedAt: Date
}

const SchemaCategory = new Schema({
  name: { type: Schema.Types.String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: false, },
  type: { type: Schema.Types.String, required: true, enum: [ CategoryType.EXPENSE, CategoryType.INCOME ] },
  colors: {
    primary: Schema.Types.String,
    secondary: Schema.Types.String
  },
}, {
  timestamps: true
})

export default model<ICategory>(CATEGORY, SchemaCategory)