import React, { createContext, useContext, useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookingHistory();
    }
  }, [isAuthenticated]);

  const fetchBookingHistory = async () => {
    try {
      const response = await bookingAPI.getBookings();
      setBookingHistory(response.data.bookings);
    } catch (error) {
      console.error('Failed to fetch booking history:', error);
    }
  };

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      const response = await bookingAPI.createBooking(bookingData);
      const newBooking = response.data.booking;
      
      setCurrentBooking(newBooking);
      setBookingHistory(prev => [newBooking, ...prev]);
      
      toast.success('Booking created successfully!');
      return { success: true, booking: newBooking };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create booking';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const calculateFare = async (routeData) => {
    try {
      const response = await bookingAPI.calculateFare(routeData);
      return { success: true, fare: response.data.fare };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to calculate fare';
      return { success: false, error: message };
    }
  };

  const findNearbyDrivers = async (location) => {
    try {
      const response = await bookingAPI.getNearbyDrivers(location);
      setNearbyDrivers(response.data.drivers);
      return { success: true, drivers: response.data.drivers };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to find drivers';
      return { success: false, error: message };
    }
  };

  const cancelBooking = async (bookingId, reason) => {
    try {
      setLoading(true);
      await bookingAPI.cancelBooking(bookingId, reason);
      
      setCurrentBooking(prev => 
        prev?.id === bookingId ? { ...prev, status: 'cancelled' } : prev
      );
      
      setBookingHistory(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
      
      toast.success('Booking cancelled successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to cancel booking';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const rateBooking = async (bookingId, rating) => {
    try {
      await bookingAPI.rateBooking(bookingId, rating);
      
      setBookingHistory(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, rating } : booking
        )
      );
      
      toast.success('Thank you for your feedback!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit rating';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateBookingStatus = (bookingId, status) => {
    setCurrentBooking(prev =>
      prev?.id === bookingId ? { ...prev, status } : prev
    );
    
    setBookingHistory(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const value = {
    currentBooking,
    bookingHistory,
    nearbyDrivers,
    loading,
    createBooking,
    calculateFare,
    findNearbyDrivers,
    cancelBooking,
    rateBooking,
    updateBookingStatus,
    fetchBookingHistory,
    setBookingHistory
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};