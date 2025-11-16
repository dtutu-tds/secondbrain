import {
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Brain,
  Target,
  Flame
} from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import './Dashboard.css'

function Dashboard() {
  const today = new Date()
  const formattedDate = format(today, "EEEE, d MMMM", { locale: ru })

  // Mock data - in real app this would come from Obsidian vault
  const stats = {
    tasksCompleted: 12,
    totalTasks: 15,
    streak: 7,
    focusHours: 4.5,
    weeklyProgress: 73
  }

  const todayTasks = [
    { id: 1, text: 'Завершить дизайн дашборда', priority: 'A1', completed: false },
    { id: 2, text: 'Написать документацию API', priority: 'A2', completed: false },
    { id: 3, text: 'Code review PR #234', priority: 'A3', completed: true },
  ]

  const quickActions = [
    { icon: BookOpen, label: 'Быстрый дневник', color: '#6366f1' },
    { icon: Plus, label: 'Новая задача', color: '#10b981' },
    { icon: Clock, label: 'Рабочий блок', color: '#f59e0b' },
    { icon: Beaker, label: 'Биохакинг', color: '#ef4444' },
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="greeting">
          <h1>Добрый день</h1>
          <p className="date">{formattedDate}</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <Flame size={18} className="flame-icon" />
            <span>{stats.streak} дней подряд</span>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Main Focus Card */}
        <div className="card focus-card">
          <div className="card-header">
            <h2>
              <Target size={20} />
              Главный фокус
            </h2>
          </div>
          <div className="focus-content">
            <div className="a1-task">
              <span className="priority-badge">A1</span>
              <p>Завершить дизайн дашборда</p>
            </div>
            <div className="focus-meta">
              <span>~2h оценка</span>
              <span>Проект: Second Brain</span>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="card tasks-card">
          <div className="card-header">
            <h2>
              <CheckCircle2 size={20} />
              Задачи на сегодня
            </h2>
            <span className="task-count">{stats.tasksCompleted}/{stats.totalTasks}</span>
          </div>
          <div className="tasks-list">
            {todayTasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <button className="task-checkbox">
                  {task.completed && <CheckCircle2 size={18} />}
                </button>
                <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="task-text">{task.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="card stats-card">
          <div className="card-header">
            <h2>
              <TrendingUp size={20} />
              Прогресс недели
            </h2>
          </div>
          <div className="progress-container">
            <div className="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--bg-tertiary)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="8"
                  strokeDasharray={`${stats.weeklyProgress * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="progress-value">
                <span className="percentage">{stats.weeklyProgress}%</span>
                <span className="label">выполнено</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Time */}
        <div className="card time-card">
          <div className="card-header">
            <h2>
              <Clock size={20} />
              Время фокуса
            </h2>
          </div>
          <div className="time-content">
            <div className="time-value">
              <span className="hours">{stats.focusHours}</span>
              <span className="unit">часов</span>
            </div>
            <p className="time-label">сегодня в глубокой работе</p>
            <div className="time-bar">
              <div
                className="time-fill"
                style={{ width: `${(stats.focusHours / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="card insights-card">
          <div className="card-header">
            <h2>
              <Zap size={20} />
              Быстрые инсайты
            </h2>
          </div>
          <div className="insights-list">
            <div className="insight">
              <div className="insight-icon positive">
                <TrendingUp size={16} />
              </div>
              <p>Продуктивность выше на 23% vs прошлая неделя</p>
            </div>
            <div className="insight">
              <div className="insight-icon neutral">
                <Brain size={16} />
              </div>
              <p>3 проекта требуют внимания</p>
            </div>
            <div className="insight">
              <div className="insight-icon positive">
                <CheckCircle2 size={16} />
              </div>
              <p>80/20: Код ревью дает максимум ROI</p>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="card quote-card">
          <blockquote>
            "Фокус - это искусство игнорирования.
            Выбери одно дело и сделай его великим."
          </blockquote>
          <p className="quote-focus">Твой A1 сегодня - твой приоритет #1</p>
        </div>
      </div>
    </div>
  )
}

// Import missing icons
import { BookOpen, Plus, Beaker } from 'lucide-react'

export default Dashboard
