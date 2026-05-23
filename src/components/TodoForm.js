import React, { useState, useEffect } from 'react';

export default function TodoForm({ categories, addTodo, activeFilter }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState(categories[0] || 'Personal');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Automatically update form defaults based on the active filter view
  useEffect(() => {
    if (categories.includes(activeFilter)) {
      setCategory(activeFilter);
    } else {
      setCategory(categories[0] || 'Personal');
    }

    if (activeFilter === 'today') {
      setDueDate(new Date().toISOString().split('T')[0]);
    } else {
      setDueDate('');
    }
  }, [activeFilter, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      notes: notes.trim(),
      priority,
      category,
      dueDate,
      completed: false,
      starred: activeFilter === 'starred', // Mark as starred if added from the Starred view
      subtasks: [],
      createdAt: new Date().toISOString()
    });

    // Reset fields
    setTitle('');
    setNotes('');
    setPriority('medium');
    
    // Reset date unless we are still in the Today filter view
    if (activeFilter !== 'today') {
      setDueDate('');
    }
    
    setIsExpanded(false);
  };

  const handleClear = () => {
    setTitle('');
    setNotes('');
    setPriority('medium');
    
    if (activeFilter !== 'today') {
      setDueDate('');
    }
    
    setIsExpanded(false);
  };

  return (
    <form className={`todo-form glass-panel animate-fade-in ${isExpanded ? 'expanded' : ''}`} onSubmit={handleSubmit}>
      <div className="form-main-input-row">
        <div className="input-with-icon">
          <svg className="input-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <input
            type="text"
            className="main-todo-input"
            placeholder={
              activeFilter === 'today' ? "Add a task for today..." :
              activeFilter === 'starred' ? "Add a starred task..." :
              categories.includes(activeFilter) ? `Add a task to #${activeFilter}...` :
              "Add a new task..."
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            required
          />
        </div>
        
        {!isExpanded && (
          <button 
            type="button" 
            className="quick-expand-btn"
            onClick={() => setIsExpanded(true)}
            title="Expand task details"
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="form-expanded-content animate-fade-in">
          {/* Notes description textarea */}
          <div className="form-field">
            <textarea
              className="todo-notes-textarea"
              placeholder="Add description or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="2"
            />
          </div>

          {/* Metadata selectors: Category, Priority, Due Date */}
          <div className="form-meta-selectors">
            {/* Category */}
            <div className="meta-selector-group">
              <label>List</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="meta-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="meta-selector-group">
              <label>Priority</label>
              <div className="priority-segmented-control">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`priority-segment-btn ${p} ${priority === p ? 'active' : ''}`}
                    onClick={() => setPriority(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="meta-selector-group">
              <label>Due Date</label>
              <input
                type="date"
                className="meta-date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Form Action buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClear}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Create Task
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
