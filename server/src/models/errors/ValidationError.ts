export class ValidationError extends Error {
	constructor(errors: {}) {
		let message: string
		for (const errorKey in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, errorKey)) {
				message = errors[errorKey]
			}
		}
		super(message)
	}
}