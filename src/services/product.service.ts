import Products from '../models/products.model'
import { Product } from '../types/products.type'
import boom from '@hapi/boom'
class ProductService {
  async create(product: Product) {
    const newProduct = await Products.create(product).catch((error) => {
      console.log('Could not save Product', error)
    })

    return newProduct
  }

  async findAll() {
    const products = await Products.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!products) {
      throw boom.notFound('There are no Products')
    }

    return products
  }

  async findById(id: string) {
    const product = await Products.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async findByName(name: string) {
    const product = await Products.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async delete(name: string) {
    const product = await Products.deleteOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async updateName(filter: string, name: string) {
    const product = await Products.findOneAndUpdate(
      { name: filter },
      { name }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!product) {
      throw boom.notFound('Product not found or not updated')
    }

    return product
  }
}

export default ProductService
