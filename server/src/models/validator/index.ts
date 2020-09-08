import validateLoginInput from './login'
import validateRegisterInput from './register'
import { LoginData, RegisterData } from '../entities/Auth'

export interface Validators {
  validateLoginInput(data: LoginData): ValidationResult
  validateRegisterInput(data: RegisterData): ValidationResult
}

export interface ValidationResult {
  errors: {},
  isValid: boolean
}

class Validator implements Validators {
	validateLoginInput(data: LoginData): ValidationResult {
		return validateLoginInput(data)
	}
	validateRegisterInput(data: RegisterData): ValidationResult {
		return validateRegisterInput(data)
	}
  
}

export default new Validator()