import express from 'express'
import { Category } from '../types/category.type'
import CategoryService from '../services/category.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'

const router = express.Router()
const service = new CategoryService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const category: Category = req.body
    const newCategory = await service.create(category)

    res.status(200).json({
      status: 200,
      mensaje: 'peticion enviada correctamente',
      categorie: newCategory
    })
  }
)

router.get(
  '/TodasCategorias',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { user } = req
      console.log(user)
      const categories = await service.findAll()
      res.status(200).json({
        status: 200,
        mensaje: 'peticion realizada correctamente',
        data: categories
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category = await service.findById(req.params.id)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)
//comentario
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category = await service.findById(req.query.name as string)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

//consultar todas las categorias
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findAll()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})
//metodo de buscar categoria mediante el id
router.get('/id/:id', async (req, res, next) => {
  try {
    const category = await service.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})
//metodo de buscar categoria mediante el nombre
router.get('/name/:name', async (req, res, next) => {
  try {
    const category = await service.findByName(req.params.name as string)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})
//metodo de eliminar categoria
router.get('/delete/:name', async (req, res, next) => {
  try {
    const category = await service.delete(req.params.name as string)
    res.status(200).json({
      status: 200,
      mensaje: 'categoria eliminada correctamente',
      category: category
    })
    res.send('categoria eliminada correctamente')
  } catch (error) {
    next(error)
  }
})
//metodo de actualizar nombre de la categoria
router.post('/update/', async (req, res, next) => {
  try {
    const category_filter: string = req.body.filter
    const category_name: string = req.body.name
    const update_category = await service.update_name(
      category_filter,
      category_name
    )
    res.status(200).json(update_category)
    res.send('nombre de la categoria actualizada')
  } catch (error) {
    next(error)
  }
})

export default router
