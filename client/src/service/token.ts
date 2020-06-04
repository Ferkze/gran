export type Token = string

export const saveToken = (token: Token, tokenName: string = 'token'): void => {
	window.localStorage.setItem(tokenName, token)
}

export const retrieveToken = (tokenName: string = 'token'): string | null => {
	const token = window.localStorage.getItem(tokenName)
	return token
}

export const deleteToken = (tokenName: string = 'token'): void => {
	window.localStorage.removeItem(tokenName)
}
