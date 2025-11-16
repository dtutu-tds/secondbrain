---
type: monthly_review
month: <% tp.date.now("YYYY-MM") %>
month_name: <% tp.date.now("MMMM YYYY") %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - review
  - monthly
---

# 📊 Месячный обзор — <% tp.date.now("MMMM YYYY") %>

---

## 🎯 Главные результаты месяца

### ТОП-3 достижения

1.
2.
3.

### Что не получилось и почему

1.
2.
3.

---

## 📈 Статистика месяца

### Дневник

```dataviewjs
const month = "<% tp.date.now('YYYY-MM') %>";
const pages = dv.pages('"07_Дневник/Ежедневные"')
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") === month);

const daysInMonth = moment("<% tp.date.now('YYYY-MM') %>", "YYYY-MM").daysInMonth();
const filledDays = pages.length;
const percentage = ((filledDays / daysInMonth) * 100).toFixed(0);

dv.paragraph(`**Заполнено дней:** ${filledDays}/${daysInMonth} (${percentage}%)`);

// Средние показатели
let totalMood = 0, totalEnergy = 0, totalBurnout = 0, count = 0;
for (const p of pages) {
    if (p.mood) { totalMood += p.mood; count++; }
    if (p.energy) totalEnergy += p.energy;
    if (p.burnout_level) totalBurnout += p.burnout_level;
}

if (count > 0) {
    dv.paragraph(`**Среднее настроение:** ${(totalMood/count).toFixed(1)}/10`);
    dv.paragraph(`**Средняя энергия:** ${(totalEnergy/count).toFixed(1)}/10`);
    dv.paragraph(`**Среднее выгорание:** ${(totalBurnout/count).toFixed(1)}/10`);
}
```

### Выполнение задач A1

```dataviewjs
const month = "<% tp.date.now('YYYY-MM') %>";
const pages = dv.pages('"07_Дневник/Ежедневные"')
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") === month);

let completed = 0;
for (const p of pages) {
    const content = await dv.io.load(p.file.path);
    if (content.includes("- [x] **(A1)**") || content.includes("- [x] (A1)")) {
        completed++;
    }
}

const percentage = pages.length > 0 ? ((completed/pages.length) * 100).toFixed(0) : 0;
dv.paragraph(`**Процент выполнения A1:** ${percentage}% (${completed}/${pages.length})`);
```

---

## 🎯 Прогресс по целям

```dataview
TABLE WITHOUT ID
  file.link as "Цель",
  priority as "Приоритет",
  round((date(today) - file.mtime) / dur(1 day)) as "Дней с обновления"
FROM "01_Хаб"
WHERE type = "goal" OR contains(file.name, "Цел")
SORT priority ASC
```

**Оценка прогресса:**

| Цель | Прогресс (%) | Комментарий |
|------|--------------|-------------|
|  |  |  |

---

## 🚧 Проекты

### Завершённые в этом месяце

```dataview
LIST
FROM "05_Архив"
WHERE file.mtime >= date("<% tp.date.now('YYYY-MM-01') %>")
```

### Активные проекты

```dataview
TABLE WITHOUT ID
  file.link as "Проект",
  status as "Статус",
  priority as "Приоритет"
FROM "02_Проекты"
WHERE status != "completed"
SORT priority ASC
```

---

## 🧬 Здоровье и биохакинг

### Что работало

-

### Что не работало

-

### Изменения на следующий месяц

-

---

## 💰 Финансы

**Доходы:**

**Расходы:**

**Инвестиции:**

**Выводы:**

---

## 📚 Обучение и развитие

### Книги прочитанные/начатые

```dataview
LIST
FROM ""
WHERE type = "book" AND started >= date("<% tp.date.now('YYYY-MM-01') %>")
```

### Новые навыки

-

### Курсы/Обучение

-

---

## 🔄 Привычки

```dataview
TABLE WITHOUT ID
  file.link as "Привычка",
  streak as "Текущая серия",
  status as "Статус"
FROM ""
WHERE type = "habit"
SORT streak DESC
```

**Какие привычки укрепились:**

**Какие требуют корректировки:**

---

## 💡 Главные инсайты месяца

1.
2.
3.

---

## 🎯 Фокус на следующий месяц

### ТОП-3 приоритета

1.
2.
3.

### Что продолжать

-

### Что начать

-

### Что прекратить

-

---

## 📊 Оценка месяца

| Область | Оценка (1-10) | Комментарий |
|---------|---------------|-------------|
| Продуктивность |  |  |
| Здоровье |  |  |
| Финансы |  |  |
| Отношения |  |  |
| Обучение |  |  |
| Общее состояние |  |  |

**Общая оценка месяца:** /10

---

## 🙏 Благодарность

**За что благодарен этому месяцу:**

1.
2.
3.

---

*Создано: <% tp.date.now("DD.MM.YYYY") %>*
