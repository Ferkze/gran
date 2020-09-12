import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('app:mongoose')

export default async (): Promise<void> => {
	log(`Conectando ao MongoDB usando a URL: ${process.env.MONGODB_CONNECTION}`)
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		})
		log('Sucesso ao se conectar com o MongoDB')
	} catch (error) {
		log('Erro ao se conectar com o MongoDB:', error)
		throw new Error(error)
	}
	return
}