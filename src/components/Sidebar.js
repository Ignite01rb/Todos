import React, { useState } from 'react';

export default function Sidebar({
  activeFilter,
  setActiveFilter,
  categories,
  addCategory,
  todos,
  theme,
  setTheme,
  accent,
  setAccent
}) {
  const [newCatName, setNewCatName] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);

  const getCount = (filter) => {
    switch (filter) {
      case 'all':
        return todos.length;
      case 'today':
        const todayStr = new Date().toISOString().split('T')[0];
        return todos.filter(t => t.dueDate === todayStr && !t.completed).length;
      case 'scheduled':
        return todos.filter(t => t.dueDate && !t.completed).length;
      case 'completed':
        return todos.filter(t => t.completed).length;
      case 'starred':
        return todos.filter(t => t.starred && !t.completed).length;
      default:
        // Category count
        return todos.filter(t => t.category === filter && !t.completed).length;
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName('');
    setShowAddCat(false);
  };

  const accents = [
    { id: 'indigo', color: '#6366f1' },
    { id: 'violet', color: '#8b5cf6' },
    { id: 'emerald', color: '#10b981' },
    { id: 'amber', color: '#f59e0b' },
    { id: 'rose', color: '#f43f5e' },
    { id: 'blue', color: '#3b82f6' }
  ];

  const quickFilters = [
    { id: 'all', label: 'All Tasks', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: 'today', label: 'Today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'scheduled', label: 'Scheduled', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'starred', label: 'Starred', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z' },
    { id: 'completed', label: 'Completed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  return (
    <aside className="sidebar glass-panel">
      {/* Brand logo & title */}
      <div className="brand">
        <div className="brand-logo">
          <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="brand-info">
          <h2>Taskify</h2>
          <span>Simplify your day</span>
        </div>
      </div>

      {/* Main Navigation Quick Filters */}
      <div className="sidebar-section">
        <h3>Views</h3>
        <nav className="filter-nav">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={filter.icon} />
              </svg>
              <span className="nav-label">{filter.label}</span>
              <span className="nav-count">{getCount(filter.id)}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Categories section */}
      <div className="sidebar-section">
        <div className="section-header">
          <h3>Lists</h3>
          <button className="add-cat-btn" onClick={() => setShowAddCat(!showAddCat)}>
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {showAddCat && (
          <form className="add-cat-form" onSubmit={handleCreateCategory}>
            <input
              type="text"
              placeholder="New category..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              autoFocus
            />
            <button type="submit" className="submit-cat-btn">
              Add
            </button>
          </form>
        )}

        <nav className="filter-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              <span className="cat-bullet">#</span>
              <span className="nav-label">{cat}</span>
              <span className="nav-count">{getCount(cat)}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Customization Settings panel */}
      <div className="sidebar-footer">
        <div className="settings-panel">
          <div className="settings-row">
            <span>Theme</span>
            <button 
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span className="theme-toggle-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="settings-row flex-col">
            <span className="accent-label">Accent Color</span>
            <div className="accent-dots">
              {accents.map((acc) => (
                <button
                  key={acc.id}
                  className={`accent-dot-btn ${accent === acc.id ? 'active' : ''}`}
                  style={{ backgroundColor: acc.color }}
                  onClick={() => setAccent(acc.id)}
                  title={acc.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
