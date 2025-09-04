import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Shield, Clock, Star, MapPin, Zap } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safe & Secure',
      description: 'Verified drivers, real-time tracking, and 24/7 support for your peace of mind.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Quick Booking',
      description: 'Book your ride in under 30 seconds with our streamlined booking process.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Well-maintained vehicles and professional drivers for a comfortable journey.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Rides',
      description: 'Get matched with nearby drivers instantly and reach your destination faster.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Active Drivers' },
    { number: '5', label: 'Cities' },
    { number: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Your Journey,
                <span className="text-primary"> Redefined</span>
              </h1>
              <p className="hero-description">
                Experience premium transportation with CabRide. Safe, reliable, and 
                comfortable rides at your fingertips. Book now and travel in style.
              </p>
              <div className="hero-actions">
                {isAuthenticated ? (
                  <Link to="/book-ride" className="btn btn-primary btn-lg">
                    Book Your Ride
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/about" className="btn btn-secondary btn-lg">
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="card-header">
                  <div className="status-dot"></div>
                  <span>Live Tracking</span>
                </div>
                <div className="route-info">
                  <div className="location">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span>Your Location</span>
                  </div>
                  <div className="route-line"></div>
                  <div className="location">
                    <MapPin className="w-4 h-4 text-secondary-500" />
                    <span>Destination</span>
                  </div>
                </div>
                <div className="ride-options">
                  <div className="option active">
                    <span>🚗 Standard</span>
                    <span>₹120</span>
                  </div>
                  <div className="option">
                    <span>🚙 Premium</span>
                    <span>₹180</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose CabRide?</h2>
            <p>Experience the difference with our premium transportation service</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of satisfied customers who trust CabRide for their daily commute</p>
            <div className="cta-actions">
              {isAuthenticated ? (
                <Link to="/book-ride" className="btn btn-primary btn-lg">
                  Book a Ride Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Sign Up Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Already have an account?
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 40%);
          animation: backgroundFloat 20s ease-in-out infinite;
        }

        .hero::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.03) 100px,
              rgba(255, 255, 255, 0.03) 102px
            );
          animation: patternMove 30s linear infinite;
        }

        @keyframes backgroundFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @keyframes patternMove {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--neutral-600);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .hero-card {
          background: white;
          border-radius: var(--radius-2xl);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
          width: 100%;
          max-width: 350px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          color: var(--neutral-700);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--success-500);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .route-info {
          margin-bottom: 1.5rem;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          color: var(--neutral-600);
        }

        .route-line {
          width: 2px;
          height: 20px;
          background: var(--neutral-300);
          margin-left: 0.5rem;
        }

        .ride-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .option {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--neutral-200);
          transition: var(--transition);
        }

        .option.active {
          background: var(--primary-50);
          border-color: var(--primary-500);
          color: var(--primary-700);
        }

        .stats-section {
          padding: 4rem 0;
          background: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem 1rem;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary-600);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--neutral-600);
          font-weight: 500;
        }

        .features-section {
          padding: 6rem 0;
          background: var(--neutral-50);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--neutral-600);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--neutral-200);
          transition: var(--transition);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--primary-50);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .cta-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .cta-content p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;