<%*
// ========================================
// ТРИГГЕР ОБЗОРОВ - Автоматическая проверка
// ========================================

const moment = window.moment;
let needsAttention = [];

// === ПРОВЕРКА НЕДЕЛЬНОГО ОБЗОРА ===
const dayOfWeek = moment().day(); // 0 = воскресенье
const weekNum = moment().week();
const weekPath = `07_Дневник/Еженедельные/${moment().format("YYYY")}-W${String(weekNum).padStart(2, '0')}.md`;
const weekFile = app.vault.getAbstractFileByPath(weekPath);

if ((dayOfWeek === 0 || dayOfWeek === 6) && !weekFile) {
    needsAttention.push({
        type: "weekly",
        message: "📊 Пора провести недельный обзор",
        action: "Создайте недельный обзор используя шаблон Weekly",
        priority: "high"
    });
}

// === ПРОВЕРКА МЕСЯЧНОГО ОБЗОРА ===
const daysInMonth = moment().daysInMonth();
const currentDay = moment().date();
const daysLeft = daysInMonth - currentDay;

if (daysLeft <= 3 || currentDay <= 2) {
    const monthToReview = daysLeft <= 3 ? moment() : moment().subtract(1, 'month');
    const monthPath = `07_Дневник/Ежемесячные/${monthToReview.format("YYYY-MM")}.md`;
    const monthFile = app.vault.getAbstractFileByPath(monthPath);

    if (!monthFile) {
        needsAttention.push({
            type: "monthly",
            message: "📈 Время для месячного обзора",
            action: `Подведите итоги ${monthToReview.format("MMMM YYYY")}`,
            priority: "medium"
        });
    }
}

// === ПРОВЕРКА КВАРТАЛЬНОГО ОБЗОРА ===
const month = moment().month() + 1; // 1-12
const quarterEndMonths = [3, 6, 9, 12];
if (quarterEndMonths.includes(month) && daysLeft <= 5) {
    const quarter = Math.ceil(month / 3);
    const quarterPath = `07_Дневник/Ежеквартальные/${moment().format("YYYY")}-Q${quarter}.md`;
    const quarterFile = app.vault.getAbstractFileByPath(quarterPath);

    if (!quarterFile) {
        needsAttention.push({
            type: "quarterly",
            message: "🎯 Квартальный обзор",
            action: `Q${quarter} ${moment().format("YYYY")} заканчивается`,
            priority: "high"
        });
    }
}

// === ПРОВЕРКА ЦЕЛЕЙ ===
const goalFiles = app.vault.getMarkdownFiles().filter(f =>
    f.path.startsWith("01_Хаб/") && f.name.includes("Цел")
);

for (const gf of goalFiles) {
    const daysSinceUpdate = (Date.now() - gf.stat.mtime) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate > 14) {
        needsAttention.push({
            type: "goals",
            message: `🎯 Цели не обновлялись ${Math.floor(daysSinceUpdate)} дней`,
            action: "Пересмотрите прогресс целей",
            priority: "medium"
        });
        break;
    }
}

// === ПРОВЕРКА INBOX ===
const inboxFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("00_Входящие/"));
if (inboxFiles.length > 10) {
    needsAttention.push({
        type: "inbox",
        message: `📥 Inbox переполнен (${inboxFiles.length} заметок)`,
        action: "Выделите 15-20 минут на сортировку",
        priority: "high"
    });
} else if (inboxFiles.length > 5) {
    needsAttention.push({
        type: "inbox",
        message: `📥 Inbox требует внимания (${inboxFiles.length} заметок)`,
        action: "Обработайте входящие заметки",
        priority: "low"
    });
}

// === ПРОВЕРКА ПРОЕКТОВ ===
const projectFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("02_Проекты/"));
let staleProjects = [];

for (const pf of projectFiles) {
    const daysSinceUpdate = (Date.now() - pf.stat.mtime) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate > 7) {
        staleProjects.push(pf.basename);
    }
}

if (staleProjects.length > 0) {
    needsAttention.push({
        type: "projects",
        message: `🔄 ${staleProjects.length} проект(ов) без обновлений`,
        action: "Обновите статус или переместите в архив",
        priority: "medium"
    });
}

// === ПРОВЕРКА ПРИВЫЧЕК ===
const habitFiles = app.vault.getMarkdownFiles().filter(f => {
    const cache = app.metadataCache.getFileCache(f);
    return cache?.frontmatter?.type === "habit";
});

if (habitFiles.length > 0 && dayOfWeek === 1) { // Понедельник
    needsAttention.push({
        type: "habits",
        message: "🔄 Проверка привычек",
        action: "Обновите серии и проанализируйте прогресс",
        priority: "low"
    });
}

// === ГЕНЕРАЦИЯ ОТЧЁТА ===
if (needsAttention.length === 0) {
    tR += `# ✅ Система в порядке!\n\n`;
    tR += `Все обзоры актуальны, inbox чист, проекты обновлены.\n\n`;
    tR += `**Следующие действия:**\n`;
    tR += `- Продолжайте вести дневник\n`;
    tR += `- Развивайте Zettelkasten\n`;
    tR += `- Работайте над активными проектами\n`;
} else {
    tR += `# 🔔 Требует внимания\n\n`;

    // Сортируем по приоритету
    const highPriority = needsAttention.filter(n => n.priority === "high");
    const mediumPriority = needsAttention.filter(n => n.priority === "medium");
    const lowPriority = needsAttention.filter(n => n.priority === "low");

    if (highPriority.length > 0) {
        tR += `## 🔴 Высокий приоритет\n\n`;
        for (const item of highPriority) {
            tR += `### ${item.message}\n`;
            tR += `**Действие:** ${item.action}\n\n`;
        }
    }

    if (mediumPriority.length > 0) {
        tR += `## 🟡 Средний приоритет\n\n`;
        for (const item of mediumPriority) {
            tR += `### ${item.message}\n`;
            tR += `**Действие:** ${item.action}\n\n`;
        }
    }

    if (lowPriority.length > 0) {
        tR += `## 🟢 Низкий приоритет\n\n`;
        for (const item of lowPriority) {
            tR += `### ${item.message}\n`;
            tR += `**Действие:** ${item.action}\n\n`;
        }
    }
}

tR += `---\n\n`;
tR += `*Проверено: ${moment().format("DD.MM.YYYY HH:mm")}*\n`;
_%>
