import { Request, Response } from 'express'

class BudgetController {
	public async Budget(req: Request, res: Response): Promise<Response> {
		return res.send(req.ip)
	}
}

export default new BudgetController()