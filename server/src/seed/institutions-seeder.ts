import mongoose from 'mongoose'
import Institution , { Institution as IInstitution, InstitutionType } from "../models/Institution"
import database from '../config/database';

const documents: IInstitution[] = [
	{
		name: "Nubank",
		type: InstitutionType.BANK,
		colors: {
			primary: 'purple',
			secondary: 'white'
		}
	},
	{
		name: "Banco Inter",
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'white'
		}
	},
	{
		name: "Next",
		type: InstitutionType.BANK,
		colors: {
			primary: 'green',
			secondary: 'black'
		}
	},
	{
		name: "Bradesco",
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		}
	},
	{
		name: "Itaú",
		type: InstitutionType.BANK,
		colors: {
			primary: 'orange',
			secondary: 'darkblue'
		}
	},
	{
		name: "Santander",
		type: InstitutionType.BANK,
		colors: {
			primary: 'red',
			secondary: 'white'
		}
	},
	{
		name: "C6 Bank",
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'yellow'
		}
	},
	{
		name: "Outro Banco",
		type: InstitutionType.BANK,
		colors: {
			primary: 'black',
			secondary: 'white'
		}
	},
];

export const seedInstitutions = async () => {
	mongoose.connect(database.connectionString)
	try {
		const docs = await Institution.insertMany(documents)
		if (docs.length == documents.length) {
			mongoose.disconnect()
		}
	} catch (error) {
		console.error(error)	
	}
}

export default {
	model: Institution,
	documents
}