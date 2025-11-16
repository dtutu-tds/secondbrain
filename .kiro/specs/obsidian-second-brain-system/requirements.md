# Requirements Document

## Introduction

Данная спецификация описывает персональную систему управления знаниями и продуктивностью ("второй мозг") для Obsidian. Система включает ведение дневника в двух режимах (Lite/Full), управление проектами и задачами, журнал биохакинга, базовый учет рабочего времени и недельные обзоры. Система должна быть минималистичной (V1), работать на ПК и мобильных устройствах, и требовать не более 20 минут утром и 20 минут вечером для ведения дневника.

## Glossary

- **System**: Система управления знаниями в Obsidian Vault
- **User**: Пользователь системы
- **Daily Note**: Ежедневная заметка дневника
- **Vault**: Локальная папка Obsidian с заметками
- **Frontmatter**: YAML-метаданные в начале заметки
- **Template**: Шаблон для создания новых заметок
- **QuickAdd Command**: Команда быстрого создания/открытия заметок
- **Project**: Проект с задачами и дедлайном
- **Area**: Область ответственности
- **Goal**: Цель с приоритетом и дедлайном
- **Substance**: Вещество или практика в биохакинге
- **Dashboard**: Обзорная страница с агрегированной информацией
- **A1 Task**: Главная задача дня (приоритет A1)
- **Dataview Query**: Запрос для динамического отображения данных

## Requirements

### Requirement 1

**User Story:** Как пользователь, я хочу иметь структурированную файловую систему в Vault, чтобы все заметки были организованы по типам и назначению

#### Acceptance Criteria

1. THE System SHALL create a directory structure with folders: `00_Inbox/`, `01_Hub/`, `01_Hub/Lists/`, `02_Projects/`, `03_Areas/`, `04_Resources/`, `05_Archive/`, `06_Zeta/`, `06_Zeta/Fleeting/`, `06_Zeta/Literature/`, `06_Zeta/Permanent/`, `07_Journal/`, `07_Journal/Daily/`, `07_Journal/Weekly/`, `09_Bio/`, `80_Kanban/`, `90_System/`, `90_System/Templates/`, `90_System/Styles/`

2. THE System SHALL create key files: `01_Hub/Home.md`, `01_Hub/Goals_2025.md`, `01_Hub/Stop_List.md`, `01_Hub/Lists/Master_List.md`, `09_Bio/Bio_Dashboard.md`, `80_Kanban/Life_Board.md`, `90_System/System_Manual.md`

3. THE System SHALL ensure all created directories are empty except for specified key files

### Requirement 2

**User Story:** Как пользователь, я хочу вести дневник в двух режимах (Lite и Full), чтобы выбирать уровень детализации в зависимости от доступного времени

#### Acceptance Criteria

1. THE System SHALL provide a Daily_Lite template with sections: state check (one word + 1-2 phrases), one main task (A1), distraction-free time slot, optional free writing

2. THE System SHALL provide a Daily_Full template with sections: state check, Law of Three tasks (A1, A2, A3), A/B tasks from projects (Dataview query), small development step, health/biohacking/psychology, work log with time estimates, finances, evening reflection

3. THE System SHALL include frontmatter fields in daily templates: `type: daily`, `date`, `mode`, `mood` (1-5), `energy` (1-5), `burnout_level` (1-5), `tags: [daily]`

4. THE System SHALL include inline properties in daily templates: `health::`, `bio_substances::`, `bio_details::`, `work::`, `finance::`, `psych::`, `trigger::`, `support::`, `distraction_free::`

5. WHEN User creates a daily note, THE System SHALL auto-populate the date field with current date in YYYY-MM-DD format

6. THE System SHALL organize daily notes in hierarchical folder structure: `07_Journal/Daily/{YYYY}/{MM-MonthName}/` where YYYY is year and MM-MonthName is month number with full month name (e.g., "01-January")

7. THE System SHALL name daily note files using format DD-MM-YY.md where DD is day, MM is month, YY is two-digit year (e.g., "15-11-25.md")

### Requirement 3

**User Story:** Как пользователь, я хочу управлять проектами с приоритетами и дедлайнами, чтобы фокусироваться на важных задачах

#### Acceptance Criteria

1. THE System SHALL provide a Project template with frontmatter fields: `type: project`, `status` (active/on_hold/done), `area`, `start`, `due`, `priority` (A/B/C), `tags`

2. THE System SHALL include sections in Project template: result description, three key tasks (Law of Three), A/B priority tasks list, other tasks list

3. THE System SHALL support task format with priority markers: `- [ ] (A1)`, `- [ ] (A2)`, `- [ ] (B)`

4. THE System SHALL store project files in `02_Projects/` directory

### Requirement 4

**User Story:** Как пользователь, я хочу вести журнал биохакинга с веществами и практиками, чтобы отслеживать их эффективность и безопасность

#### Acceptance Criteria

1. THE System SHALL provide a Substance template with frontmatter fields: `type: substance`, `name`, `status` (✅ Использовать / ⚠️ Осторожно / 🚫 Не использовать), `first_tried`, `last_used`, `effect_score` (-5 to 5), `main_effects`, `side_effects`, `risk_level` (low/medium/high), `tags: [biohacking]`

2. THE System SHALL include sections in Substance template: decision rationale, usage conditions, history of experiments (Dataview query showing daily notes mentioning this substance)

3. THE System SHALL store substance files in `09_Bio/Substances/` directory

4. THE System SHALL provide Bio_Dashboard with three sections displaying substances grouped by status (✅/⚠️/🚫) using Dataview queries

### Requirement 5

**User Story:** Как пользователь, я хочу проводить недельные обзоры, чтобы анализировать прогресс и планировать следующую неделю

#### Acceptance Criteria

1. THE System SHALL provide a Weekly template with frontmatter fields: `type: weekly`, `week` (format: YYYY-[W]WW)

2. THE System SHALL include sections in Weekly template: three main results of the week, 80/20 analysis, small progress, main question (what to stop doing), plan for next week

3. THE System SHALL store weekly notes in `07_Journal/Weekly/` directory

4. WHEN User fills weekly review, THE System SHALL allow linking concrete items to `01_Hub/Stop_List.md`

### Requirement 6

**User Story:** Как пользователь, я хочу быстро создавать и открывать заметки через команды, чтобы минимизировать время на рутинные операции

#### Acceptance Criteria

1. THE System SHALL provide QuickAdd command `Daily_Lite` that checks for existing daily note at `07_Journal/Daily/{YYYY}/{MM-MonthName}/{DD-MM-YY}.md`, opens it if exists, or creates from Daily_Lite template if not

2. THE System SHALL provide QuickAdd command `Daily_Full` that checks for existing daily note at `07_Journal/Daily/{YYYY}/{MM-MonthName}/{DD-MM-YY}.md`, opens it if exists, or creates from Daily_Full template if not

3. THE System SHALL provide QuickAdd command `Work_Block` that accepts parameters (project, description, duration), opens current daily note at hierarchical path, finds or creates section "### Рабочий лог (оценка времени)", and appends line "- <duration> | <project> | <description> #clockify"

4. THE System SHALL provide QuickAdd command `New_Task` that accepts parameters (project_file, priority, text), opens selected project file, and adds task to appropriate section based on priority

5. THE System SHALL provide QuickAdd command `Bio_Stack` that accepts parameters (stack_name, substances, effect), opens current daily note at hierarchical path, and updates bio_substances and bio_details inline properties

6. WHEN User invokes any daily note command, THE System SHALL automatically create year and month folders if they do not exist

### Requirement 7

**User Story:** Как пользователь, я хочу иметь центральный дашборд (Home), чтобы быстро получать доступ ко всем ключевым функциям системы

#### Acceptance Criteria

1. THE System SHALL populate `01_Hub/Home.md` with sections: today's date, links to open Daily_Lite and Daily_Full, current day summary (Dataview query showing mode/mood/energy/burnout/A1), weekly focus, biohacking summary (Dataview query grouping substances by status)

2. WHEN User opens Home.md, THE System SHALL display current date and quick access links to daily note commands

3. THE System SHALL include Dataview queries in Home.md that dynamically show data from current daily note and substance files

### Requirement 8

**User Story:** Как пользователь, я хочу использовать шаблоны для целей, чтобы структурировать долгосрочное планирование

#### Acceptance Criteria

1. THE System SHALL provide a Goal template with frontmatter fields: `type: goal`, `area`, `deadline`, `priority` (A/B/C)

2. THE System SHALL include sections in Goal template: goal essence (present tense), why it matters, main steps (up to 7), one step for current week

3. THE System SHALL store goal files in appropriate location (not specified, defaults to `02_Projects/` or `03_Areas/`)

### Requirement 9

**User Story:** Как пользователь, я хочу вести оценочный учет рабочего времени по проектам, чтобы понимать распределение усилий

#### Acceptance Criteria

1. WHEN User logs work in daily note, THE System SHALL support format "~<duration> | <project> | <description> #clockify" in work log section

2. THE System SHALL allow duration format as "~1h", "~1.5h", "~0.5h"

3. THE System SHALL tag work log entries with #clockify for future aggregation

### Requirement 10

**User Story:** Как пользователь, я хочу применять принципы продуктивности (Закон трёх, 80/20, A1), чтобы фокусироваться на важном

#### Acceptance Criteria

1. THE System SHALL enforce Law of Three in Daily_Full template by providing exactly three task slots (A1, A2, A3)

2. THE System SHALL highlight A1 task as "one main task" in Daily_Lite template

3. THE System SHALL include 80/20 analysis section in Weekly template

4. THE System SHALL support priority markers (A1, A2, A3, B, C) in task format across all templates

5. THE System SHALL include reflection prompts in daily and weekly templates that encourage thinking about high-impact activities
