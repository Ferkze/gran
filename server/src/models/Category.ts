import { Document, Schema, model } from 'mongoose'
import { USER, IUser } from './User'

export const CATEGORY = 'Category'

enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface CategoryInterface extends Document {
  name: string
  creator?: IUser | IUser['_id']
  type: CategoryType
  colors?: {
    primary: string
    secondary: string
  }
  createdAt?: Date
  updatedAt?: Date
}

const SchemaCategory = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: USER,
    required: false,
  },
  colors: {
    primary: Schema.Types.String,
    secondary: Schema.Types.String
  },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ CategoryType.EXPENSE, CategoryType.INCOME ]
  }
}, {
  timestamps: true
})

export default model<CategoryInterface>(CATEGORY, SchemaCategory)