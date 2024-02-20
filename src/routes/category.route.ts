import express from 'express'
import { Category } from '../types/category.type'
import CategoryService from '../services/category.service'

const router = express.Router()
const service = new CategoryService()

router.post('/', async (req, res) => {
  const category: Category = req.body
  const newCategory = await service.create(category)

  res.status(201).json(newCategory)
})
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
router.get('/delete/:name', async(req, res, next)=>{
  try{
    const category = await service.delete(req.params.name as string)
    res.status(200).json(category)
    res.send("categoria eliminada correctamente")
  }catch(error){
    next(error)
  }
})
//metodo de actualizar nombre de la categoria
router.post('/update/', async(req,res,next)=>{
  try{
    const category_filter: string=req.body.filter
    const category_name: string=req.body.name
    const update_category = await service.update_name(category_filter,category_name);
    res.status(200).json(update_category)
    res.send("nombre de la categoria actualizada")
  }catch(error){
    next(error)
  }
})

export default router
