import { Document, Schema, model } from 'mongoose'
import { Category, CategoryType } from '../../../models/entities/Category'

export interface ICategory extends Document, Category {
  getCategory(): Category
}

const SchemaCategory = new Schema<Category>({
  icon: { type: Schema.Types.String, required: false },
  name: { type: Schema.Types.String, required: true },
  type: { type: Schema.Types.String, required: true,
    enum: [ CategoryType.EXPENSE, CategoryType.INCOME ]
  },
}, {
  timestamps: true
})

SchemaCategory.methods.getCategory = function() {
  return {
    id: this._id,
    icon: this.icon,
    name: this.name,
    type: this.type,
    createdAt: new Date(this.createdAt),
    updatedAt: new Date(this.updatedAt),
  }
}

export default model<ICategory>('Category', SchemaCategory)