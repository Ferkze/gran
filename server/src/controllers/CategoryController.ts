// import { Request, Response } from 'express'
// import Category, { ICategory } from '../models/Category'

// class CategoryController {
//   public async index(req: Request, res: Response): Promise<Response> {
//     const categories = await Category.find()
//     console.info('Categorys found', categories.length)
//     return res.json(categories)
//   }

//   public async find(req: Request, res: Response): Promise<Response> {
//     try {
//       const category = await Category.findById(req.params.categoryId)
//       return res.json(category)
//     } catch (error) {
//       console.error('Error finding Category', error)
//       return res.status(404).json({ error })
//     }
//   }

//   public async store(req: Request, res: Response): Promise<Response> {
//     const { categories } = req.body
//     console.info('New categories received', categories)
//     try {
//       const doc = await Category.create(categories)
//       console.info('New categories', doc)
//       return res.json(doc)
//     } catch (error) {
//       console.error('Category store error', error)
//       return res.status(500).json({
//         message: error.message
//       })
//     }
//   }
// }

// export default new CategoryController()
