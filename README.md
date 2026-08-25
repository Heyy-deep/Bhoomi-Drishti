<div align="center">

<img src="https://img.shields.io/badge/BhoomiDrishti-DPI%20Platform-d97706?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDB6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==" />

# BhoomiDrishti

### National Land Acquisition & Management Digital Platform

**A Digital Public Infrastructure (DPI) for transparent, data-driven land governance under RFCTLARR Act 2013**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet)](https://leafletjs.com)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Tests-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**BhoomiDrishti** is a full-featured, government-grade digital platform that modernises every stage of the land acquisition lifecycle in India — from initial notification under the RFCTLARR Act 2013, through SLA-tracked workflow stages, to final possession hand-over and R&R (Resettlement & Rehabilitation) disbursement.

The platform is designed as a **Smart India Hackathon 2026** submission, targeting the Ministry of Road Transport & Highways (MoRTH) / NHAI use case of tracking land parcels across national infrastructure corridors.

> **Live Demo** → _[Deployed on Vercel]_

---

## ✨ Key Features

| Module | Description |
|---|---|
| 📊 **National MIS Dashboard** | Executive-level KPI view — land notified vs acquired, compensation assessed vs paid, R&R allotment, SLA adherence across all states |
| 🗺️ **GIS & Stage Tracker** | Interactive Leaflet map with parcel polygons, coordinate pins, stage colour coding, and filterable sidebar |
| ⚙️ **Workflow & SLA Engine** | Step-by-step land acquisition stage management (Section 11 → 19 → Disbursement), SLA breach detection, document verification |
| 🤖 **ML Delay Predictor** | Rule-based risk scoring engine (simulating LightGBM/XGBoost) — outputs risk level, predicted delay days, and recommended actions |
| 📱 **Field Mobile App** | Inspector field submission interface — GPS check-in, photo upload, on-ground status updates |
| 🌐 **Public Transparency Portal** | Citizen-facing parcel status lookup by Khasra No. / Khata No., Hindi/English bilingual support |
| 📋 **Proposal Submission** | Online land acquisition proposal form for new project corridors |
| 👤 **Role-based Access** | NHAI Officer, Inspector, and Public User roles with mock authentication |

---

## 🏛️ Domain Context

BhoomiDrishti operates within the framework of the **Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR Act)**. The platform digitises the following statutory stages:

```
Section 11 → Social Impact Assessment (SIA) → Section 19 Notification
     → Compensation Assessment → Award Declaration
         → Disbursement (DBT) → Possession Hand-over
             → R&R Housing Allotment → Rehabilitation Complete
```

---

## 🏗️ Tech Architecture

### Stack

```
┌──────────────────────────────────────────────────────┐
│                   BROWSER (Client SPA)                │
│                                                        │
│  React 19   ←→   Vite 8 (ESM bundler)                │
│  Vanilla CSS (design tokens / CSS vars)                │
│  Lucide React (icons)                                  │
│  Leaflet + react-leaflet (GIS maps)                    │
│  Playwright (E2E testing)                              │
│  OxLint (Rust-based JS linting)                        │
│                                                        │
│  Auth: localStorage   Data: Static JS dataset          │
└──────────────────────────────────────────────────────┘
                         │
                   Vercel CDN
                  (static build)
                         │
              GitHub: Heyy-deep/Bhoomi-Drishti
```

### Project Structure

```
sih2026/
├── index.html                       ← Single HTML shell
├── vite.config.js                   ← Vite + React plugin
├── playwright.config.js             ← E2E test config
├── src/
│   ├── main.jsx                     ← React DOM mount point
│   ├── App.jsx                      ← Root: global state + module routing
│   ├── App.css                      ← Component-level styles (~1700 lines)
│   ├── index.css                    ← Design system tokens (fonts, colors, spacing)
│   │
│   ├── data/
│   │   └── parcelsData.js           ← Full dataset: parcels, WB districts, API statuses
│   │
│   ├── services/
│   │   └── delayPredictor.js        ← ML risk scoring engine
│   │
│   └── components/
│       ├── AuthScreen.jsx           ← Split-panel login / register
│       ├── Navbar.jsx               ← Tab navigation + user badge + logout
│       ├── NationalMisDashboard.jsx ← Module 1: Executive MIS
│       ├── GisTrackerModule.jsx     ← Module 2: GIS Map + Stage Tracker
│       ├── WorkflowEngineModule.jsx ← Module 3: Workflow + SLA Engine
│       ├── DelayPredictorModule.jsx ← Module 4: ML Risk Predictor
│       ├── MobileFieldInspectionModule.jsx ← Module 5: Field App
│       ├── PublicPortalModule.jsx   ← Module 6: Citizen Portal
│       ├── ProposalSubmissionModal.jsx ← New project proposal form
│       └── ProfileModule.jsx        ← User profile & settings
│
└── tests/                           ← Playwright E2E test suites
```

---

## 📦 Data Model

Each land parcel record carries the following schema:

```js
{
  id: "LND-WB-2026-0501",             // Unique parcel ID
  khasraNo: "304/1A",                 // Land record identifier
  ownerName: "Biswajit Mondal",
  ownerContact: "+91 98300 XXXXX",
  village: "Rajarhat",
  district: "Kolkata",
  state: "West Bengal",
  project: "Kolkata Metro Airport-New Town Line Expansion",
  areaAcquired: "1.45 Ha",
  landType: "Agricultural (Unirrigated)",

  stage: "Disbursement",              // Current statutory stage
  stageCode: 4,                       // 1–5 numeric code
  stageProgress: 100,                 // % completion within stage
  possessionStatus: "Possession Handed Over (100%)",

  affectedFamilies: 3,
  displacedFamilies: 0,
  rrStatus: "Commercial Award Disbursed",

  coordinates: [22.6350, 88.4500],    // Leaflet map pin [lat, lng]
  polygon: [[lat,lng], ...],          // Leaflet polygon boundary

  compensationTotal: 28500000,        // ₹ amount assessed
  disbursedAmount: 28500000,          // ₹ amount paid via DBT

  assignedOfficer: "Smt. P. Bhattacharya (SLAO Grade-I)",
  officerId: "OFF-KOL-07",

  slaStatus: "ON_TRACK",             // ON_TRACK | WARNING | BREACHED
  daysInStage: 18,
  slaDeadlineDays: 30,

  documents: {
    khasraTitle: "VERIFIED",
    encumbranceCert: "VERIFIED",
    bankConsentForm: "VERIFIED",
    rrPackageDoc: "VERIFIED"
  },
  riskFactors: []                     // Factors fed into ML predictor
}
```

---

## 🧠 ML Delay Predictor

The risk engine in [`src/services/delayPredictor.js`](src/services/delayPredictor.js) simulates a **LightGBM/XGBoost classification model** using interpretable rule-based scoring:

```
Risk Score Calculation:
  Baseline                           → +20 pts
  SLA overdue ratio                  → up to +45 pts
  Approaching SLA deadline (>80%)    → +15 pts
  Rejected documents                 → +20 pts each
  Pending/in-progress documents      → +8 pts each
  Commercial/Residential land type   → +12 pts
  Irrigated agricultural land        → +8 pts
  Known risk factors                 → +10 pts each

Score Range: [5 – 98]
  < 40  → 🟢 LOW RISK
  40–69 → 🟡 MEDIUM RISK
  ≥ 70  → 🔴 CRITICAL RISK

Output:
  { riskScore, riskLevel, predictedDelayDays, recommendations[] }
```

---

## 🔌 Government API Integrations (Simulated)

The platform connects to the following government data sources (currently simulated with static status cards in the dashboard):

| API | Endpoint | Latency |
|---|---|---|
| Banglarbhumi / WB Land & Land Reforms | `banglarbhumi.gov.in/api/khatian` | 52ms |
| Mahabhulekh / State Land Records | `api.mahabhulekh.gov.in/v2/khasra` | 42ms |
| Bhuvan ISRO Spatial Cadastral Maps | `bhuvan-vec1.nrsc.gov.in/wms` | 88ms |
| Sub-Registrar Office (SRO) Encumbrance | `igrmahashta.gov.in/api/encumbrance` | 115ms |
| PFMS Direct Benefit Transfer (DBT) Gateway | `pfms.nic.in/api/dbt/disburse` | 65ms |
| e-Courts National Judicial Data Grid (NJDG) | `services.ecourts.gov.in/api/case-search` | 140ms |

---

## 🗺️ States & Districts Covered

**Active Project States:** Maharashtra, Gujarat, Karnataka, Uttar Pradesh, West Bengal, Rajasthan, Tamil Nadu, Punjab, Telangana

**West Bengal Districts (all 23):**
Kolkata · Howrah · Hooghly · North 24 Parganas · South 24 Parganas · Paschim Medinipur · Purba Medinipur · Bankura · Purulia · Jhargram · Purba Bardhaman · Paschim Bardhaman · Birbhum · Nadia · Murshidabad · Malda · Uttar Dinajpur · Dakshin Dinajpur · Jalpaiguri · Alipurduar · Cooch Behar · Darjeeling · Kalimpong

---

## 🔐 Authentication

Authentication is implemented as a **client-side mock** using `localStorage`:

| Key | Purpose |
|---|---|
| `bhoomidrishti_mock_accounts` | Stores all registered user accounts |
| `bhoomidrishti_current_user` | Active session user object |

**Quick Demo Logins:**

| Role | Email | Password |
|---|---|---|
| NHAI Officer | `officer@bhoomidrishti.gov.in` | `Password123` |
| Field Inspector | `inspector@bhoomidrishti.gov.in` | `Password123` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Heyy-deep/Bhoomi-Drishti.git
cd Bhoomi-Drishti

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output: dist/ (static files ready for deployment)

npm run preview
# Preview the production build locally
```

### Lint

```bash
npm run lint
# OxLint (Rust-based, extremely fast)
```

---

## 🧪 Testing

End-to-end tests are written with **Playwright**:

```bash
# Install browsers (first time only)
npx playwright install

# Run all E2E tests
npx playwright test

# Run with UI (headed)
npx playwright test --ui

# View test report
npx playwright show-report
```

Test suites cover: login flow, module navigation, GIS map interaction, workflow stage updates, proposal submission, and public portal search.

---

## 📊 National KPI Summary (Demo Data)

| Metric | Value |
|---|---|
| Total Land Notified | 6,120.8 Ha |
| Total Land Acquired | 4,180.5 Ha (68.3%) |
| Compensation Assessed | ₹620.4 Cr |
| Compensation Paid (DBT) | ₹455.2 Cr (73.4%) |
| Affected Families | 4,920 |
| Displaced Families | 1,840 |
| R&R Housing Allotted | 1,510 Plots (82.1%) |
| Possession Handed Over | 72% |
| SLA Timeline Adherence | 85% |
| Active Projects | 19 |
| States Covered | 9 |

---

## 🎨 Design System

The UI is built on a custom **amber/gold government portal aesthetic**:

```css
--accent:        hsl(38, 90%, 40%)   /* Amber – primary actions    */
--accent-light:  hsl(38, 95%, 55%)   /* Gold  – highlights, stats  */
--bg-dark:       hsl(222, 47%, 4%)   /* Near-black background       */
--bg-card:       rgba(13,17,23,0.7)  /* Glassmorphism card          */
--text-main:     hsl(210, 40%, 96%)  /* Primary text               */
--accent-blue:   hsl(217, 91%, 60%)  /* Secondary – info states    */
--accent-green:  hsl(160, 84%, 39%)  /* Success – connected/paid   */
```

**Fonts:** [Outfit](https://fonts.google.com/specimen/Outfit) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body) via Google Fonts

---

## 🤝 Contributing

This project was built for **Smart India Hackathon 2026**. Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for **Smart India Hackathon 2026**

*Empowering transparent land governance under RFCTLARR Act 2013*

</div>
