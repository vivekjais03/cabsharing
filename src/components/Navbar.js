import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🚗</div>
            <span className="logo-text">CabRide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <Link to="/book-ride" className="btn btn-primary btn-sm">
                  Book Ride
                </Link>
                <div className="user-menu" ref={userMenuRef}>
                  <button
                    className="user-avatar"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User size={20} />
                    <span>{user?.name?.charAt(0)}</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-email">{user?.email}</p>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <User size={16} />
                        Dashboard
                      </Link>
                      <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <Settings size={16} />
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mobile-auth">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/book-ride" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                    Book Ride
                  </Link>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--neutral-200);
          z-index: 1000;
          height: 80px;
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--neutral-900);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-600);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--neutral-600);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          transition: var(--transition);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-600);
          background: rgba(59, 130, 246, 0.1);
        }

        .nav-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .auth-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .user-menu {
          position: relative;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary-500);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          position: relative;
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
          min-width: 200px;
          margin-top: 0.5rem;
          z-index: 1001;
        }

        .user-info {
          padding: 1rem;
          border-bottom: 1px solid var(--neutral-200);
        }

        .user-name {
          font-weight: 600;
          color: var(--neutral-900);
          margin: 0;
        }

        .user-email {
          font-size: 0.875rem;
          color: var(--neutral-500);
          margin: 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--neutral-700);
          border: none;
          background: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .dropdown-item:hover {
          background: var(--neutral-50);
          color: var(--primary-600);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--neutral-700);
        }

        .mobile-menu {
          display: none;
          padding: 1rem 0;
          border-top: 1px solid var(--neutral-200);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .mobile-nav-link {
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--neutral-600);
          border-radius: var(--radius-md);
          transition: var(--transition);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: var(--neutral-100);
          color: var(--primary-600);
        }

        .mobile-auth {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .auth-buttons {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            display: block;
          }

          .logo-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;