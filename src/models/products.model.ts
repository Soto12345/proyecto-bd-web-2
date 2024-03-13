import { Schema, model } from 'mongoose'
import { Product,ProductModel} from '../types/products.type'

const Products = new Schema<Product,ProductModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
})

export default model('Product', Products);
