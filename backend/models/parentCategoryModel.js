// models/parentCategoryModel.js
import mongoose from 'mongoose';

const parentCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ParentCategory = mongoose.model('ParentCategory', parentCategorySchema);

export default ParentCategory;
