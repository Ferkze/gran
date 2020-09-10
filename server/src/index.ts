import App from './app'

async function main(): Promise<void> {
	const PORT = process.env.PORT || 5000
	console.info(`Servidor rodando no host http://localhost:${PORT}`)
	App.listen(PORT)
}

main()