import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  HelpCircle,
  Send,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      alert('Your message has been sent successfully!');
    }, 2000);
  };

  const supportOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Call us for immediate help',
      availability: '9 AM - 9 PM',
      action: 'Call Now',
      color: 'green'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response in 24 hours',
      action: 'Send Email',
      color: 'purple'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'You can book a ride by clicking the "Book Ride" button, entering your pickup and drop locations, selecting your preferred vehicle type, and confirming your booking.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking before the driver arrives. Go to "My Bookings" and click the cancel button. Cancellation charges may apply based on timing.'
    },
    {
      question: 'How are fares calculated?',
      answer: 'Fares are calculated based on distance, time, vehicle type, and current demand. You can see the estimated fare before confirming your booking.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept cash, credit/debit cards, UPI, and digital wallets like PayTM, PhonePe, and Google Pay.'
    },
    {
      question: 'How do I track my ride?',
      answer: 'Once your booking is confirmed, you can track your driver\'s location in real-time through the app. You\'ll also receive SMS updates.'
    },
    {
      question: 'What if I left something in the vehicle?',
      answer: 'Contact our support team immediately with your booking details. We\'ll help you connect with the driver to retrieve your lost items.'
    },
    {
      question: 'How do I rate my ride?',
      answer: 'After completing your ride, you\'ll receive a prompt to rate your experience. You can also rate rides later from your booking history.'
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without consent.'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="support-page">
      <div className="container">
        {/* Header */}
        <div className="support-header">
          <h1>How can we help you?</h1>
          <p>Get quick answers to your questions or contact our support team</p>
        </div>

        {/* Support Options */}
        <div className="support-options">
          {supportOptions.map((option, index) => (
            <div key={index} className={`support-card ${option.color}`}>
              <div className="support-icon">
                {option.icon}
              </div>
              <div className="support-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="availability">
                  <Clock className="w-4 h-4" />
                  <span>{option.availability}</span>
                </div>
              </div>
              <button className="btn btn-outline btn-sm">
                {option.action}
              </button>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="support-tabs">
          <button
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span>Contact Us</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <span>FAQ</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Contact Form */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <div className="contact-content">
                <div className="contact-info">
                  <h2>Send us a message</h2>
                  <p>Fill out the form and we'll get back to you as soon as possible</p>
                  
                  <div className="contact-details">
                    <div className="contact-item">
                      <Mail className="w-5 h-5" />
                      <div>
                        <h4>Email</h4>
                        <p>support@rideflow.com</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <Phone className="w-5 h-5" />
                      <div>
                        <h4>Phone</h4>
                        <p>+91 98765 43210</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <Clock className="w-5 h-5" />
                      <div>
                        <h4>Support Hours</h4>
                        <p>24/7 Available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Your full name"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <span className="form-error">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Your email address"
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
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                      {...register('subject', { required: 'Please select a subject' })}
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Issue</option>
                      <option value="payment">Payment Problem</option>
                      <option value="driver">Driver Feedback</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <span className="form-error">{errors.subject.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className={`form-input ${errors.message ? 'error' : ''}`}
                      rows="5"
                      placeholder="Describe your issue or question..."
                      {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                      <span className="form-error">{errors.message.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-search">
                  <Search className="w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                  />
                </div>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span>{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .support-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 0;
        }

        .support-header {
          text-align: center;
          margin-bottom: 4rem;
          background: white;
          padding: 4rem 2rem;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
        }

        .support-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
        }

        .support-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--neutral-900);
          position: relative;
          z-index: 1;
        }

        .support-header p {
          font-size: 1.25rem;
          color: var(--neutral-600);
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .support-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .support-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--neutral-200);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .support-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .support-card:hover::before {
          transform: scaleX(1);
        }

        .support-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-2xl);
        }

        .support-icon {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .support-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: iconShine 3s linear infinite;
        }

        @keyframes iconShine {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .support-card.blue .support-icon {
          background: var(--primary-500);
        }

        .support-card.green .support-icon {
          background: var(--success-500);
        }

        .support-card.purple .support-icon {
          background: #8b5cf6;
        }

        .support-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-900);
        }

        .support-content p {
          color: var(--neutral-600);
          margin-bottom: 1rem;
        }

        .availability {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neutral-500);
          font-size: 0.875rem;
        }

        .support-tabs {
          display: flex;
          background: white;
          border-radius: var(--radius-2xl);
          padding: 0.75rem;
          margin-bottom: 3rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--neutral-200);
        }

        .tab-button {
          flex: 1;
          padding: 1.25rem 2rem;
          background: none;
          border: none;
          border-radius: var(--radius-xl);
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: var(--neutral-600);
          position: relative;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: var(--radius-xl);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tab-button.active::before {
          opacity: 1;
        }

        .tab-button.active {
          color: white;
          transform: scale(1.02);
        }

        .tab-button span {
          position: relative;
          z-index: 1;
        }

        .contact-section {
          background: white;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-2xl);
          overflow: hidden;
          border: 1px solid var(--neutral-200);
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .contact-info {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700), #8b5cf6);
          color: white;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .contact-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        .contact-info h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: white;
        }

        .contact-info p {
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-item h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: white;
        }

        .contact-item p {
          margin: 0;
          opacity: 0.8;
        }

        .contact-form {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .faq-section {
          background: white;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-2xl);
          padding: 3rem;
          border: 1px solid var(--neutral-200);
        }

        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .faq-header h2 {
          font-size: 1.5rem;
          color: var(--neutral-900);
        }

        .faq-search {
          position: relative;
          width: 300px;
        }

        .faq-search svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-400);
        }

        .faq-search input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: var(--primary-300);
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
          position: relative;
        }

        .faq-question::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary-50), var(--secondary-50));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .faq-question:hover::before {
          opacity: 1;
        }

        .faq-question:hover {
          transform: translateX(4px);
        }

        .faq-question span {
          flex: 1;
          font-weight: 500;
          color: var(--neutral-800);
        }

        .faq-answer {
          padding: 0 2rem 2rem 5rem;
          color: var(--neutral-600);
          line-height: 1.7;
          border-top: 1px solid var(--neutral-200);
          background: linear-gradient(135deg, var(--neutral-25), var(--primary-25));
          animation: fadeInAnswer 0.3s ease-out;
        }

        @keyframes fadeInAnswer {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          .support-options {
            grid-template-columns: 1fr;
          }

          .contact-content {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .faq-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .faq-search {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Support;