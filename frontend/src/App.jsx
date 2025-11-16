import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import DailyJournal from './components/DailyJournal'
import Projects from './components/Projects'
import Goals from './components/Goals'
import Biohacking from './components/Biohacking'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'journal':
        return <DailyJournal />
      case 'projects':
        return <Projects />
      case 'goals':
        return <Goals />
      case 'biohacking':
        return <Biohacking />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  )
}

export default App
