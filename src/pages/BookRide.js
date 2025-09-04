import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { MapPin, Clock, Car, Calendar, Navigation, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';

const BookRide = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const { createBooking, loading, setBookingHistory } = useBooking();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const vehicles = [
    {
      type: 'mini',
      name: 'Mini',
      icon: '🚗',
      capacity: '4 seats',
      price: '₹8/km',
      description: 'Compact and economical',
      features: ['AC', 'Music', 'Clean']
    },
    {
      type: 'sedan',
      name: 'Sedan',
      icon: '🚙',
      capacity: '4 seats',
      price: '₹12/km',
      description: 'Comfortable sedan',
      features: ['AC', 'Music', 'Premium']
    },
    {
      type: 'suv',
      name: 'SUV',
      icon: '🚐',
      capacity: '7 seats',
      price: '₹20/km',
      description: 'Spacious for groups',
      features: ['AC', 'Music', 'Spacious']
    },
    {
      type: 'luxury',
      name: 'Luxury',
      icon: '🏎️',
      capacity: '4 seats',
      price: '₹25/km',
      description: 'Premium experience',
      features: ['AC', 'Music', 'Luxury']
    }
  ];

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash',
      icon: <Banknote className="w-5 h-5" />,
      description: 'Pay with cash'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: '**** **** **** 1234'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Pay with UPI'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <Wallet className="w-5 h-5" />,
      description: 'PayTM, PhonePe, GPay'
    }
  ];

  const pickupLocation = watch('pickupLocation');
  const dropLocation = watch('dropLocation');

  // Get current location
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.location-inputs')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setCurrentLocation({ address, coordinates: [longitude, latitude] });
              setValue('pickupLocation', address);
            }
          } catch (error) {
            // Fallback to dummy location
            setCurrentLocation({ 
              address: 'Current Location, Mumbai', 
              coordinates: [72.8777, 19.0760] 
            });
            setValue('pickupLocation', 'Current Location, Mumbai');
          }
        },
        () => {
          // Fallback location
          setCurrentLocation({ 
            address: 'Mumbai, Maharashtra', 
            coordinates: [72.8777, 19.0760] 
          });
          setValue('pickupLocation', 'Mumbai, Maharashtra');
        }
      );
    }
  }, [setValue]);

  // Real location suggestions with enhanced search
  const getLocationSuggestions = async (query) => {
    if (query.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    try {
      // Using CORS proxy for Google Places API
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw&components=country:in`
      );
      const data = await response.json();
      
      if (data.predictions && data.predictions.length > 0) {
        const suggestions = data.predictions.map(prediction => prediction.description).slice(0, 6);
        setLocationSuggestions(suggestions);
        return;
      }
    } catch (error) {
      console.error('Places API error:', error);
    }

    // Enhanced fallback with real Indian locations based on query
    const realLocations = [
      // Mumbai
      'Chhatrapati Shivaji Maharaj International Airport, Mumbai, Maharashtra',
      'Bandra West, Mumbai, Maharashtra',
      'Andheri East, Mumbai, Maharashtra',
      'Powai, Mumbai, Maharashtra',
      'Colaba, Mumbai, Maharashtra',
      'Juhu Beach, Mumbai, Maharashtra',
      'Gateway of India, Mumbai, Maharashtra',
      'Marine Drive, Mumbai, Maharashtra',
      'Worli, Mumbai, Maharashtra',
      'Lower Parel, Mumbai, Maharashtra',
      'Linking Road, Bandra West, Mumbai, Maharashtra',
      'Carter Road, Bandra West, Mumbai, Maharashtra',
      'Haji Ali, Mumbai, Maharashtra',
      'Siddhivinayak Temple, Prabhadevi, Mumbai, Maharashtra',
      'Phoenix Mills, Lower Parel, Mumbai, Maharashtra',
      'Palladium Mall, Lower Parel, Mumbai, Maharashtra',
      'Infinity Mall, Malad West, Mumbai, Maharashtra',
      'R City Mall, Ghatkopar West, Mumbai, Maharashtra',
      // Delhi
      'Connaught Place, New Delhi, Delhi',
      'India Gate, New Delhi, Delhi',
      'Red Fort, Delhi, Delhi',
      'Chandni Chowk, Delhi, Delhi',
      'Karol Bagh, New Delhi, Delhi',
      'Lajpat Nagar, New Delhi, Delhi',
      'Saket, New Delhi, Delhi',
      'Gurgaon, Haryana',
      'Noida, Uttar Pradesh',
      // Bangalore
      'MG Road, Bangalore, Karnataka',
      'Brigade Road, Bangalore, Karnataka',
      'Koramangala, Bangalore, Karnataka',
      'Indiranagar, Bangalore, Karnataka',
      'Whitefield, Bangalore, Karnataka',
      'Electronic City, Bangalore, Karnataka',
      // Pune
      'FC Road, Pune, Maharashtra',
      'Koregaon Park, Pune, Maharashtra',
      'Hinjewadi, Pune, Maharashtra',
      'Baner, Pune, Maharashtra',
      // Hyderabad
      'Hitech City, Hyderabad, Telangana',
      'Banjara Hills, Hyderabad, Telangana',
      'Jubilee Hills, Hyderabad, Telangana',
      'Gachibowli, Hyderabad, Telangana'
    ];

    const filteredSuggestions = realLocations
      .filter(location => 
        location.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);

    setLocationSuggestions(filteredSuggestions);
  };

  const handleCalculateFare = useCallback(async () => {
    if (!pickupLocation || !dropLocation) {
      alert('Please enter both pickup and drop locations');
      return;
    }
    
    setIsCalculating(true);
    
    // Mock fare calculation
    const baseFares = { mini: 50, sedan: 80, suv: 120, luxury: 200 };
    const perKmRates = { mini: 8, sedan: 12, suv: 20, luxury: 25 };
    
    // Use consistent distance for same route
    const routeKey = `${pickupLocation}-${dropLocation}`;
    const savedDistance = sessionStorage.getItem(routeKey);
    const mockDistance = savedDistance ? parseInt(savedDistance) : Math.floor(Math.random() * 20) + 5;
    
    if (!savedDistance) {
      sessionStorage.setItem(routeKey, mockDistance.toString());
    }
    
    const mockDuration = Math.floor(mockDistance * 3) + 10; // Approximate time
    
    const baseFare = baseFares[selectedVehicle];
    const distanceFare = mockDistance * perKmRates[selectedVehicle];
    const timeFare = mockDuration * 2;
    const totalFare = baseFare + distanceFare + timeFare;
    
    setTimeout(() => {
      setEstimatedFare({
        baseFare,
        distanceFare,
        timeFare,
        totalFare,
        distance: mockDistance,
        duration: mockDuration
      });
      setIsCalculating(false);
    }, 800);
  }, [pickupLocation, dropLocation, selectedVehicle]);

  // Auto-recalculate fare when vehicle type changes
  useEffect(() => {
    if (estimatedFare && pickupLocation && dropLocation) {
      handleCalculateFare();
    }
  }, [selectedVehicle, estimatedFare, pickupLocation, dropLocation, handleCalculateFare]);

  const onSubmit = async (data) => {
    if (!estimatedFare) {
      alert('Please calculate fare first!');
      return;
    }

    const bookingData = {
      ...data,
      vehicleType: selectedVehicle,
      paymentMethod: selectedPayment,
      pickupLocation: {
        address: data.pickupLocation,
        coordinates: currentLocation?.coordinates || [72.8777, 19.0760]
      },
      dropLocation: {
        address: data.dropLocation,
        coordinates: [72.8777, 19.0760] // Mock coordinates
      },
      estimatedFare,
      bookingId: 'BK' + Date.now(),
      status: 'confirmed'
    };

    try {
      // Create booking and update dashboard
      await createBooking(bookingData);
      
      // Mock success since backend might not be fully connected
      const mockBooking = {
        _id: bookingData.bookingId,
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        vehicleType: selectedVehicle,
        status: 'confirmed',
        fare: {
          finalAmount: estimatedFare.totalFare,
          ...estimatedFare
        },
        createdAt: new Date().toISOString(),
        paymentMethod: selectedPayment
      };
      
      // Manually update booking history for immediate dashboard update
      setBookingHistory(prev => [mockBooking, ...prev]);
      
      const successData = {
        bookingId: bookingData.bookingId,
        vehicle: vehicles.find(v => v.type === selectedVehicle)?.name,
        fare: estimatedFare.totalFare,
        payment: paymentMethods.find(p => p.id === selectedPayment)?.name,
        pickup: data.pickupLocation,
        drop: data.dropLocation
      };
      
      setBookingDetails(successData);
      setShowSuccess(true);
      
      // Auto hide success message and redirect
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 4000);
      
      // Reset form
      setEstimatedFare(null);
      setSelectedVehicle('sedan');
      setSelectedPayment('cash');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="book-ride-page">
      <div className="container">
        <div className="booking-header">
          <h1>Book Your Ride</h1>
          <p>Choose your destination and we'll get you there safely</p>
        </div>

        <div className="booking-container">
          <div className="booking-form-section">
            <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="booking-form">
              {/* Location Section */}
              <div className="form-section">
                <h3>Where to?</h3>
                
                <div className="location-inputs">
                  <div className="location-input-group">
                    <div className="location-dot pickup-dot"></div>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Pickup location"
                        {...register('pickupLocation', { required: 'Pickup location is required' })}
                        onChange={(e) => {
                          getLocationSuggestions(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                      />
                      <button
                        type="button"
                        className="current-location-btn"
                        onClick={() => {
                          if (currentLocation) {
                            setValue('pickupLocation', currentLocation.address);
                          }
                        }}
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="location-line"></div>

                  <div className="location-input-group">
                    <div className="location-dot drop-dot"></div>
                    <div className="input-wrapper">
                      <MapPin className="input-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Where to?"
                        {...register('dropLocation', { required: 'Drop location is required' })}
                        onChange={(e) => {
                          getLocationSuggestions(e.target.value);
                          setShowSuggestions(true);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="location-suggestions">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="suggestion-item"
                        onClick={(e) => {
                          const clickedInput = document.activeElement;
                          const isPickupField = clickedInput?.name === 'pickupLocation' || 
                                               clickedInput?.placeholder?.includes('Pickup');
                          
                          if (isPickupField) {
                            setValue('pickupLocation', suggestion);
                          } else {
                            setValue('dropLocation', suggestion);
                          }
                          
                          setLocationSuggestions([]);
                          setShowSuggestions(false);
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}

                {(errors.pickupLocation || errors.dropLocation) && (
                  <div className="form-errors">
                    {errors.pickupLocation && <span className="form-error">{errors.pickupLocation.message}</span>}
                    {errors.dropLocation && <span className="form-error">{errors.dropLocation.message}</span>}
                  </div>
                )}
              </div>

              {/* Schedule Section */}
              <div className="form-section">
                <h3>When?</h3>
                <div className="schedule-inputs">
                  <div className="input-group">
                    <Calendar className="input-icon" />
                    <input
                      type="date"
                      className="form-input"
                      {...register('date')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="input-group">
                    <Clock className="input-icon" />
                    <input
                      type="time"
                      className="form-input"
                      {...register('time')}
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-section">
                <h3>Special Requests (Optional)</h3>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Any special requirements..."
                  {...register('specialRequests')}
                />
              </div>

              <button
                type="button"
                onClick={handleCalculateFare}
                className="btn btn-secondary btn-lg calculate-btn"
                disabled={!pickupLocation || !dropLocation || isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Fare'}
              </button>
            </form>
          </div>

          <div className="booking-sidebar">
            {/* Vehicle Selection */}
            <div className="sidebar-section">
              <h3>Choose Vehicle</h3>
              <div className="vehicle-options">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.type}
                    className={`vehicle-option ${selectedVehicle === vehicle.type ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(vehicle.type)}
                  >
                    <div className="vehicle-info">
                      <div className="vehicle-icon">{vehicle.icon}</div>
                      <div className="vehicle-details">
                        <h4>{vehicle.name}</h4>
                        <p className="vehicle-desc">{vehicle.description}</p>
                        <div className="vehicle-features">
                          {vehicle.features.map((feature, idx) => (
                            <span key={idx} className="feature-tag">{feature}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="vehicle-pricing">
                      <span className="price">{vehicle.price}</span>
                      <span className="capacity">{vehicle.capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Estimate */}
            {estimatedFare && (
              <div className="sidebar-section">
                <h3>Fare Breakdown</h3>
                <div className="fare-details">
                  <div className="fare-item">
                    <span>Base Fare</span>
                    <span>₹{estimatedFare.baseFare}</span>
                  </div>
                  <div className="fare-item">
                    <span>Distance ({estimatedFare.distance} km)</span>
                    <span>₹{estimatedFare.distanceFare}</span>
                  </div>
                  <div className="fare-item">
                    <span>Time ({estimatedFare.duration} min)</span>
                    <span>₹{estimatedFare.timeFare}</span>
                  </div>
                  <div className="fare-total">
                    <span>Total Fare</span>
                    <span>₹{estimatedFare.totalFare}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            <div className="sidebar-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="payment-icon">{method.icon}</div>
                    <div className="payment-details">
                      <h4>{method.name}</h4>
                      <p>{method.description}</p>
                    </div>
                    <div className="payment-radio">
                      <div className={`radio ${selectedPayment === method.id ? 'checked' : ''}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              type="submit"
              form="booking-form"
              className="btn btn-primary btn-lg book-button"
              disabled={loading || !estimatedFare}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Booking...
                </>
              ) : (
                <>
                  <Car className="w-5 h-5" />
                  Book Ride - ₹{estimatedFare?.totalFare || 0}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Success Notification */}
      {showSuccess && bookingDetails && (
        <div className="success-overlay">
          <div className="success-notification">
            <div className="success-header">
              <div className="success-icon">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3>Booking Confirmed! 🎉</h3>
            </div>
            
            <div className="success-details">
              <div className="detail-row">
                <span>Booking ID:</span>
                <span className="detail-value">{bookingDetails.bookingId}</span>
              </div>
              <div className="detail-row">
                <span>Vehicle:</span>
                <span className="detail-value">{bookingDetails.vehicle}</span>
              </div>
              <div className="detail-row">
                <span>Fare:</span>
                <span className="detail-value">₹{bookingDetails.fare}</span>
              </div>
              <div className="detail-row">
                <span>Payment:</span>
                <span className="detail-value">{bookingDetails.payment}</span>
              </div>
            </div>
            
            <div className="success-message">
              <p>Driver will be assigned shortly!</p>
              <p className="redirect-text">Redirecting to dashboard...</p>
            </div>
            
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .book-ride-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 0;
        }

        .booking-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .booking-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .booking-header p {
          font-size: 1.125rem;
          color: var(--neutral-600);
        }

        .booking-container {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .booking-form-section {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--neutral-200);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
          margin-bottom: 1rem;
        }

        .form-section h3 {
          font-size: 1.375rem;
          color: var(--neutral-800);
          margin-bottom: 0.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .form-section h3::before {
          content: '';
          width: 4px;
          height: 24px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: 2px;
        }

        .location-inputs {
          position: relative;
        }

        .location-input-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .location-input-group::after {
          content: '';
          position: absolute;
          left: 5px;
          bottom: -0.75rem;
          width: 2px;
          height: 12px;
          background: linear-gradient(180deg, var(--primary-500), transparent);
          border-radius: 1px;
        }

        .location-input-group:last-child::after {
          display: none;
        }

        .location-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .location-dot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .pickup-dot {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
        }

        .drop-dot {
          background: linear-gradient(135deg, var(--success-500), #22c55e);
        }

        .location-input-group:hover .location-dot {
          transform: scale(1.2);
        }

        .location-line {
          width: 2px;
          height: 20px;
          background: var(--neutral-300);
          margin-left: 5px;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--neutral-400);
          z-index: 1;
          transition: all 0.3s ease;
        }

        .input-wrapper:focus-within .input-icon {
          color: var(--primary-500);
          transform: scale(1.1);
        }

        .form-input {
          width: 100%;
          padding: 1.25rem 1rem 1.25rem 3rem;
          border: 2px solid var(--neutral-300);
          border-radius: var(--radius-xl);
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #fafafa;
          font-weight: 400;
        }

        .form-input:hover {
          border-color: var(--neutral-400);
          background: #f5f5f5;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-500);
          background: white;
          box-shadow: 0 0 0 4px rgba(51, 65, 85, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .current-location-btn {
          position: absolute;
          right: 1rem;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          color: white;
          border: none;
          border-radius: var(--radius-lg);
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(51, 65, 85, 0.2);
        }

        .current-location-btn:hover {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(51, 65, 85, 0.3);
        }

        .current-location-btn:active {
          transform: translateY(0);
        }

        .location-suggestions {
          background: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          max-height: 240px;
          overflow-y: auto;
          z-index: 10;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.75rem;
          backdrop-filter: blur(10px);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid var(--neutral-100);
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-item:hover {
          background: linear-gradient(135deg, var(--primary-50), #f0f9ff);
          transform: translateX(4px);
        }

        .suggestion-item svg {
          color: var(--primary-500);
          transition: all 0.2s ease;
        }

        .suggestion-item:hover svg {
          transform: scale(1.1);
        }

        .schedule-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .schedule-inputs .input-group {
          background: white;
          border-radius: var(--radius-lg);
          padding: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .schedule-inputs .input-group:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .calculate-btn {
          width: 100%;
          margin-top: 2rem;
          background: linear-gradient(135deg, #1f2937, #111827);
          border: none;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 1.25rem;
          border-radius: var(--radius-xl);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .calculate-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #111827, #000000);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .calculate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .booking-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-section {
          background: white;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--neutral-200);
        }

        .sidebar-section h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--neutral-800);
        }

        .vehicle-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vehicle-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition);
        }

        .vehicle-option:hover {
          border-color: var(--primary-300);
        }

        .vehicle-option.selected {
          border-color: var(--primary-500);
          background: var(--primary-50);
        }

        .vehicle-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .vehicle-icon {
          font-size: 2rem;
        }

        .vehicle-details h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .vehicle-desc {
          font-size: 0.875rem;
          color: var(--neutral-500);
          margin-bottom: 0.5rem;
        }

        .vehicle-features {
          display: flex;
          gap: 0.5rem;
        }

        .feature-tag {
          background: var(--neutral-100);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--neutral-600);
        }

        .vehicle-pricing {
          text-align: right;
        }

        .price {
          font-weight: 700;
          color: var(--primary-600);
          display: block;
        }

        .capacity {
          font-size: 0.75rem;
          color: var(--neutral-500);
        }

        .fare-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fare-item {
          display: flex;
          justify-content: space-between;
          color: var(--neutral-600);
        }

        .fare-total {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--neutral-900);
          padding-top: 0.75rem;
          border-top: 1px solid var(--neutral-200);
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition);
        }

        .payment-option:hover {
          border-color: var(--primary-300);
        }

        .payment-option.selected {
          border-color: var(--primary-500);
          background: var(--primary-50);
        }

        .payment-icon {
          color: var(--neutral-600);
        }

        .payment-details {
          flex: 1;
        }

        .payment-details h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .payment-details p {
          font-size: 0.75rem;
          color: var(--neutral-500);
          margin: 0;
        }

        .payment-radio {
          width: 20px;
          height: 20px;
        }

        .radio {
          width: 100%;
          height: 100%;
          border: 2px solid var(--neutral-300);
          border-radius: 50%;
          position: relative;
          transition: var(--transition);
        }

        .radio.checked {
          border-color: var(--primary-500);
        }

        .radio.checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: var(--primary-500);
          border-radius: 50%;
        }

        .book-button {
          width: 100%;
          font-size: 1.125rem;
          padding: 1.25rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .success-notification {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-2xl);
          max-width: 400px;
          width: 90%;
          text-align: center;
          animation: slideUp 0.4s ease-out;
        }

        .success-header {
          margin-bottom: 2rem;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--success-500), #22c55e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1rem;
          animation: successPulse 2s infinite;
        }

        .success-header h3 {
          font-size: 1.5rem;
          color: var(--neutral-900);
          margin: 0;
        }

        .success-details {
          background: var(--neutral-50);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-row span:first-child {
          color: var(--neutral-600);
        }

        .detail-value {
          font-weight: 600;
          color: var(--neutral-900);
        }

        .success-message {
          margin-bottom: 1.5rem;
        }

        .success-message p {
          margin: 0.5rem 0;
          color: var(--neutral-600);
        }

        .redirect-text {
          font-size: 0.875rem;
          color: var(--primary-600);
          font-style: italic;
        }

        .success-progress {
          width: 100%;
          height: 4px;
          background: var(--neutral-200);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-500), var(--success-500));
          border-radius: 2px;
          animation: progressFill 4s linear;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (max-width: 768px) {
          .booking-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .schedule-inputs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BookRide;