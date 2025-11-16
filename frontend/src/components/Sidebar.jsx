import {
  Brain,
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Target,
  Beaker,
  Settings,
  Sun,
  Moon
} from 'lucide-react'
import { useState } from 'react'
import './Sidebar.css'

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { id: 'journal', label: 'Дневник', icon: BookOpen },
  { id: 'projects', label: 'Проекты', icon: FolderKanban },
  { id: 'goals', label: 'Цели', icon: Target },
  { id: 'biohacking', label: 'Биохакинг', icon: Beaker },
]

function Sidebar({ activeView, setActiveView }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Brain size={28} className="logo-icon" />
          {!collapsed && <span className="logo-text">Second Brain</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Развернуть' : 'Свернуть'}
        >
          <Settings size={18} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
