import { Document, Schema, model } from 'mongoose'
import { IUser } from './UserModel'

export const GROUP: string = 'Group'

export interface IGroup extends Document {
  name: string,
  description: string,
  creator: IUser | IUser['_id']
  members: IUser[] | IUser['_id'][]
  createdAt: Date
  updatedAt: Date
}

const SchemaGroup = new Schema<IGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

export default model<IGroup>(GROUP, SchemaGroup)