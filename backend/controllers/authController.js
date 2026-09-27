import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'desivora_super_secret_jwt_key_2026_lifestyle', 
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (getIsMockMode()) {
      const exists = memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (exists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'user_' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        wishlist: [],
        addresses: [],
        createdAt: new Date()
      };

      memoryStore.users.push(newUser);

      return res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          wishlist: newUser.wishlist,
          addresses: newUser.addresses
        },
        token: generateToken(newUser._id)
      });
    }

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password
    });

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        wishlist: user.wishlist,
        addresses: user.addresses
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (getIsMockMode()) {
      const user = memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          wishlist: user.wishlist || [],
          addresses: user.addresses || []
        },
        token: generateToken(user._id)
      });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        wishlist: user.wishlist,
        addresses: user.addresses
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user wishlist
// @route   PUT /api/auth/wishlist
export const updateWishlist = async (req, res) => {
  try {
    const { wishlist } = req.body;

    if (getIsMockMode()) {
      const idx = memoryStore.users.findIndex(u => u._id.toString() === req.user._id.toString());
      if (idx !== -1) {
        memoryStore.users[idx].wishlist = wishlist;
      }
      return res.json({ success: true, wishlist });
    }

    const user = await User.findById(req.user._id);
    user.wishlist = wishlist;
    await user.save();

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
