const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, preferences },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user booking history
router.get('/bookings', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('driver', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments({ user: req.user.userId });

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Booking history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;