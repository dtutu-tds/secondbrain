import { useState } from 'react'
import {
  Calendar,
  Sun,
  Moon,
  Battery,
  Brain,
  Heart,
  Plus,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { format, addDays, subDays } from 'date-fns'
import { ru } from 'date-fns/locale'
import './DailyJournal.css'

function DailyJournal() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [journalMode, setJournalMode] = useState('lite') // lite or full
  const [formData, setFormData] = useState({
    mood: 3,
    energy: 3,
    burnout: 2,
    a1Task: '',
    a2Task: '',
    a3Task: '',
    focusTime: '',
    freeWrite: '',
    gratitude: '',
    learned: ''
  })

  const formattedDate = format(currentDate, "d MMMM yyyy", { locale: ru })
  const dayName = format(currentDate, "EEEE", { locale: ru })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const navigateDate = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(subDays(currentDate, 1))
    } else {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  return (
    <div className="daily-journal">
      <header className="journal-header">
        <div className="date-nav">
          <button onClick={() => navigateDate('prev')} className="nav-btn">
            <ChevronLeft size={20} />
          </button>
          <div className="current-date">
            <Calendar size={20} />
            <h1>{formattedDate}</h1>
            <span className="day-name">{dayName}</span>
          </div>
          <button onClick={() => navigateDate('next')} className="nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mode-toggle">
          <button
            className={journalMode === 'lite' ? 'active' : ''}
            onClick={() => setJournalMode('lite')}
          >
            <Sun size={16} />
            Lite
          </button>
          <button
            className={journalMode === 'full' ? 'active' : ''}
            onClick={() => setJournalMode('full')}
          >
            <Moon size={16} />
            Full
          </button>
        </div>
      </header>

      <div className="journal-content">
        {/* State Check */}
        <section className="journal-section">
          <h2>Проверка состояния</h2>
          <div className="state-grid">
            <div className="state-item">
              <label>
                <Heart size={18} />
                Настроение
              </label>
              <div className="slider-group">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.mood}
                  onChange={(e) => handleInputChange('mood', e.target.value)}
                />
                <span className="slider-value">{formData.mood}/5</span>
              </div>
            </div>

            <div className="state-item">
              <label>
                <Battery size={18} />
                Энергия
              </label>
              <div className="slider-group">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.energy}
                  onChange={(e) => handleInputChange('energy', e.target.value)}
                />
                <span className="slider-value">{formData.energy}/5</span>
              </div>
            </div>

            <div className="state-item">
              <label>
                <Brain size={18} />
                Выгорание
              </label>
              <div className="slider-group">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.burnout}
                  onChange={(e) => handleInputChange('burnout', e.target.value)}
                />
                <span className="slider-value">{formData.burnout}/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* A1 Task - Main Focus */}
        <section className="journal-section highlight">
          <h2>
            <span className="priority-badge">A1</span>
            Главная задача дня
          </h2>
          <input
            type="text"
            placeholder="Что самое важное сегодня?"
            value={formData.a1Task}
            onChange={(e) => handleInputChange('a1Task', e.target.value)}
            className="task-input large"
          />
        </section>

        {journalMode === 'full' && (
          <>
            {/* A2 and A3 Tasks */}
            <section className="journal-section">
              <h2>Закон трех</h2>
              <div className="tasks-grid">
                <div className="task-row">
                  <span className="priority-tag a2">A2</span>
                  <input
                    type="text"
                    placeholder="Вторая по важности задача"
                    value={formData.a2Task}
                    onChange={(e) => handleInputChange('a2Task', e.target.value)}
                    className="task-input"
                  />
                </div>
                <div className="task-row">
                  <span className="priority-tag a3">A3</span>
                  <input
                    type="text"
                    placeholder="Третья задача"
                    value={formData.a3Task}
                    onChange={(e) => handleInputChange('a3Task', e.target.value)}
                    className="task-input"
                  />
                </div>
              </div>
            </section>

            {/* Gratitude */}
            <section className="journal-section">
              <h2>Благодарность</h2>
              <textarea
                placeholder="За что я благодарен сегодня?"
                value={formData.gratitude}
                onChange={(e) => handleInputChange('gratitude', e.target.value)}
                rows={3}
              />
            </section>

            {/* Learning */}
            <section className="journal-section">
              <h2>Что я узнал</h2>
              <textarea
                placeholder="Главный инсайт или урок дня..."
                value={formData.learned}
                onChange={(e) => handleInputChange('learned', e.target.value)}
                rows={3}
              />
            </section>
          </>
        )}

        {/* Focus Time */}
        <section className="journal-section">
          <h2>Время без отвлечений</h2>
          <input
            type="text"
            placeholder="Когда у меня будет 2+ часа глубокой работы?"
            value={formData.focusTime}
            onChange={(e) => handleInputChange('focusTime', e.target.value)}
            className="task-input"
          />
        </section>

        {/* Free Write */}
        <section className="journal-section">
          <h2>Свободные мысли</h2>
          <textarea
            placeholder="Что на уме? Идеи, размышления, планы..."
            value={formData.freeWrite}
            onChange={(e) => handleInputChange('freeWrite', e.target.value)}
            rows={5}
          />
        </section>

        {/* Save Button */}
        <div className="save-section">
          <button className="save-btn">
            <Save size={18} />
            Сохранить запись
          </button>
        </div>
      </div>
    </div>
  )
}

export default DailyJournal
