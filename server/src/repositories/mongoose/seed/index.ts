import InstitutionsSeed from './InstitutionsSeed'
import Mongoose, { Model } from 'mongoose'
import debug from 'debug'

const log = debug('app:institution:seed')
interface SeedModel {
	model: Model<any>
	documents: any[]
}

const seeds: SeedModel[] = [
	InstitutionsSeed
]

async function execute(): Promise<void> {
	const conString = process.env.MONGODB_CONNECTION || 'mongodb://root:pass@mongodb:27017/dev'
	const con = await Mongoose.connect(conString, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	log('Connected to the database...')

	for (const seed of seeds) {
		log(`Seeding model ${seed.model.modelName} with ${seed.documents.length} documents.`)
		try {
			const docs = await seed.model.create(seed.documents)
			if (docs.length == seed.documents.length) {
				log(`Model ${seed.model.modelName} has been successfully seeded.`)
			}
		} catch (error) {
			log({
				message: `Error inserting a batch of documents in model ${seed.model.modelName}`,
				error: error.errmsg
			})
		}
	}
	log('Disconnecting from database...')
	await con.disconnect()
}

execute()
