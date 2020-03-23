import { Request, Response } from 'express'

class IndexController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.send(req.ip)
  }
}

export default new IndexController()