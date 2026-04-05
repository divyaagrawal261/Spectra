import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { init } from './script.js';

export default function Home() {
  useEffect(() => {
    // Run the initialization scripts after component mount
    init();
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="logo">Spectra</Link>
            <span className="nav-divider">|</span>
            <span className="nav-section">Engagement Intelligence Platform</span>
          </div>
          <div className="nav-right">
            <Link to="/docs" className="nav-link">Documentation</Link>
            <a href="https://spectra.divyag.tech" className="nav-link-button">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Developer-First Analytics & User Behavior Platform.</h1>
          <p className="hero-description">
            Instrument your app with a lightweight script or SDK, track user interactions like clicks, scrolls, and hovers, and get real-time insights into user engagement — all without performance overhead.
          </p>
          <Link to="/docs" className="hero-cta">
            <span>Explore the Documentation</span>
          </Link>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="section schema-section">
        <div className="container">
          <h2 className="section-title">
            Define your KPIs in code and get a full javascript backend and admin panel instantly!
          </h2>
          <p className="section-description">
            Skip the hassle of building your own admin panel or using any paid service. With Spectra, access a comprehensive, open-source solution that includes built-in authentication, access control, and more, all without the need for additional frameworks or tools.
          </p>
          <Link to="/docs" className="section-link">
            <span>Read the Documentation</span>
          </Link>
        </div>
      </section>

      {/* Feature Details */}
      <section className="section code-features-section">
        <div className="container">
          <div className="code-feature-item">
            <div className="code-feature-content">
              <span className="feature-number">01</span>
              <h3 className="code-feature-title">Unapologeticaly code first</h3>
              <p className="code-feature-description">
                 Central to its functionality, the Spectra config efficiently scaffolds data storage, custom React components, hook logic, and more, all with the added benefit of unmatched productivity.
              </p>
            </div>
          </div>

          <div className="code-feature-item">
            <div className="code-feature-content">
              <span className="feature-number">02</span>
              <h3 className="code-feature-title">Behavioral Analytics</h3>
              <p className="code-feature-description">
                  Gain valuable insights into navigation patterns and user interaction flows to enhance retention strategies.
              </p>
            </div>
          </div>

          <div className="code-feature-item">
            <div className="code-feature-content">
              <span className="feature-number">03</span>
              <h3 className="code-feature-title">Secure and Privacy-Conscious Data Collection</h3>
              <p className="code-feature-description">
                  Spectra prioritizes data integrity and privacy compliance while delivering meaningful engagement intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
              Elevate your understanding of user engagement.
          </h2>
          <p className="cta-subtitle">
              Seamless integration. Advanced analytics. Actionable intelligence.
          </p>

          <div className="cta-links">
            <Link to="/docs" className="cta-button">View Documentation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
