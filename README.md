# 🌩️ Cloud Service Monitor Dashboard

A modern, scalable dashboard to monitor cloud services and incidents, built with **React + React Q​uery + Material UI**.

This project demonstrates **config-driven UI architecture**, efficient state management, and real-world frontend engineering practices.

---

## 🚀 Live Features

### 🧭 Dashboard
- Services overview with health status
- Incidents table with filtering, pagination, and sorting-ready structure

### 📊 Incidents Management
- View incidents in a dynamic table
- Click row → open side panel
- Edit notes with autosave
- Acknowledge / Resolve incidents
- Create new incidents

### ⚡ Smart Data Handling
- Optimistic UI updates (no unnecessary refetch)
- React Query cache management
- Background refresh indicator

---

## 🧠 Key Engineering Highlights

### ✅ Config-Driven UI
The entire UI is driven by a configuration object:

- Tabs
- Table columns
- Filters
- Actions
- Side panel sections

```js
uiConfig = {
  tabs: [...],
  incidentTable: {
    columns: [...],
    actions: [...]
  },
  filters: [...],
  sidePanel: {
    sections: [...]
  }
}

# 1. Clone the repository
git clone <your-repo-link>

# 2. Navigate into the project folder
cd <project-folder-name>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev