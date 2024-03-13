import express from 'express'
import { Product } from '../types/products.type'
import ProductService from '../services/product.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'
import CategoryModel from '../models/category.model'
import productsModel from '../models/products.model'
import  boom  from '@hapi/boom'
const router = express.Router()
const service = new ProductService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product = req.body
      const newProduct = await service.create(product)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const products = await service.findAll()
      res.status(200).json(products)
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
      const product = await service.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/name/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product = await service.findByName(req.params.name)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.delete(req.params.name)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:filter',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const filter = req.params.filter
      const name = req.body.name
      const updatedProduct = await service.updateName(filter, name)
      res.status(200).json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
)
router.get(
  '/category/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category = await CategoryModel.findOne({ name: req.params.name });
      if (!category) {
        throw boom.notFound('Category not found');
      }

      const products = await productsModel.find({ category: category._id });
      if (!products) {
        throw boom.notFound('No products found for this category');
      }

      res.status(200).json({ category, products });
    } catch (error) {
      next(error);
    }
  }
)
export default router
