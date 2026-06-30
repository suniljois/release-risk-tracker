# Release Risk Tracker

A full-stack Python Flask application for tracking release governance risks, QAP impact, escalation needs, overdue closure dates, and mitigation plans.

## Purpose

Release Risk Tracker helps release managers and technical program managers track risks across components, releases, owners, priorities, and governance milestones.

It is designed for release governance scenarios where teams need visibility into:

- Open release risks
- Blocker and critical risks
- QAP-impacting risks
- Escalation-required risks
- Overdue target closure dates
- Mitigation ownership

## Features

- Add release risks
- View all risks
- Edit/update existing risks
- Delete risks
- Mark risks as Open or Closed
- Track target closure date
- Flag QAP impact
- Flag escalation required
- Highlight overdue risks
- Search and filter risks
- Export risk register to CSV
- Dashboard summary cards

## Tech Stack

- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript

## Project Structure

```text
release-risk-tracker
├── app.py
├── issues.db
├── requirements.txt
├── README.md
├── templates
│   └── index.html
└── static
    ├── style.css
    └── script.js