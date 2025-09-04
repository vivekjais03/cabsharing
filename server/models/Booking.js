const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pickupLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  dropLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  vehicleType: {
    type: String,
    enum: ['mini', 'sedan', 'suv', 'luxury'],
    required: true
  },
  scheduledTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'driver_assigned', 'pickup', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  fare: {
    baseFare: {
      type: Number,
      default: 0
    },
    distanceFare: {
      type: Number,
      default: 0
    },
    timeFare: {
      type: Number,
      default: 0
    },
    totalFare: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    finalAmount: {
      type: Number,
      default: 0
    }
  },
  distance: {
    type: Number,
    default: 0
  },
  duration: {
    estimated: {
      type: Number,
      default: 0
    },
    actual: {
      type: Number,
      default: 0
    }
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'wallet', 'upi'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  rating: {
    userRating: {
      type: Number,
      min: 1,
      max: 5
    },
    driverRating: {
      type: Number,
      min: 1,
      max: 5
    },
    userFeedback: String,
    driverFeedback: String
  },
  specialRequests: {
    type: String,
    default: ''
  },
  promoCode: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ driver: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'pickupLocation.coordinates': '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);