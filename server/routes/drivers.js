const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Get nearby drivers
router.post('/nearby-drivers', async (req, res) => {
  try {
    const { coordinates, radius = 5000 } = req.body; // radius in meters

    const drivers = await User.find({
      role: 'driver',
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: radius
        }
      }
    }).select('name phone location');

    res.json({ drivers });
  } catch (error) {
    console.error('Find drivers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update driver location
router.put('/location', auth, async (req, res) => {
  try {
    const { coordinates } = req.body;

    await User.findByIdAndUpdate(req.user.userId, {
      'location.coordinates': coordinates
    });

    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get driver bookings
router.get('/bookings', auth, async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { driver: req.user.userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error('Driver bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;