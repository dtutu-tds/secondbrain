# Project Structure

## Directory Organization

```
Obsidian Vault Root/
├── 00_Inbox/              # Quick capture, unprocessed notes
├── 01_Hub/                # Command center and dashboards
│   ├── Lists/             # Master lists
│   ├── Home.md            # Main dashboard
│   ├── Goals_2025.md      # Annual goals
│   └── Stop_List.md       # Things to stop doing
├── 02_Projects/           # Active projects with tasks
├── 03_Areas/              # Areas of responsibility
├── 04_Resources/          # Reference materials
├── 05_Archive/            # Completed/inactive items
├── 06_Zeta/               # Zettelkasten notes
│   ├── Fleeting/          # Quick thoughts
│   ├── Literature/        # From reading/research
│   └── Permanent/         # Refined knowledge
├── 07_Journal/            # All journal entries
│   ├── Daily/             # Daily notes
│   │   └── YYYY/          # Year folders
│   │       └── MM-MonthName/  # Month folders (e.g., "01-January")
│   └── Weekly/            # Weekly reviews
├── 09_Bio/                # Biohacking tracking
│   ├── Substances/        # Individual substance notes
│   └── Bio_Dashboard.md   # Biohacking overview
├── 80_Kanban/             # Kanban boards
├── 90_System/             # System files
│   ├── Templates/         # Templater templates
│   ├── Styles/            # CSS customizations
│   └── System_Manual.md   # User guide
```

## Folder Naming Convention

- Numeric prefixes (00-90) control sort order
- Descriptive names in English
- Underscores for multi-word names

## Hierarchical Daily Notes

Daily notes use a three-level hierarchy:
- `07_Journal/Daily/{YYYY}/{MM-MonthName}/{DD-MM-YY}.md`
- Example: `07_Journal/Daily/2025/11-November/15-11-25.md`
- Folders auto-created by QuickAdd commands

## Key Files

### Hub Files
- `Home.md`: Central dashboard with quick links and Dataview summaries
- `Goals_2025.md`: Annual goal tracking
- `Stop_List.md`: Anti-goals, things to eliminate
- `Master_List.md`: Brain dump and task capture

### System Files
- `System_Manual.md`: Usage instructions and workflows
- Templates in `90_System/Templates/`:
  - `Daily_Lite.md`
  - `Daily_Full.md`
  - `Weekly.md`
  - `Project.md`
  - `Goal.md`
  - `Substance.md`

### Dashboard Files
- `Bio_Dashboard.md`: Biohacking substance overview
- `Life_Board.md`: Kanban board for life management

## File Relationships

- Daily notes reference projects via wikilinks
- Projects link to areas
- Goals link to areas
- Substance notes query daily notes via Dataview
- Weekly reviews reference daily notes from the week
- All notes can link to resources and Zettelkasten notes

## Metadata Structure

### Frontmatter (YAML)
- Always at top of file between `---` markers
- Contains structured data: type, dates, status, priorities
- Used by Dataview for queries

### Inline Properties
- Format: `key:: value`
- Used in daily notes for flexible data capture
- Examples: `health::`, `bio_substances::`, `trigger::`

## Archive Strategy

- Completed projects move to `05_Archive/`
- Old daily/weekly notes stay in place (organized by date)
- Inactive substances remain in `09_Bio/Substances/` with status update
