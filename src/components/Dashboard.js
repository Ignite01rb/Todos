import React from 'react';

export default function Dashboard({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
  const mediumPriority = todos.filter(t => t.priority === 'medium' && !t.completed).length;
  const lowPriority = todos.filter(t => t.priority === 'low' && !t.completed).length;

  // Circular progress SVG values
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="dashboard-container glass-panel animate-fade-in">
      <div className="dashboard-header">
        <h3>Productivity Hub</h3>
        <span className="dashboard-subtitle">Real-time statistics</span>
      </div>

      <div className="dashboard-content">
        {/* Progress Ring Card */}
        <div className="progress-ring-card">
          <div className="progress-ring-svg-container">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring-bg"
                stroke="var(--border-color)"
                strokeWidth="8"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring-fill"
                stroke="var(--accent)"
                strokeWidth="8"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset var(--transition-slow)'
                }}
              />
            </svg>
            <div className="progress-text">
              <span className="progress-percentage">{completionRate}%</span>
              <span className="progress-label">Done</span>
            </div>
          </div>
          
          <div className="progress-stats">
            <div className="stat-row">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-val">{total}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Completed</span>
              <span className="stat-val text-success">{completed}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Active</span>
              <span className="stat-val text-primary">{active}</span>
            </div>
          </div>
        </div>

        {/* Priority Breakdown Card */}
        <div className="priority-card">
          <h4>Active Priority Tasks</h4>
          <div className="priority-bars">
            <div className="priority-bar-item">
              <div className="bar-label-container">
                <span className="priority-dot dot-high"></span>
                <span>High</span>
                <span className="priority-count">{highPriority}</span>
              </div>
              <div className="bar-track">
                <div 
                  className="bar-fill bg-high" 
                  style={{ width: `${total > 0 ? (highPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="priority-bar-item">
              <div className="bar-label-container">
                <span className="priority-dot dot-medium"></span>
                <span>Medium</span>
                <span className="priority-count">{mediumPriority}</span>
              </div>
              <div className="bar-track">
                <div 
                  className="bar-fill bg-medium" 
                  style={{ width: `${total > 0 ? (mediumPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="priority-bar-item">
              <div className="bar-label-container">
                <span className="priority-dot dot-low"></span>
                <span>Low</span>
                <span className="priority-count">{lowPriority}</span>
              </div>
              <div className="bar-track">
                <div 
                  className="bar-fill bg-low" 
                  style={{ width: `${total > 0 ? (lowPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
