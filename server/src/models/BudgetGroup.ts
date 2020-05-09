import { Document, Schema, model } from 'mongoose'
import { IUser, USER } from './User'

export const BUDGET_GROUP = 'BudgetGroup'

export interface BudgetGroupInterface extends Document {
  name: string,
  description?: string,
  creator?: IUser | IUser['_id']
  members?: IUser[] | IUser['_id']

  createdAt?: Date
  updatedAt?: Date
}

const SchemaBudgetGroup = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: USER,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: USER
  }]
}, {
  timestamps: true
})

export default model<BudgetGroupInterface>(BUDGET_GROUP, SchemaBudgetGroup)