import isEmpty from 'is-empty'
import Validator from 'validator'
import { ValidationResult } from '.'
import { RegisterData } from '../entities/Auth'

export default function validateRegisterInput(data: RegisterData): ValidationResult {
	const errors = {}

	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	if (Validator.isEmpty(data.name)) {
		errors['name'] = 'O preenchimento do nome é necessário'
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors['email'] = 'O preenchimento do email é necessário'
	} else if (!Validator.isEmail(data.email)) {
		errors['email'] = 'O email está inválido'
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors['password'] = 'O preenchimento da senha é necessário'
	}
	if (Validator.isEmpty(data.password2)) {
		errors['password2'] = 'A confirmação de senha é necessária'
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors['password'] = 'Senha deve conter mais que 6 caracteres'
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors['password2'] = 'As senhas devem bater'
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
}
