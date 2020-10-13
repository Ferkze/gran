export class ValidationError extends Error {
	constructor(errors: {}) {
		let message = ''
		for (const errorKey in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, errorKey)) {
				const errorMessage = errors[errorKey]
				message += errorMessage
			}
		}
		console.log(message)
		super(message)
	}
}