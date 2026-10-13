# Interview Practice Tracker

A modern, responsive, and intuitive web application designed for students and engineers to organize their weekly interview preparation, track problem-solving milestones across **DSA**, **Git**, and **Technical** questions, and visualize prep velocity in real time.

Built with **React**, **Vite**, modern **Vanilla CSS**, and **LocalStorage** persistence.

---

## 🚀 Main Features

### 1. Dynamic Metric Dashboard
- **Total Questions Count**: Tracks the total volume of interview problems and topics logged.
- **Completed DSA Problems**: Automatically tallies Data Structures & Algorithms problems marked as `Completed`.
- **Completed Interview Questions**: Calculates the combined sum of completed `Technical` and `Git` questions with clear attribution.
- **Machine-Coding Status**: Dedicated milestone tracker for machine-coding rounds (`Not Started`, `In Progress`, `Completed`) with direct interactive updating and independent browser persistence.

### 2. Real-Time Progress Visualization
- **Overall Completion Rate**: Visual circular indicator displaying the percentage of total questions solved (`totalCompleted / total * 100`).
- **Category Progress Bars**: Granular progress bars for DSA, Git, and Technical categories with instant visual feedback.
- **Safe Fallbacks**: Guaranteed `0%` display with zero `NaN` or layout errors when no questions are present.

### 3. Comprehensive Question Management (CRUD)
- **Add Question**: Modal dialog with input validation, title whitespace trimming, category selector, difficulty rating, and optional solution notes.
- **Edit Question**: Inline modification of existing entries preserving creation timestamps.
- **Delete Question**: Safe deletion protected by an accessible confirmation dialog preventing accidental data loss.
- **Direct Status Toggle**: Switch a question's status directly between `Pending`, `In Progress`, and `Completed` from its badge dropdown.
- **Custom Notes**: Rich notes box for formulas, edge cases, and time/space complexity notes.

### 4. Search, Filtering, and Sorting
- **Live Search**: Fast, case-insensitive title search with instantaneous result updates and one-click clear button.
- **Multi-Criteria Filtering**: Combine category tabs (`DSA`, `Git`, `Technical`), difficulty level (`Easy`, `Medium`, `Hard`), and completion status (`Pending`, `In Progress`, `Completed`).
- **One-Click Reset**: "Clear Filters" button when any filter or query is active.
- **Flexible Sorting**: Sort question cards by Newest First, Oldest First, Title (A-Z), Difficulty Level, or Status Priority.

### 5. Seamless Local Storage Persistence
- All logged questions and machine-coding statuses automatically synchronize to browser `localStorage`.
- Safe deserialization with try-catch guards to handle corrupted JSON gracefully.
- Instant initialization with zero layout shifts or artificial loading spinners.

### 6. Responsive SaaS-Inspired Design
- Designed with a clean SaaS aesthetic inspired by high-productivity tools.
- Desktop sticky sidebar with category navigation shortcuts.
- Fully responsive mobile drawer and fluid card stacking with zero horizontal scroll.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS with modern CSS custom properties (design tokens) and responsive media queries
- **State & Storage**: React standard hooks (`useState`, `useEffect`, `useMemo`) + Browser `window.localStorage`

---

## 📋 Prerequisites

- **Node.js**: Version `18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (version 9+)

---

## 📥 Installation & Setup Instructions

1. Clone or open the repository folder:
   ```bash
   cd "Interview Practice Tracker"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 💻 Running the Development Server

Start the local development server:
```bash
npm run dev
```

Open your browser and navigate to the displayed local URL (typically `http://localhost:5173`).

---

## 🏗️ How to Build for Production

To create an optimized production build:
```bash
npm run build
```

This compiles optimized HTML, CSS, and JS bundles into the `dist/` directory.

---

## 🔍 How to Preview the Production Build

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 📂 Project Folder Structure

```
Interview Practice Tracker/
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ConfirmDialog.jsx   # Accessible confirmation modal for question deletion
│   │   ├── EmptyState.jsx      # Empty state for zero questions & zero search results
│   │   ├── Header.jsx          # Top application bar with mobile toggle & Add button
│   │   ├── ProgressSection.jsx # Visual SVG progress ring and category progress bars
│   │   ├── QuestionCard.jsx    # Individual question item card with direct status toggle
│   │   ├── QuestionFormModal.jsx # Add/Edit modal dialog with validation logic
│   │   ├── QuestionList.jsx    # Question feed container with sorting controls
│   │   ├── SearchFilters.jsx   # Live search bar & combined filter dropdowns
│   │   ├── Sidebar.jsx         # Sticky desktop navigation and mobile drawer
│   │   ├── StatCard.jsx        # Summary metric card with interactive selectors
│   │   └── Toast.jsx           # Floating non-intrusive notification banner
│   ├── constants/
│   │   └── options.js          # Categories, difficulties, statuses, and storage keys
│   ├── data/
│   │   └── sampleData.js       # Curated sample questions for instant demo/testing
│   ├── styles/
│   │   ├── global.css          # Design tokens, color palette, typography, and resets
│   │   └── dashboard.css       # Layout grids, card styles, transitions, and media queries
│   ├── utils/
│   │   ├── questionUtils.js    # Metric calculation, filtering, UUID generation, date formatting
│   │   └── storage.js          # Safe LocalStorage serialization and deserialization
│   ├── App.jsx                 # Top-level state coordinator and layout assembly
│   ├── index.css               # Global stylesheet entry point
│   └── main.jsx                # React application entry point
├── index.html                  # HTML document with Inter font & meta tags
├── package.json                # Project dependencies and script commands
└── vite.config.js              # Vite configuration
```

---

## 💾 Explanation of LocalStorage Persistence

Persistence is implemented in `src/utils/storage.js` and managed cleanly within `src/App.jsx`:

1. **Storage Keys**:
   - `interview-tracker-questions`: Stores the serialized JSON array of question objects.
   - `interview-tracker-machine-coding-status`: Stores the string value (`Not Started`, `In Progress`, or `Completed`).

2. **Derived Metrics (No Redundant Storage)**:
   - Dashboard statistics (percentages, counts, category breakdowns) are never written to LocalStorage.
   - Instead, metrics are computed as **derived state** using `calculateMetrics(questions)` upon data changes, guaranteeing data integrity without stale state bugs.

3. **Graceful Error Handling**:
   - Every read operation is wrapped in `try...catch` blocks to protect against parsing errors, malformed JSON, or restricted browser permissions (e.g., incognito restrictions). Fallbacks default safely to empty arrays or initial strings.

---

## 📌 Assumptions and Design Decisions

- **Completed Interview Questions Metric**: Counts **Git** and **Technical** questions whose status is `Completed` combined.
- **DSA Problem Metric**: DSA completion is counted separately to reflect traditional interview splits between algorithmic problem-solving and domain knowledge.
- **Machine-Coding Status**: Managed manually by the user as an overarching prep milestone rather than linked to an individual problem card.
- **Completion Calculations**: The overall completion percentage is strictly derived from questions marked `Completed` divided by total questions logged.
- **Zero Question Fallback**: Displays `0%` progress when the tracker has no entries, preventing `NaN` or layout breaks.
- **Local Browser Boundary**: Data is saved to the user's current browser `localStorage` and does not synchronize across separate devices or browser profiles.
- **Browser Data Clearing**: Clearing browser site data or clearing cache/cookies will reset saved tracker questions back to the clean initial empty state.
