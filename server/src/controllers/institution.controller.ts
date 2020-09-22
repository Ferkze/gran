import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'

const log = debug('app:institution:controller')
// import Institution, { Institution as InstitutionModel } from '../models/Institution'

class InstitutionController {
	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const institutions = await usecases.instution.listInstitutions()
			return res.json({ institutions })
		} catch (error) {
			log('Erro ao listar instituições', error)
			return res.status(500).json({ error })
		}
	}

	//   public async find(req: Request, res: Response): Promise<Response> {
	//     try {
	//       const institution = await Institution.findById(req.params.institutionId)
	//       return res.json(institution)
	//     } catch (error) {
	//       log('Error finding Institution', error)
	//       return res.status(404).json({ error })
	//     }
	//   }

	//   public async findByType(req: Request, res: Response): Promise<Response> {
	//     const { type } = req.params
	//     try {
	//       const institutions = await Institution.find({ type })
	//       return res.json(institutions)
	//     } catch (error) {
	//       log('Error finding Institution', error)
	//       return res.status(404).json({ error })
	//     }
	//   }

	//   public async store(req: Request, res: Response): Promise<Response> {
	//     const { institutions } = req.body
	//     log('New institutions received', institutions)
	//     try {
	//       const doc = await Institution.create(institutions)
	//       log('New institutions', doc)
	//       return res.json(doc)
	//     } catch (error) {
	//       log('Institution store error', error)
	//       return res.status(500).json({
	//         message: error.message
	//       })
	//     }
	//   }

	//   public async delete(req: Request, res: Response): Promise<Response> {
	//     const { institutionId } = req.params
	//     log(`Deleting institution ${institutionId}`)
	//     try {
	//       const document = await Institution.findByIdAndDelete({
	//         _id: institutionId
	//       })
	//       log(`Deleted institution:  ${document}`)
	//       return res.json(document)
	//     } catch (error) {
	//       log('Institution delete error', error)
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
//     log(`Deleting institutions: ${institutionIds}`)
//     try {
//       const result = await Institution.deleteMany({
//         _id: {
//           $in: institutionIds
//         }
//       })
//       log(`Deletion result:  ${result}`)
//       return res.json(result)
//     } catch (error) {
//       log('Institution delete error', error)
//       return res.status(500).json({
//         message: error.message
//       })
//     }
//   }
}

export default new InstitutionController()