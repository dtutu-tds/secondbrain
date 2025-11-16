<%*
// ========================================
// УМНЫЙ СТАРТАП - КОНТЕКСТНАЯ АВТОМАТИЗАЦИЯ
// ========================================

const moment = window.moment;
moment.locale('ru'); // Устанавливаем русскую локаль
const dv = app.plugins.plugins.dataview?.api;

// Маппинг месяцев для путей
const monthMap = {
    "01": "01-Январь", "02": "02-Февраль", "03": "03-Март",
    "04": "04-Апрель", "05": "05-Май", "06": "06-Июнь",
    "07": "07-Июль", "08": "08-Август", "09": "09-Сентябрь",
    "10": "10-Октябрь", "11": "11-Ноябрь", "12": "12-Декабрь"
};

// Определяем время суток
const hour = moment().hour();
let timeOfDay = "";
let greeting = "";
let emoji = "";

if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
    greeting = "Доброе утро";
    emoji = "🌅";
} else if (hour >= 12 && hour < 18) {
    timeOfDay = "day";
    greeting = "Добрый день";
    emoji = "☀️";
} else if (hour >= 18 && hour < 23) {
    timeOfDay = "evening";
    greeting = "Добрый вечер";
    emoji = "🌙";
} else {
    timeOfDay = "night";
    greeting = "Доброй ночи";
    emoji = "🌃";
}

// Проверяем существование заметки на сегодня
const today = moment().format("DD-MM-YY");
const currentMonth = monthMap[moment().format("MM")];
const todayPath = `07_Дневник/Ежедневные/${moment().format("YYYY")}/${currentMonth}/${today}.md`;
const dailyFile = app.vault.getAbstractFileByPath(todayPath);

// Собираем статистику хранилища
let stats = {
    inboxCount: 0,
    projectsWithoutUpdates: 0,
    goalsWithoutProgress: 0,
    emptyAreas: 0,
    weeklyReviewDue: false,
    monthlyReviewDue: false
};

// Проверяем Inbox
const inboxFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("00_Входящие/"));
stats.inboxCount = inboxFiles.length;

// Проверяем проекты без обновлений (>7 дней)
const projectFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("02_Проекты/"));
for (const pf of projectFiles) {
    const mtime = pf.stat.mtime;
    const daysSinceUpdate = (Date.now() - mtime) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate > 7) stats.projectsWithoutUpdates++;
}

// Проверяем недельный обзор
const weekNumber = moment().week();
const weeklyPath = `07_Дневник/Еженедельные/${moment().format("YYYY")}-W${String(weekNumber).padStart(2, '0')}.md`;
const weeklyFile = app.vault.getAbstractFileByPath(weeklyPath);
const dayOfWeek = moment().day();
if (dayOfWeek === 0 && !weeklyFile) stats.weeklyReviewDue = true; // Воскресенье

// Проверяем месячный обзор
const lastDayOfMonth = moment().endOf('month').date();
const currentDay = moment().date();
if (currentDay === lastDayOfMonth || currentDay === 1) {
    const monthlyPath = `07_Дневник/Ежемесячные/${moment().format("YYYY-MM")}.md`;
    const monthlyFile = app.vault.getAbstractFileByPath(monthlyPath);
    if (!monthlyFile) stats.monthlyReviewDue = true;
}

// Анализируем заполненность дневника
let dailyCompleteness = 0;
let missingFields = [];

if (dailyFile) {
    const content = await app.vault.read(dailyFile);

    // Проверяем ключевые поля
    if (!content.includes("mood: ") || content.match(/mood: \s*$/m)) missingFields.push("настроение");
    if (!content.includes("energy: ") || content.match(/energy: \s*$/m)) missingFields.push("энергия");
    if (!content.includes("(A1)") || content.match(/\(A1\)\s*$/m)) missingFields.push("задача A1");
    if (timeOfDay === "evening" && !content.includes("80/20")) missingFields.push("вечерняя рефлексия");

    dailyCompleteness = 100 - (missingFields.length * 25);
}

// Формируем умные предложения
let suggestions = [];

if (!dailyFile) {
    if (timeOfDay === "morning") {
        suggestions.push("📝 Создать дневник и спланировать день");
    } else if (timeOfDay === "day") {
        suggestions.push("📝 Создать дневник и записать утренние достижения");
    } else {
        suggestions.push("📝 Создать дневник и подвести итоги дня");
    }
} else if (missingFields.length > 0) {
    suggestions.push(`✏️ Дополнить дневник: ${missingFields.join(", ")}`);
}

if (stats.inboxCount > 5) {
    suggestions.push(`📥 Обработать Inbox (${stats.inboxCount} заметок)`);
}

if (stats.projectsWithoutUpdates > 0) {
    suggestions.push(`🔄 Обновить проекты (${stats.projectsWithoutUpdates} без обновлений)`);
}

if (stats.weeklyReviewDue) {
    suggestions.push("📊 Провести недельный обзор");
}

if (stats.monthlyReviewDue) {
    suggestions.push("📈 Провести месячный обзор");
}

// Выводим результат
tR += `${emoji} **${greeting}!**\n\n`;
tR += `📅 **${moment().format("DD MMMM YYYY, dddd")}**\n\n`;

if (dailyFile) {
    tR += `### 📓 Дневник на сегодня\n`;
    tR += `**Заполненность:** ${dailyCompleteness}%\n`;
    if (missingFields.length > 0) {
        tR += `**Не заполнено:** ${missingFields.join(", ")}\n`;
    }
    tR += `[[${todayPath}|Открыть дневник]]\n\n`;
} else {
    tR += `### 📓 Дневник на сегодня\n`;
    tR += `⚠️ **Заметка не создана**\n\n`;
}

if (suggestions.length > 0) {
    tR += `### 💡 Рекомендации\n`;
    for (const s of suggestions) {
        tR += `- ${s}\n`;
    }
    tR += `\n`;
}

// Контекстные вопросы в зависимости от времени суток
tR += `### 🎯 Контекстный вопрос\n`;

if (timeOfDay === "morning") {
    tR += `**Какая ОДНА задача сделает этот день успешным?**\n\n`;
    tR += `> _Запиши задачу A1 в дневник прямо сейчас_\n`;
} else if (timeOfDay === "day") {
    tR += `**Что ты уже сделал сегодня? Какой прогресс?**\n\n`;
    tR += `> _Обнови статус задач в дневнике_\n`;
} else if (timeOfDay === "evening") {
    tR += `**Что дало 80% результата сегодня?**\n\n`;
    tR += `> _Заполни вечернюю рефлексию в дневнике_\n`;
} else {
    tR += `**Завтра начнётся с чего?**\n\n`;
    tR += `> _Подготовь план на завтра_\n`;
}

// Быстрые действия
tR += `\n### ⚡ Быстрые действия\n`;
tR += `- [Создать Lite дневник](obsidian://advanced-uri?vault=secondbrain&commandid=quickadd:daily_lite)\n`;
tR += `- [Создать Full дневник](obsidian://advanced-uri?vault=secondbrain&commandid=quickadd:daily_full)\n`;
tR += `- [Быстрая задача](obsidian://advanced-uri?vault=secondbrain&commandid=quickadd:new_task)\n`;
tR += `- [Быстрая идея](obsidian://advanced-uri?vault=secondbrain&commandid=quickadd:quick_idea)\n`;
_%>
