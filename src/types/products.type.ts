import type { Model } from 'mongoose'
import { Schema } from 'mongoose';
export type Product = {
    id?: string;
    name: string;
    description?: string;
    price: number;
    category: Schema.Types.ObjectId; // Referencia al ID de la categoría
  };

  export type ProductModel = Model<Product>
