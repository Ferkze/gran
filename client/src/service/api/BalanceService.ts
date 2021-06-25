import client from "./ApiService";

export interface Balance {
	start: Date
	finish: Date
	credits: number
	debits: number
	balance: number
}

interface Response {
	balance: Balance
	error?: string
}

class BalanceService {

	async getBalance() {
		const response = await client.get<Response>(`/api/balance`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.balance
	}

}

export default new BalanceService()