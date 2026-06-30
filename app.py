from flask import Flask, request, jsonify, render_template, Response
import sqlite3
import csv
import io

app = Flask(__name__)

DATABASE = "issues.db"


# -----------------------------
# Database connection
# -----------------------------
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# -----------------------------
# Create table (runs on startup)
# -----------------------------
def create_table():
    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS risks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            component TEXT NOT NULL,
            release_name TEXT NOT NULL,
            owner TEXT NOT NULL,
            risk_type TEXT NOT NULL,
            priority TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Open',
            mitigation TEXT,
            target_closure_date TEXT,
            qap_impact TEXT NOT NULL DEFAULT 'No',
            escalation_required TEXT NOT NULL DEFAULT 'No',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    
    existing_columns = conn.execute("PRAGMA table_info(risks)").fetchall()
    column_names = [column["name"] for column in existing_columns]

    if "target_closure_date" not in column_names:
        conn.execute("ALTER TABLE risks ADD COLUMN target_closure_date TEXT")

    if "qap_impact" not in column_names:
        conn.execute("ALTER TABLE risks ADD COLUMN qap_impact TEXT NOT NULL DEFAULT 'No'")

    if "escalation_required" not in column_names:
        conn.execute("ALTER TABLE risks ADD COLUMN escalation_required TEXT NOT NULL DEFAULT 'No'")


    conn.commit()
    conn.close()


# -----------------------------
# UI route
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")


# -----------------------------
# Health API
# -----------------------------
@app.route("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "message": "Release Risk Tracker backend is working"
    })


# -----------------------------
# GET all risks
# -----------------------------
@app.route("/api/risks", methods=["GET"])
def get_risks():
    create_table()  # Ensure the table exists before querying
    conn = get_db()

    rows = conn.execute(
        "SELECT * FROM risks ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])


# -----------------------------
# CREATE risk
# -----------------------------
@app.route("/api/risks", methods=["POST"])
def add_risk():
    create_table()  # Ensure the table exists before inserting
    data = request.get_json()

    title = data.get("title", "").strip()
    component = data.get("component", "").strip()
    release_name = data.get("release_name", "").strip()
    owner = data.get("owner", "").strip()
    risk_type = data.get("risk_type", "").strip()
    priority = data.get("priority", "").strip()
    mitigation = data.get("mitigation", "").strip()
    target_closure_date = data.get("target_closure_date", "").strip()
    qap_impact = data.get("qap_impact", "No").strip()
    escalation_required = data.get("escalation_required", "No").strip()

    error = validate_risk_data(
        title, component, release_name, owner,
        risk_type, priority, qap_impact, escalation_required
    )

    if error:
        return jsonify({"error": error}), 400

    conn = get_db()

    cursor = conn.execute(
        """
        INSERT INTO risks (
            title, component, release_name, owner,
            risk_type, priority, status,
            mitigation, target_closure_date,
            qap_impact, escalation_required
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            title, component, release_name, owner,
            risk_type, priority, "Open",
            mitigation, target_closure_date,
            qap_impact, escalation_required
        )
    )

    conn.commit()
    new_id = cursor.lastrowid

    row = conn.execute(
        "SELECT * FROM risks WHERE id = ?",
        (new_id,)
    ).fetchone()

    conn.close()

    return jsonify(dict(row)), 201


# -----------------------------
# UPDATE risk (EDIT)
# -----------------------------
@app.route("/api/risks/<int:id>", methods=["PUT"])
def update_risk(id):
    create_table()  # Ensure the table exists before updating
    data = request.get_json()

    title = data.get("title", "").strip()
    component = data.get("component", "").strip()
    release_name = data.get("release_name", "").strip()
    owner = data.get("owner", "").strip()
    risk_type = data.get("risk_type", "").strip()
    priority = data.get("priority", "").strip()
    mitigation = data.get("mitigation", "").strip()
    target_closure_date = data.get("target_closure_date", "").strip()
    qap_impact = data.get("qap_impact", "No").strip()
    escalation_required = data.get("escalation_required", "No").strip()

    error = validate_risk_data(
        title, component, release_name, owner,
        risk_type, priority, qap_impact, escalation_required
    )

    if error:
        return jsonify({"error": error}), 400

    conn = get_db()

    exists = conn.execute(
        "SELECT * FROM risks WHERE id = ?", (id,)
    ).fetchone()

    if not exists:
        conn.close()
        return jsonify({"error": "Risk not found"}), 404

    conn.execute(
        """
        UPDATE risks
        SET title=?, component=?, release_name=?, owner=?,
            risk_type=?, priority=?, mitigation=?,
            target_closure_date=?, qap_impact=?, escalation_required=?
        WHERE id=?
        """,
        (
            title, component, release_name, owner,
            risk_type, priority, mitigation,
            target_closure_date, qap_impact,
            escalation_required, id
        )
    )

    conn.commit()

    updated = conn.execute(
        "SELECT * FROM risks WHERE id = ?", (id,)
    ).fetchone()

    conn.close()

    return jsonify(dict(updated))


# -----------------------------
# Toggle status (Open/Closed)
# -----------------------------
@app.route("/api/risks/<int:id>/status", methods=["PATCH"])
def toggle_status(id):
    create_table()  # Ensure the table exists before toggling status
    conn = get_db()

    row = conn.execute(
        "SELECT * FROM risks WHERE id = ?", (id,)
    ).fetchone()

    if not row:
        conn.close()
        return jsonify({"error": "Risk not found"}), 404

    new_status = "Closed" if row["status"] == "Open" else "Open"

    conn.execute(
        "UPDATE risks SET status=? WHERE id=?",
        (new_status, id)
    )

    conn.commit()

    updated = conn.execute(
        "SELECT * FROM risks WHERE id=?", (id,)
    ).fetchone()

    conn.close()

    return jsonify(dict(updated))


# -----------------------------
# DELETE risk
# -----------------------------
@app.route("/api/risks/<int:id>", methods=["DELETE"])
def delete_risk(id):
    create_table()  # Ensure the table exists before deleting
    conn = get_db()

    row = conn.execute(
        "SELECT * FROM risks WHERE id=?", (id,)
    ).fetchone()

    if not row:
        conn.close()
        return jsonify({"error": "Risk not found"}), 404

    conn.execute("DELETE FROM risks WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Risk deleted", "id": id})


# -----------------------------
# EXPORT CSV
# -----------------------------
@app.route("/api/risks/export.csv", methods=["GET"])
def export_csv():
    create_table()  # Ensure the table exists before exporting
    conn = get_db()

    rows = conn.execute(
        "SELECT * FROM risks ORDER BY id DESC"
    ).fetchall()

    conn.close()

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "ID", "Title", "Component", "Release", "Owner",
        "Risk Type", "Priority", "Status",
        "Target Closure Date", "QAP Impact",
        "Escalation Required", "Mitigation", "Created At"
    ])

    for r in rows:
        writer.writerow([
            r["id"], r["title"], r["component"], r["release_name"],
            r["owner"], r["risk_type"], r["priority"], r["status"],
            r["target_closure_date"], r["qap_impact"],
            r["escalation_required"], r["mitigation"], r["created_at"]
        ])

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=release_risks.csv"}
    )


# -----------------------------
# Validation helper
# -----------------------------
def validate_risk_data(title, component, release, owner, risk_type, priority, qap, escalation):
    if not title:
        return "Risk title is required"
    if not component:
        return "Component is required"
    if not release:
        return "Release is required"
    if not owner:
        return "Owner is required"

    if priority not in ["Blocker", "Critical", "Medium", "Low"]:
        return "Invalid priority"

    if qap not in ["Yes", "No"]:
        return "Invalid QAP impact value"

    if escalation not in ["Yes", "No"]:
        return "Invalid escalation value"

    return None



# -----------------------------
# Run database setup
# -----------------------------
create_table()


# -----------------------------
# Run app locally
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
