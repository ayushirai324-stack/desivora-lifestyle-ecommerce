import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Accessories']
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    discount: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 10 },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    specifications: { type: Map, of: String, default: {} },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    tags: [{ type: String }]
  },
  {
    timestamps: true
  }
);

// Prevent re-compilation error if model already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
