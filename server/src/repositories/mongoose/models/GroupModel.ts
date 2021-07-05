import { Document, Schema, model, Types, Model, DocumentQuery, FilterQuery } from 'mongoose'
import { Group } from '../../../models/entities/Group'
import { IPlanning, PlanningSchema } from './PlanningSchema'

export const GROUP: string = 'Group'

const GroupSchema = new Schema<Group>({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  plannings: [PlanningSchema]
}, {
  timestamps: true
})

export interface GroupDocument extends Document, Group {
  getGroup(): Group
}

export interface GroupDocumentModel extends GroupDocument {
	plannings: Types.DocumentArray<IPlanning>
}

export interface GroupModel extends Model<GroupDocument> {
  findOne(conditions: FilterQuery<Pick<GroupDocument, "_id" | "plannings" | "getGroup" | "name" | "creator">>, projection: any): DocumentQuery<GroupDocumentModel, GroupDocumentModel>
  findById(id: string): DocumentQuery<GroupDocumentModel, GroupDocumentModel>
}

GroupSchema.methods.getGroup = function() {
  return {
    id: this._id,
    name: this.name,
    creator: this.creator.getUser(),
    members: this.members.map(member => member.getUser()),
    plannings: this.plannings,
    createdAt: new Date(this.createdAt),
    updatedAt: new Date(this.updatedAt)
  }
}

export default model<GroupDocument, GroupModel>(GROUP, GroupSchema)