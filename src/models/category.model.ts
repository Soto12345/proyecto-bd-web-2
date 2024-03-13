import { Schema, model } from 'mongoose'
import { Category, CategoryModel } from '../types/category.type'

const Categories = new Schema<Category, CategoryModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

export default model('Category', Categories)
