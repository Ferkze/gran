import { Request, Response } from 'express'
import Institution, { Institution as InstitutionModel } from '../models/Institution'

class InstitutionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const institutions = await Institution.find()
    console.info('Institutions found', institutions.length)
    return res.json(institutions)
  }

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const institution = await Institution.findById(req.params.institutionId)
      return res.json(institution)
    } catch (error) {
      console.error('Error finding Institution', error)
      return res.status(404).json({ error })
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { institutions } = req.body
    console.info('New institutions received', institutions)
    try {
      const doc = await Institution.create(institutions)
      console.info('New institutions', doc)
      return res.json(doc)
    } catch (error) {
      console.error('Institution store error', error)
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export default new InstitutionController()