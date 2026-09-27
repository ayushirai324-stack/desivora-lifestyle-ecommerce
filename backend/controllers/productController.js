import Product from '../models/Product.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

// @desc    Fetch all products with filtering, search, sorting
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      rating, 
      sort, 
      bestseller, 
      newArrival, 
      featured,
      limit
    } = req.query;

    if (getIsMockMode()) {
      let results = [...memoryStore.products];

      // Filter by category
      if (category && category !== 'All') {
        results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }

      // Filter by search query
      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        results = results.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
        );
      }

      // Filter by price range
      if (minPrice) {
        results = results.filter(p => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        results = results.filter(p => p.price <= Number(maxPrice));
      }

      // Filter by rating
      if (rating) {
        results = results.filter(p => p.rating >= Number(rating));
      }

      // Flags
      if (bestseller === 'true') {
        results = results.filter(p => p.bestseller);
      }
      if (newArrival === 'true') {
        results = results.filter(p => p.newArrival);
      }
      if (featured === 'true') {
        results = results.filter(p => p.featured);
      }

      // Sorting
      if (sort === 'price-asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        results.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'newest') {
        results.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      }

      if (limit) {
        results = results.slice(0, Number(limit));
      }

      return res.json({
        success: true,
        count: results.length,
        products: results
      });
    }

    // Real MongoDB query
    const query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (bestseller === 'true') query.bestseller = true;
    if (newArrival === 'true') query.newArrival = true;
    if (featured === 'true') query.featured = true;

    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };

    let productQuery = Product.find(query).sort(sortOption);
    if (limit) {
      productQuery = productQuery.limit(Number(limit));
    }

    const products = await productQuery;

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product by ID or slug
// @route   GET /api/products/:identifier
export const getProductByIdOrSlug = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMockMode()) {
      const product = memoryStore.products.find(
        p => p._id === id || p.slug === id
      );

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Find related products in same category
      const related = memoryStore.products
        .filter(p => p.category === product.category && p.slug !== product.slug)
        .slice(0, 4);

      return res.json({ success: true, product, related });
    }

    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.json({ success: true, product, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get categories summary
// @route   GET /api/products/categories/summary
export const getCategoriesSummary = async (req, res) => {
  try {
    const categories = [
      { name: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", count: 2 },
      { name: "Fashion", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", count: 2 },
      { name: "Home & Living", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80", count: 2 },
      { name: "Beauty", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80", count: 2 },
      { name: "Sports", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80", count: 2 },
      { name: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80", count: 2 }
    ];

    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
