---
type: substance
name: <% tp.file.title %>
status: "⚠️ Осторожно"
first_tried: 
last_used: 
effect_score: 
main_effects: []
side_effects: []
risk_level: medium
tags: [biohacking]
---

# <% tp.file.title %>

## 📊 Решение

**Статус:** `status:: ⚠️ Осторожно`

**Обоснование:**



**Условия использования:**

- Дозировка: 
- Частота: 
- Время приёма: 
- Противопоказания: 

---

## 📝 История опытов

```dataview
TABLE 
  date as "Дата",
  bio_substances as "Вещества",
  bio_details as "Детали",
  mood as "Настроение",
  energy as "Энергия"
FROM "07_Дневник/Ежедневные"
WHERE contains(bio_substances, this.name) OR contains(file.outlinks, this.file.link)
SORT date DESC
LIMIT 20
```

---

## 🔬 Заметки и наблюдения

