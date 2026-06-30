# Release Risk Tracker

Release Risk Tracker is a full-stack Flask web application for release governance and risk tracking. It helps release managers and technical program managers track release risks, QAP impact, escalation needs, overdue closure dates, ownership, mitigation plans, and export leadership-ready summaries.

## Live Demo

https://release-risk-tracker.onrender.com/

## Overview

Release Risk Tracker provides a centralized dashboard to manage release risks across teams and components.

Who it is for:

- Release Managers
- Technical Program Managers
- Delivery Leads
- Governance Stakeholders

Why it is useful:

- Creates one source of truth for release risk visibility.
- Surfaces QAP and escalation signals early.
- Highlights overdue closure commitments.
- Supports leadership reporting with summary and export workflows.

## Business Use Case

- Release risk visibility: Consolidates release risks into one operational dashboard.
- QAP impact tracking: Flags risks that may affect quality approval gates.
- Escalation tracking: Identifies risks requiring leadership or cross-team attention.
- Overdue closure tracking: Detects open risks beyond target closure date.
- Leadership reporting: Enables quick summary sharing and CSV export for governance reviews.

## Key Features

1. Add Risk
2. View Risk List
3. Edit / Update Risk
4. Delete Risk
5. Mark Risk as Open / Closed
6. Target Closure Date tracking
7. Overdue Risk Highlight
8. QAP Impact flag
9. Escalation Required flag
10. Priority tracking: Blocker, Critical, Medium, Low
11. Risk Type tracking:
    - Scope Risk
    - QA Risk
    - Deployment Risk
    - Dependency Risk
    - Environment Risk
    - Business Risk
12. Component tracking:
    - CCS
    - MAT
    - DDS
    - Pegasus
    - PM
    - User-entered values
13. Release Name tracking
14. Owner tracking
15. Mitigation Plan tracking
16. Search risks
17. Filter by Status
18. Filter by Priority
19. Filter by QAP Impact
20. Filter by Escalation Required
21. Dashboard summary cards:
    - Total Risks
    - Open Risks
    - Blocker / Critical Risks
    - Overdue Risks
    - QAP Impact Risks
    - Escalation Required Risks
22. Leadership Alert Panel:
    - Open Blocker/Critical alerts
    - Overdue risk alerts
    - QAP-impacting risk alerts
    - Escalation-required risk alerts
    - Success state when no immediate leadership alerts exist
23. Load Sample Data button
24. Duplicate-safe sample data loading
25. Copy Email Summary button
26. Email-ready risk summary including:
    - Total Risks
    - Open Risks
    - Blocker/Critical Risks
    - Overdue Risks
    - QAP Impact Risks
    - Escalation Required Risks
    - Top Open Risks
27. CSV Export
28. REST API endpoints:
    - GET /api/health
    - GET /api/risks
    - POST /api/risks
    - PUT /api/risks/<id>
    - PATCH /api/risks/<id>/status
    - DELETE /api/risks/<id>
    - GET /api/risks/export.csv
    - POST /api/sample-data
29. SQLite database persistence
30. Render live deployment
31. Personal GitHub repository
32. Portfolio/demo-ready workflow

## Tech Stack

- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript
- Render
- GitHub

## Architecture

Browser UI -> JavaScript fetch() -> Flask REST API -> SQLite Database

## API Endpoints

- GET /api/health
- GET /api/risks
- POST /api/risks
- PUT /api/risks/<id>
- PATCH /api/risks/<id>/status
- DELETE /api/risks/<id>
- GET /api/risks/export.csv
- POST /api/sample-data

## How to Run Locally

1. Create a virtual environment:

    ```bash
    py -3 -m venv .venv
    ```

2. Activate the virtual environment (Windows PowerShell):

    ```powershell
    .\.venv\Scripts\Activate.ps1
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the app:

    ```bash
    py -3 app.py
    ```

5. Open localhost:

    http://127.0.0.1:5000/

## Demo Workflow

1. Open live app: https://release-risk-tracker.onrender.com/
2. Click Load Sample Data.
3. Review dashboard cards and leadership alerts.
4. Add a new risk.
5. Edit a risk and save changes.
6. Copy email summary.
7. Export CSV.

## Screenshots

Screenshots should be captured from the live Render application:

👉 https://release-risk-tracker.onrender.com/

Capture the following views and save them in the `screenshots` folder:

- `screenshots/dashboard.png` — Main dashboard with risk list and summary cards  
- `screenshots/leadership-alerts.png` — Leadership alert panel showing active risk alerts  
- `screenshots/sample-data-loader.png` — After clicking "Load Sample Data"  
- `screenshots/copy-summary.png` — Email summary copied and shown in editor/notepad  
- `screenshots/edit-risk.png` — Edit risk modal view  
- `screenshots/csv-export.png` — Downloaded CSV file or export action  

> Note: These screenshots demonstrate the end-to-end workflow including risk creation, governance visibility, and reporting features.
``

