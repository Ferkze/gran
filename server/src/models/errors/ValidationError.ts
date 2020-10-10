export class ValidationError extends Error {
	constructor(errors: {}) {
		const message = ''
		for (const errorKey in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, errorKey)) {
				const errorMessage = errors[errorKey]
				message.concat(errorMessage)
			}
		}
		super(message)
	}
}