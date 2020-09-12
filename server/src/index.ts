import App from './app'
import debug from 'debug'

async function main(): Promise<void> {
	const PORT = process.env.PORT || 5000
	App.server.listen(PORT)
	debug('app:server')(`Servidor rodando no host http://localhost:${PORT}`)
}

main()