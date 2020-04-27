import App from './app'

async function main(): Promise<void> {
  const PORT = process.env.PORT || 5000
  console.info(`Server listening on port ${PORT}`)
  App.listen(PORT)
}

main()