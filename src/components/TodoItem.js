import React, { useState } from 'react';

export default function TodoItem({ 
  todo, 
  onToggleComplete, 
  onToggleStar, 
  onDelete, 
  onUpdateTodo,
  categories 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form states
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNotes, setEditNotes] = useState(todo.notes || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  // Subtask state
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  // Format and determine date status
  const getDateStatus = () => {
    if (!todo.dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (todo.completed) return { text: todo.dueDate, class: 'completed' };
    if (diffDays < 0) return { text: `Overdue (${todo.dueDate})`, class: 'overdue' };
    if (diffDays === 0) return { text: 'Due Today', class: 'due-today' };
    if (diffDays === 1) return { text: 'Due Tomorrow', class: 'due-tomorrow' };
    return { text: todo.dueDate, class: 'upcoming' };
  };

  const dateStatus = getDateStatus();

  // Subtask operations
  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSubtask = {
      id: Date.now().toString(),
      title: newSubtaskTitle.trim(),
      completed: false
    };

    const updatedSubtasks = [...(todo.subtasks || []), newSubtask];
    onUpdateTodo(todo.id, { subtasks: updatedSubtasks });
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = todo.subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdateTodo(todo.id, { subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = todo.subtasks.filter(st => st.id !== subtaskId);
    onUpdateTodo(todo.id, { subtasks: updatedSubtasks });
  };

  // Main task update operations
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    onUpdateTodo(todo.id, {
      title: editTitle.trim(),
      notes: editNotes.trim(),
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditNotes(todo.notes || '');
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  // Subtasks progress percentage
  const totalSubtasks = todo.subtasks?.length || 0;
  const completedSubtasks = todo.subtasks?.filter(st => st.completed).length || 0;
  const subtaskProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  return (
    <div className={`todo-item-card glass-panel animate-scale-in ${todo.completed ? 'completed' : ''} ${isExpanded ? 'expanded' : ''} priority-${todo.priority}`}>
      
      {isEditing ? (
        /* EDITING MODE */
        <form className="todo-edit-form" onSubmit={handleSaveEdit}>
          <div className="form-field">
            <input 
              type="text" 
              className="edit-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <textarea 
              className="edit-notes-input"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Notes..."
              rows="2"
            />
          </div>
          
          <div className="edit-selectors-row">
            <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input 
              type="date" 
              value={editDueDate} 
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>

          <div className="edit-form-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm">Save</button>
          </div>
        </form>
      ) : (
        /* NORMAL RENDER MODE */
        <>
          <div className="todo-item-main">
            {/* Custom Checkbox */}
            <button 
              className={`custom-checkbox-btn ${todo.completed ? 'checked' : ''}`}
              onClick={() => onToggleComplete(todo.id)}
              aria-label="Toggle Complete"
            >
              <svg className="checkbox-svg" viewBox="0 0 24 24">
                <circle className="cb-circle" cx="12" cy="12" r="9" fill="none" strokeWidth="2" />
                <path className="cb-check" d="M8 12l3 3 5-5" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Todo Info */}
            <div className="todo-info" onClick={() => setIsExpanded(!isExpanded)}>
              <div className="todo-title-row">
                <span className="todo-title">{todo.title}</span>
                {todo.priority && (
                  <span className={`priority-badge ${todo.priority}`}>
                    {todo.priority}
                  </span>
                )}
              </div>
              
              <div className="todo-metadata-row">
                <span className="todo-tag">#{todo.category}</span>
                {dateStatus && (
                  <span className={`date-badge ${dateStatus.class}`}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="inline-icon">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {dateStatus.text}
                  </span>
                )}
                {totalSubtasks > 0 && (
                  <span className="subtasks-summary-badge">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="inline-icon">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    {completedSubtasks}/{totalSubtasks} ({subtaskProgress}%)
                  </span>
                )}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="todo-actions-panel">
              {/* Star Starred Toggle */}
              <button 
                className={`action-icon-btn star-btn ${todo.starred ? 'active' : ''}`}
                onClick={() => onToggleStar(todo.id)}
                title="Star Task"
              >
                <svg viewBox="0 0 24 24" fill={todo.starred ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>

              {/* Edit Toggle */}
              <button 
                className="action-icon-btn edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit Task"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              {/* Delete Button */}
              <button 
                className="action-icon-btn delete-btn"
                onClick={() => onDelete(todo.id)}
                title="Delete Task"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          {/* EXPANDED VIEW: Notes & Subtasks */}
          {isExpanded && (
            <div className="todo-item-expanded animate-fade-in">
              {todo.notes && (
                <div className="expanded-notes-section">
                  <h5>Description</h5>
                  <p className="todo-notes-display">{todo.notes}</p>
                </div>
              )}

              {/* Subtasks Section */}
              <div className="subtasks-section">
                <h5>Subtasks Checklist</h5>
                
                {/* Subtask list */}
                {totalSubtasks > 0 && (
                  <>
                    {/* Subtask Progress bar */}
                    <div className="subtask-progress-wrapper">
                      <div className="subtask-progress-bar">
                        <div 
                          className="subtask-progress-fill" 
                          style={{ width: `${subtaskProgress}%` }}
                        ></div>
                      </div>
                      <span className="subtask-progress-text">{subtaskProgress}% Done</span>
                    </div>

                    <div className="subtasks-list">
                      {todo.subtasks.map(st => (
                        <div key={st.id} className={`subtask-item ${st.completed ? 'completed' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={st.completed}
                            onChange={() => handleToggleSubtask(st.id)}
                          />
                          <span className="subtask-title">{st.title}</span>
                          <button 
                            className="subtask-delete-btn"
                            onClick={() => handleDeleteSubtask(st.id)}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Subtask addition form */}
                <form className="add-subtask-form" onSubmit={handleAddSubtask}>
                  <input 
                    type="text" 
                    placeholder="Add a step..."
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  />
                  <button type="submit" className="add-subtask-btn">Add</button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
