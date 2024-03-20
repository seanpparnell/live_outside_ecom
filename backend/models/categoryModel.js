import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategories: [{
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    iconPath: {
      type: String, // Assuming the icon path is a string
      required: true,
    },
  }],
}, {
  timestamps: true,
});

categorySchema.index({ name: 1 }, { unique: true });
const Category = mongoose.model("Category", categorySchema);

export default Category;
