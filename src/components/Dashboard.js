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
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  // Weekly activity mock database
  // We dynamically override the current day's value with the user's actual completion rate!
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDayIndex = new Date().getDay();
  
  const mockActivity = [35, 55, 75, 45, 60, 85, 40]; // Default mock values
  mockActivity[currentDayIndex] = total > 0 ? completionRate : 15; // Set current day dynamically

  return (
    <div className="dashboard-wrapper glass-panel animate-fade-in">
      <div className="dashboard-wrapper-header">
        <h3>Performance Analytics</h3>
        <span className="dashboard-wrapper-subtitle">Real-time workload metrics</span>
      </div>

      <div className="dashboard-grid">
        
        {/* Card 1: Focus Progress */}
        <div className="dash-card focus-card">
          <div className="dash-card-header">
            <h4>Focus Progress</h4>
            <span className="card-badge">Ratio</span>
          </div>
          <div className="focus-card-body">
            <div className="focus-ring-container">
              <svg className="progress-ring" width="110" height="110">
                <circle
                  className="progress-ring-bg"
                  stroke="var(--border-color)"
                  strokeWidth="7"
                  fill="transparent"
                  r={radius}
                  cx="55"
                  cy="55"
                />
                <circle
                  className="progress-ring-fill"
                  stroke="var(--accent)"
                  strokeWidth="7"
                  fill="transparent"
                  r={radius}
                  cx="55"
                  cy="55"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset var(--transition-slow)'
                  }}
                />
              </svg>
              <div className="focus-text">
                <span className="focus-percentage">{completionRate}%</span>
                <span className="focus-label">Done</span>
              </div>
            </div>
            <div className="focus-stats">
              <div className="focus-stat-item">
                <span className="focus-stat-val text-primary">{active}</span>
                <span className="focus-stat-lbl">Active</span>
              </div>
              <div className="focus-stat-item">
                <span className="focus-stat-val text-success">{completed}</span>
                <span className="focus-stat-lbl">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Priority Workload */}
        <div className="dash-card workload-card">
          <div className="dash-card-header">
            <h4>Priority Heatmap</h4>
            <span className="card-badge warning">Urgent</span>
          </div>
          <div className="workload-card-body">
            <div className="workload-bar-item">
              <div className="workload-label-row">
                <span className="workload-dot dot-high"></span>
                <span className="workload-label">High Priority</span>
                <span className="workload-count">{highPriority}</span>
              </div>
              <div className="workload-track">
                <div 
                  className="workload-fill bg-high" 
                  style={{ width: `${total > 0 ? (highPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="workload-bar-item">
              <div className="workload-label-row">
                <span className="workload-dot dot-medium"></span>
                <span className="workload-label">Medium Priority</span>
                <span className="workload-count">{mediumPriority}</span>
              </div>
              <div className="workload-track">
                <div 
                  className="workload-fill bg-medium" 
                  style={{ width: `${total > 0 ? (mediumPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="workload-bar-item">
              <div className="workload-label-row">
                <span className="workload-dot dot-low"></span>
                <span className="workload-label">Low Priority</span>
                <span className="workload-count">{lowPriority}</span>
              </div>
              <div className="workload-track">
                <div 
                  className="workload-fill bg-low" 
                  style={{ width: `${total > 0 ? (lowPriority / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Activity Trends */}
        <div className="dash-card trends-card">
          <div className="dash-card-header">
            <h4>Weekly Completion</h4>
            <span className="card-badge info">Trends</span>
          </div>
          <div className="trends-card-body">
            <div className="trends-chart">
              {daysOfWeek.map((day, idx) => (
                <div key={day} className={`chart-column ${idx === currentDayIndex ? 'active' : ''}`}>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar-fill" 
                      style={{ height: `${mockActivity[idx]}%` }}
                      title={`${mockActivity[idx]}%`}
                    >
                      <span className="chart-bar-tooltip">{mockActivity[idx]}%</span>
                    </div>
                  </div>
                  <span className="chart-column-label">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
