# DesiVora — Mindful Living & Curated Goods

An original, premium, client-ready modern online shopping platform crafted with **plain HTML5, CSS3, vanilla JavaScript (ES6+)**, a robust **Node.js + Express.js** backend, and **MongoDB with Mongoose**.

Inspired by editorial luxury lifestyle aesthetics, DesiVora features warm off-white tones (`#F8F8F3`), soft sage green accents (`#71884A`), generous whitespace, refined typography, and organic product curation across Electronics, Fashion, Home & Living, Beauty, Sports, and Accessories.

---

## 🌟 Key Features

### 🖥️ Frontend (HTML5, CSS3, Vanilla ES6+ JavaScript)
- **Original Brand Identity**: "DesiVora Living & Studio" — quiet luxury, conscious everyday goods.
- **Hero Composition**: Layered lifestyle product arrangement with gentle floating micro-interactions and social proof indicator.
- **Shop by Category**: 6 circular image cards with smooth upward lift and zoom hover transitions.
- **Dynamic Product Rendering**: Real-time product cards featuring wishlisting, rating stars, price comparisons in Indian Rupees (₹), and responsive badges.
- **Catalog Filtering & Sorting**: Filter by category, price slider (₹1,000–₹25,000), and customer rating, plus sort by price, rating, or newest arrivals.
- **Product Details Page (`product.html`)**: Multi-angle image gallery with thumbnail switcher, color & size selectors, quantity stepper, technical specifications table, and category-based related products.
- **Full Shopping Cart (`cart.html`)**: Subtotal calculation, free shipping progress bar (unlocked at ₹2,999), promotional coupons (`DESIVORA10`, `SAVE15`), and slide-out quick cart drawer.
- **Seamless Checkout (`checkout.html`)**: Contact details, carbon-neutral shipping options, simulated secure credit card/payment options, and order confirmation receipt with generated order number (`VLN-2026-XXXX`).
- **User Authentication (`login.html` & `register.html`)**: Secure JWT authentication, password hashing with bcrypt, input validation, and profile state synchronization.
- **Collector Dashboard (`account.html`)**: Track order history with status pills (*Processing*, *Shipped*, *Delivered*), manage saved addresses, and view personal wishlist.
- **Dedicated Wishlist (`wishlist.html`)**: Save favorite goods with localStorage persistence and cloud account synchronization.
- **Editorial Brand Story (`about.html`)**: Purpose statement, traceable sourcing values, material archive, and sustainability impact metrics.
- **Concierge Desk (`contact.html`)**: Real-time contact form submission connected to backend REST API, studio hours, and FAQ accordion.
- **Live Search Overlay**: Instant debounced search modal supporting partial text matches across name, description, and tags.
- **Toast Notifications & Accessible Drawers**: Animated feedback for cart actions, wishlist toggles, and form submissions with keyboard Escape and mobile backdrop dismissals.

### ⚙️ Backend (Node.js, Express, MongoDB, Mongoose)
- **Node.js & Express REST API**: Clean route and controller separation for products, orders, authentication, contact notes, and newsletters.
- **MongoDB & Mongoose**: Schemas for Products, Users, Orders, Contact Messages, and Newsletter Subscribers.
- **Resilient Zero-Crash Database Layer**: Seamlessly connects to real MongoDB via `MONGODB_URI`. If MongoDB is not running locally, it gracefully operates with an in-memory high-performance store seeded with 12+ complete products, so the app runs immediately out of the box in any development environment.
- **Password Hashing**: Bcrypt encryption with salt rounds for secure authentication.
- **JWT Protection**: Secure Bearer token authorization for protected routes.

---

## 📁 Project Structure

```
desivora-lifestyle-ecommerce/
│
├── frontend/                     # Plain HTML5, CSS3, Vanilla JavaScript
│   ├── index.html                # Homepage with hero, categories, bestsellers, newsletter
│   ├── shop.html                 # Complete catalog with sidebar filters & sorting
│   ├── product.html              # Product details with gallery, specs & related items
│   ├── cart.html                 # Full shopping bag with promo codes & shipping progress
│   ├── checkout.html             # Multi-step checkout with order receipt generator
│   ├── login.html                # User login form
│   ├── register.html             # User registration form
│   ├── account.html              # Customer dashboard & order history
│   ├── wishlist.html             # Saved favorites grid
│   ├── about.html                # Brand story & sustainability metrics
│   ├── contact.html              # Concierge contact form & studio information
│   ├── 404.html                  # Editorial 404 not found page
│   ├── css/
│   │   ├── style.css             # Design tokens, typography, components, cards
│   │   ├── animations.css        # Keyframes, floating animations, toast transitions
│   │   └── responsive.css        # Responsive breakpoints (desktop, tablet, mobile)
│   └── js/
│       ├── app.js                # Global coordinator & event bindings
│       ├── ui.js                 # Toast notifications, drawer controls, price formatters
│       ├── products.js           # Product card generator & API fetchers
│       ├── cart.js               # Cart state, quantities, promo code logic
│       ├── auth.js               # User session, JWT token handling, login/register
│       ├── wishlist.js           # Wishlist persistence & toggle helpers
│       └── search.js             # Live search overlay with debounced API queries
│
├── backend/                      # Node.js + Express backend
│   ├── server.js                 # Express server & static asset serving
│   ├── config/
│   │   └── db.js                 # Mongoose connection & resilient fallback
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   ├── User.js               # User schema with password hashing
│   │   ├── Order.js              # Order schema
│   │   ├── Newsletter.js         # Newsletter subscription schema
│   │   └── Contact.js            # Contact inquiry schema
│   ├── controllers/
│   │   ├── productController.js  # Product listing, filtering, search, slug lookup
│   │   ├── authController.js     # User registration, authentication, JWT issuing
│   │   ├── orderController.js    # Order creation, order tracking
│   │   ├── contactController.js  # Contact form handling
│   │   └── newsletterController.js # Newsletter collector
│   ├── routes/
│   │   ├── productRoutes.js      # /api/products endpoints
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── orderRoutes.js        # /api/orders endpoints
│   │   ├── contactRoutes.js      # /api/contact endpoints
│   │   └── newsletterRoutes.js   # /api/newsletter endpoints
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   └── utils/
│       └── seedData.js           # Curated catalog seed data (12+ products)
│
├── .env.example                  # Environment configuration template
├── .env                          # Local environment variables
├── package.json                  # Dependencies & start scripts
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0 or newer recommended)
- **npm** (comes with Node.js)
- *(Optional)* **MongoDB** (installed locally on default port `27017` or a MongoDB Atlas connection URI). If MongoDB is not running, the application will automatically run in zero-crash in-memory mode!

### 2. Installation
Clone the repository or open the project folder in VS Code, then install dependencies:

```bash
npm install
```

### 3. Environment Configuration
Verify or modify `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/desivora_lifestyle
JWT_SECRET=desivora_super_secret_jwt_key_2026_lifestyle
NODE_ENV=development
```

### 4. Running the Application

Start the Express full-stack server:

```bash
npm start
```

Or for development:

```bash
npm run dev
```

Visit the website in your browser:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📡 REST API Documentation

### Products
- `GET /api/products` — Retrieve products with optional query filters:
  - `category`: Filter by category (e.g. `Electronics`, `Fashion`, `Home & Living`, `Beauty`, `Sports`, `Accessories`)
  - `search`: Full text search across title, description, and tags
  - `minPrice` / `maxPrice`: Numerical price boundaries
  - `rating`: Minimum rating (e.g. `4.5`)
  - `sort`: `featured`, `newest`, `price-asc`, `price-desc`, `rating`
  - `bestseller`: `true`
  - `newArrival`: `true`
- `GET /api/products/:id` — Retrieve single product details by MongoDB `_id` or `slug` along with 4 related products in the same category.
- `GET /api/products/categories/summary` — Category summaries with preview images.

### Authentication
- `POST /api/auth/register` — Create user account (`name`, `email`, `password`). Returns user payload and JWT token.
- `POST /api/auth/login` — Authenticate user (`email`, `password`). Returns user payload and JWT token.
- `GET /api/auth/me` — Retrieve logged-in user profile (Requires `Bearer <token>`).
- `PUT /api/auth/wishlist` — Update customer wishlist array in cloud storage.

### Orders
- `POST /api/orders` — Place order with shipping details, item line items, delivery method, and price calculations.
- `GET /api/orders/myorders` — Fetch logged-in user's order history.
- `GET /api/orders/:id` — Look up specific order by ID or order number (`VLN-2026-XXXX`).

### Inquiries & Newsletter
- `POST /api/contact` — Submit concierge inquiry note (`name`, `email`, `subject`, `message`).
- `POST /api/newsletter` — Subscribe email to collector mailing list with welcome discount.
- `GET /api/health` — Service health check.

---

## 🎨 Color Palette & Typography

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| **Primary Background** | `#F8F8F3` | Warm off-white / ivory canvas |
| **Secondary Background** | `#F3F0E5` | Gentle cream container accents |
| **Primary Accent** | `#71884A` | Soft sage green for CTAs & highlights |
| **Dark Accent** | `#283025` | Deep charcoal green for buttons & strip |
| **Main Text** | `#171A17` | High-contrast readable typography |
| **Secondary Text** | `#686D65` | Muted editorial body & subtitle text |
| **Light Border** | `#E5E7DF` | Subtle architectural card borders |
| **Soft Green Background** | `#EEF2E7` | Feature strips, badges, active states |

---

## 🛡️ Security & Privacy Practices
- **No Plaintext Passwords**: Hashed with `bcryptjs` salt rounds before storage.
- **JWT Authorization**: Session verification via secure tokens.
- **Safe Checkout Simulation**: No real card data is collected or billed.
- **Zero Framework Bloat**: Pure vanilla HTML/CSS/JS without React, Next.js, or TypeScript complexity.
