import Mongoose from 'mongoose'

export default async (): Promise<void> => {
	console.info(`Conectando ao MongoDB usando a URL: ${process.env.MONGODB_CONNECTION}`)
	try {
		await Mongoose.connect(process.env.MONGODB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		})
		Mongoose.set('returnOriginal', false)
		console.log('Sucesso ao se conectar com o MongoDB')
	} catch (error) {
		console.error('Erro ao se conectar com o MongoDB:', error)
		throw new Error(error)
	}
	return
}