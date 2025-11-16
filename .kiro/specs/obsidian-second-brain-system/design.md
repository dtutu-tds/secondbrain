# Design Document

## Overview

Система "второго мозга" для Obsidian представляет собой структурированный набор шаблонов, файловой организации и автоматизированных команд для управления знаниями, задачами и личной эффективностью. Дизайн фокусируется на минимализме (V1), простоте использования и быстром доступе к ключевым функциям.

### Design Principles

1. **Минимализм V1**: Только необходимые функции, без перегрузки
2. **Быстрый доступ**: Максимум 20 минут утром и вечером на дневник
3. **Кросс-платформенность**: Работа на ПК и мобильных устройствах
4. **Принципы продуктивности**: Закон трёх, A1-задача, 80/20, рефлексия
5. **Единый источник истины**: Все в Obsidian, без внешних таск-менеджеров

## Architecture

### Directory Structure

```
Obsidian Vault Root/
├── 00_Inbox/                    # Входящие заметки (быстрый захват)
├── 01_Hub/                      # Командный центр
│   ├── Home.md                  # Главный дашборд
│   ├── Goals_2025.md            # Цели на год
│   ├── Stop_List.md             # Список того, что перестать делать
│   └── Lists/
│       └── Master_List.md       # Мастер-список задач
├── 02_Projects/                 # Активные проекты
├── 03_Areas/                    # Области ответственности
├── 04_Resources/                # Справочные материалы
├── 05_Archive/                  # Архив завершенных проектов
├── 06_Zeta/                     # Zettelkasten заметки
│   ├── Fleeting/                # Мимолетные заметки
│   ├── Literature/              # Литературные заметки
│   └── Permanent/               # Постоянные заметки
├── 07_Journal/                  # Дневники
│   ├── Daily/                   # Ежедневные записи
│   │   ├── 2025/                # Год
│   │   │   ├── 01-January/      # Месяц
│   │   │   ├── 02-February/
│   │   │   └── ...
│   │   └── ...
│   └── Weekly/                  # Недельные обзоры
├── 09_Bio/                      # Биохакинг
│   ├── Bio_Dashboard.md         # Дашборд биохакинга
│   └── Substances/              # Вещества и практики
├── 80_Kanban/                   # Канбан-доски
│   └── Life_Board.md            # Общая доска жизни
└── 90_System/                   # Системные файлы
    ├── System_Manual.md         # Руководство по системе
    ├── Templates/               # Шаблоны Templater
    │   ├── Daily_Lite.md
    │   ├── Daily_Full.md
    │   ├── Weekly.md
    │   ├── Project.md
    │   ├── Goal.md
    │   └── Substance.md
    └── Styles/                  # CSS стили (опционально)
```

### Data Flow

```
User Input → QuickAdd Command → Template → Note Creation → Dataview Aggregation → Dashboard Display
                                    ↓
                              Frontmatter + Inline Properties
                                    ↓
                              Cross-linking & Queries
```

## Components and Interfaces

### 1. Template System (Templater)

#### Daily_Lite Template
- **Purpose**: Быстрый дневник для занятых дней
- **Time to complete**: 5-10 минут
- **Key sections**:
  - State check (1 слово + 1-2 фразы)
  - A1 task (одна главная задача)
  - Distraction-free time slot
  - Optional free writing
- **Frontmatter**: `type`, `date`, `mode`, `mood`, `energy`, `burnout_level`
- **Inline properties**: `trigger::`, `support::`, `distraction_free::`

#### Daily_Full Template
- **Purpose**: Полный дневник с детальной рефлексией
- **Time to complete**: 15-20 минут
- **Key sections**:
  - State check + honest text
  - Law of Three (A1, A2, A3 tasks)
  - A/B tasks from projects (Dataview query)
  - Small development step (health/skill/money/psych)
  - Health/Biohacking/Psychology
  - Work log with time estimates (#clockify)
  - Finances
  - Evening reflection (80/20 analysis)
- **Frontmatter**: Same as Daily_Lite
- **Inline properties**: `health::`, `bio_substances::`, `bio_details::`, `work::`, `finance::`, `psych::`, `trigger::`, `support::`

#### Weekly Template
- **Purpose**: Недельный обзор и планирование
- **Time to complete**: 20-30 минут
- **Key sections**:
  - Three main results
  - 80/20 analysis
  - Small progress (1% improvement)
  - Main question (what to stop doing)
  - Plan for next week
- **Frontmatter**: `type: weekly`, `week: YYYY-[W]WW`

#### Project Template
- **Purpose**: Структура проекта с задачами
- **Key sections**:
  - Result description (ideal completion state)
  - Three key tasks (Law of Three)
  - A/B priority tasks
  - Other tasks
- **Frontmatter**: `type`, `status`, `area`, `start`, `due`, `priority`, `tags`

#### Goal Template
- **Purpose**: Долгосрочные цели
- **Key sections**:
  - Goal essence (present tense)
  - Why it matters
  - Main steps (up to 7)
  - One step for current week
- **Frontmatter**: `type`, `area`, `deadline`, `priority`

#### Substance Template
- **Purpose**: Отслеживание веществ/практик биохакинга
- **Key sections**:
  - Decision (status, rationale, usage conditions)
  - History of experiments (Dataview query)
- **Frontmatter**: `type`, `name`, `status`, `first_tried`, `last_used`, `effect_score`, `main_effects`, `side_effects`, `risk_level`, `tags`

### 2. QuickAdd Commands

#### Command: Daily_Lite
```javascript
// Pseudo-code
function dailyLite() {
  const year = moment().format('YYYY');
  const month = moment().format('MM-MMMM'); // e.g., "01-January"
  const filename = moment().format('DD-MM-YY'); // e.g., "15-11-25"
  const filePath = `07_Journal/Daily/${year}/${month}/${filename}.md`;
  
  if (fileExists(filePath)) {
    openFile(filePath);
  } else {
    createFromTemplate('Daily_Lite.md', filePath);
  }
}
```

#### Command: Daily_Full
```javascript
// Pseudo-code
function dailyFull() {
  const year = moment().format('YYYY');
  const month = moment().format('MM-MMMM'); // e.g., "01-January"
  const filename = moment().format('DD-MM-YY'); // e.g., "15-11-25"
  const filePath = `07_Journal/Daily/${year}/${month}/${filename}.md`;
  
  if (fileExists(filePath)) {
    openFile(filePath);
  } else {
    createFromTemplate('Daily_Full.md', filePath);
  }
}
```

#### Command: Work_Block
```javascript
// Pseudo-code
function workBlock(project, description, duration) {
  const year = moment().format('YYYY');
  const month = moment().format('MM-MMMM');
  const filename = moment().format('DD-MM-YY');
  const filePath = `07_Journal/Daily/${year}/${month}/${filename}.md`;
  
  openFile(filePath);
  
  const section = findOrCreateSection('### Рабочий лог (оценка времени)');
  appendToSection(section, `- ${duration} | ${project} | ${description} #clockify`);
}
```

#### Command: New_Task
```javascript
// Pseudo-code
function newTask(projectFile, priority, text) {
  openFile(projectFile);
  
  if (priority === 'A' || priority === 'B') {
    const section = findSection('Важные:');
    appendToSection(section, `- [ ] (${priority}) ${text}`);
  } else {
    const section = findSection('Остальное:');
    appendToSection(section, `- [ ] ${text}`);
  }
}
```

#### Command: Bio_Stack
```javascript
// Pseudo-code
function bioStack(stackName, substances, effect) {
  const year = moment().format('YYYY');
  const month = moment().format('MM-MMMM');
  const filename = moment().format('DD-MM-YY');
  const filePath = `07_Journal/Daily/${year}/${month}/${filename}.md`;
  
  openFile(filePath);
  
  // Update inline properties
  appendOrUpdateProperty('bio_substances::', substances, '; ');
  appendOrUpdateProperty('bio_details::', `${stackName}: ${effect}`, '\n');
}
```

### 3. Dashboard System

#### Home Dashboard (`01_Hub/Home.md`)
- **Purpose**: Центральная точка входа в систему
- **Components**:
  - Current date display
  - Quick links to Daily_Lite and Daily_Full commands
  - Current day summary (Dataview)
  - Weekly focus link
  - Biohacking summary (Dataview)
  - Optional: Work hours summary (Dataview)

**Dataview Queries**:
```dataview
// Current day summary
TABLE mode, mood, energy, burnout_level
FROM "07_Journal/Daily"
WHERE date = date(today)
```

```dataview
// Biohacking summary
TABLE status, length(rows) as count
FROM "09_Bio/Substances"
GROUP BY status
```

#### Bio Dashboard (`09_Bio/Bio_Dashboard.md`)
- **Purpose**: Обзор всех веществ и практик биохакинга
- **Components**:
  - ✅ Substances to use (Dataview)
  - ⚠️ Use with caution (Dataview)
  - 🚫 Do not use (Dataview)

**Dataview Queries**:
```dataview
// Substances by status
TABLE name, effect_score, main_effects, side_effects
FROM "09_Bio/Substances"
WHERE status = "✅ Использовать"
SORT effect_score DESC
```

## Data Models

### Daily Note Model
```yaml
---
type: daily
date: YYYY-MM-DD
mode: work | study | mixed | rest
mood: 1-5
energy: 1-5
burnout_level: 1-5
tags: [daily]
---

# Inline Properties (in body)
health:: <string>
bio_substances:: <string | wikilinks>
bio_details:: <string>
work:: <string>
finance:: <string>
psych:: <string>
trigger:: <string>
support:: <string>
distraction_free:: <string>
```

### Project Model
```yaml
---
type: project
status: active | on_hold | done
area: <string>
start: YYYY-MM-DD
due: YYYY-MM-DD | null
priority: A | B | C
tags: [tag1, tag2]
---
```

### Goal Model
```yaml
---
type: goal
area: <string>
deadline: YYYY-MM-DD | null
priority: A | B | C
---
```

### Substance Model
```yaml
---
type: substance
name: <string>
status: "✅ Использовать" | "⚠️ Осторожно" | "🚫 Не использовать"
first_tried: YYYY-MM-DD | null
last_used: YYYY-MM-DD | null
effect_score: -5 to 5 | null
main_effects: [string, ...]
side_effects: [string, ...]
risk_level: low | medium | high
tags: [biohacking]
---
```

### Weekly Note Model
```yaml
---
type: weekly
week: YYYY-[W]WW
---
```

## Error Handling

### Template Creation Errors
- **Issue**: Template file not found
- **Solution**: Provide clear error message with path to expected template location
- **Fallback**: Create basic note with minimal frontmatter

### QuickAdd Command Errors
- **Issue**: Daily note already exists but in wrong format
- **Solution**: Open existing note, do not overwrite
- **User action**: Manual merge if needed

### Dataview Query Errors
- **Issue**: No data found for query
- **Solution**: Display "No data available" message
- **Fallback**: Empty table with headers

### File Path Errors
- **Issue**: Directory structure not created
- **Solution**: QuickAdd should create missing directories automatically
- **Fallback**: Prompt user to run initial setup

### Invalid Frontmatter
- **Issue**: User enters invalid value (e.g., mood: 10)
- **Solution**: No automatic validation in V1
- **Future**: Add validation via Dataview or custom plugin

## Testing Strategy

### Manual Testing Checklist

#### Template Testing
1. Create daily note with Daily_Lite template
   - Verify frontmatter fields auto-populate
   - Verify date format is correct
   - Verify all sections are present
2. Create daily note with Daily_Full template
   - Verify all sections including Dataview query
   - Verify inline properties are present
3. Create weekly note
   - Verify week number format (YYYY-[W]WW)
4. Create project note
   - Verify task sections structure
5. Create goal note
   - Verify all sections present
6. Create substance note
   - Verify Dataview query for history

#### QuickAdd Command Testing
1. Test Daily_Lite command
   - First run: creates new note
   - Second run: opens existing note
2. Test Daily_Full command
   - Same as Daily_Lite
3. Test Work_Block command
   - Verify work log entry format
   - Verify #clockify tag added
4. Test New_Task command
   - Test with priority A
   - Test with priority B
   - Test with no priority
5. Test Bio_Stack command
   - Verify bio_substances updated
   - Verify bio_details updated
   - Test multiple runs (append behavior)

#### Dashboard Testing
1. Test Home.md
   - Verify current date displays
   - Verify Dataview queries work
   - Test quick links (if using Advanced URI)
2. Test Bio_Dashboard.md
   - Create test substances with different statuses
   - Verify grouping by status works
   - Verify sorting by effect_score

#### Cross-Platform Testing
1. Desktop (Windows/Mac/Linux)
   - All templates work
   - All QuickAdd commands work
   - All Dataview queries render
2. Mobile (iOS/Android)
   - Templates accessible
   - QuickAdd commands accessible (via mobile toolbar)
   - Dataview queries render
   - Inline properties editable

#### Integration Testing
1. Full daily workflow
   - Morning: Create Daily_Lite, set A1 task
   - Midday: Log work blocks
   - Evening: Add reflection
2. Weekly workflow
   - Create weekly note
   - Review daily notes from past week
   - Plan next week
3. Project workflow
   - Create project
   - Add tasks
   - Link tasks to daily notes
   - Mark tasks complete
4. Biohacking workflow
   - Create substance
   - Log in daily note
   - View in Bio_Dashboard
   - Check history in substance note

### Validation Criteria

#### Success Metrics
- Daily note creation time: < 2 minutes
- Work block logging time: < 30 seconds
- Task creation time: < 1 minute
- Weekly review completion time: < 30 minutes
- All Dataview queries execute in < 2 seconds

#### Quality Metrics
- All templates have correct frontmatter structure
- All QuickAdd commands execute without errors
- All Dataview queries return expected results
- No broken wikilinks in generated notes
- Mobile compatibility: all core functions accessible

## Implementation Notes

### Plugin Dependencies
- **Core Plugins**:
  - Templates (built-in)
  - Properties (built-in)
- **Community Plugins**:
  - Templater (required for dynamic templates)
  - Dataview (required for queries)
  - QuickAdd (required for commands)
  - Advanced URI (optional, for Home.md links)

### Configuration Files
- QuickAdd configuration will be stored in `.obsidian/plugins/quickadd/data.json`
- Templater configuration will be stored in `.obsidian/plugins/templater-obsidian/data.json`
- These files should be generated/updated during implementation

### Mobile Considerations
- QuickAdd commands should be accessible via mobile toolbar
- Templates should work on mobile (Templater mobile support)
- Dataview queries should render on mobile
- Inline properties should be editable via mobile properties panel

### Future Enhancements (Not in V1)
- Monthly/Yearly review templates
- Advanced time tracking analytics
- Intake notes for each substance dose
- Automated habit tracking
- Goal progress visualization
- Project timeline views
