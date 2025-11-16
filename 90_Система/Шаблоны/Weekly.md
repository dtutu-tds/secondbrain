---
type: weekly
week: <% tp.date.now("gggg-[W]ww") %>
week_start: <% tp.date.now("YYYY-MM-DD", 0, tp.date.now("YYYY-MM-DD"), "YYYY-MM-DD") %>
week_end: <% tp.date.now("YYYY-MM-DD", 6, tp.date.now("YYYY-MM-DD"), "YYYY-MM-DD") %>
mood_avg:
energy_avg:
burnout_avg:
tasks_completed:
work_hours:
tags:
  - weekly
  - review
---

# Недельный обзор: Неделя <% tp.date.now("gggg-[W]ww") %>

**Период:** <% tp.date.now("DD.MM") %> — <% tp.date.now("DD.MM", 6) %>

---

## 📊 Автоматическая сводка недели

```dataview
TABLE WITHOUT ID
  round(sum(rows.mood)/length(rows), 1) as "😊 Настр. ⌀",
  round(sum(rows.energy)/length(rows), 1) as "⚡ Энерг. ⌀",
  round(sum(rows.burnout_level)/length(rows), 1) as "🔥 Выгор. ⌀",
  length(rows) as "📅 Дней записано",
  round(length(rows) / 7 * 100) + "%" as "Consistency"
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end
GROUP BY true
```

### Тренд по дням

```dataview
TABLE WITHOUT ID
  dateformat(file.day, "EEE dd.MM") as "День",
  mood as "😊",
  energy as "⚡",
  burnout_level as "🔥",
  mode as "Режим"
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end
SORT file.day ASC
```

### Рабочее время

```dataviewjs
const weekStart = dv.current().week_start;
const weekEnd = dv.current().week_end;
const days = dv.pages('"07_Дневник/Ежедневные"')
  .where(p => p.file.day >= weekStart && p.file.day <= weekEnd);

let totalHours = 0;
let sessions = 0;

for (let day of days) {
  const lists = day.file.lists.where(l => l.text && l.text.includes("#clockify"));
  for (let item of lists) {
    const match = item.text.match(/~(\d+\.?\d*)/);
    if (match) {
      totalHours += parseFloat(match[1]);
      sessions++;
    }
  }
}

dv.paragraph(`**Всего часов:** ${totalHours.toFixed(1)}h | **Сессий:** ${sessions} | **⌀ в день:** ${(totalHours/7).toFixed(1)}h`);
```

---

## 🎯 Три главных результата недели

> [!success] Что удалось достичь?

1.
2.
3.

---

## ✅ Выполненные задачи

```dataview
TASK
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND completed
LIMIT 15
```

### Невыполненные важные задачи

```dataview
TASK
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND !completed
LIMIT 10
```

---

## 📈 Прогресс проектов

```dataview
TABLE WITHOUT ID
  file.link as "Проект",
  status as "Статус",
  round(length(filter(file.tasks, (t) => t.completed)) / max(length(file.tasks), 1) * 100) + "%" as "Прогресс",
  length(filter(file.tasks, (t) => !t.completed)) as "Осталось"
FROM "02_Проекты"
WHERE type = "project" AND status = "active"
SORT priority ASC
LIMIT 5
```

---

## 🧬 Здоровье и биохакинг

### Использованные вещества

```dataview
LIST WITHOUT ID
  bio_substances + " → " + bio_details
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND bio_substances
SORT file.day ASC
```

### Здоровье

```dataview
LIST WITHOUT ID
  dateformat(file.day, "EEE") + ": " + health
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND health
SORT file.day ASC
```

---

## 📊 Анализ 80/20

**Что дало 80% результата (20% действий)?**


**Что отняло время, но дало мало результата?**


---

## 📈 Маленький прогресс (1%)

**В чём я стал лучше на 1% на этой неделе?**

- Здоровье:
- Навыки:
- Финансы:
- Психика:

---

## 🚫 Триггеры и паттерны

### Что вызывало стресс

```dataview
LIST WITHOUT ID
  trigger
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND trigger
```

### Что помогало

```dataview
LIST WITHOUT ID
  support
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND support
```

---

## ❓ Главный вопрос недели

**Что мне стоит перестать делать?**


→ Добавить в [[01_Хаб/Стоп_Лист|Стоп-лист]]:

---

## 💰 Финансы недели

```dataview
LIST WITHOUT ID
  dateformat(file.day, "dd.MM") + ": " + finance
FROM "07_Дневник/Ежедневные"
WHERE file.day >= this.week_start AND file.day <= this.week_end AND finance
SORT file.day ASC
```

---

## 📚 Обучение

**Что изучил:**


**Книги/Курсы:**


---

## 📅 План на следующую неделю

### Три ключевых фокуса

1.
2.
3.

### Конкретные действия

- [ ] **(A1)**
- [ ] **(A2)**
- [ ] **(A3)**
- [ ]
- [ ]

### Что НЕ делать

- [ ]
- [ ]

---

## 🔗 Навигация

**← Предыдущая неделя:** [[<% tp.date.now("gggg-[W]ww", -7) %>]]
**→ Следующая неделя:** [[<% tp.date.now("gggg-[W]ww", 7) %>]]

**← [[01_Хаб/Главная|Главная]]** | **[[01_Хаб/Аналитика_Продуктивности|Аналитика]]**

---

## 📊 Оценка недели

```dataviewjs
const current = dv.current();
const weekStart = current.week_start;
const weekEnd = current.week_end;

const days = dv.pages('"07_Дневник/Ежедневные"')
  .where(p => p.file.day >= weekStart && p.file.day <= weekEnd && p.mood);

if (days.length === 0) {
  dv.paragraph("📊 Заполните дневники для получения анализа.");
} else {
  const avgMood = days.map(d => d.mood).array().reduce((a, b) => a + b, 0) / days.length;
  const avgEnergy = days.map(d => d.energy).array().reduce((a, b) => a + b, 0) / days.length;
  const avgBurnout = days.map(d => d.burnout_level).array().reduce((a, b) => a + b, 0) / days.length;
  const consistency = Math.round(days.length / 7 * 100);

  let verdict = "";
  if (avgMood >= 4 && avgEnergy >= 4 && avgBurnout <= 2) {
    verdict = "🟢 **Отличная неделя!** Высокая продуктивность и энергия.";
  } else if (avgMood >= 3 && avgEnergy >= 3 && avgBurnout <= 3) {
    verdict = "🟡 **Хорошая неделя.** Есть пространство для улучшений.";
  } else if (avgBurnout >= 4) {
    verdict = "🔴 **Высокое выгорание!** Нужен отдых и пересмотр нагрузки.";
  } else {
    verdict = "⚠️ **Средняя неделя.** Проанализируйте, что можно улучшить.";
  }

  if (consistency < 70) {
    verdict += " ⚠️ Низкая consistency — заполняйте дневник каждый день!";
  }

  dv.paragraph(verdict);
}
```
