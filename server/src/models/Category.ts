import { Document, Schema, model } from 'mongoose'

export interface CategoryInterface extends Document {
  name?: string,

  createdAt?: string
  updatedAt?: string
}

const SchemaCategory = new Schema({
  name: String,
})

export default model<CategoryInterface>('Category', SchemaCategory)