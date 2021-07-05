import mongoose from 'mongoose'
import InstitutionModel , { IInstitution, InstitutionType } from '../models/InstitutionModel'
import database from '../../../config/database'
import debug from 'debug'

const log = debug('app:institution:seed')

const documents: Partial<IInstitution>[] = [
	{
		name: 'Nubank',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'purple',
			secondary: 'white'
		},
		imageUrl: ''
	},
	{
		name: 'Banco Inter',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'white'
		},
		imageUrl: ''
	},
	{
		name: 'Next',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'green',
			secondary: 'black'
		},
		imageUrl: ''
	},
	{
		name: 'Bradesco',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		},
		imageUrl: ''
	},
	{
		name: 'Itaú',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'darkblue'
		},
		imageUrl: ''
	},
	{
		name: 'Santander',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		},
		imageUrl: ''
	},
	{
		name: 'C6 Bank',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'yellow'
		},
		imageUrl: ''
	},
	{
		name: 'Outro Banco',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'white'
		},
		imageUrl: ''
	},
]

export const seedInstitutions = async (): Promise<void> => {
	await database()
	try {
		const docs = await InstitutionModel.insertMany(documents)
		if (docs.length == documents.length) {
			mongoose.disconnect()
		}
	} catch (error) {
		log(error)
	}
}

export default {
	model: InstitutionModel,
	documents
}