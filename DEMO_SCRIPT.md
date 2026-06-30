# Demo Script — Release Risk Tracker

## 1. Introduction

This is a full-stack Release Risk Tracker built using Python Flask, SQLite, HTML, CSS, and JavaScript.

It is designed to help release managers track risks across components, owners, target closure dates, QAP impact, and escalation needs.

## 2. Dashboard View

The dashboard shows:

- Total risks
- Open risks
- Blocker/Critical risks
- Overdue risks
- QAP impact risks
- Escalation required risks

## 3. Add Risk

I can add a new release risk with:

- Risk title
- Component
- Release
- Owner
- Risk type
- Priority
- Target closure date
- QAP impact
- Escalation required
- Mitigation plan

## 4. Edit Risk

I can update any existing risk using the Edit button.

This supports real-life changes such as:

- Changing owner
- Updating mitigation
- Updating closure date
- Marking QAP impact
- Changing priority

## 5. Overdue Highlight

If the target closure date is in the past and the risk is still open, the system highlights it as overdue.

## 6. Filters and Search

I can filter by:

- Status
- Priority
- QAP impact
- Escalation required

I can also search by title, component, release, owner, or mitigation.

## 7. CSV Export

The tool can export the full risk register as a CSV file for reporting or leadership review.

## 8. Technical Summary

The frontend is built using HTML, CSS, and JavaScript.

The backend is built using Flask.

Data is stored in SQLite.

The frontend communicates with the backend through REST APIs.