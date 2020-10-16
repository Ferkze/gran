import { Schema, model, Types } from 'mongoose'
import { Budget } from '../../../models/entities/Budget'
import { CategoryType } from '../../../models/entities/Category'

export const BUDGET: string = 'Budget'

export interface IBudget extends Types.Subdocument, Budget {
  getBudget(): Budget
}

export const BudgetSchema = new Schema<IBudget>({
  type: {
    type: Schema.Types.String,
    enum: [
      CategoryType.EXPENSE, CategoryType.INCOME, CategoryType.TRANSFERENCE
    ],
    required: true
  },
  value: {
    type: Schema.Types.Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
		ref: 'Category',
    required: true
  },
}, {
  timestamps: true
})


BudgetSchema.methods.getBudget = function(): Budget {
  return {
    id: this.id,
    type: this.type,
    value: this.value,
    category: this.category,
    createdAt: new Date(this.createdAt),
    updatedAt: new Date(this.updatedAt)
  }
}
