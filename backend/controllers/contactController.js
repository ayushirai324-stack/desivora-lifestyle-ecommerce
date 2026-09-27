import Contact from '../models/Contact.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

// @desc    Submit contact message
// @route   POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    if (getIsMockMode()) {
      const newContact = {
        _id: 'contact_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
        createdAt: new Date()
      };
      memoryStore.contacts.push(newContact);
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out. A DesiVora concierge representative will reply within 24 hours.'
      });
    }

    await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. A DesiVora concierge representative will reply within 24 hours.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
