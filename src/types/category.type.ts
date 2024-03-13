import type { Model } from 'mongoose'

export type Category = {
  id?: string
  name: string
  description?: string
  products:string
}

export type CategoryModel = Model<Category>
