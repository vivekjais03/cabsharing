import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react';

const Bookings = () => {
  const { bookingHistory, fetchBookingHistory } = useBooking();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  useEffect(() => {
    let filtered = bookingHistory;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.pickupLocation?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropLocation?.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookingHistory, statusFilter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      case 'pending': return 'yellow';
      case 'in_progress': return 'blue';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bookings-page">
      <div className="container">
        {/* Header */}
        <div className="bookings-header">
          <div className="header-content">
            <h1>My Bookings</h1>
            <p>View and manage all your ride bookings</p>
          </div>
          <button className="btn btn-outline">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="bookings-filters">
          <div className="search-box">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter className="w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bookings-content">
          {filteredBookings.length > 0 ? (
            <div className="bookings-list">
              {filteredBookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-id">
                      <span>Booking #{booking._id?.slice(-6) || index + 1}</span>
                    </div>
                    <div className={`booking-status ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </div>
                  </div>

                  <div className="booking-route">
                    <div className="route-point pickup">
                      <div className="route-dot pickup-dot"></div>
                      <div className="route-info">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.pickupLocation?.address || 'Pickup Location'}</span>
                      </div>
                    </div>

                    <div className="route-line"></div>

                    <div className="route-point drop">
                      <div className="route-dot drop-dot"></div>
                      <div className="route-info">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.dropLocation?.address || 'Drop Location'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(booking.createdAt)}</span>
                    </div>

                    <div className="detail-item">
                      <Clock className="w-4 h-4" />
                      <span>{booking.duration?.estimated || 25} mins</span>
                    </div>

                    <div className="detail-item">
                      <span className="vehicle-type">{booking.vehicleType}</span>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-fare">
                      <span className="fare-label">Total Fare</span>
                      <span className="fare-amount">₹{booking.fare?.finalAmount || 0}</span>
                    </div>

                    <div className="booking-actions">
                      {booking.status === 'completed' && !booking.rating?.userRating && (
                        <button className="btn btn-outline btn-sm">
                          <Star className="w-4 h-4" />
                          Rate
                        </button>
                      )}
                      <button className="btn btn-secondary btn-sm">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No bookings found</h3>
              <p>
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You haven\'t made any bookings yet'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button className="btn btn-primary">
                  Book Your First Ride
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bookings-page {
          min-height: 100vh;
          background: var(--neutral-50);
          padding: 2rem 0;
        }

        .bookings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: white;
          padding: 2rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
        }

        .header-content h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .header-content p {
          color: var(--neutral-600);
        }

        .bookings-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .search-box {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          color: var(--neutral-400);
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
          background: white;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .booking-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--neutral-200);
          transition: var(--transition);
        }

        .booking-card:hover {
          box-shadow: var(--shadow-md);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .booking-id {
          font-weight: 600;
          color: var(--neutral-700);
        }

        .booking-status {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .booking-status.green {
          background: #dcfce7;
          color: #166534;
        }

        .booking-status.red {
          background: #fee2e2;
          color: #dc2626;
        }

        .booking-status.yellow {
          background: #fef3c7;
          color: #92400e;
        }

        .booking-status.blue {
          background: var(--primary-50);
          color: var(--primary-700);
        }

        .booking-status.gray {
          background: var(--neutral-100);
          color: var(--neutral-600);
        }

        .booking-route {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .route-point {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .route-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .pickup-dot {
          background: var(--primary-500);
        }

        .drop-dot {
          background: var(--success-500);
        }

        .route-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neutral-600);
          font-size: 0.875rem;
        }

        .route-line {
          width: 2px;
          height: 20px;
          background: var(--neutral-300);
          margin-left: 5px;
          margin-bottom: 0.5rem;
        }

        .booking-details {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neutral-600);
          font-size: 0.875rem;
        }

        .vehicle-type {
          background: var(--neutral-100);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .booking-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .booking-fare {
          display: flex;
          flex-direction: column;
        }

        .fare-label {
          font-size: 0.75rem;
          color: var(--neutral-500);
        }

        .fare-amount {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--neutral-900);
        }

        .booking-actions {
          display: flex;
          gap: 0.75rem;
        }

        .empty-state {
          background: white;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-sm);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-700);
        }

        .empty-state p {
          color: var(--neutral-500);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .bookings-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .bookings-filters {
            flex-direction: column;
          }

          .booking-details {
            flex-direction: column;
            gap: 1rem;
          }

          .booking-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Bookings;