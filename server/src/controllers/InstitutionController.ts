import { Request, Response } from 'express'
import usecases from '../usecases'
// import Institution, { Institution as InstitutionModel } from '../models/Institution'

class InstitutionController {
	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const institutions = await usecases.instutionUsecases.listInstitutions()
			return res.json(institutions)
		} catch (error) {
			return res.status(500).json({ error })
		}
	}

	//   public async find(req: Request, res: Response): Promise<Response> {
	//     try {
	//       const institution = await Institution.findById(req.params.institutionId)
	//       return res.json(institution)
	//     } catch (error) {
	//       console.error('Error finding Institution', error)
	//       return res.status(404).json({ error })
	//     }
	//   }

	//   public async findByType(req: Request, res: Response): Promise<Response> {
	//     const { type } = req.params
	//     try {
	//       const institutions = await Institution.find({ type })
	//       return res.json(institutions)
	//     } catch (error) {
	//       console.error('Error finding Institution', error)
	//       return res.status(404).json({ error })
	//     }
	//   }

	//   public async store(req: Request, res: Response): Promise<Response> {
	//     const { institutions } = req.body
	//     console.info('New institutions received', institutions)
	//     try {
	//       const doc = await Institution.create(institutions)
	//       console.info('New institutions', doc)
	//       return res.json(doc)
	//     } catch (error) {
	//       console.error('Institution store error', error)
	//       return res.status(500).json({
	//         message: error.message
	//       })
	//     }
	//   }

	//   public async delete(req: Request, res: Response): Promise<Response> {
	//     const { institutionId } = req.params
	//     console.info(`Deleting institution ${institutionId}`)
	//     try {
	//       const document = await Institution.findByIdAndDelete({
	//         _id: institutionId
	//       })
	//       console.info(`Deleted institution:  ${document}`)
	//       return res.json(document)
	//     } catch (error) {
	//       console.error('Institution delete error', error)
	//       return res.status(500).json({
	//         message: error.message
	//       })
	//     }
	//   }

//   public async deleteMany(req: Request, res: Response): Promise<Response> {
//     const { institutionIds } = req.body
//     if (!institutionIds || institutionIds.length == 0) {
//       return res.status(400).json({
//         message: 'Códigos de instituições insuficientes.'
//       })
//     }
//     console.info(`Deleting institutions: ${institutionIds}`)
//     try {
//       const result = await Institution.deleteMany({
//         _id: {
//           $in: institutionIds
//         }
//       })
//       console.info(`Deletion result:  ${result}`)
//       return res.json(result)
//     } catch (error) {
//       console.error('Institution delete error', error)
//       return res.status(500).json({
//         message: error.message
//       })
//     }
//   }
}

export default new InstitutionController()