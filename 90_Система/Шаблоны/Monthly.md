---
type: monthly
month: <% tp.date.now("YYYY-MM") %>
month_name: <% tp.date.now("MMMM YYYY") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
mood_avg:
energy_avg:
burnout_avg:
tasks_completed:
work_hours_total:
consistency_percent:
tags:
  - monthly
  - review
---

# 📅 <% tp.date.now("MMMM YYYY", 0, tp.file.title, "YYYY-MM") %>

**Период:** 01.<% tp.date.now("MM.YYYY", 0, tp.file.title, "YYYY-MM") %> — конец месяца

---

## 📊 Автоматическая сводка месяца

```dataview
TABLE WITHOUT ID
  round(sum(rows.mood)/length(rows), 2) as "😊 Настр. ⌀",
  round(sum(rows.energy)/length(rows), 2) as "⚡ Энерг. ⌀",
  round(sum(rows.burnout_level)/length(rows), 2) as "🔥 Выгор. ⌀",
  length(rows) as "📅 Дней записано",
  round(length(rows) / 30 * 100) + "%" as "Consistency"
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month
GROUP BY true
```

### Тренд по неделям

```dataview
TABLE WITHOUT ID
  "Неделя " + (floor((file.day.day - 1) / 7) + 1) as "Неделя",
  round(sum(rows.mood)/length(rows), 1) as "😊",
  round(sum(rows.energy)/length(rows), 1) as "⚡",
  round(sum(rows.burnout_level)/length(rows), 1) as "🔥",
  length(rows) as "Дней"
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month
GROUP BY floor((file.day.day - 1) / 7)
SORT floor((file.day.day - 1) / 7) ASC
```

### Общее рабочее время

```dataviewjs
const month = dv.current().month;
const days = dv.pages('"07_Дневник/Ежедневные"')
  .where(p => dv.func.dateformat(p.file.day, "yyyy-MM") === month);

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

dv.paragraph(`**Всего часов:** ${totalHours.toFixed(1)}h | **Сессий:** ${sessions} | **⌀ в день:** ${(totalHours/30).toFixed(1)}h`);
```

---

## 🎯 Цели месяца

- [ ] Цель 1:
- [ ] Цель 2:
- [ ] Цель 3:

---

## 🔥 Главные достижения

> [!success] Что удалось достичь?

1.
2.
3.
4.
5.

---

## 📈 Прогресс по целям 2025

```dataview
TABLE WITHOUT ID
  file.link as "Цель",
  area as "Область",
  priority as "Приоритет",
  deadline as "Срок"
FROM ""
WHERE type = "goal"
SORT priority ASC
```

---

## 📊 Проекты

### Завершенные

```dataview
TABLE WITHOUT ID
  file.link as "Проект",
  start as "Начало",
  due as "Завершено"
FROM "02_Проекты" OR "05_Архив"
WHERE type = "project" AND status = "completed"
SORT due DESC
LIMIT 5
```

### Активные

```dataview
TABLE WITHOUT ID
  file.link as "Проект",
  priority as "Приоритет",
  round(length(filter(file.tasks, (t) => t.completed)) / max(length(file.tasks), 1) * 100) + "%" as "Прогресс"
FROM "02_Проекты"
WHERE type = "project" AND status = "active"
SORT priority ASC
```

---

## 📈 Метрики и статистика

### Продуктивность

- Завершено проектов:
- Выполнено A1 задач:
- Рабочих блоков:
- Среднее время в день:

### Здоровье и энергия

- Средняя энергия:
- Средний сон:
- Тренировки:

---

## 🧬 Биохакинг — Месячный анализ

### Использование веществ

```dataview
TABLE WITHOUT ID
  bio_substances as "Вещество",
  bio_details as "Детали",
  energy as "⚡"
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month AND bio_substances
SORT file.day ASC
```

### Топ веществ

```dataview
TABLE WITHOUT ID
  file.link as "Вещество",
  effect_score as "Эффект",
  status as "Статус"
FROM "09_Биохакинг/Вещества"
WHERE type = "substance"
SORT effect_score DESC
LIMIT 5
```

---

## 💰 Финансы месяца

**Доход:**

**Расходы:**

**Инвестиции:**

**Сбережения:**

```dataview
LIST WITHOUT ID
  finance
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month AND finance
SORT file.day ASC
```

---

## 📚 Обучение и развитие

**Книги прочитанные:**
-

**Курсы пройденные:**
-

**Новые навыки:**
-

---

## 💡 Главные инсайты

-
-
-

---

## 🚫 Паттерны месяца

### Триггеры стресса

```dataview
LIST WITHOUT ID
  trigger
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month AND trigger
```

### Что помогало

```dataview
LIST WITHOUT ID
  support
FROM "07_Дневник/Ежедневные"
WHERE dateformat(file.day, "yyyy-MM") = this.month AND support
```

---

## 📝 Недельные обзоры

```dataview
LIST
FROM "07_Дневник/Еженедельные"
SORT file.mtime DESC
LIMIT 4
```

---

## 📊 Анализ 80/20

**20% действий, давших 80% результата:**


**80% времени, потраченного впустую:**


---

## 🚫 Что перестать делать

→ Добавить в [[01_Хаб/Стоп_Лист|Стоп-лист]]:
-
-

---

## 🎯 Фокус на следующий месяц

### Приоритеты

1.
2.
3.

### Что изменить

-
-

### Привычки для формирования

- [ ]
- [ ]

---

## 📊 Оценка месяца

```dataviewjs
const current = dv.current();
const month = current.month;

const days = dv.pages('"07_Дневник/Ежедневные"')
  .where(p => dv.func.dateformat(p.file.day, "yyyy-MM") === month && p.mood);

if (days.length === 0) {
  dv.paragraph("📊 Заполните дневники для получения анализа.");
} else {
  const avgMood = days.map(d => d.mood).array().reduce((a, b) => a + b, 0) / days.length;
  const avgEnergy = days.map(d => d.energy).array().reduce((a, b) => a + b, 0) / days.length;
  const avgBurnout = days.map(d => d.burnout_level).array().reduce((a, b) => a + b, 0) / days.length;
  const consistency = Math.round(days.length / 30 * 100);

  let verdict = "";
  if (avgMood >= 4 && avgEnergy >= 4 && avgBurnout <= 2) {
    verdict = "🟢 **Отличный месяц!** Высокая продуктивность и стабильная энергия.";
  } else if (avgMood >= 3 && avgEnergy >= 3 && avgBurnout <= 3) {
    verdict = "🟡 **Хороший месяц.** Есть области для улучшения.";
  } else if (avgBurnout >= 4) {
    verdict = "🔴 **Месяц с высоким выгоранием!** Требуется серьезная корректировка.";
  } else {
    verdict = "⚠️ **Средний месяц.** Проанализируйте паттерны и скорректируйте стратегию.";
  }

  if (consistency < 70) {
    verdict += " ⚠️ Низкая consistency (" + consistency + "%)!";
  } else if (consistency >= 90) {
    verdict += " 🔥 Отличная consistency (" + consistency + "%)!";
  }

  dv.paragraph(verdict);
  dv.paragraph(`**Средние показатели:** 😊 ${avgMood.toFixed(1)} | ⚡ ${avgEnergy.toFixed(1)} | 🔥 ${avgBurnout.toFixed(1)}`);
}
```

---

## 🏆 Награда за месяц

> [!tip] Отметьте свой прогресс!
> Что вы сделаете, чтобы отметить успехи этого месяца?


---

**Предыдущий месяц**: [[<% tp.date.now("YYYY-MM", -1, tp.file.title, "YYYY-MM") %>]]
**Следующий месяц**: [[<% tp.date.now("YYYY-MM", 1, tp.file.title, "YYYY-MM") %>]]
**Вернуться**: [[01_Хаб/Главная|Главная]] | [[01_Хаб/Аналитика_Продуктивности|Аналитика]] | [[01_Хаб/Цели_2025|Цели 2025]]
