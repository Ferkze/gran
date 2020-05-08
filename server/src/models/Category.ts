import { Document, Schema, model } from 'mongoose'

enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface CategoryInterface extends Document {
  name?: string,
  type?: CategoryType,

  createdAt?: Date
  updatedAt?: Date
}

const SchemaCategory = new Schema({
  name: String,
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ CategoryType.EXPENSE, CategoryType.INCOME ]
  }
}, {
  timestamps: true
})

export default model<CategoryInterface>('Category', SchemaCategory)