import { Document, Schema, model } from 'mongoose'
import { IUser } from './UserModel'

export const BUDGET_GROUP: string = 'BudgetGroup'

export interface IBudgetGroup extends Document {
  name: string,
  description: string,
  creator: IUser | IUser['_id']
  members: IUser[] | IUser['_id'][]
  createdAt: Date
  updatedAt: Date
}

const SchemaBudgetGroup = new Schema<IBudgetGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

export default model<IBudgetGroup>(BUDGET_GROUP, SchemaBudgetGroup)