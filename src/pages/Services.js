import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Truck, Crown, Clock, Shield, Star, MapPin, CreditCard } from 'lucide-react';

const Services = () => {
  const { isAuthenticated } = useAuth();
  const services = [
    {
      icon: <Car className="w-12 h-12" />,
      title: 'Standard Rides',
      price: 'Starting ₹8/km',
      description: 'Comfortable and affordable rides for your daily commute.',
      features: ['AC Vehicles', 'Professional Drivers', 'Real-time Tracking', 'Safe & Clean']
    },
    {
      icon: <Crown className="w-12 h-12" />,
      title: 'Premium Rides',
      price: 'Starting ₹15/km',
      description: 'Luxury vehicles for a premium travel experience.',
      features: ['Luxury Cars', 'Premium Interiors', 'Complimentary Water', 'Priority Support']
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'SUV Rides',
      price: 'Starting ₹20/km',
      description: 'Spacious SUVs perfect for groups and families.',
      features: ['7-Seater SUVs', 'Extra Luggage Space', 'Group Travel', 'Enhanced Comfort']
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Availability',
      description: 'Book rides anytime, anywhere with our round-the-clock service.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safety First',
      description: 'Verified drivers, GPS tracking, and emergency support for your safety.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Quality Assured',
      description: 'Well-maintained vehicles and professional drivers for the best experience.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Flexible Payment',
      description: 'Multiple payment options including cash, cards, and digital wallets.'
    }
  ];

  const cities = [
    { name: 'Mumbai', rides: '15K+' },
    { name: 'Delhi', rides: '12K+' },
    { name: 'Bangalore', rides: '10K+' },
    { name: 'Pune', rides: '8K+' },
    { name: 'Hyderabad', rides: '6K+' }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Premium Transportation
              <span className="text-primary"> Services</span>
            </h1>
            <p className="hero-description">
              Experience the best in class transportation with our range of premium 
              services designed to meet all your travel needs.
            </p>
            <div className="hero-actions">
              <Link to="/book-ride" className="btn btn-primary btn-lg">
                Book a Ride Now
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-secondary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/join-community" className="btn btn-secondary btn-lg">
                  Join RideFlow
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Ride</h2>
            <p>Select from our range of vehicles to suit your needs and budget</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <div className="service-price">{service.price}</div>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/book-ride" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose RideFlow?</h2>
            <p>Experience the difference with our premium features</p>
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

      {/* Cities Section */}
      <section className="cities-section">
        <div className="container">
          <div className="cities-content">
            <div className="cities-text">
              <h2>Available in Major Cities</h2>
              <p>
                RideFlow is expanding rapidly across India. We're currently serving 
                in 5 major cities with thousands of satisfied customers.
              </p>
              <Link to="/about" className="btn btn-outline">
                Learn More About Us
              </Link>
            </div>
            
            <div className="cities-grid">
              {cities.map((city, index) => (
                <div key={index} className="city-card">
                  <MapPin className="w-6 h-6 text-primary-500" />
                  <div className="city-info">
                    <h4>{city.name}</h4>
                    <span>{city.rides} rides completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Premium Transportation?</h2>
            <p>Join thousands of satisfied customers and book your first ride today</p>
            <div className="cta-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/book-ride" className="btn btn-primary btn-lg">
                    Book Your Ride
                  </Link>
                  <Link to="/dashboard" className="btn btn-outline btn-lg">
                    View Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/join-community" className="btn btn-primary btn-lg">
                    Get Started
                  </Link>
                  <Link to="/book-ride" className="btn btn-outline btn-lg">
                    Book a Ride
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
        }

        .hero {
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .services-section {
          padding: 6rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--neutral-600);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .service-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-2xl);
          text-align: center;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--neutral-200);
          transition: var(--transition);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          background: var(--primary-50);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin: 0 auto 1.5rem;
        }

        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .service-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-600);
          margin-bottom: 1rem;
        }

        .service-description {
          color: var(--neutral-600);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .service-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .feature-check {
          color: var(--success-500);
          font-weight: 700;
        }

        .features-section {
          padding: 6rem 0;
          background: var(--neutral-50);
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
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--primary-50);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .feature-card p {
          color: var(--neutral-600);
          line-height: 1.6;
        }

        .cities-section {
          padding: 6rem 0;
          background: white;
        }

        .cities-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .cities-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .cities-text p {
          font-size: 1.125rem;
          color: var(--neutral-600);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .cities-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .city-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--neutral-50);
          border-radius: var(--radius-lg);
          transition: var(--transition);
        }

        .city-card:hover {
          background: var(--primary-50);
        }

        .city-info h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neutral-900);
          margin-bottom: 0.25rem;
        }

        .city-info span {
          font-size: 0.875rem;
          color: var(--neutral-500);
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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cities-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
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

export default Services;