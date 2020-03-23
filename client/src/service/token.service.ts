export type Token = string

export const saveToken = (token: Token, tokenName: string = 'token'): void => {
  console.log(`Saving on localStorage(${tokenName}): ${token}`)
  window.localStorage.setItem(tokenName, token)
}

export const retrieveToken = (tokenName: string = 'token'): string | null => {
  const token = window.localStorage.getItem(tokenName)
  if (token != null) {
    console.log(`Retrieving from localStorage(${tokenName}): ${token}`)
  }
  return token
}

export const deleteToken = (tokenName: string = 'token'): void => {
  window.localStorage.removeItem(tokenName)
  console.log(`Deleting from localStorage(${tokenName})`)
}