import mongoose from 'mongoose'
import InstitutionModel , { InstitutionType } from '../models/InstitutionModel'
import database from '../../../config/database'
import debug from 'debug'

const log = debug('app:institution:seed')

const documents: any[] = [
	{
		name: 'Nubank',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'purple',
			secondary: 'white'
		},
		logoUrl: ''
	},
	{
		name: 'Banco Inter',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'white'
		},
		logoUrl: ''
	},
	{
		name: 'Next',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'green',
			secondary: 'black'
		},
		logoUrl: ''
	},
	{
		name: 'Bradesco',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		},
		logoUrl: ''
	},
	{
		name: 'Itaú',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'darkblue'
		},
		logoUrl: ''
	},
	{
		name: 'Santander',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		},
		logoUrl: ''
	},
	{
		name: 'C6 Bank',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'yellow'
		},
		logoUrl: ''
	},
	{
		name: 'Outro Banco',
		description: '',
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'white'
		},
		logoUrl: ''
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