import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'desivora_super_secret_jwt_key_2026_lifestyle'
      );

      if (getIsMockMode()) {
        const found = memoryStore.users.find(u => u._id.toString() === decoded.id.toString());
        if (!found) {
          return res.status(401).json({ message: 'User session expired or not found' });
        }
        req.user = { ...found };
        delete req.user.password;
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User session expired or not found' });
      }

      next();
    } catch (error) {
      console.error('Auth token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
