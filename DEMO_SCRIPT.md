# Demo Script - Release Risk Tracker

## Introduction

Hi, this is Release Risk Tracker, a full-stack Flask application for release governance.

It helps release teams track risks, owners, mitigation plans, QAP impact, escalation requirements, and overdue closure commitments in one place.

## Live Demo Link

https://release-risk-tracker.onrender.com/

## Dashboard Explanation

On the main dashboard, I can quickly see key release metrics:

- Total Risks
- Open Risks
- Blocker/Critical Risks
- Overdue Risks
- QAP Impact Risks
- Escalation Required Risks

This gives an immediate view of release health.

## Leadership Alert Panel

The leadership panel automatically highlights:

- Open blocker/critical risks
- Overdue risks
- QAP-impacting risks
- Escalation-required risks

If no immediate concerns exist, it shows a positive success state.

## Load Sample Data

I click Load Sample Data to instantly populate realistic release risks across components.

The loader is duplicate-safe, so repeated clicks do not insert the same sample risk twice.

## Add, Edit, and Delete Risk

I can add a new risk with title, component, release name, owner, type, priority, dates, governance flags, and mitigation.

I can edit existing risks as details evolve, and delete risks that are no longer relevant.

I can also toggle risk status between Open and Closed.

## Copy Email Summary

I click Copy Summary to generate an email-ready release update that includes:

- Totals and key risk counts
- QAP and escalation counts
- Top open risks with owner, priority, component, and target closure date

The summary is copied directly to clipboard for quick stakeholder communication.

## CSV Export

I can export the full risk register as CSV for governance meetings, reporting, and leadership reviews.

## Technical Architecture

The flow is:

Browser UI -> JavaScript fetch() -> Flask REST API -> SQLite Database

The app is deployed on Render and versioned in GitHub.

## Business Value

Release Risk Tracker improves governance by centralizing risk visibility, surfacing critical signals early, and making leadership reporting faster and more consistent.