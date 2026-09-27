import Order from '../models/Order.js';
import { getIsMockMode, memoryStore } from '../config/db.js';

// Helper: generate friendly order number
const generateOrderNumber = () => {
  const prefix = 'DSV';
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}-${rand}`;
};

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      guestEmail
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    }

    const orderNumber = generateOrderNumber();
    const userId = req.user ? req.user._id : null;

    if (getIsMockMode()) {
      const newOrder = {
        _id: 'ord_' + Date.now(),
        orderNumber,
        user: userId,
        guestEmail: guestEmail || (req.user ? req.user.email : shippingAddress.email),
        items,
        shippingAddress,
        deliveryMethod: deliveryMethod || {
          name: 'Standard Carbon-Neutral Delivery',
          cost: Number(shipping) || 0,
          estimatedDays: '3-5 business days'
        },
        subtotal: Number(subtotal),
        shipping: Number(shipping) || 0,
        discount: Number(discount) || 0,
        total: Number(total),
        paymentMethod: paymentMethod || 'Credit / Debit Card',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        createdAt: new Date()
      };

      memoryStore.orders.unshift(newOrder);

      return res.status(201).json({
        success: true,
        order: newOrder
      });
    }

    const order = await Order.create({
      orderNumber,
      user: userId,
      guestEmail: guestEmail || (req.user ? req.user.email : shippingAddress.email),
      items,
      shippingAddress,
      deliveryMethod: deliveryMethod || {
        name: 'Standard Carbon-Neutral Delivery',
        cost: Number(shipping) || 0,
        estimatedDays: '3-5 business days'
      },
      subtotal: Number(subtotal),
      shipping: Number(shipping) || 0,
      discount: Number(discount) || 0,
      total: Number(total),
      paymentMethod: paymentMethod || 'Credit / Debit Card',
      paymentStatus: 'Paid',
      orderStatus: 'Processing'
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    if (getIsMockMode()) {
      const userOrders = memoryStore.orders.filter(
        o => o.user && o.user.toString() === userId.toString()
      );
      return res.json({ success: true, orders: userOrders });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID or order number
// @route   GET /api/orders/:identifier
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsMockMode()) {
      const order = memoryStore.orders.find(o => o._id === id || o.orderNumber === id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.json({ success: true, order });
    }

    let order;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate('user', 'name email');
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id }).populate('user', 'name email');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
