import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Toast from './components/Toast';
import './App.css';

const DEFAULT_CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health'];

const DEFAULT_TODOS = [
  {
    id: '1',
    title: 'Design the Taskify dashboard wireframes',
    notes: 'Draft wireframes, map user journeys, and finalize the HSL design tokens for light/dark themes.',
    priority: 'high',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0], // Today
    completed: true,
    starred: true,
    subtasks: [
      { id: '1-1', title: 'Color palette definition', completed: true },
      { id: '1-2', title: 'Typography selection', completed: true },
      { id: '1-3', title: 'Draw custom checkmark SVG', completed: true }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    title: 'Integrate local storage persistence',
    notes: 'Implement synchronization of tasks, checklists, categories, themes, and accent colors with window.localStorage.',
    priority: 'high',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0], // Today
    completed: false,
    starred: true,
    subtasks: [
      { id: '2-1', title: 'Sync todos array', completed: true },
      { id: '2-2', title: 'Persist custom lists/categories', completed: false },
      { id: '2-3', title: 'Save visual theme states', completed: false }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'Plan weekly training routines',
    notes: 'Cardio on Monday/Wednesday, strength training on Tuesday/Thursday, yoga on Saturday.',
    priority: 'medium',
    category: 'Health',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    completed: false,
    starred: false,
    subtasks: [
      { id: '3-1', title: '30-min morning jog', completed: true },
      { id: '3-2', title: 'Upper body strength session', completed: false },
      { id: '3-3', title: 'Stretch and foam roll', completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Buy fresh groceries for weekly prep',
    notes: 'Fresh salmon, organic asparagus, olive oil, sweet potatoes, and avocados.',
    priority: 'low',
    category: 'Shopping',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // In 3 days
    completed: false,
    starred: false,
    subtasks: [],
    createdAt: new Date().toISOString()
  }
];

function App() {
  // Authentication & Page States
  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem('taskify_current_user');
    return session ? JSON.parse(session) : null;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const session = localStorage.getItem('taskify_current_user');
    return session ? 'app' : 'landing';
  });

  const [toast, setToast] = useState(null);

  // Load user-specific data from localStorage or defaults
  const [todos, setTodos] = useState(() => {
    const userKey = currentUser ? `taskify_todos_${currentUser.id}` : 'taskify_todos_guest';
    const localData = localStorage.getItem(userKey);
    return localData ? JSON.parse(localData) : (currentUser ? [] : DEFAULT_TODOS);
  });

  const [categories, setCategories] = useState(() => {
    const userKey = currentUser ? `taskify_categories_${currentUser.id}` : 'taskify_categories_guest';
    const localCats = localStorage.getItem(userKey);
    return localCats ? JSON.parse(localCats) : DEFAULT_CATEGORIES;
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskify_theme') || 'dark';
  });

  // Try violet (neon purple) as default accent color
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('taskify_accent') || 'violet';
  });

  // Sync user changes (re-load tasks/categories when user logs in)
  useEffect(() => {
    const userKey = currentUser ? `taskify_todos_${currentUser.id}` : 'taskify_todos_guest';
    const localData = localStorage.getItem(userKey);
    if (currentUser) {
      setTodos(localData ? JSON.parse(localData) : []);
    } else {
      setTodos(localData ? JSON.parse(localData) : DEFAULT_TODOS);
    }

    const catsKey = currentUser ? `taskify_categories_${currentUser.id}` : 'taskify_categories_guest';
    const localCats = localStorage.getItem(catsKey);
    setCategories(localCats ? JSON.parse(localCats) : DEFAULT_CATEGORIES);

    // Reset filters
    setActiveFilter('all');
    setSearchQuery('');
  }, [currentUser]);

  // Sync data changes with localStorage
  useEffect(() => {
    const userKey = currentUser ? `taskify_todos_${currentUser.id}` : 'taskify_todos_guest';
    localStorage.setItem(userKey, JSON.stringify(todos));
  }, [todos, currentUser]);

  useEffect(() => {
    const catsKey = currentUser ? `taskify_categories_${currentUser.id}` : 'taskify_categories_guest';
    localStorage.setItem(catsKey, JSON.stringify(categories));
  }, [categories, currentUser]);

  useEffect(() => {
    localStorage.setItem('taskify_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('taskify_accent', accent);
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  // Auth Operations
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('taskify_current_user', JSON.stringify(user));
    setCurrentPage('app');
    showNotification(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('taskify_current_user');
    setCurrentUser(null);
    setCurrentPage('landing');
    showNotification('Logged out successfully.', 'info');
  };

  // Toast Helper
  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Todo Operations
  const addTodo = (newTodo) => {
    setTodos([
      { ...newTodo, id: Date.now().toString() },
      ...todos
    ]);
    showNotification(`Task added to list "${newTodo.category}".`, 'success');
  };

  const handleToggleComplete = (id) => {
    let taskName = '';
    let isCompletedNow = false;
    const updated = todos.map(todo => {
      if (todo.id === id) {
        taskName = todo.title;
        isCompletedNow = !todo.completed;
        return { ...todo, completed: isCompletedNow };
      }
      return todo;
    });
    setTodos(updated);
    if (isCompletedNow) {
      showNotification(`Completed: "${taskName}" 🎉`, 'success');
    }
  };

  const handleToggleStar = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  const handleDelete = (id) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    if (todoToDelete) {
      showNotification(`Deleted task "${todoToDelete.title}".`, 'info');
    }
  };

  const handleUpdateTodo = (id, updatedFields) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ));
  };

  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
      showNotification(`Created custom list "${name}".`, 'success');
    }
  };

  const clearCompletedTodos = () => {
    const count = todos.filter(t => t.completed).length;
    setTodos(todos.filter(todo => !todo.completed));
    showNotification(`Cleared ${count} completed tasks.`, 'info');
  };

  // Filter and Search logic
  const filteredTodos = todos.filter((todo) => {
    // 1. Category/Quick filters
    let matchesFilter = true;
    const todayStr = new Date().toISOString().split('T')[0];

    if (activeFilter === 'today') {
      matchesFilter = todo.dueDate === todayStr;
    } else if (activeFilter === 'scheduled') {
      matchesFilter = !!todo.dueDate;
    } else if (activeFilter === 'completed') {
      matchesFilter = todo.completed;
    } else if (activeFilter === 'starred') {
      matchesFilter = todo.starred;
    } else if (activeFilter !== 'all') {
      matchesFilter = todo.category === activeFilter;
    }

    // 2. Search query filter
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        todo.title.toLowerCase().includes(q) || 
        (todo.notes && todo.notes.toLowerCase().includes(q));
    }

    return matchesFilter && matchesSearch;
  });

  // Client-Side Routing Render
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage onNavigate={setCurrentPage} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        <AuthPage 
          initialMode="login" 
          onLoginSuccess={handleLoginSuccess} 
          onBackToLanding={() => setCurrentPage('landing')} 
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        <AuthPage 
          initialMode="register" 
          onLoginSuccess={handleLoginSuccess} 
          onBackToLanding={() => setCurrentPage('landing')} 
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  // APP WORKSPACE VIEW
  return (
    <div className="app-layout">
      {/* Sidebar navigation */}
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        categories={categories}
        addCategory={addCategory}
        todos={todos}
        theme={theme}
        setTheme={setTheme}
        accent={accent}
        setAccent={setAccent}
      />

      {/* Main content workspace */}
      <main className="main-content">
        <header className="main-header glass-panel">
          <div className="search-bar-container">
            <svg className="search-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="header-actions">
            {todos.some(t => t.completed) && (
              <button className="btn btn-secondary clear-completed-btn" onClick={clearCompletedTodos}>
                Clear Completed
              </button>
            )}
            
            <button className="btn btn-secondary btn-sm logout-btn" onClick={handleLogout}>
              Logout
            </button>

            <div className="user-profile" title={currentUser?.email}>
              <div className="avatar">{currentUser?.name?.charAt(0).toUpperCase() || 'U'}</div>
            </div>
          </div>
        </header>

        {/* Dashboard statistics section */}
        <Dashboard todos={todos} />

        {/* Todo task creator */}
        <TodoForm 
          categories={categories} 
          addTodo={addTodo} 
          activeFilter={activeFilter}
        />

        {/* Todo lists panel */}
        <section className="todos-section">
          <div className="todos-section-header">
            <h4>
              {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Tasks
              <span className="tasks-count-pill">{filteredTodos.length}</span>
            </h4>
          </div>

          <div className="todo-items-list">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onToggleStar={handleToggleStar}
                  onDelete={handleDelete}
                  onUpdateTodo={handleUpdateTodo}
                  categories={categories}
                />
              ))
            ) : (
              <div className="empty-state glass-panel">
                <svg className="empty-state-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No tasks found in this view.</p>
                <span>Add a task to get started!</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
