import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styleDocumentation.css';

export default function Documentation() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Add active class to sidebar logic if needed
    const allowedLinks = [
      "#engagement-intelligence", "#precision-analytics", "#secure-architecture",
      "#enterprise-ready", "#use-cases", "#choosing-spectra",
      "#when-not-ideal", "#quick-setup"
    ];

    const handleClick = (e) => {
      const target = e.currentTarget.getAttribute("href");
      if (!allowedLinks.includes(target) && target.startsWith('#')) {
        e.preventDefault();
        setModalOpen(true);
      }
    };

    const links = document.querySelectorAll(".toc-link");
    links.forEach(link => link.addEventListener("click", handleClick));

    return () => {
      links.forEach(link => link.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <Link to="/" className="logo-text" style={{textDecoration: 'none', color: 'inherit'}}>Spectra</Link>
          </div>
        </div>

        <div className="header-center">
          <nav className="main-nav">
          </nav>
        </div>

        <div className="header-right">
          <button><a href="https://spectra.divyag.tech" className="btn-primary">Create Project</a></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" id="mainContent">
        <div className="content-wrapper">
          <article className="article">
            <h1 className="page-title">What is Spectra?</h1>

            <p className="lead-text">
              <strong>Spectra is an advanced Website Engagement Intelligence Platform.</strong> 
              It enables organizations to measure, analyze, and optimize user engagement and behavioral interaction across digital properties.
            </p>

            <ul className="feature-list">
              <li>Real-time monitoring of user engagement and session duration</li>
              <li>Comprehensive analytics dashboard for engagement insights</li>
              <li>Page-level attention analysis to identify high-performance content</li>
              <li>Secure data processing aligned with privacy-first principles</li>
              <li>Customizable reporting and exportable performance metrics</li>
              <li>Scalable infrastructure suitable for startups and enterprises alike</li>
            </ul>

            <section className="content-section">
              <h2 id="engagement-intelligence">Engagement Intelligence</h2>
              <p>
                Spectra transforms raw user activity into refined, actionable intelligence. 
                By accurately measuring active presence rather than superficial visits, 
                Spectra provides a deeper understanding of how users truly engage with your platform.
              </p>
            </section>

            <section className="content-section">
              <h2 id="precision-analytics">Precision Analytics</h2>
              <p>
                Through advanced behavioral tracking methodologies, Spectra calculates 
                average session duration, time-on-page metrics, and engagement trends with exceptional precision. 
                These insights empower leadership teams to make informed, data-driven decisions.
              </p>
            </section>

            <section className="content-section">
              <h2 id="secure-architecture">Secure & Privacy-Conscious Architecture</h2>
              <p>
                Spectra is built with a privacy-centric philosophy. 
                Data integrity, transparency, and regulatory compliance remain foundational pillars of the platform. 
                Organizations retain full ownership and visibility over their analytics infrastructure.
              </p>
            </section>

            <section className="content-section">
              <h2 id="enterprise-ready">Enterprise-Ready Infrastructure</h2>
              <p>
                Designed for scalability, Spectra seamlessly supports high-traffic environments, 
                multi-domain deployments, and enterprise-grade reporting requirements. 
                From emerging startups to global enterprises, Spectra adapts to your operational scale.
              </p>
            </section>

            <section className="content-section">
              <h2 id="use-cases">Use Cases</h2>
              <p>
                Spectra serves a broad spectrum of industries where understanding user engagement 
                is critical to performance optimization and strategic growth.
              </p>

              <h3>Digital Platforms & SaaS Applications</h3>
              <p>
                Measure how users interact with features, evaluate retention metrics, 
                and refine product experiences based on authentic behavioral data.
              </p>

              <h3>Content & Media Websites</h3>
              <p>
                Identify which articles, resources, or media assets sustain audience attention 
                and optimize editorial strategy accordingly.
              </p>

              <h3>E-commerce & Online Services</h3>
              <p>
                Understand customer browsing duration, engagement with product pages, 
                and optimize the user journey to enhance conversions.
              </p>
            </section>

            <section className="content-section">
              <h2 id="choosing-spectra">Why Choose Spectra?</h2>
              <ul>
                <li>If precise engagement metrics are central to your growth strategy</li>
                <li>If you require full transparency and ownership of your analytics data</li>
                <li>If you seek a scalable solution adaptable to enterprise demands</li>
                <li>If your organization values refined, data-driven decision making</li>
              </ul>
            </section>

            <section className="content-section">
              <h2 id="when-not-ideal">When Spectra May Not Be Necessary</h2>
              <ul>
                <li>If your project does not require behavioral analytics</li>
                <li>If basic traffic statistics sufficiently meet your operational needs</li>
                <li>If engagement insights are not a strategic priority</li>
              </ul>
              <p>
                For organizations committed to excellence through measurable engagement, 
                Spectra represents a definitive competitive advantage.
              </p>
            </section>

            <section className="content-section" id="quick-setup">
              <h2>Quick Setup</h2>
              <p>
                Integrating Spectra takes less than a minute.
                Simply paste the script below into your website's index.html before the closing
                <code>&lt;/body&gt;</code> tag.
              </p>
              <pre className="code-block">
{`<script src="https://res.cloudinary.com/dwbshru0j/raw/upload/v1770797882/engage.min_wkp4vb.js"></script>`}
              </pre>
              <p>
                Next, register your project on the Spectra dashboard.
                You will receive a unique <strong>API Key</strong>.
              </p>
              <p>
                Add the following initialization snippet in your website:
              </p>
              <pre className="code-block">
{`<script>
  EngageTrack.init({
    apiKey: "YOUR_PROJECT_API_KEY",
    autoTrack: { click: true, scroll: true, hover: true }
  });
</script>`}
              </pre>
              <p>
                That’s it. Spectra will immediately begin tracking engagement metrics
                such as clicks, scroll depth, hover interactions, and session activity.
              </p>
            </section>
          </article>

          <aside className="table-of-contents">
            <div className="toc-title">ON THIS PAGE</div>
            <nav className="toc-nav">
              <a href="#engagement-intelligence" className="toc-link">Engagement Intelligence</a>
              <a href="#precision-analytics" className="toc-link">Precision Analytics</a>
              <a href="#secure-architecture" className="toc-link">Secure Architecture</a>
              <a href="#enterprise-ready" className="toc-link">Enterprise Infrastructure</a>
              <a href="#use-cases" className="toc-link">Use Cases</a>
              <a href="#choosing-spectra" className="toc-link">Why Choose Spectra?</a>
              <a href="#when-not-ideal" className="toc-link">When Spectra May Not Be Necessary</a>
              <a href="#quick-setup" className="toc-link"><b>Quick Setup</b></a>
            </nav>
          </aside>
        </div>
      </main>

      {/* In Progress Modal */}
      {modalOpen && (
        <div id="comingSoonModal" className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <h3>🚧 Feature In Progress</h3>
            <p>This section is currently under development.</p>
            <p>It may be released in a future update of Spectra.</p>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
