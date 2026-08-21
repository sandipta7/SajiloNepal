# 🇳🇵 Sajilo Nepal

### A Civic Infrastructure Reporting & Resolution Platform for Nepal

**Sajilo Nepal** is a modern civic-tech platform designed to connect **citizens, municipal authorities, and field responders** through a centralized digital system for reporting, tracking, managing, and resolving local infrastructure and public-service issues.

The platform aims to make civic issue reporting **simpler, faster, more transparent, and more accountable** by allowing citizens to submit problems such as road damage, waste accumulation, water leakage, traffic-signal failures, electrical hazards, street-light problems, disaster hazards, and footpath obstructions.

Municipal authorities and authorized responders can then review reported issues, prioritize them based on severity and impact, assign them to the appropriate department, monitor progress, and verify resolutions.

> **Sajilo** means *simple/easy* in Nepali — representing the project's core philosophy of making civic participation easier for everyone.
#sajilonepal.vercel.app
---

## 🚀 Project Overview

Traditional civic issue reporting can involve complicated processes, limited visibility, and delays between citizens and responsible authorities.

**Sajilo Nepal** addresses this problem by providing a unified digital workflow:

```text
Citizen
   │
   ▼
Report Civic Issue
   │
   ├── Description
   ├── Category
   ├── Location
   ├── Photo Evidence
   └── Severity / Impact
   │
   ▼
Municipal Review
   │
   ▼
Prioritization & Assignment
   │
   ▼
Field Responder
   │
   ▼
Work in Progress
   │
   ▼
Resolution Verification
   │
   ▼
Citizen Tracking
```

This creates a transparent connection between the **people reporting problems** and the **departments responsible for solving them**.

---

# ✨ Key Features

## 👥 Citizen Portal

Citizens can enter the platform directly without requiring a traditional account-registration process.

The citizen workspace provides access to:

* 📊 Civic issue dashboard
* 📝 Issue reporting
* 📍 Interactive map
* 📋 Personal report history
* 🔎 Issue details and tracking
* 📈 Resolution progress
* 🔔 Notifications
* ℹ️ Information about how the system works

Citizens can report problems affecting their neighborhoods and monitor their progress through the system.

---

## 📝 Civic Issue Reporting

The reporting system allows citizens to submit structured complaints and infrastructure issues.

Supported categories include:

| Category                | Example                                      |
| ----------------------- | -------------------------------------------- |
| 🗑️ Waste & Garbage     | Uncollected garbage and waste accumulation   |
| 🛣️ Roads & Potholes    | Damaged roads and hazardous potholes         |
| 🚦 Traffic & Signals    | Broken or malfunctioning traffic signals     |
| ⚡ Power & Cables        | Electrical wires and power-related hazards   |
| 💧 Water & Sewage       | Water leaks and sewage problems              |
| 💡 Street Lights        | Non-functional public lighting               |
| ⚠️ Disaster Hazards     | Dangerous trees and disaster-related hazards |
| 🚶 Footpath Obstruction | Blocked sidewalks and public pathways        |

Reports can contain:

* Issue title
* Detailed description
* Category
* Location
* Ward information
* Geographic coordinates
* Photo evidence
* Severity
* Impact score
* Reporter information

---

# 🗺️ Interactive Civic Map

Sajilo Nepal includes a map-based interface that allows users and authorities to visualize reported civic issues geographically.

The map system is powered by **Leaflet** and supports location-based issue visualization.

Users can:

* View reported issues on a map
* Explore nearby problems
* Identify geographic clusters
* Inspect individual issue locations
* Understand the distribution of civic problems across areas

The application also requests **geolocation permission** for location-aware functionality.

---

# 📍 Issue Tracking

Every issue can be associated with a unique tracking number.

Example:

```text
KMC-2025-0841
```

Citizens and authorities can follow the progress of an issue through a structured lifecycle:

```text
Report Submitted
       ↓
Verified & Prioritized
       ↓
Assigned to Officer
       ↓
Work in Progress
       ↓
Resolution Verified
```

Each stage can include timestamps, notes, responsible personnel, and activity logs.

This creates a clear history of how an issue moves through the resolution process.

---

# 🏛️ Municipal Administration Portal

Sajilo Nepal provides a dedicated administrative environment for municipal authorities.

The administration interface includes:

* 📊 Municipal dashboard
* 📈 Resolution statistics
* 🗂️ Issue registry
* 🔍 Issue search
* 🏷️ Category filtering
* 🚦 Status filtering
* ⚠️ Priority and severity monitoring
* 🗺️ Administrative map
* 👥 Responder management
* 📤 CSV data export
* ⚙️ Administrative settings

The municipal dashboard provides a centralized view of civic complaints and their current status.

---

# 📊 Municipal Analytics

The administration dashboard provides key performance indicators such as:

* Total registered issues
* Resolution rate
* Pending issues
* Critical alerts
* Issues by municipal category
* Department workload
* High-priority cases
* Ward-level activity
* Current issue statuses

Authorities can also filter the grievance registry by:

* Status
* Department/category
* Search keywords
* Tracking number
* Location
* Reporter

---

# 👨‍🚒 Responder & Department Workflow

Sajilo Nepal includes a responder-oriented workflow connecting issues with responsible departments.

Example departments include:

* KMC Environment & Waste Management
* Roads & Municipal Infrastructure
* Kathmandu Valley Traffic Police
* Nepal Electricity Authority (NEA)
* Kathmandu Upatyaka Khanepani Limited (KUKL)
* Public Lighting Division
* Disaster Risk Management
* Kathmandu Metropolitan City Police

Each responder can be associated with:

* Department
* Role
* Civic category
* Contact information
* Active tasks
* Completed tasks
* Operational badge

This creates a structured relationship between **reported problems and responsible field teams**.

---

# 🔐 Role-Based Portal Access

The application separates users into different operational environments.

### 👤 Citizen

Citizens can:

* Submit issues
* View nearby problems
* Track reports
* Explore the map
* View issue details
* Monitor resolution progress

### 🏛️ Administrator

Authorized municipal personnel can:

* Review complaints
* Monitor city-wide activity
* Manage issue workflows
* Analyze statistics
* View responders
* Monitor high-priority incidents
* Export grievance data

### 🚨 Field Responders

Responders are associated with specific civic categories and departments, allowing issues to be directed toward the appropriate operational team.

---

# 🔥 Severity & Priority System

Issues can be classified according to severity, allowing authorities to identify problems requiring immediate attention.

The platform supports severity levels such as:

* `Critical`
* `High`
* `Medium`
* `Low`

Issues also contain an **impact score**, which can help prioritize cases based on their potential effect on the community.

For example, hazards near schools, major roads, or densely populated areas can receive greater attention.

---

# 📈 Issue Status Management

The application supports a structured status workflow:

```text
Pending
   ↓
Under Review
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
```

This allows users and authorities to understand the current state of every complaint.

---

# 🧾 Activity Logs & Resolution History

Each issue can maintain an activity history documenting important events.

Examples include:

```text
Report Logged
High Priority Alert Triggered
Department Review Completed
Officer Assigned
Work Started
Issue Resolved
Resolution Verified
```

This improves transparency and provides a traceable record of the resolution process.

---

# 📤 Data Export

Municipal administrators can export issue information into **CSV format**.

This makes it possible to:

* Analyze reports externally
* Create municipal reports
* Archive grievance information
* Perform additional data analysis
* Share structured datasets with authorized teams

---

# 🔔 Notifications & User Feedback

The application includes a notification interface for communicating important system events and updates to users.

Visual indicators are also used for:

* Issue severity
* Current status
* Priority
* Resolution state
* System alerts

---

# 🎨 User Interface

Sajilo Nepal is designed around a modern, responsive interface with a Nepal-focused visual identity.

The interface uses:

* Clean dashboard layouts
* Responsive navigation
* Desktop sidebar navigation
* Mobile navigation
* Card-based information displays
* Status badges
* Severity indicators
* Interactive maps
* Responsive tables
* Smooth UI transitions
* Lucide iconography

The interface uses colors inspired by the **Nepal national identity**, particularly deep blue and red accents.

---

# 📱 Responsive Design

The application is designed to work across different screen sizes.

### Desktop

Provides:

* Persistent sidebar
* Large dashboard workspace
* Administrative analytics
* Detailed issue tables
* Full map interface

### Mobile

Provides:

* Mobile navigation
* Drawer-based sidebar
* Responsive cards
* Mobile-friendly issue reporting
* Adaptive layouts

---

# 🛠️ Technology Stack

## Frontend

* **React 19**
* **JavaScript / JSX**
* **Vite**
* **Tailwind CSS**
* **Lucide React**
* **Motion**

## Maps & Location

* **Leaflet**
* Browser Geolocation API

## Backend / Cloud Services

* **Firebase**
* **Cloud Firestore**
* **Firebase Authentication**
* **Firebase Storage**

## Additional Libraries

* **Canvas Confetti**
* **dotenv**
* **Express**
* **TypeScript**
* **CSV export utilities**

---

# 🏗️ Architecture

The application follows a component-based React architecture.

```text
SajiloNepal
│
├── App
│   └── Application Router
│
├── Context
│   └── AppContext
│
├── Citizen Portal
│   ├── Dashboard
│   ├── Report Issue
│   ├── Explore Map
│   ├── My Reports
│   └── Issue Details
│
├── Administration
│   ├── Admin Dashboard
│   ├── Admin Map
│   ├── Responder Roster
│   ├── Settings
│   └── Issue Management
│
├── Responder System
│   └── Responder Panel
│
├── Authentication
│   └── Portal Gateway
│
├── Firebase
│   ├── Authentication
│   ├── Firestore
│   └── Storage
│
├── Utilities
│   ├── CSV Export
│   └── Formatting
│
└── Data
    └── Civic Issues & Responders
```

---

# 📂 Project Structure

```text
SajiloNepal/
│
├── public/
│   └── logo.svg
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── detail/
│   │   ├── info/
│   │   ├── map/
│   │   ├── overview/
│   │   ├── report/
│   │   ├── reports/
│   │   └── responder/
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── data/
│   │   └── initialData.js
│   │
│   ├── lib/
│   │   ├── firebase.js
│   │   └── firestoreService.js
│   │
│   ├── utils/
│   │   ├── exportUtils.js
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── firebase.json
├── firestore.rules
├── firebase-applet-config.json
├── package.json
├── vite.config.js
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/sandipta7/SajiloNepal.git
```

Navigate into the project:

```bash
cd SajiloNepal
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure the required environment variables according to your deployment environment.

Example:

```env
GEMINI_API_KEY=your_api_key_here
APP_URL=your_application_url
```

> **Never commit real API keys, Firebase secrets, or other private credentials to GitHub.**

---

## 4. Start the Development Server

```bash
npm run dev
```

The Vite development server will start the application locally.

---

## 5. Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 🔐 Security Notice

This project uses Firebase and environment-based configuration.

**Do not commit credentials or secrets to the repository.**

If an API key or credential has previously been exposed publicly:

1. Revoke the exposed credential.
2. Generate a replacement.
3. Remove the credential from the source code.
4. Move secrets to environment variables or secure configuration.
5. Check Git history for previously committed secrets.
6. Review Firebase and Google Cloud usage.

Firebase configuration values that are intended for client-side Firebase initialization should still have appropriate **Firebase Security Rules and API restrictions** configured.

---

# 🧪 Development

Useful npm commands:

```bash
# Start development server
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint
```

---

# 🎯 Project Objectives

Sajilo Nepal was developed with several key objectives:

### 1. Simplify Civic Reporting

Provide citizens with a straightforward way to report local infrastructure problems.

### 2. Improve Transparency

Allow citizens to see how their complaints progress through the resolution pipeline.

### 3. Connect Citizens & Authorities

Create a digital bridge between residents, municipal departments, and field responders.

### 4. Prioritize Critical Issues

Use severity and impact information to help authorities identify urgent cases.

### 5. Improve Municipal Coordination

Centralize issue management and responder assignment in a unified interface.

### 6. Encourage Digital Civic Participation

Demonstrate how technology can make citizens more involved in improving their communities.

---

# 🌏 Potential Impact

Sajilo Nepal demonstrates how civic technology can contribute to smarter and more responsive local governance.

A platform like this could help municipalities:

* Reduce manual complaint handling
* Improve response coordination
* Identify recurring infrastructure problems
* Monitor departmental performance
* Improve communication with residents
* Create better records of civic issues
* Make public-service resolution more transparent

For citizens, it provides a more accessible way to make their concerns visible and track their progress.

---

# 🔮 Future Development

Potential future improvements include:

* 🤖 AI-assisted issue classification
* 📸 Automatic image-based issue detection
* 🗺️ More advanced GIS functionality
* 📱 Dedicated Android/iOS applications
* 🔔 Real-time push notifications
* 🔐 Complete production-grade authentication
* 📊 Advanced municipal analytics
* 🏙️ Multi-municipality support
* 🌐 Nationwide deployment
* 🗣️ Full Nepali-language interface
* ♿ Improved accessibility support
* 📡 Real-time responder location tracking
* 🧠 Predictive infrastructure maintenance
* 🔗 Integration with official government APIs
* 📈 Historical civic-data analytics

---

# 🤝 Contributors

This project was developed collaboratively.

### Core Developer

**Sandipta Raj Bomjan**

* GitHub: [@sandipta7](https://github.com/sandipta7)
* Repository: [Sajilo Nepal](https://github.com/sandipta7/SajiloNepal)

### Contributors

Add your collaborators below:

| Contributor             | Role                     | GitHub                                     |
| ----------------------- | ------------------------ | ------------------------------------------ |
| **Sandipta Raj Bomjan** | Developer / Project Lead | [@sandipta7](https://github.com/sandipta7) |
| **Prattikk Thapa**      | Developer / Designer     | `[@prattikk69] (https://github.com/prattikk69)`                         |

> Replace the placeholder contributor entries with the actual members of your team. The ZIP archive does not contain Git commit history, so the additional contributor identities cannot be verified from the provided project files.

---

# 📜 License

This project is intended for educational, experimental, and development purposes.

If you plan to use, modify, or distribute this project, add an appropriate open-source license such as **MIT**, **Apache 2.0**, or another license that matches the project's requirements.

---

# 🇳🇵 Vision

> **Making civic participation simple, transparent, and connected.**

Sajilo Nepal is more than a reporting interface — it represents a vision for a more connected relationship between **citizens, communities, and local government**.

By combining modern web technologies, location-based reporting, structured workflows, and municipal analytics, the project explores how digital tools can help build a more responsive and accountable civic ecosystem in Nepal.

---

<div align="center">

### 🇳🇵 Built for Nepal. Built for the people.

**Sajilo Nepal — Making Civic Action Simple.**

⭐ Star the repository if you like the project!

</div>
