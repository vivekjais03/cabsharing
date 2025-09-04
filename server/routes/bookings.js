const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      vehicleType,
      scheduledTime,
      specialRequests
    } = req.body;

    const booking = new Booking({
      user: req.user.userId,
      pickupLocation,
      dropLocation,
      vehicleType,
      scheduledTime: scheduledTime || Date.now(),
      specialRequests
    });

    await booking.save();
    await booking.populate('user', 'name email phone');

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error during booking creation' });
  }
});

// Get user bookings
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { user: req.user.userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('driver', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('driver', 'name phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is the assigned driver
    if (booking.user._id.toString() !== req.user.userId && 
        booking.driver?._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Fetch booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    await booking.save();

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Calculate fare
router.post('/calculate-fare', async (req, res) => {
  try {
    const { distance, vehicleType, duration } = req.body;

    const baseFares = {
      mini: 50,
      sedan: 80,
      suv: 120,
      luxury: 200
    };

    const perKmRates = {
      mini: 8,
      sedan: 12,
      suv: 15,
      luxury: 25
    };

    const baseFare = baseFares[vehicleType] || baseFares.mini;
    const distanceFare = (distance || 0) * (perKmRates[vehicleType] || perKmRates.mini);
    const timeFare = (duration || 0) * 2; // ₹2 per minute
    
    const totalFare = baseFare + distanceFare + timeFare;

    res.json({
      fare: {
        baseFare,
        distanceFare,
        timeFare,
        totalFare,
        finalAmount: totalFare
      }
    });
  } catch (error) {
    console.error('Fare calculation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;