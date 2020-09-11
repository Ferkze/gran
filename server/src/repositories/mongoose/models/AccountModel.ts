import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './UserModel'
import { AccountTypes, AccountSubtypes } from '../../../models/entities/Account'

export const ACCOUNT = 'Account'

export interface IAccount extends Document {
  name: string
  colors?: {
    primary?: string,
    secondary?: string
  },
  main: boolean
  institution?: string
  unregisteredInstitution?: string
  type?: AccountTypes
  subtype?: AccountSubtypes
  startingBalance: number
  owner?: IUser['_id'] | IUser
  createdAt?: string
  updatedAt?: string

}

export const AccountSchema = new Schema<IAccount>({
	name: {
		type: Schema.Types.String,
		required: true
	},
	colors: {
		primary: Schema.Types.String,
		secondary: Schema.Types.String
	},
	startingBalance: {
		type: Schema.Types.Number,
		required: false,
		default: 0
	},
	main: {
		type: Schema.Types.Boolean,
		default: false
	},
	institution: {
		type: Schema.Types.ObjectId,
		ref: 'Institution'
	},
	unregisteredInstitution: {
		type: Schema.Types.String
	},
	type: {
		type: Schema.Types.String,
		default: AccountTypes.DEBIT,
		enum: [ AccountTypes.CREDIT, AccountTypes.DEBIT ]
	},
	subtype: {
		type: Schema.Types.String,
		default: AccountSubtypes.CURRENCY,
		enum: [ AccountSubtypes.BROKER, AccountSubtypes.CURRENT, AccountSubtypes.CURRENCY, AccountSubtypes.CREDIT_CARD, AccountSubtypes.DIGITAL_CURRENCY ]
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
}, {
	timestamps: true
})

const accountQueryHelpers = {}

export interface IAccountExtended extends Model<IAccount, typeof accountQueryHelpers> {
  calculateBalance()
}

// AccountSchema.methods.calculateBalance = async function() {
//   return Transaction.find().byAccount(this._id)
// }

export default model<IAccount>(ACCOUNT, AccountSchema)