import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { 
  Car, 
  Clock, 
  MapPin, 
  CreditCard, 
  Star, 
  Calendar,
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { bookingHistory, fetchBookingHistory, setBookingHistory } = useBooking();
  const [refreshKey, setRefreshKey] = useState(0);

  const updateBookingStatus = (bookingId, newStatus) => {
    console.log('Updating booking:', bookingId, 'to status:', newStatus);
    setBookingHistory(prev => {
      const updated = prev.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      );
      console.log('Updated bookings:', updated);
      return updated;
    });
    setRefreshKey(prev => prev + 1); // Force re-render
  };


  useEffect(() => {
    if (bookingHistory.length === 0) {
      fetchBookingHistory();
    }
  }, [fetchBookingHistory, bookingHistory.length]);

  const recentBookings = bookingHistory.slice(0, 3);
  const totalRides = bookingHistory.length;
  const completedRides = bookingHistory.filter(b => b.status === 'completed').length;
  const totalSpent = bookingHistory
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.fare?.finalAmount || 0), 0);

  const quickActions = [
    {
      title: 'Book a Ride',
      description: 'Quick booking for your next trip',
      icon: <Car className="w-6 h-6" />,
      link: '/book-ride',
      color: 'blue'
    },
    {
      title: 'View Bookings',
      description: 'Check your ride history',
      icon: <Clock className="w-6 h-6" />,
      link: '/bookings',
      color: 'green'
    },
    {
      title: 'Profile Settings',
      description: 'Update your information',
      icon: <Settings className="w-6 h-6" />,
      link: '/profile',
      color: 'purple'
    },
    {
      title: 'Support',
      description: 'Get help when you need it',
      icon: <Bell className="w-6 h-6" />,
      link: '/support',
      color: 'orange'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p>Here's what's happening with your rides today</p>
          </div>
          <div className="header-actions">
            <Link to="/book-ride" className="btn btn-primary">
              <Car className="w-4 h-4" />
              Book Ride
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <Car className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalRides}</div>
              <div className="stat-label">Total Rides</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{completedRides}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <div className="stat-number">₹{totalSpent}</div>
              <div className="stat-label">Total Spent</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Star className="w-6 h-6" />
            </div>
            <div className="stat-content">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className={`action-card ${action.color}`}>
                  <div className="action-icon">
                    {action.icon}
                  </div>
                  <div className="action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="recent-bookings">
            <div className="section-header">
              <h2>Recent Bookings</h2>
              <Link to="/bookings" className="view-all-link">
                View All
              </Link>
            </div>

            {recentBookings.length > 0 ? (
              <div className="bookings-list" key={refreshKey}>
                {recentBookings.map((booking, index) => (
                  <div key={`${booking._id}-${booking.status}`} className="booking-card">
                    <div className="booking-route">
                      <div className="route-point pickup">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.pickupLocation?.address || 'Pickup Location'}</span>
                      </div>
                      <div className="route-line"></div>
                      <div className="route-point drop">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.dropLocation?.address || 'Drop Location'}</span>
                      </div>
                    </div>

                    <div className="booking-details">
                      <div className="booking-info">
                        <span className="booking-date">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <span className={`booking-status ${booking.status}`}>
                          {booking.status === 'completed' ? 'Completed' : 
                           booking.status === 'cancelled' ? 'Cancelled' : 
                           booking.status === 'pending' ? 'Pending' : 
                           booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                        </span>
                      </div>
                      <div className="booking-actions">
                        <div className="booking-fare">
                          ₹{booking.fare?.finalAmount || 0}
                        </div>
                        {booking.status === 'pending' && (
                          <div className="status-buttons">
                            <button
                              className="status-btn complete"
                              onClick={() => updateBookingStatus(booking._id, 'completed')}
                              title="Mark as Completed"
                            >
                              ✓
                            </button>
                            <button
                              className="status-btn cancel"
                              onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                              title="Mark as Cancelled"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Car className="w-16 h-16" />
                <h3>No rides yet</h3>
                <p>Book your first ride to get started!</p>
                <Link to="/book-ride" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: var(--neutral-50);
          padding: 2rem 0;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: white;
          padding: 2rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
        }

        .welcome-section h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .welcome-section p {
          color: var(--neutral-600);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.blue { background: var(--primary-500); }
        .stat-icon.green { background: var(--success-500); }
        .stat-icon.purple { background: #8b5cf6; }
        .stat-icon.orange { background: #f59e0b; }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--neutral-900);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--neutral-500);
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .quick-actions h2,
        .recent-bookings h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .action-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          transition: var(--transition);
          border-left: 4px solid transparent;
        }

        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .action-card.blue { border-left-color: var(--primary-500); }
        .action-card.green { border-left-color: var(--success-500); }
        .action-card.purple { border-left-color: #8b5cf6; }
        .action-card.orange { border-left-color: #f59e0b; }

        .action-icon {
          width: 40px;
          height: 40px;
          background: var(--neutral-100);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neutral-600);
        }

        .action-card.blue .action-icon { background: var(--primary-50); color: var(--primary-600); }
        .action-card.green .action-icon { background: #dcfce7; color: var(--success-600); }
        .action-card.purple .action-icon { background: #f3e8ff; color: #8b5cf6; }
        .action-card.orange .action-icon { background: #fef3c7; color: #f59e0b; }

        .action-content h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--neutral-900);
        }

        .action-content p {
          font-size: 0.875rem;
          color: var(--neutral-500);
          margin: 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .view-all-link {
          color: var(--primary-600);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .booking-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .booking-card:hover {
          box-shadow: var(--shadow-md);
        }

        .booking-route {
          margin-bottom: 1rem;
        }

        .route-point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--neutral-600);
          margin-bottom: 0.5rem;
        }

        .route-point.pickup svg { color: var(--primary-500); }
        .route-point.drop svg { color: var(--success-500); }

        .route-line {
          width: 2px;
          height: 20px;
          background: var(--neutral-300);
          margin-left: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .booking-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .booking-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .booking-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .booking-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--neutral-500);
        }

        .booking-status {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .booking-status.completed {
          background: #dcfce7;
          color: var(--success-700);
        }

        .booking-status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .booking-status.cancelled {
          background: #fee2e2;
          color: #dc2626;
        }

        .booking-status.confirmed {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .booking-fare {
          font-weight: 600;
          color: var(--neutral-900);
        }

        .status-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .status-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-weight: bold;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-btn.complete {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #22c55e;
        }

        .status-btn.complete:hover {
          background: #22c55e;
          color: white;
          transform: scale(1.1);
        }

        .status-btn.cancel {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #ef4444;
        }

        .status-btn.cancel:hover {
          background: #ef4444;
          color: white;
          transform: scale(1.1);
        }

        .empty-state {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-xl);
          text-align: center;
          color: var(--neutral-500);
        }

        .empty-state svg {
          margin-bottom: 1rem;
          color: var(--neutral-400);
        }

        .empty-state h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-700);
        }

        .empty-state p {
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;