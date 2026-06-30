# Project Notes — Release Risk Tracker

## Problem Statement

Release teams often manage risks across multiple systems, owners, and governance milestones. Risk data may be scattered across emails, spreadsheets, Jira, and meeting notes.

This project provides a simple centralized tracker to manage release risks and highlight items requiring leadership attention.

## Key Use Cases

1. Track blocker and critical release risks.
2. Identify QAP-impacting risks.
3. Monitor overdue target closure dates.
4. Capture mitigation plans.
5. Export risk register for leadership reporting.

## User Persona

Primary user:

- Release Manager
- Technical Program Manager
- Delivery Manager
- Program Governance Lead

## Core Entities

Risk fields:

- Title
- Component
- Release
- Owner
- Risk Type
- Priority
- Status
- Target Closure Date
- QAP Impact
- Escalation Required
- Mitigation

## Architecture

Browser frontend communicates with Flask backend using REST APIs.

```text
Browser UI
   ↓ fetch()
Flask API
   ↓ SQL queries
SQLite Database