import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './register';
import Login from './login';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setShowModal(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Route for the home page */}
          <Route
            path="/"
            element={
              <div>
                {/* Main layout components */}
                <Header />
                <HeroSection setShowModal={setShowModal} />
                {showModal && <Modal setShowModal={setShowModal} activeFeature={activeFeature} />}
                <Features onFeatureClick={handleFeatureClick} />
                <Footer />
              </div>
            }
          />
          
          {/* Register Route, Displays only Register form without App Layout */}
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

const Header = () => (
  <header className="header">
    <nav>
      <h1 className="logo">
        <img src="/logo.jpg" alt="LearnFlow Logo" style={{ height: '40px' }} />
      </h1>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <button
            className="cta-button register-btn"
            onClick={() => window.open('/register', '_blank')} // Open the register page in a new tab
            aria-label="Open Register Page"
          >
            Register
          </button>
        </li>
        <li>
        <button
          className="cta-button register-btn"
          onClick={() => window.open('/login', '_blank')}
          aria-label="Open login Page"
        >
         Login
        </button>

        </li>
      </ul>
    </nav>
  </header>
);

const HeroSection = ({ setShowModal }) => (
  <section className="hero">
    <div className="hero-content">
      <h1>Welcome to LearnFlow</h1>
      <p>Empowering your learning journey with AI-driven personalized paths.</p>
      <div className="cta">
        <button 
          className="cta-button" 
          onClick={() => alert('Navigating to Guided Learning...')}
          aria-label="Navigate to Guided Learning"
        >
          I Know My Goal
        </button>
        <button 
          className="cta-button" 
          onClick={() => setShowModal(true)}
          aria-label="Open Guide Me Modal"
        >
          Guide Me
        </button>
      </div>
    </div>
    <div className="hero-image">
      <img src="/personscreen.png" alt="Learning Illustration" />
    </div>
  </section>
);

const Modal = ({ setShowModal, activeFeature }) => (
  <div className="modal" role="dialog" aria-modal="true">
    <div className="modal-content">
      <h2>{activeFeature ? activeFeature.title : 'Explore Our Features'}</h2>
      <p>
        {activeFeature 
          ? `Learn more about ${activeFeature.title}: ${activeFeature.description}` 
          : 'Take a quick assessment, discover your strengths, and let us guide you to success!'}
      </p>
      <button 
        className="close-button" 
        onClick={() => setShowModal(false)}
        aria-label="Close Modal"
      >
        Close
      </button>
    </div>
  </div>
);

const Features = ({ onFeatureClick }) => (
  <section id="features" className="features">
    <h2>Features</h2>
    <div className="feature-grid">
      {[
        {
          title: 'Guided Learning',
          description: 'Access curated resources and let our AI Teacher clear your doubts instantly.',
        },
        {
          title: 'Unguided Path',
          description: 'Take an assessment to identify your strengths and explore personalized suggestions.',
        },
        {
          title: 'AI-Powered Teacher',
          description: 'Get 24/7 assistance from our AI-powered teacher for all your learning needs.',
        },
        {
          title: 'Performance Tracking',
          description: 'Track your performance and progress with detailed analytics and insights.',
        },
      ].map((feature, index) => (
        <FeatureCard 
          key={index} 
          title={feature.title} 
          description={feature.description} 
          onClick={() => onFeatureClick(feature)} 
        />
      ))}
    </div>
  </section>
);

const FeatureCard = ({ title, description, onClick }) => (
  <div className="feature-card" tabIndex="0" role="article" onClick={onClick} onKeyPress={(e) => e.key === 'Enter' && onClick()}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Footer = () => (
  <footer id="contact" className="footer">
    <p>&copy; 2024 LearnFlow. Transforming education, one learner at a time.</p>
    <ul className="footer-links">
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms of Service</a></li>
      <li>< a href="#">Contact Us</a></li>
    </ul>
  </footer>
);

export default App;