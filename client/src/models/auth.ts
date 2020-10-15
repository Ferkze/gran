import { User } from '.';

export type Token = string

export interface LoginData {
	email: string
	password: string
}

export interface RegisterData {
	name: string
	email: string
	password: string
	password2: string
}

export interface AuthResponse {
	token: Token
	user: User
	error?: string
}

export interface CurrentAuthResponse {
	user: User
}

export interface ErrorResponse {
	error: string
}