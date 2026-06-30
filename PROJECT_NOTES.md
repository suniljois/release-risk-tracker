# Project Notes - Release Risk Tracker

## Problem Statement

Release governance risks are often tracked in disconnected tools such as spreadsheets, emails, and chat threads. This causes delayed visibility for blocker risks, unclear ownership, and inconsistent leadership reporting.

Release Risk Tracker was built to centralize release-risk management and improve governance decisions with real-time operational visibility.

## Target Users

- Release Managers
- Technical Program Managers
- Delivery Managers
- Governance and leadership stakeholders

## Key Workflows

1. Capture release risks with ownership, mitigation, and governance flags.
2. Monitor dashboard KPIs for release health.
3. Detect leadership concerns through alert panel signals.
4. Use search and filters for targeted risk review.
5. Update risk lifecycle using edit, status toggle, and delete actions.
6. Load realistic sample data for demos and onboarding.
7. Copy an email-ready summary for stakeholder communication.
8. Export CSV for governance reporting.

## Architecture

Browser UI -> JavaScript fetch() -> Flask REST API -> SQLite Database

Frontend:

- HTML templates
- CSS styling
- JavaScript for rendering, filtering, and API calls

Backend:

- Flask routes for CRUD and utility endpoints
- SQLite persistence

Deployment:

- Render-hosted live app
- Source code in GitHub repository suniljois/release-risk-tracker

## Data Model Summary

Primary entity: risk

Key fields:

- id
- title
- component
- release_name
- owner
- risk_type
- priority
- status
- mitigation
- target_closure_date
- qap_impact
- escalation_required
- created_at

## Learning Outcomes

- Built complete CRUD workflows in Flask with SQLite.
- Added governance-focused analytics and alerting in the UI.
- Implemented end-to-end features from API route to UI actions.
- Practiced portfolio-focused documentation and demo storytelling.
- Improved production-readiness mindset through deployment and validation.

## Business Value

- Improves release risk transparency across teams.
- Enables early escalation for high-impact issues.
- Supports QAP and closure-date governance controls.
- Reduces manual reporting effort through summary copy and CSV export.
- Provides a repeatable workflow for leadership readiness.

## Future Roadmap

- PostgreSQL persistence
- Login authentication
- Role-based access
- Jira integration
- Teams/email alerts
- Risk audit trail
- Sorting and grouping
- Excel export