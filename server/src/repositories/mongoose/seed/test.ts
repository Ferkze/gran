import mongoose from 'mongoose'
import debug from 'debug'
import TransactionModel from '../models/TransactionModel'
import CategoryModel from '../models/CategoryModel'
import { CategoryType } from '../../../models/entities/Category'

const log = debug('seed')

async function execute(): Promise<void> {
	const con = await mongoose.connect('mongodb+srv://root:qEPE2aPtXL9bDvnY@fkzfinancecluster-e9zdx.mongodb.net/test', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	log('Connected to the database...')

	// CategoryModel.insertMany([
	// 	{ name: 'Saúde e beleza', type: CategoryType.EXPENSE },
	// 	{ name: 'Transporte', type: CategoryType.EXPENSE },
	// 	{ name: 'Bares e restaurantes', type: CategoryType.EXPENSE },
	// 	{ name: 'Mercado', type: CategoryType.EXPENSE },
	// 	{ name: 'Vestuário', type: CategoryType.EXPENSE },
	// 	{ name: 'Telefonia', type: CategoryType.EXPENSE },
	// 	{ name: 'Moradia', type: CategoryType.EXPENSE },
	// 	{ name: 'Impostos e taxas', type: CategoryType.EXPENSE },
	// 	{ name: 'Educação', type: CategoryType.EXPENSE },
	// 	{ name: 'Doação', type: CategoryType.EXPENSE },

	// 	{ name: 'Salário', type: CategoryType.INCOME },
	// 	{ name: 'Juros', type: CategoryType.INCOME },
	// ])

	const transactions = await TransactionModel.find()

	for (const t of transactions) {
		var o = {
			id: t.id,
			amount: t.amount,
			date: t.date,
			description: t.description,
			type: t.type,
			paid: true,
			category: null,
			user: t.user,
			account: t.account
		}

		await t.replaceOne(o)
		log(`Transaction ${t.id} replaced`)
	}
	
	
	await con.disconnect()
	log('End...')
}

execute()
