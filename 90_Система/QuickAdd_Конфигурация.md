# QuickAdd — Конфигурация команд

> [!info] Настройка QuickAdd
> Settings → QuickAdd → Manage Macros

---

## Основные команды

### 1. Daily_Full (Полный дневник)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Daily_Full.md
File Name Format: <% tp.date.now("DD-MM-YY") %>
Create in folder: 07_Дневник/Ежедневные/<% tp.date.now("YYYY") %>/<% tp.date.now("MM") %>-<% tp.date.now("MMMM", 0, "ru") %>
Open: ✅
```

### 2. Daily_Lite (Быстрый дневник)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Daily_Lite.md
File Name Format: <% tp.date.now("DD-MM-YY") %>
Create in folder: 07_Дневник/Ежедневные/<% tp.date.now("YYYY") %>/<% tp.date.now("MM") %>-<% tp.date.now("MMMM", 0, "ru") %>
Open: ✅
```

### 3. Weekly (Недельный обзор)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Weekly.md
File Name Format: <% tp.date.now("gggg-[W]ww") %>
Create in folder: 07_Дневник/Еженедельные
Open: ✅
```

### 4. Monthly (Месячный обзор)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Monthly.md
File Name Format: <% tp.date.now("YYYY-MM") %>
Create in folder: 07_Дневник/Ежемесячные
Open: ✅
```

### 5. New_Project (Новый проект)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Project.md
File Name Format: {{VALUE}}
Create in folder: 02_Проекты
Open: ✅
```

**Prompt:** "Название проекта:"

### 6. New_Goal (Новая цель)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Goal.md
File Name Format: {{VALUE}}
Create in folder: 01_Хаб
Open: ✅
```

**Prompt:** "Название цели:"

### 7. Bio_Stack (Биохакинг вещество)

**Настройка:**
```
Type: Template
Template Path: 90_Система/Шаблоны/Substance.md
File Name Format: {{VALUE}}
Create in folder: 09_Биохакинг/Вещества
Open: ✅
```

**Prompt:** "Название вещества:"

### 8. Work_Block (Рабочий блок)

**Настройка:**
```
Type: Capture
Capture to: Active file
Insert after: ## 💼 Рабочий лог
Format: - ~{{VALUE:Часы (например 1.5)}}h | {{VALUE:Проект}} | {{VALUE:Описание}} #clockify
```

### 9. Quick_Task (Быстрая задача)

**Настройка:**
```
Type: Capture
Capture to: Active file
Insert after: ## 🔥 Закон трёх
Format: - [ ] {{VALUE:Задача}}
```

### 10. Fleeting_Note (Мимолетная заметка)

**Настройка:**
```
Type: Capture
Capture to: 00_Входящие/Inbox.md
Format: - [ ] {{VALUE:Идея/Заметка}} ({{DATE:YYYY-MM-DD HH:mm}})
```

---

## Горячие клавиши

### Рекомендуемые shortcuts

| Команда | Shortcut | Описание |
|---------|----------|----------|
| Daily_Full | `Alt+D` | Создать полный дневник |
| Daily_Lite | `Alt+Shift+D` | Создать быстрый дневник |
| Weekly | `Alt+W` | Создать недельный обзор |
| Monthly | `Alt+M` | Создать месячный обзор |
| Work_Block | `Alt+L` | Залогировать работу |
| Quick_Task | `Alt+T` | Добавить задачу |
| Fleeting_Note | `Alt+N` | Быстрая заметка |

**Как настроить:**
Settings → Hotkeys → поиск "QuickAdd" → назначить клавиши

---

## Продвинутые макросы

### Morning Routine (Утренняя рутина)

**Macro steps:**
1. Daily_Full — создать дневник
2. Open file: [[01_Хаб/Главная]] — открыть дашборд
3. Execute command: "Focus on active file"

### Weekly Review (Недельный обзор)

**Macro steps:**
1. Weekly — создать недельную заметку
2. Open file: [[01_Хаб/Аналитика_Продуктивности]]
3. Execute command: "Focus on active file"

### End of Day (Конец дня)

**Macro steps:**
1. Capture to today's daily: "## 🌙 Вечерняя рефлексия"
2. Open today's daily note
3. Execute command: "Focus on active file"

---

## Интеграция с Buttons

После установки плагина Buttons, добавьте в главную страницу:

````markdown
```button
name 📝 Дневник
type command
action QuickAdd: Daily_Full
color blue
```

```button
name 📊 Недельный обзор
type command
action QuickAdd: Weekly
color green
```

```button
name ⏱️ Залогировать работу
type command
action QuickAdd: Work_Block
color purple
```
````

---

## Переменные Templater в QuickAdd

### Доступные переменные

```javascript
// Текущая дата
<% tp.date.now("YYYY-MM-DD") %>

// Дата файла (из имени)
<% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "DD-MM-YY") %>

// Название файла
<% tp.file.title %>

// Пользовательский ввод
{{VALUE:Prompt text}}

// Текущая дата и время
{{DATE:YYYY-MM-DD HH:mm}}

// Выбор из списка (в Templater)
<%*
const choice = await tp.system.suggester(
  ["Option 1", "Option 2"],
  ["value1", "value2"]
);
%>
```

---

## Troubleshooting

### QuickAdd не создает файлы

1. Проверьте путь к шаблону
2. Убедитесь, что папка существует
3. Проверьте формат имени файла

### Templater не работает в QuickAdd

1. Settings → Templater → Enable Folder Templates: ❌
2. Settings → QuickAdd → Use Templater: ✅
3. Перезапустите Obsidian

### Горячие клавиши не работают

1. Проверьте конфликты (Settings → Hotkeys)
2. Попробуйте другую комбинацию
3. Убедитесь, что QuickAdd включен

---

← [[90_Система/Руководство_Системы|Руководство]] | [[90_Система/Плагины_Расширения|Плагины]] | [[90_Система/Новые_Функции_V2|Новые функции]]
