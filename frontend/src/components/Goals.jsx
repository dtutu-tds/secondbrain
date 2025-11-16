import {
  Target,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Circle,
  Award
} from 'lucide-react'
import './Goals.css'

const mockGoals = [
  {
    id: 1,
    title: 'Запустить Second Brain 2.0',
    category: 'Карьера',
    deadline: '2025-12-31',
    progress: 45,
    keyResults: [
      { text: 'Создать frontend интерфейс', completed: true },
      { text: 'Настроить API интеграцию', completed: false },
      { text: 'Написать документацию', completed: false },
      { text: 'Провести тестирование', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Прочитать 24 книги',
    category: 'Развитие',
    deadline: '2025-12-31',
    progress: 70,
    keyResults: [
      { text: 'Январь-Март: 6 книг', completed: true },
      { text: 'Апрель-Июнь: 6 книг', completed: true },
      { text: 'Июль-Сентябрь: 6 книг', completed: true },
      { text: 'Октябрь-Декабрь: 6 книг', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Достичь 15% жира в теле',
    category: 'Здоровье',
    deadline: '2025-06-01',
    progress: 60,
    keyResults: [
      { text: 'Силовые 3x в неделю', completed: true },
      { text: 'Кардио 2x в неделю', completed: true },
      { text: 'Дефицит калорий 500 ккал', completed: false },
      { text: 'Белок 2г на кг веса', completed: true }
    ]
  }
]

function Goals() {
  return (
    <div className="goals-page">
      <header className="goals-header">
        <div className="header-left">
          <h1>
            <Target size={28} />
            Цели 2025
          </h1>
          <p className="subtitle">{mockGoals.length} активных целей</p>
        </div>
        <button className="add-btn">
          <Plus size={18} />
          Новая цель
        </button>
      </header>

      <div className="goals-overview">
        <div className="overview-card">
          <TrendingUp size={24} className="overview-icon" />
          <div className="overview-content">
            <span className="overview-value">58%</span>
            <span className="overview-label">Средний прогресс</span>
          </div>
        </div>
        <div className="overview-card">
          <CheckCircle2 size={24} className="overview-icon success" />
          <div className="overview-content">
            <span className="overview-value">8/12</span>
            <span className="overview-label">Key Results</span>
          </div>
        </div>
        <div className="overview-card">
          <Award size={24} className="overview-icon warning" />
          <div className="overview-content">
            <span className="overview-value">45</span>
            <span className="overview-label">Дней до дедлайна</span>
          </div>
        </div>
      </div>

      <div className="goals-list">
        {mockGoals.map((goal) => (
          <div key={goal.id} className="goal-card">
            <div className="goal-header">
              <div className="goal-info">
                <span className="goal-category">{goal.category}</span>
                <h3>{goal.title}</h3>
              </div>
              <div className="goal-deadline">
                <Calendar size={16} />
                <span>{new Date(goal.deadline).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>

            <div className="goal-progress">
              <div className="progress-info">
                <span>Прогресс</span>
                <span className="progress-percent">{goal.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="key-results">
              <h4>Ключевые результаты</h4>
              <ul>
                {goal.keyResults.map((kr, index) => (
                  <li key={index} className={kr.completed ? 'completed' : ''}>
                    {kr.completed ? (
                      <CheckCircle2 size={16} className="kr-icon completed" />
                    ) : (
                      <Circle size={16} className="kr-icon" />
                    )}
                    <span>{kr.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Goals
