import { Schema, model, Types } from 'mongoose'
import { Planning } from '../../../models/entities/Planning'
import { BudgetSchema } from './BudgetModel'

export interface IPlanning extends Types.Subdocument, Planning {
  getPlanning(): Planning
}

export const PlanningSchema = new Schema({
  month: { type: Schema.Types.Number, required: true },
	year: { type: Schema.Types.String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
  budgets: [BudgetSchema]
}, {
  timestamps: true
})


PlanningSchema.methods.getPlanning = function(): Planning {
  return {
    id: this._id,
    month: this.month,
    year: this.year,
    user: this.user,
    group: this.group,
    budgets: this.budgets.map(b => b.getBudget()),
    createdAt: new Date(this.createdAt),
    updatedAt: new Date(this.updatedAt)
  }
}
