import { Document, Schema, model, Types } from 'mongoose'
import { AccountSchema, Account} from './Account'

export type User = {
  username ?: string
  email ?: string
  password ?: string
  firstName ?: string
  lastName ?: string
  accounts?: Types.DocumentArray<Account & Types.Embedded>
  createdAt?: string
  updatedAt?: string
}

export interface UserInterface extends User, Document {
  fullName(): string
}

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  accounts: [AccountSchema]
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {return `${this.firstName} ${this.lastName}` }

export default model<UserInterface>('User', UserSchema)