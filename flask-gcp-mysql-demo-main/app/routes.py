""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/company/delete/<int:job_id>", methods=['POST'])
def delete_job_posting(job_id):
    try:
        db_helper.delete_job_posting(job_id)
        result = {'success': True, 'response': 'Removed job_role'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)

@app.route("/company/create", methods=['POST'])
def post_job():
    """ recieves post requests to add new task """
    data = request.get_json()
    try:
        db_helper.post_job(data['job_title'], data['salary'], data['location'], data['job_type'], data['company_id'], data["skill_names"])
        result = {'success': True, 'response': 'Done'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/company/postings")
def fetch_job_postings():
    data = request.get_json()
    items = db_helper.fetch_job_postings(data["company_id"])
    return render_template("index.html", items=items)

@app.route("/recruiter/login", methods=['POST'])
def recruiter_login():
    """ returns login status """
    data = request.get_json()
    try:
        result = db_helper.recruiter_login(data["recruiter_id"], data["pwd"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return result
    
@app.route("/company/view_applications", methods=['POST'])
def fetch_company_applications():
    data = request.get_json()
    try:
        result = db_helper.fetch_company_applications(data["company_id"], data["count"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return result

@app.route("/company/decide", methods=['POST'])
def decide():
    data = request.get_json()
    try:
        db_helper.decide(data["student_id"], data["job_id"], data["status"])
        result = {'success': True, 'response': 'Status updated'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/student/job_openings", methods=['POST'])
def fetch_job_openings():
    data = request.get_json()
    try:
        result = db_helper.fetch_job_openings(data["student_id"], data["count"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return result

@app.route("/student/job_openings_by_name", methods=['POST'])
def fetch_job_openings_by_name():
    data = request.get_json()
    try:
        result = db_helper.fetch_job_openings_by_name(data["student_id"],data["company_name"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return result

@app.route("/student/applied", methods=['POST'])
def fetch_jobs_applied():
    data = request.get_json()
    try:
        result = db_helper.fetch_jobs_applied(data["student_id"], data["count"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return result

@app.route("/student/login",  methods=['POST'])
def student_login():
    """ returns login status """
    data = request.get_json()
    try:
        result = db_helper.student_login(data["student_id"], data["pwd"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/student/apply", methods=['POST'])
def apply():
    data = request.get_json()
    try:
        db_helper.apply(data["student_id"], data["job_id"])
        result = {'success': True, 'response': 'Application added'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/company/close", methods=['POST'])
def close_job():
    data = request.get_json()
    try:
        db_helper.close_job(data["job_id"])
        result = {'success': True, 'response': 'Job posting closed'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/company/stats", methods=['POST']) #Not working
def stats():
    data = request.get_json()
    try:
        result = db_helper.stats(data["company_id"])
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)