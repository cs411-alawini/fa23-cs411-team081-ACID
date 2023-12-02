"""Defines all the functions related to the database"""
from app import db

def student_login(student_id: int, pwd: str) -> dict:

    conn = db.connect()
    query_results = conn.execute("""Select * from Student where student_id="{}" and pwd="{}";""".format(student_id, pwd)).fetchall()
    conn.close()
    print(query_results)
    if len(query_results) == 0:
        status = False
    else:
        status =  True

    item = {
        "status": status,
        "id": student_id,
        "userType": "student"
    }
    return item

def recruiter_login(recruiter_id: int, pwd: str) -> dict:

    conn = db.connect()
    query_results = conn.execute("""Select * from Recruiter where recruiter_id="{}" and pwd="{}";""".format(recruiter_id, pwd)).fetchall()
    conn.close()
    
    if len(query_results) == 0:
        status = False
    else:
        status =  True
        
    item = {
        "status": status,
        "id": recruiter_id,
        "userType": "recruiter"
    }

    return item


def fetch_job_postings(company_id: int) -> dict:

    conn = db.connect()
    query_results = conn.execute("Select * from Job_Role where company_id={};".format(company_id)).fetchall()
    conn.close()
    roles = []
    for result in query_results:
        item = {
            "id": result[0],
            "title": result[1],
            "salary": result[2],
            "location": result[3],
            "job_type": result[4]
        }
        roles.append(item)

    return roles


# def update_task_entry(task_id: int, text: str) -> None:
#     """Updates task description based on given `task_id`

#     Args:
#         task_id (int): Targeted task_id
#         text (str): Updated description

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update tasks set task = "{}" where id = {};'.format(text, task_id)
#     conn.execute(query)
#     conn.close()


# def update_status_entry(task_id: int, text: str) -> None:
#     """Updates task status based on given `task_id`

#     Args:
#         task_id (int): Targeted task_id
#         text (str): Updated status

#     Returns:
#         None
#     """

#     conn = db.connect()
#     query = 'Update tasks set status = "{}" where id = {};'.format(text, task_id)
#     conn.execute(query)
#     conn.close()


def post_job(id: int, title: str, salary: int, location: str, type: str, company_id: int) ->  int:
    
    conn = db.connect()
    query = 'Insert Into Job_Role VALUES ("{}", "{}", "{}", "{}", "{}", "{}");'.format(
        id, title, salary, location, type, company_id)
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    task_id = query_results[0][0]
    conn.close()

    return task_id


def delete_job_posting(job_id: int) -> None:
    conn = db.connect()
    query = 'Delete From Job_Role where job_id={};'.format(job_id)
    conn.execute(query)
    conn.close()

def fetch_job_openings() -> dict:
    conn = db.connect()
    query_results = conn.execute("Select * from Job_Role;").fetchall()
    conn.close()
    # roles = []
    # for result in query_results:
    #     item = {
    #         "id": result[0],
    #         "title": result[1],
    #         "salary": result[2],
    #         "location": result[3],
    #         "job_type": result[4]
    #     }
    #     roles.append(item)

    # return roles
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def fetch_job_openings_by_name(company_name: str) -> dict:
    conn = db.connect()
    query = 'SELECT * FROM Job_Role a join Company b on a.company_id = b.company_id where b.company_name like "{}";'.format(company_name)
    query_results = conn.execute(query).fetchall()
    conn.close()
    roles = []
    # for result in query_results:
    #     item = {
    #         "id": result[0],
    #         "title": result[1],
    #         "salary": result[2],
    #         "location": result[3],
    #         "job_type": result[4]
    #     }
    #     roles.append(item)

    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def fetch_jobs_applied(student_id: int) -> dict:
    conn = db.connect()
    query = "select c.*, d.company_name from Student a join Applies b on a.student_id = b.student_id join Job_Role c on b.job_id = c.job_id join Company d on c.company_id = d.company_id where a.student_id={};".format(student_id)
    query_results = conn.execute(query).fetchall()
    conn.close()
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item