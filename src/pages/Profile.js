import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  Save,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Star
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await updateProfile(data);
    setIsLoading(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> }
  ];

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <User className="w-12 h-12" />
              </div>
              <button className="avatar-upload">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="profile-info">
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
              <div className="profile-stats">
                <div className="stat">
                  <Star className="w-4 h-4" />
                  <span>4.8 Rating</span>
                </div>
                <div className="stat">
                  <MapPin className="w-4 h-4" />
                  <span>25 Trips</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            {/* Tabs */}
            <div className="profile-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <h2>Personal Information</h2>
                    <p>Update your personal details and information</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          <User className="w-4 h-4" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          className={`form-input ${errors.name ? 'error' : ''}`}
                          placeholder="Enter your full name"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && (
                          <span className="form-error">{errors.name.message}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className={`form-input ${errors.phone ? 'error' : ''}`}
                          placeholder="Enter your phone number"
                          {...register('phone', { required: 'Phone is required' })}
                        />
                        {errors.phone && (
                          <span className="form-error">{errors.phone.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={user?.email}
                        disabled
                      />
                      <small className="form-help">Email cannot be changed</small>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <h2>Security Settings</h2>
                    <p>Manage your password and security preferences</p>
                  </div>

                  <div className="security-options">
                    <div className="security-item">
                      <div className="security-info">
                        <Lock className="w-5 h-5" />
                        <div>
                          <h3>Change Password</h3>
                          <p>Update your account password</p>
                        </div>
                      </div>
                      <button className="btn btn-secondary btn-sm">
                        Change
                      </button>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <Shield className="w-5 h-5" />
                        <div>
                          <h3>Two-Factor Authentication</h3>
                          <p>Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <h2>Notification Preferences</h2>
                    <p>Choose what notifications you want to receive</p>
                  </div>

                  <div className="notification-options">
                    <div className="notification-item">
                      <div className="notification-info">
                        <h3>Booking Updates</h3>
                        <p>Get notified about your ride status</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <h3>Promotional Offers</h3>
                        <p>Receive special offers and discounts</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <h3>Driver Messages</h3>
                        <p>Messages from your assigned driver</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <h2>Payment Methods</h2>
                    <p>Manage your payment options</p>
                  </div>

                  <div className="payment-methods">
                    <div className="payment-item">
                      <div className="payment-info">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <h3>Credit/Debit Cards</h3>
                          <p>No cards added</p>
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Add Card
                      </button>
                    </div>

                    <div className="payment-item">
                      <div className="payment-info">
                        <div className="wallet-icon">💳</div>
                        <div>
                          <h3>Digital Wallet</h3>
                          <p>UPI, PayTM, PhonePe</p>
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: var(--neutral-50);
          padding: 2rem 0;
        }

        .profile-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-header {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .profile-avatar {
          position: relative;
        }

        .avatar-circle {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .avatar-upload {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 32px;
          height: 32px;
          background: var(--primary-600);
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: var(--transition);
        }

        .avatar-upload:hover {
          background: var(--primary-700);
        }

        .profile-info h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .profile-info p {
          color: var(--neutral-600);
          margin-bottom: 1rem;
        }

        .profile-stats {
          display: flex;
          gap: 2rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neutral-600);
          font-size: 0.875rem;
        }

        .profile-content {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .profile-tabs {
          display: flex;
          border-bottom: 1px solid var(--neutral-200);
        }

        .tab-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          color: var(--neutral-600);
          font-weight: 500;
        }

        .tab-button:hover {
          background: var(--neutral-50);
        }

        .tab-button.active {
          color: var(--primary-600);
          background: var(--primary-50);
          border-bottom: 2px solid var(--primary-600);
        }

        .tab-content {
          padding: 2.5rem;
        }

        .panel-header {
          margin-bottom: 2rem;
        }

        .panel-header h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .panel-header p {
          color: var(--neutral-600);
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--neutral-700);
          margin-bottom: 0.5rem;
        }

        .form-help {
          color: var(--neutral-500);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .security-options,
        .notification-options,
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .security-item,
        .notification-item,
        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: var(--neutral-50);
          border-radius: var(--radius-lg);
          border: 1px solid var(--neutral-200);
        }

        .security-info,
        .notification-info,
        .payment-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .security-info h3,
        .notification-info h3,
        .payment-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--neutral-900);
        }

        .security-info p,
        .notification-info p,
        .payment-info p {
          font-size: 0.875rem;
          color: var(--neutral-600);
          margin: 0;
        }

        .wallet-icon {
          font-size: 1.25rem;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--neutral-300);
          transition: var(--transition);
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: var(--transition);
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: var(--primary-600);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .profile-tabs {
            flex-direction: column;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .security-item,
          .notification-item,
          .payment-item {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;