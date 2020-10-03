import { Document, Schema, model } from 'mongoose'
import { CategoryType } from '../../../models/entities/Category'

export const CATEGORY = 'Category'

export interface ICategory extends Document {
  name: string
  type: CategoryType
  createdAt: Date
  updatedAt: Date
}

const SchemaCategory = new Schema({
  name: { type: Schema.Types.String, required: true },
  type: { type: Schema.Types.String, required: true,
    enum: [ CategoryType.EXPENSE, CategoryType.INCOME ]
  },
}, {
  timestamps: true
})

export default model<ICategory>(CATEGORY, SchemaCategory)