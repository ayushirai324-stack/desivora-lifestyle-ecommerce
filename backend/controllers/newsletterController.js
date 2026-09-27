import Newsletter from '../models/Newsletter.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getIsMockMode()) {
      const exists = memoryStore.newsletters.some(n => n.email === cleanEmail);
      if (exists) {
        return res.json({ success: true, message: 'You are already on our private collector list!' });
      }
      memoryStore.newsletters.push({ email: cleanEmail, subscribedAt: new Date() });
      return res.status(201).json({
        success: true,
        message: 'Welcome to DesiVora. Your 15% private welcome invitation is on its way.'
      });
    }

    const existing = await Newsletter.findOne({ email: cleanEmail });
    if (existing) {
      return res.json({ success: true, message: 'You are already on our private collector list!' });
    }

    await Newsletter.create({ email: cleanEmail });

    res.status(201).json({
      success: true,
      message: 'Welcome to DesiVora. Your 15% private welcome invitation is on its way.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
