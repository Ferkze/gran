import { Request, Response } from 'express'

class BudgetGroupController {
	public async BudgetGroup(req: Request, res: Response): Promise<Response> {
		return res.send(req.ip)
	}
}

export default new BudgetGroupController()