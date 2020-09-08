import InstitutionsSeed from './InstitutionsSeed'
import Mongoose, { Model } from 'mongoose'

interface SeedModel {
	model: Model<any>
	documents: any[]
}

const seeds: SeedModel[] = [
	InstitutionsSeed
]

async function execute() {
	const conString = process.env.MONGODB_CONNECTION || 'mongodb://root:pass@mongodb:27017/dev'
	const con = await Mongoose.connect(conString, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	console.log('Connected to the database...')

	for (const seed of seeds) {
		console.info(`Seeding model ${seed.model.modelName} with ${seed.documents.length} documents.`)
		try {
			const docs = await seed.model.create(seed.documents)
			if (docs.length == seed.documents.length) {
				console.info(`Model ${seed.model.modelName} has been successfully seeded.`)
			}
	} catch (error) {
			console.error({
				message: `Error inserting a batch of documents in model ${seed.model.modelName}`,
				error: error.errmsg
			})
		}
	}
	console.log('Disconnecting from database...')
	await con.disconnect()
}

execute()
