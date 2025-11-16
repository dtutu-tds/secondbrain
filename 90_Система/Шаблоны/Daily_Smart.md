<%*
// ========================================
// УМНЫЙ ДНЕВНИК - АДАПТИВНЫЙ К ВРЕМЕНИ СУТОК
// ========================================

const hour = moment().hour();
let timeContext = "";
let sections = [];

// Определяем контекст времени
if (hour >= 5 && hour < 12) {
    timeContext = "morning";
} else if (hour >= 12 && hour < 18) {
    timeContext = "day";
} else if (hour >= 18 && hour < 23) {
    timeContext = "evening";
} else {
    timeContext = "night";
}

// Получаем данные о вчерашнем дне для контекста
const yesterday = moment().subtract(1, 'days');
const yesterdayPath = `07_Дневник/Ежедневные/${yesterday.format("YYYY")}/${yesterday.format("MM")}-${yesterday.format("MMMM")}/${yesterday.format("DD-MM-YY")}.md`;
const yesterdayFile = app.vault.getAbstractFileByPath(yesterdayPath);
let yesterdayData = null;

if (yesterdayFile) {
    const content = await app.vault.read(yesterdayFile);
    // Извлекаем ключевые данные вчерашнего дня
    const energyMatch = content.match(/energy: (\d+)/);
    const moodMatch = content.match(/mood: (\d+)/);
    if (energyMatch) yesterdayData = { energy: parseInt(energyMatch[1]) };
    if (moodMatch && yesterdayData) yesterdayData.mood = parseInt(moodMatch[1]);
}

// Генерируем frontmatter
tR += `---
type: daily
date: ${moment().format("YYYY-MM-DD")}
created: ${moment().format("YYYY-MM-DD HH:mm")}
mode:
mood:
energy:
burnout_level:
sleep_quality:
tags:
  - daily
  - ${timeContext}
---

# ${moment().format("DD-MM-YY")} | ${moment().format("dddd")}

`;

// Утренний блок
if (timeContext === "morning" || timeContext === "night") {
    tR += `## 🌅 Утреннее планирование

### Состояние на старте дня

**Как спал (1-10):**
**Энергия на старте (1-10):**
**Одно слово про сегодня:**

`;

    if (yesterdayData) {
        tR += `> 📊 Вчера: энергия ${yesterdayData.energy || '?'}/10, настроение ${yesterdayData.mood || '?'}/10\n\n`;
    }

    tR += `### 🎯 Закон Трёх — Главные задачи

- [ ] **(A1)**
- [ ] **(A2)**
- [ ] **(A3)**

### ⏰ Блоки фокуса (когда буду работать без отвлечений)

| Время | Задача | Продолжительность |
|-------|--------|-------------------|
|  |  |  |

### 🚫 Что НЕ буду делать сегодня

-

`;
}

// Дневной блок (всегда показываем)
tR += `## ☀️ Дневной прогресс

### 📝 Лог действий

**Время | Что сделал | Результат**

-

### 💡 Инсайты и идеи

-

### 🧬 Здоровье / Биохакинг

health::
bio_substances::
water_liters::
steps::

### 💼 Рабочий лог

work::

`;

// Вечерний блок
if (timeContext === "evening" || timeContext === "night") {
    tR += `## 🌙 Вечерняя рефлексия

### ✅ Итоги дня

**Выполнено задач A1-A3:** /3

**Главное достижение дня:**


**Что дало 80% результата (Парето):**


### 📊 Оценка дня

mood::
energy::
burnout_level::
productivity::

### 🔄 Улучшения на завтра

**Что повторить:**


**Что изменить:**


**Чего избегать:**


### 🙏 Благодарность

1.
2.
3.

`;
}

// Финансы (опционально)
tR += `## 💰 Финансы (опционально)

finance::

---

## 📌 Контекст и триггеры

trigger::
support::
distraction::

---

## 🔗 Связи

**Проекты затронутые сегодня:**
-

**Люди с кем общался:**
-

**Идеи для развития:**
- [[06_Цеттелькастен/Мимолетные/]]

`;

// Автоматические рекомендации
tR += `---

## 💡 Автоматические рекомендации

\`\`\`dataviewjs
const today = dv.current();
let recommendations = [];

// Проверяем заполненность
if (!today.mood) recommendations.push("📊 Не забудь оценить настроение");
if (!today.energy) recommendations.push("⚡ Укажи уровень энергии");
if (!today.sleep_quality) recommendations.push("😴 Отметь качество сна");

// Проверяем привычки
const habits = dv.pages('"" WHERE type = "habit"');
if (habits.length > 0) {
    recommendations.push("🔄 Проверь трекинг привычек");
}

// Проверяем проекты
const activeProjects = dv.pages('"02_Проекты"').where(p => p.status != "completed");
if (activeProjects.length > 0) {
    recommendations.push(\`🎯 Активных проектов: \${activeProjects.length}\`);
}

if (recommendations.length > 0) {
    dv.list(recommendations);
} else {
    dv.paragraph("✅ Дневник заполнен полностью!");
}
\`\`\`
`;
_%>
