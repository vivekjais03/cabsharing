import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Users, Star, Shield, Gift, ArrowRight, CheckCircle } from 'lucide-react';

const JoinCommunity = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('rider');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const plans = [
    {
      id: 'rider',
      title: 'Rider',
      icon: <Users className="w-8 h-8" />,
      price: 'Free',
      description: 'Perfect for daily commuters',
      benefits: [
        'Book unlimited rides',
        'Real-time tracking',
        'Multiple payment options',
        '24/7 customer support',
        'Ride history & receipts'
      ],
      color: 'blue'
    },
    {
      id: 'premium',
      title: 'Premium Rider',
      icon: <Star className="w-8 h-8" />,
      price: '₹99/month',
      description: 'Enhanced experience with perks',
      benefits: [
        'All Rider benefits',
        'Priority booking',
        '10% discount on all rides',
        'Premium vehicle access',
        'Dedicated support line',
        'Exclusive offers & rewards'
      ],
      color: 'gold',
      popular: true
    },
    {
      id: 'driver',
      title: 'Driver Partner',
      icon: <Shield className="w-8 h-8" />,
      price: 'Earn Money',
      description: 'Join as a professional driver',
      benefits: [
        'Flexible working hours',
        'Competitive earnings',
        'Weekly payouts',
        'Insurance coverage',
        'Driver training program',
        'Performance bonuses'
      ],
      color: 'green'
    }
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    const userData = {
      ...data,
      role: selectedPlan === 'driver' ? 'driver' : 'user',
      membershipType: selectedPlan
    };

    const result = await registerUser(userData);
    
    if (result.success) {
      setCurrentStep(4); // Success step
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
    setIsLoading(false);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="join-community-page">
      <div className="community-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
              >
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div 
            className="progress-line"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>

        {/* Step 1: Welcome & Plan Selection */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="welcome-header">
              <div className="welcome-icon">
                <Gift className="w-16 h-16" />
              </div>
              <h1>Welcome to RideFlow Community!</h1>
              <p>Choose your membership plan and unlock exclusive benefits</p>
            </div>

            <div className="plans-grid">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.color}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  
                  <div className="plan-header">
                    <div className="plan-icon">{plan.icon}</div>
                    <h3>{plan.title}</h3>
                    <div className="plan-price">{plan.price}</div>
                    <p>{plan.description}</p>
                  </div>

                  <div className="plan-benefits">
                    {plan.benefits.map((benefit, index) => (
                      <div key={index} className="benefit-item">
                        <CheckCircle className="w-4 h-4" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="plan-action">
                    {selectedPlan === plan.id ? (
                      <span className="selected-indicator">Selected ✓</span>
                    ) : (
                      <span>Select Plan</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={nextStep} className="btn btn-primary btn-lg continue-btn">
              Continue with {plans.find(p => p.id === selectedPlan)?.title}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-header">
              <h2>Tell us about yourself</h2>
              <p>We need some basic information to create your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="community-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <span className="form-error">{errors.firstName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <span className="form-error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  })}
                />
                {errors.phone && (
                  <span className="form-error">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Create Password</label>
                <input
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a secure password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="btn btn-secondary">
                  Back
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Join Community'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {currentStep === 4 && (
          <div className="step-content success-step">
            <div className="success-animation">
              <div className="success-circle">
                <CheckCircle className="w-16 h-16" />
              </div>
            </div>
            
            <h2>Welcome to RideFlow Community! 🎉</h2>
            <p>Your account has been created successfully. You're now part of our amazing community!</p>
            
            <div className="success-benefits">
              <div className="benefit-card">
                <Gift className="w-6 h-6" />
                <span>Welcome bonus activated</span>
              </div>
              <div className="benefit-card">
                <Star className="w-6 h-6" />
                <span>Premium features unlocked</span>
              </div>
              <div className="benefit-card">
                <Shield className="w-6 h-6" />
                <span>Account secured</span>
              </div>
            </div>

            <p className="redirect-message">Redirecting to your dashboard...</p>
          </div>
        )}

        {/* Login Link */}
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .join-community-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .community-container {
          max-width: 1000px;
          width: 100%;
          background: white;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-2xl);
          overflow: hidden;
        }

        .progress-bar {
          position: relative;
          padding: 2rem;
          background: var(--neutral-50);
          border-bottom: 1px solid var(--neutral-200);
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 4rem;
          position: relative;
          z-index: 2;
        }

        .progress-step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--neutral-300);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          transition: var(--transition);
        }

        .progress-step.active {
          background: var(--primary-600);
        }

        .progress-line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 4px;
          background: var(--primary-600);
          transition: width 0.5s ease;
          z-index: 1;
        }

        .step-content {
          padding: 3rem;
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .welcome-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 2rem;
        }

        .welcome-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .welcome-header p {
          font-size: 1.125rem;
          color: var(--neutral-600);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .plan-card {
          background: white;
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: 2rem;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .plan-card.selected {
          border-color: var(--primary-500);
          background: var(--primary-50);
        }

        .plan-card.blue.selected {
          border-color: var(--primary-500);
        }

        .plan-card.gold.selected {
          border-color: #f59e0b;
        }

        .plan-card.green.selected {
          border-color: var(--success-500);
        }

        .popular-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .plan-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .plan-icon {
          width: 60px;
          height: 60px;
          background: var(--primary-50);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin: 0 auto 1rem;
        }

        .plan-card.gold .plan-icon {
          background: #fef3c7;
          color: #d97706;
        }

        .plan-card.green .plan-icon {
          background: #dcfce7;
          color: var(--success-500);
        }

        .plan-header h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .plan-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-600);
          margin-bottom: 0.5rem;
        }

        .plan-card.gold .plan-price {
          color: #d97706;
        }

        .plan-card.green .plan-price {
          color: var(--success-500);
        }

        .plan-benefits {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
        }

        .benefit-item svg {
          color: var(--success-500);
          flex-shrink: 0;
        }

        .plan-action {
          text-align: center;
          font-weight: 600;
          color: var(--primary-600);
        }

        .selected-indicator {
          color: var(--success-500);
        }

        .continue-btn {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .step-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .step-header h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .community-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .success-step {
          text-align: center;
        }

        .success-animation {
          margin-bottom: 2rem;
        }

        .success-circle {
          width: 100px;
          height: 100px;
          background: var(--success-500);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto;
          animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .success-benefits {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
        }

        .benefit-card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--success-50);
          border-radius: var(--radius-lg);
          color: var(--success-700);
          font-weight: 500;
        }

        .redirect-message {
          color: var(--neutral-500);
          font-style: italic;
          margin-top: 2rem;
        }

        .auth-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid var(--neutral-200);
          background: var(--neutral-50);
        }

        .auth-link {
          color: var(--primary-600);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .success-benefits {
            flex-direction: column;
            align-items: center;
          }

          .progress-steps {
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default JoinCommunity;