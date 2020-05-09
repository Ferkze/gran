import { Document, Schema, model } from 'mongoose'
import { USER, UserInterface } from './User'

export const CATEGORY = 'Category'

enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface CategoryInterface extends Document {
  name: string,
  creator?: UserInterface
  type: CategoryType,

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
    required: true,
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