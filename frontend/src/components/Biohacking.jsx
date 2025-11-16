import { useState } from 'react'
import {
  Beaker,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter
} from 'lucide-react'
import './Biohacking.css'

const mockSubstances = [
  {
    id: 1,
    name: 'Креатин',
    status: 'use',
    effectScore: 4,
    riskLevel: 'low',
    mainEffects: ['Увеличение силы', 'Лучшее восстановление', 'Когнитивная поддержка'],
    sideEffects: ['Задержка воды'],
    lastUsed: '2025-11-15',
    notes: 'Принимаю 5г ежедневно. Заметил улучшение на тренировках.'
  },
  {
    id: 2,
    name: 'L-Теанин',
    status: 'use',
    effectScore: 3,
    riskLevel: 'low',
    mainEffects: ['Снижение тревожности', 'Улучшение фокуса', 'Лучший сон'],
    sideEffects: [],
    lastUsed: '2025-11-16',
    notes: 'Отлично сочетается с кофе. 200мг утром.'
  },
  {
    id: 3,
    name: 'Модафинил',
    status: 'caution',
    effectScore: 5,
    riskLevel: 'medium',
    mainEffects: ['Сильный фокус', 'Бодрость 12+ часов', 'Продуктивность'],
    sideEffects: ['Бессонница', 'Снижение аппетита', 'Головная боль'],
    lastUsed: '2025-11-01',
    notes: 'Использую редко, только при дедлайнах. Не позже 8 утра.'
  },
  {
    id: 4,
    name: 'Алкоголь',
    status: 'avoid',
    effectScore: -3,
    riskLevel: 'high',
    mainEffects: ['Социальная смазка'],
    sideEffects: ['Плохой сон', 'Снижение продуктивности', 'Утренняя усталость'],
    lastUsed: '2025-10-20',
    notes: 'Полностью исключил. Не стоит потерянного времени.'
  }
]

function Biohacking() {
  const [filter, setFilter] = useState('all')

  const filteredSubstances = mockSubstances.filter(s => {
    if (filter === 'all') return true
    return s.status === filter
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'use':
        return <CheckCircle2 size={18} className="status-use" />
      case 'caution':
        return <AlertTriangle size={18} className="status-caution" />
      case 'avoid':
        return <XCircle size={18} className="status-avoid" />
      default:
        return null
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'use':
        return 'Использую'
      case 'caution':
        return 'С осторожностью'
      case 'avoid':
        return 'Не использую'
      default:
        return status
    }
  }

  const getEffectIcon = (score) => {
    if (score > 0) return <TrendingUp size={16} className="effect-positive" />
    if (score < 0) return <TrendingDown size={16} className="effect-negative" />
    return <Minus size={16} className="effect-neutral" />
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'low':
        return 'risk-low'
      case 'medium':
        return 'risk-medium'
      case 'high':
        return 'risk-high'
      default:
        return ''
    }
  }

  const stats = {
    total: mockSubstances.length,
    using: mockSubstances.filter(s => s.status === 'use').length,
    caution: mockSubstances.filter(s => s.status === 'caution').length,
    avoiding: mockSubstances.filter(s => s.status === 'avoid').length
  }

  return (
    <div className="biohacking-page">
      <header className="bio-header">
        <div className="header-left">
          <h1>
            <Beaker size={28} />
            Биохакинг
          </h1>
          <p className="subtitle">Отслеживание веществ и практик</p>
        </div>
        <button className="add-btn">
          <Plus size={18} />
          Добавить
        </button>
      </header>

      <div className="bio-stats">
        <div className="stat-card use">
          <CheckCircle2 size={20} />
          <span className="stat-value">{stats.using}</span>
          <span className="stat-label">Использую</span>
        </div>
        <div className="stat-card caution">
          <AlertTriangle size={20} />
          <span className="stat-value">{stats.caution}</span>
          <span className="stat-label">С осторожностью</span>
        </div>
        <div className="stat-card avoid">
          <XCircle size={20} />
          <span className="stat-value">{stats.avoiding}</span>
          <span className="stat-label">Не использую</span>
        </div>
      </div>

      <div className="filter-bar">
        <Filter size={16} />
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={filter === 'use' ? 'active' : ''}
          onClick={() => setFilter('use')}
        >
          Использую
        </button>
        <button
          className={filter === 'caution' ? 'active' : ''}
          onClick={() => setFilter('caution')}
        >
          Осторожно
        </button>
        <button
          className={filter === 'avoid' ? 'active' : ''}
          onClick={() => setFilter('avoid')}
        >
          Избегаю
        </button>
      </div>

      <div className="substances-grid">
        {filteredSubstances.map((substance) => (
          <div key={substance.id} className={`substance-card ${substance.status}`}>
            <div className="substance-header">
              <div className="substance-status">
                {getStatusIcon(substance.status)}
                <span>{getStatusLabel(substance.status)}</span>
              </div>
              <div className="effect-score">
                {getEffectIcon(substance.effectScore)}
                <span className={substance.effectScore > 0 ? 'positive' : substance.effectScore < 0 ? 'negative' : ''}>
                  {substance.effectScore > 0 ? '+' : ''}{substance.effectScore}
                </span>
              </div>
            </div>

            <h3 className="substance-name">{substance.name}</h3>

            <div className={`risk-badge ${getRiskColor(substance.riskLevel)}`}>
              Риск: {substance.riskLevel === 'low' ? 'Низкий' : substance.riskLevel === 'medium' ? 'Средний' : 'Высокий'}
            </div>

            <div className="effects-section">
              <h4>Эффекты:</h4>
              <ul className="effects-list positive">
                {substance.mainEffects.map((effect, i) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </div>

            {substance.sideEffects.length > 0 && (
              <div className="effects-section">
                <h4>Побочные:</h4>
                <ul className="effects-list negative">
                  {substance.sideEffects.map((effect, i) => (
                    <li key={i}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="substance-notes">
              <p>{substance.notes}</p>
            </div>

            <div className="last-used">
              Последнее использование: {new Date(substance.lastUsed).toLocaleDateString('ru-RU')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Biohacking
