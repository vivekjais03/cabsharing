import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Clock, Users, Award, MapPin, Heart } from 'lucide-react';

const About = () => {
  const { isAuthenticated } = useAuth();
  const teamMembers = [
    {
      name: 'Vivek Jaiswal',
      title: 'CEO & Founder',
      image: '/vivek.png',
      description: 'Visionary leader driving innovation in transportation'
    },
    {
      name: 'Nikhil Gupta',
      title: 'Chief Technology Officer',
      image: '/nikhil.png',
      description: 'Tech innovator building scalable solutions'
    },
    {
      name: 'Chinu Jain',
      title: 'Chief Operating Officer',
      image: '/chinu.jpg',
      description: 'Operations expert ensuring seamless service'
    },
    {
      name: 'Aakriti Mussadi',
      title: 'Customer Success Manager',
      image: '/aakriti.png',
      description: 'Dedicated to exceptional customer experiences'
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safety First',
      description: 'Your safety is our top priority with verified drivers and real-time tracking.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Reliability',
      description: 'Dependable service you can count on, 24/7 availability for your convenience.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Care',
      description: 'Exceptional customer service with personalized attention to your needs.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Committed to delivering premium quality in every aspect of our service.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Active Drivers' },
    { number: '5', label: 'Cities Served' },
    { number: '4.8⭐', label: 'Average Rating' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                About <span className="text-primary">CabRide</span>
              </h1>
              <p className="hero-description">
                We're revolutionizing urban transportation by connecting riders with 
                professional drivers through cutting-edge technology. Our mission is to 
                make every journey safe, comfortable, and memorable.
              </p>
              <div className="hero-actions">
                {isAuthenticated ? (
                  <>
                    <Link to="/book-ride" className="btn btn-primary btn-lg">
                      Book a Ride
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary btn-lg">
                      Go to Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/join-community" className="btn btn-primary btn-lg">
                      Join Our Community
                    </Link>
                    <Link to="/services" className="btn btn-secondary btn-lg">
                      Our Services
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-visual">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To transform urban mobility by providing safe, reliable, and premium 
                transportation services that connect people to opportunities and experiences. 
                We believe transportation should be more than just getting from point A to B.
              </p>
            </div>
            <div className="mission-visual">
              <MapPin className="w-24 h-24 text-primary-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind CabRide's success</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={
                        member.name === 'Chinu Jain' ? 'chinu-image' : 
                        member.name === 'Vivek Jaiswal' ? 'vivek-image' :
                        member.name === 'Nikhil Gupta' ? 'nikhil-image' :
                        member.name === 'Aakriti Mussadi' ? 'aakriti-image' : ''
                      }
                    />
                  ) : (
                    <div className="image-placeholder">
                      <Users className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-title">{member.title}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience CabRide?</h2>
            <p>Join thousands of satisfied customers who trust us for their transportation needs</p>
            <div className="cta-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/book-ride" className="btn btn-primary btn-lg">
                    Book Your Next Ride
                  </Link>
                  <Link to="/services" className="btn btn-outline btn-lg">
                    Explore Services
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/join-community" className="btn btn-primary btn-lg">
                    Get Started Today
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
        .about-page {
          min-height: 100vh;
        }

        .hero {
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
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
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--neutral-200);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-600);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--neutral-600);
          font-weight: 500;
        }

        .mission-section {
          padding: 6rem 0;
          background: white;
        }

        .mission-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .mission-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--neutral-900);
        }

        .mission-text p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--neutral-600);
        }

        .mission-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--primary-50);
          border-radius: var(--radius-2xl);
          padding: 3rem;
        }

        .values-section {
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
          color: var(--neutral-900);
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--neutral-600);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .value-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          text-align: center;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--neutral-200);
          transition: var(--transition);
        }

        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .value-icon {
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

        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
        }

        .value-card p {
          color: var(--neutral-600);
          line-height: 1.6;
        }

        .team-section {
          padding: 6rem 0;
          background: white;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .team-card {
          background: var(--neutral-50);
          padding: 2rem;
          border-radius: var(--radius-xl);
          text-align: center;
          transition: var(--transition);
        }

        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .team-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1.5rem;
          background: var(--neutral-200);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform: scale(1.2);
        }

        .team-image img.chinu-image {
          transform: scale(1.0);
        }

        .image-placeholder {
          color: var(--neutral-400);
        }

        .team-image img.vivek-image {
          transform: scale(1.3);
        }

        .team-image img.nikhil-image {
          transform: scale(1.1);
          object-position: center center;
        }

        .team-image img.aakriti-image {
          transform: scale(1.1);
          object-position: center 30%;
        }

        .team-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .team-title {
          color: var(--primary-600);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .team-description {
          color: var(--neutral-600);
          font-size: 0.875rem;
          line-height: 1.5;
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
          .hero-content,
          .mission-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
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

export default About;