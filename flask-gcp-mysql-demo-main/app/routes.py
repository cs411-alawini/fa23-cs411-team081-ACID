""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/company/delete/<int:job_id>", methods=['POST'])
def delete_job_posting(job_id):
    """ recieved post requests for entry delete """

    try:
        db_helper.delete_job_posting(job_id)
        result = {'success': True, 'response': 'Removed job_role'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)


# @app.route("/edit/<int:task_id>", methods=['POST'])
# def update(task_id):
#     """ recieved post requests for entry updates """

#     data = request.get_json()

#     try:
#         if "status" in data:
#             db_helper.update_status_entry(task_id, data["status"])
#             result = {'success': True, 'response': 'Status Updated'}
#         elif "description" in data:
#             db_helper.update_task_entry(task_id, data["description"])
#             result = {'success': True, 'response': 'Task Updated'}
#         else:
#             result = {'success': True, 'response': 'Nothing Updated'}
#     except:
#         result = {'success': False, 'response': 'Something went wrong'}

#     return jsonify(result)


@app.route("/company/create", methods=['POST'])
def post_job():
    """ recieves post requests to add new task """
    data = request.get_json()
    db_helper.post_job(data['job_title'], data['salary'], data['location'], data['job_type'], data['company_id'])
    result = {'success': True, 'response': 'Done'}
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
    obj = db_helper.recruiter_login(data["recruiter_id"], data["pwd"])
    return obj
    
@app.route("/company/view_applications")
def fetch_company_applications():
    data = request.get_json()
    result = db_helper.fetch_company_applications(data["company_id"])
    return result

@app.route("/company/decide", methods=['POST'])
def decide():
    data = request.get_json()
    db_helper.decide(data["student_id"], data["job_id"], data["status"])
    result = {'success': True, 'response': 'Status updated'}
    return jsonify(result)

@app.route("/student/job_openings")
def fetch_job_openings():
    """ returns available job openings """
    result = db_helper.fetch_job_openings()
    return result

@app.route("/student/job_openings_by_name")
def fetch_job_openings_by_name():
    """ returns available job openings """
    data = request.get_json()
    result = db_helper.fetch_job_openings_by_name(data["company_name"])
    return result

@app.route("/student/applied")
def fetch_jobs_applied():
    data = request.get_json()
    result = db_helper.fetch_jobs_applied(data["student_id"])
    return results

@app.route("/student/login",  methods=['POST'])
def student_login():
    """ returns login status """
    data = request.get_json()
    obj = db_helper.student_login(data["student_id"], data["pwd"])
    return jsonify(obj)


@app.route("/student/apply", methods=['POST'])
def apply():
    data = request.get_json()
    db_helper.apply(data["student_id"], data["job_id"])
    result = {'success': True, 'response': 'Application added'}
    return jsonify(result)
