---
type: area
name: <% await tp.system.prompt("Название области ответственности") %>
status: 🟢 active
last_review: <% tp.date.now("YYYY-MM-DD") %>
review_frequency: monthly
tags:
  - area
  - responsibility
---

# 🏠 <% tp.frontmatter.name %>

## 🎯 Определение области

**Что это включает:**

**Почему важно:**

**Стандарт качества:**

---

## 📊 Текущее состояние

**Оценка (1-10):**

**Что работает хорошо:**
-

**Что требует улучшения:**
-

---

## 🎯 Связанные цели

```dataviewjs
const areaName = dv.current().name;
const goals = dv.pages('"01_Хаб"')
    .where(p => p.type === "goal" && p.area && p.area.includes(areaName));
if (goals.length > 0) {
    dv.list(goals.map(g => g.file.link));
} else {
    dv.paragraph("*Нет связанных целей*");
}
```

## 🚧 Активные проекты

```dataviewjs
const areaName = dv.current().name;
const projects = dv.pages('"02_Проекты"')
    .where(p => p.area && p.area.includes(areaName) && p.status !== "completed");
if (projects.length > 0) {
    dv.list(projects.map(p => p.file.link));
} else {
    dv.paragraph("*Нет активных проектов*");
}
```

---

## 📝 Ритуалы и рутины

**Ежедневно:**
-

**Еженедельно:**
-

**Ежемесячно:**
-

---

## 🔗 Ресурсы

-

---

## 📅 История обзоров

### <% tp.date.now("DD.MM.YYYY") %>

**Что изменилось:**

**Следующие шаги:**

---

*Следующий обзор: <% tp.date.now("YYYY-MM-DD", 30) %>*
