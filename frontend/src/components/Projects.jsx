import { useState } from 'react'
import {
  FolderKanban,
  Plus,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar
} from 'lucide-react'
import './Projects.css'

const mockProjects = [
  {
    id: 1,
    name: 'Second Brain Frontend',
    status: 'active',
    priority: 'A',
    progress: 65,
    tasksTotal: 8,
    tasksCompleted: 5,
    area: 'Development',
    dueDate: '2025-11-30',
    description: 'Создание минималистичного веб-интерфейса для системы Second Brain'
  },
  {
    id: 2,
    name: 'API Documentation',
    status: 'active',
    priority: 'B',
    progress: 30,
    tasksTotal: 12,
    tasksCompleted: 4,
    area: 'Documentation',
    dueDate: '2025-12-15',
    description: 'Документирование всех API эндпоинтов проекта'
  },
  {
    id: 3,
    name: 'Performance Optimization',
    status: 'on_hold',
    priority: 'B',
    progress: 10,
    tasksTotal: 6,
    tasksCompleted: 1,
    area: 'Development',
    dueDate: '2025-12-20',
    description: 'Оптимизация производительности приложения'
  },
  {
    id: 4,
    name: 'User Research',
    status: 'active',
    priority: 'A',
    progress: 85,
    tasksTotal: 5,
    tasksCompleted: 4,
    area: 'Research',
    dueDate: '2025-11-20',
    description: 'Исследование пользовательских потребностей'
  }
]

function Projects() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = mockProjects.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Circle size={14} className="status-active" />
      case 'on_hold':
        return <Clock size={14} className="status-hold" />
      case 'done':
        return <CheckCircle2 size={14} className="status-done" />
      default:
        return <Circle size={14} />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Активный'
      case 'on_hold':
        return 'На паузе'
      case 'done':
        return 'Завершен'
      default:
        return status
    }
  }

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="header-left">
          <h1>
            <FolderKanban size={28} />
            Проекты
          </h1>
          <p className="subtitle">{mockProjects.length} проектов</p>
        </div>
        <button className="add-btn">
          <Plus size={18} />
          Новый проект
        </button>
      </header>

      <div className="filter-bar">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={filter === 'on_hold' ? 'active' : ''}
          onClick={() => setFilter('on_hold')}
        >
          На паузе
        </button>
        <button
          className={filter === 'done' ? 'active' : ''}
          onClick={() => setFilter('done')}
        >
          Завершенные
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-status">
                {getStatusIcon(project.status)}
                <span>{getStatusLabel(project.status)}</span>
              </div>
              <span className={`priority-badge priority-${project.priority.toLowerCase()}`}>
                {project.priority}
              </span>
            </div>

            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-meta">
              <span className="area-tag">{project.area}</span>
              <span className="due-date">
                <Calendar size={14} />
                {new Date(project.dueDate).toLocaleDateString('ru-RU')}
              </span>
            </div>

            <div className="project-progress">
              <div className="progress-header">
                <span>Прогресс</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="project-tasks">
              <CheckCircle2 size={16} />
              <span>{project.tasksCompleted}/{project.tasksTotal} задач</span>
            </div>

            <button className="project-menu">
              <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
