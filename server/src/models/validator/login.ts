import Validator from 'validator'
import isEmpty from 'is-empty'
import { ValidationResult } from '.'
import { LoginData } from '../entities/Auth'

export default function validateLoginInput(data: LoginData): ValidationResult {
	const errors = {}

	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	if (Validator.isEmpty(data.email)) {
		errors['email'] = 'O campo deve estar preenchido'
	} else if (!Validator.isEmail(data.email)) {
		errors['email'] = 'O email está inválido'
	}
	if (Validator.isEmpty(data.password)) {
		errors['password'] = 'A senha deve estar preenchida'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}