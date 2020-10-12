import { Types, Schema, Model, model } from 'mongoose'
import { AccountTypes, AccountSubtypes, Account } from '../../../models/entities/Account'

export const ACCOUNT = 'Account'

export interface IAccount extends Types.Subdocument, Account { 
	id: string

	getAccount(): Account
}

export const AccountSchema = new Schema<IAccount>({
	name: {
		type: Schema.Types.String,
		required: true
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

AccountSchema.methods.getAccount = function(): Account {
	return {
		id: this._id,
		name: this.name,
		main: this.main,
		institution: this.institution,
		unregisteredInstitution: this.unregisteredInstitution,
		type: this.type,
		subtype: this.subtype,
		startingBalance: this.startingBalance,
		owner: this.owner,
		createdAt: new Date(this.createdAt),
		updatedAt: new Date(this.updatedAt),
	}
}