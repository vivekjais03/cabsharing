import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookRide from './pages/BookRide';
import Login from './pages/Login';
import Register from './pages/Register';
import JoinCommunity from './pages/JoinCommunity';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import DriverDashboard from './pages/DriverDashboard';
import Support from './pages/Support';
import NotFound from './pages/NotFound';

// Styles
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/join-community" element={<JoinCommunity />} />
                
                {/* Protected Routes */}
                <Route path="/book-ride" element={
                  <ProtectedRoute>
                    <BookRide />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                } />
                <Route path="/support" element={<Support />} />
                
                {/* Driver Routes */}
                <Route path="/driver-dashboard" element={
                  <ProtectedRoute requiredRole="driver">
                    <DriverDashboard />
                  </ProtectedRoute>
                } />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;