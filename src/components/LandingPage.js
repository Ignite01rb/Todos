import React from 'react';

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      title: 'Smart Analytics Dashboard',
      description: 'Track completion rates, tasks distribution, and productivity metrics via interactive animated progress wheels.',
      icon: 'M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z'
    },
    {
      title: 'Nested Subtasks & Notes',
      description: 'Break complex workflows down into structured step-by-step checklists with automated completion progress bars.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    },
    {
      title: 'Color-Coded Due Dates',
      description: 'Stay ahead of deadlines with smart urgency tags that automatically flag overdue, today, and upcoming tasks.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      title: 'Aesthetic Accent Themes',
      description: 'Personalize your hub with light/dark interfaces and 6 dynamic neon accent color schemes (indigo, emerald, violet, etc.).',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
    }
  ];

  return (
    <div className="landing-container animate-fade-in">
      {/* Navigation Header */}
      <header className="landing-header">
        <div className="brand">
          <div className="brand-logo">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2>Taskify</h2>
        </div>
        <div className="landing-nav-actions">
          <button className="landing-nav-link" onClick={() => onNavigate('login')}>
            Sign In
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('register')}>
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">
          <span>✨ Discover the all-new Taskify v2.0</span>
        </div>
        <h1 className="hero-title">
          Organize your life.<br />
          <span className="gradient-text">Achieve your goals.</span>
        </h1>
        <p className="hero-subtitle">
          Taskify is the ultimate workspace for managing your todos, tracking step checklist progress, and observing daily trends. Built with stunning glassmorphic design and customizable color environments.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={() => onNavigate('register')}>
            Create Free Account
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('login')}>
            Access Dashboard
          </button>
        </div>
      </section>

      {/* App Preview Mockup Panel */}
      <section className="landing-preview-container animate-scale-in">
        <div className="app-window-mockup glass-panel">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <div className="window-address">taskify.app/dashboard</div>
          </div>
          
          <div className="mock-app-body">
            {/* Left side nav */}
            <div className="mock-sidebar">
              <div className="mock-item active">All Tasks</div>
              <div className="mock-item">Today</div>
              <div className="mock-item">Starred</div>
              <div className="mock-divider"></div>
              <div className="mock-item"># Work</div>
              <div className="mock-item"># Personal</div>
            </div>
            
            {/* Center main */}
            <div className="mock-main">
              <div className="mock-dashboard">
                <div className="mock-ring-card">
                  <div className="mock-ring">75%</div>
                  <div className="mock-stats-text">
                    <strong>Weekly Progress</strong>
                    <span>Done: 6 of 8 tasks</span>
                  </div>
                </div>
                <div className="mock-bars-card">
                  <div className="mock-bar-row">
                    <span className="mock-label">High</span>
                    <div className="mock-bar-fill high"></div>
                  </div>
                  <div className="mock-bar-row">
                    <span className="mock-label">Medium</span>
                    <div className="mock-bar-fill medium"></div>
                  </div>
                </div>
              </div>
              
              <div className="mock-todo-card">
                <div className="mock-checkbox checked"></div>
                <div className="mock-todo-text">
                  <span className="mock-todo-title strikethrough">Deploy production server</span>
                  <span className="mock-todo-badge">#Work</span>
                </div>
              </div>

              <div className="mock-todo-card">
                <div className="mock-checkbox"></div>
                <div className="mock-todo-text">
                  <span className="mock-todo-title">Prepare slide deck for client meeting</span>
                  <span className="mock-todo-badge urgent">Due Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-features">
        <div className="section-title">
          <h2>Productivity tools built for high performance</h2>
          <p>Everything you need to streamline your focus and organize your agenda.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-card glass-panel">
              <div className="feature-icon-box">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                </svg>
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Taskify Inc. Built with love and glassmorphism styling.</p>
      </footer>
    </div>
  );
}
