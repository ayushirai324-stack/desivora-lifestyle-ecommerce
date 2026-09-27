// Sample product catalog for DesiVora Lifestyle & Goods in Indian Rupees (INR ₹)
export const initialProducts = [
  {
    name: "Solace Wireless Over-Ear Headphones",
    slug: "solace-wireless-headphones",
    description: "Crafted with brushed aluminum and ultra-soft memory foam cushions. Solace offers active noise cancellation, high-fidelity 40mm titanium drivers, and a 42-hour battery life in a warm organic ivory finish.",
    category: "Electronics",
    price: 14999,
    originalPrice: 17999,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 128,
    stock: 24,
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Battery Life": "Up to 42 hours",
      "Connectivity": "Bluetooth 5.3 + 3.5mm AUX",
      "Drivers": "40mm Titanium Acoustic Core",
      "Weight": "248 grams",
      "Materials": "Brushed Aluminum, Vegan Memory Foam"
    },
    colors: ["Ivory Mist", "Charcoal", "Sage Olive"],
    tags: ["audio", "minimalist", "noise-canceling"]
  },
  {
    name: "Terra Everyday Canvas Backpack",
    slug: "terra-everyday-backpack",
    description: "An intentional everyday carry backpack crafted from durable 18oz organic washed cotton canvas with vegetable-tanned leather accents. Features a padded 16\" laptop sleeve and weatherproof brass hardware.",
    category: "Accessories",
    price: 8999,
    originalPrice: 10499,
    discount: 14,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 94,
    stock: 18,
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Capacity": "22 Liters",
      "Laptop Sleeve": "Fits up to 16\" MacBook Pro",
      "Material": "18oz Water-Resistant Organic Canvas",
      "Hardware": "Antiqued Solid Brass"
    },
    colors: ["Earthy Sage", "Warm Dune", "Midnight Black"],
    tags: ["backpack", "travel", "everyday"]
  },
  {
    name: "AuraFit Smart Health Watch",
    slug: "aurafit-smart-watch",
    description: "Subtle elegance meets preventative wellness. AuraFit delivers biometric tracking, HRV recovery analysis, sleep stage diagnostics, and AMOLED display wrapped in an aerospace-grade titanium bezel.",
    category: "Electronics",
    price: 16499,
    originalPrice: 19999,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 210,
    stock: 15,
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Battery": "7 days typical usage",
      "Water Resistance": "5 ATM (50 meters)",
      "Sensors": "Optical Heart Rate, SpO2, Skin Temperature",
      "Display": "1.39\" AMOLED 454x454"
    },
    colors: ["Titanium Silver", "Matte Slate", "Champagne Gold"],
    tags: ["smartwatch", "fitness", "wellness"]
  },
  {
    name: "Ceramic Stoneware Table Lamp",
    slug: "ceramic-stoneware-table-lamp",
    description: "Hand-thrown stoneware lamp base paired with a textured linen shade. Emits a soft, diffused ambient glow that transforms desks, bedside tables, or living room credenzas into serene havens.",
    category: "Home & Living",
    price: 6999,
    originalPrice: null,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 46,
    stock: 12,
    featured: true,
    bestseller: false,
    newArrival: true,
    specifications: {
      "Dimensions": "14\" Height x 9\" Shade Width",
      "Cord": "6ft Braided Khaki Fabric Cord",
      "Bulb Type": "E26 Warm LED Included (2700K)"
    },
    colors: ["Sand Clay", "Olive Speckle"],
    tags: ["lighting", "home", "ceramic"]
  },
  {
    name: "Cloud Knit Overshirt",
    slug: "cloud-knit-overshirt",
    description: "An effortless layering essential knitted from ultra-soft heavyweight organic cotton yarn. Designed with clean horn buttons, structured chest pockets, and a relaxed tailored drape.",
    category: "Fashion",
    price: 5499,
    originalPrice: 6999,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 82,
    stock: 25,
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Material": "100% GOTS Certified Organic Cotton",
      "Fit": "Relaxed Regular Fit",
      "Care": "Machine wash cold, lay flat to dry"
    },
    colors: ["Sage Green", "Warm Oat", "Deep Forest"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["fashion", "knitwear", "organic"]
  },
  {
    name: "Lumière Cedar & Sage Eau de Parfum",
    slug: "lumiere-cedar-sage-parfum",
    description: "An intoxicating gender-neutral olfactory journey opening with wild sage and bergamot, leading to a heart of smoked cedarwood, vetiver, and subtle ambergris. Handcrafted in Grasse, France.",
    category: "Beauty",
    price: 4999,
    originalPrice: null,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 63,
    stock: 30,
    featured: false,
    bestseller: true,
    newArrival: true,
    specifications: {
      "Volume": "50ml / 1.7 fl oz",
      "Type": "Eau de Parfum (22% concentration)",
      "Origin": "Grasse, France",
      "Notes": "Wild Clary Sage, Bergamot, Smoked Atlas Cedar, Amber"
    },
    tags: ["fragrance", "perfume", "beauty"]
  },
  {
    name: "Kanso Cork Yoga & Movement Mat",
    slug: "kanso-cork-yoga-mat",
    description: "Sustainably harvested Mediterranean oak cork bonded with non-slip natural tree rubber. Naturally antimicrobial, moisture-activated grip that improves as you sweat, and zero synthetic odors.",
    category: "Sports",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 71,
    stock: 22,
    featured: true,
    bestseller: false,
    newArrival: true,
    specifications: {
      "Thickness": "4.5mm optimal joint support",
      "Dimensions": "72\" Long x 26\" Wide",
      "Weight": "2.2 kg",
      "Material": "Natural Oak Cork & Organic Rubber"
    },
    colors: ["Natural Cork Grain"],
    tags: ["fitness", "yoga", "cork", "sustainable"]
  },
  {
    name: "HydroPure Insulated Matte Tumbler",
    slug: "hydropure-insulated-matte-tumbler",
    description: "Double-walled vacuum insulated 18/8 food-grade stainless steel bottle. Keeps iced water cold for 36 hours or hot herbal tea warm for 18 hours. Complete with leakproof silicone lid and soft carry loop.",
    category: "Sports",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 112,
    stock: 45,
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Capacity": "750ml / 25oz",
      "Insulation": "Double-Wall Pro-Grade Vacuum",
      "BPA Free": "100% Non-Toxic & Food Grade"
    },
    colors: ["Sage Green", "Ivory Cream", "Slate Stone"],
    tags: ["hydration", "wellness", "bottle"]
  },
  {
    name: "Artisan Ceramic Pour-Over Dripper Set",
    slug: "artisan-ceramic-pour-over-set",
    description: "Elevate your morning ritual. Includes a hand-glazed ribbed ceramic coffee dripper, heat-resistant borosilicate glass carafe, and solid brass measuring spoon for clean, rich extraction.",
    category: "Home & Living",
    price: 4299,
    originalPrice: null,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 54,
    stock: 14,
    featured: true,
    bestseller: false,
    newArrival: true,
    specifications: {
      "Capacity": "600ml (serves 2-3 cups)",
      "Filter Compatibility": "Standard #02 Cone Filters",
      "Dishwasher Safe": "Yes, top rack"
    },
    colors: ["Warm Chalk", "Speckled Moss"],
    tags: ["coffee", "kitchen", "ceramic"]
  },
  {
    name: "UrbanStep Minimalist Leather Sneakers",
    slug: "urbanstep-minimalist-sneakers",
    description: "Clean silhouette footwear handcrafted in Portugal from supple Italian full-grain nappa leather, lined with breathable calfskin, and set on lightweight cushioned Margom rubber soles.",
    category: "Fashion",
    price: 11999,
    originalPrice: 13999,
    discount: 14,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 97,
    stock: 19,
    featured: false,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Upper": "100% Full Grain Italian Nappa Leather",
      "Lining": "Buttery Soft Calfskin",
      "Sole": "Recycled Margom Rubber Cupsole",
      "Origin": "Porto, Portugal"
    },
    colors: ["Chalk White / Olive", "Natural Sand", "Triple Black"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    tags: ["sneakers", "footwear", "leather"]
  },
  {
    name: "Botanical Squalane & Rosehip Facial Oil",
    slug: "botanical-squalane-rosehip-oil",
    description: "Cold-pressed active plant nectar delivering deep cellular hydration, antioxidant defense, and an unmistakable radiant luminescence. Fast absorbing without greasy residue.",
    category: "Beauty",
    price: 3499,
    originalPrice: 4299,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1608248597358-1e4277c0c2db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 153,
    stock: 35,
    featured: true,
    bestseller: true,
    newArrival: false,
    specifications: {
      "Volume": "30ml / 1.0 fl oz",
      "Skin Types": "All skin types, including sensitive",
      "Key Ingredients": "100% Plant Squalane, Organic Virgin Rosehip Seed Oil, Tocopherol (Vitamin E)"
    },
    tags: ["skincare", "facial-oil", "clean-beauty"]
  },
  {
    name: "Norden Vegetable Tanned Cardholder",
    slug: "norden-vegetable-tanned-cardholder",
    description: "Slim, pocket-friendly minimalist wallet crafted from full-grain Tuscan vegetable-tanned leather that develops a gorgeous, one-of-a-kind personal patina over years of use.",
    category: "Accessories",
    price: 2299,
    originalPrice: null,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606503829058-c9171b3e7ee5?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 88,
    stock: 40,
    featured: false,
    bestseller: false,
    newArrival: true,
    specifications: {
      "Slots": "4 Quick-access card slots + central folded cash pocket",
      "Leather": "Certified Tuscan Vegetable-Tanned Cowhide",
      "Dimensions": "10cm x 7.5cm x 0.4cm"
    },
    colors: ["Cognac Tan", "Forest Olive", "Espresso"],
    tags: ["wallet", "leather", "accessories"]
  }
];
