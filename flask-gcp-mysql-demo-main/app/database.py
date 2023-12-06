"""Defines all the functions related to the database"""
from app import db
import json

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
        company_id = -1
    else:
        status =  True
        company_id = query_results[0][5]
        
    item = {
        "status": status,
        "id": recruiter_id,
        "userType": "recruiter",
        "company_id": company_id
    }

    return item


def fetch_job_postings(company_id: int, count: int) -> dict:

    conn = db.connect()
    query_results = conn.execute("Select * from Job_Role where company_id={} LIMIT 10 OFFSET {};".format(company_id, count)).fetchall()
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


def post_job(title: str, salary: int, location: str, job_type: str, company_id: int, skill_names: str) -> dict:

    try:
        print(title, salary, location, job_type, company_id, skill_names)
        conn = db.connect()
        cursor = conn.connection.cursor()   

        # Fetch skill IDs for the given skill names
        skill_names = skill_names.split(',')
        skill_ids = []
        for skill_name in skill_names:
            skill_name = skill_name.strip()
            cursor.execute("SELECT skill_id FROM Skill WHERE skill_name = %s limit 1", (skill_name,))
            result = cursor.fetchone()
            if result:
                skill_ids.append(result[0])
            else:
                raise Exception("Skill ID does not exists")
        print(skill_ids)
        cursor.execute("SELECT MAX(job_id) FROM Job_Role;")   
        job_id = cursor.fetchone()[0] + 1 
        query = 'INSERT INTO Job_Role VALUES (%s, %s, %s, %s, %s, %s, %s);'
        values = (job_id, title, salary, location, job_type, company_id, "Open")

        conn.execute(query, values)
        
        # Insert into Requires table
        for skill_id in skill_ids:
            query = 'INSERT INTO Requires (job_id, skill_id) VALUES (%s, %s);'
            values = (job_id, skill_id)
            conn.execute(query, values)

    except Exception as e: 
        print(e)

    finally:
        cursor.close()
        conn.close()


def delete_job_posting(job_id: int) -> None:
    conn = db.connect()
    query = 'Delete From Job_Role where job_id={};'.format(job_id)
    conn.execute(query)
    conn.close()

def fetch_job_openings(student_id: int, count: int) -> dict:
    conn = db.connect()
    query = '''SELECT a.*, b.company_name, c.student_id,
           CASE WHEN c.student_id = %(student_id)s THEN c.status ELSE %(default_status)s END AS status
    FROM Job_Role a
    LEFT JOIN Company b ON a.company_id = b.company_id
    LEFT JOIN Applies c ON a.job_id = c.job_id AND c.student_id = %(student_id)s
    ORDER BY a.job_id
    LIMIT 10 OFFSET {};
    '''.format(count)
    query_results = conn.execute(query, student_id=student_id, default_status="NA").fetchall()
    conn.close()
    # return roles
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def fetch_job_openings_by_name(student_id: int, company_name: str) -> dict:
    try:
        conn = db.connect()
        query = '''SELECT a.*, b.company_name, c.student_id,
            CASE WHEN c.student_id = %(student_id)s THEN c.status ELSE %(default_status)s END AS status
        FROM Job_Role a
        LEFT JOIN Company b ON a.company_id = b.company_id
        LEFT JOIN Applies c ON a.job_id = c.job_id AND c.student_id = %(student_id)s
        where b.company_name = %(company_name)s'''
        query_results = conn.execute(query, student_id=student_id, default_status="NA", company_name=company_name).fetchall()
        conn.close()
        for result in query_results:
            columns = result.keys()
        
        item = [dict(zip(columns, row)) for row in query_results]
        return item
    except Exception as e: 
        print(e)
        return []

def fetch_jobs_applied(student_id: int, count: int) -> dict:
    conn = db.connect()
    query = "select c.*, d.company_name, b.status from Student a join Applies b on a.student_id = b.student_id join Job_Role c on b.job_id = c.job_id join Company d on c.company_id = d.company_id where a.student_id={} LIMIT 10 OFFSET {};".format(student_id, count)
    query_results = conn.execute(query).fetchall()
    conn.close()
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def apply(student_id: int, job_id: int) -> None:
    conn = db.connect()
    query = 'Insert Into Applies VALUES ("{}", "{}", "{}");'.format("Pending", student_id, job_id)
    conn.execute(query)
    conn.close()

def fetch_company_applications(company_id: int, count: int) -> dict:
    conn = db.connect()
    query = "select c.*, b.*, a.status from Applies a join Job_Role b on a.job_id = b.job_id join Student c on a.student_id = c.student_id where company_id={}  LIMIT 10 OFFSET {};".format(company_id, count)
    query_results = conn.execute(query).fetchall()
    conn.close()
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def decide(student_id: int, job_id: int, status: str) -> None:
    conn = db.connect()
    query = "update Applies set Status='{}' where job_id={} and student_id={};".format(status, job_id, student_id)
    conn.execute(query)
    conn.close()

def close_job(job_id):
    conn = db.connect()
    query = "update Job_Role set job_status = 'Closed' where job_id = {};".format(job_id)
    conn.execute(query)
    conn.close()

def stats(company_id):
    conn = db.connect()
    query = f"CALL CalculateRecruiterStats({company_id}, @male_count, @male_percentage, @female_count, @female_percentage, @exp_counts);"
    conn.execute(query)

    # Retrieve the results
    result = conn.execute("SELECT @male_count, @male_percentage, @female_count, @female_percentage, @exp_counts;").fetchone()

    # Close the database connection
    conn.close()

    # Process the result and return as JSON
    columns = result.keys()
    items = dict(zip(columns, result))
    items["@exp_counts"] = json.loads(items["@exp_counts"])

    buckets = [0] * 5

    # Categorize the data into buckets based on years_of_exp
    for item in items["@exp_counts"]:
        exp = int(item["years_of_exp"])
        if exp <= 1:
            buckets[0] += item["count"]
        elif 2 <= exp <= 4:
            buckets[1] += item["count"]
        elif 4 < exp <= 6:
            buckets[2] += item["count"]
        elif 6 < exp <= 8:
            buckets[3] += item["count"]
        else:
            buckets[4] += item["count"]

    items["@0-1"] = buckets[0]
    items["@2-4"] = buckets[1]
    items["@4-6"] = buckets[2]
    items["@6-8 "] = buckets[3]
    items["@8+"] = buckets[4]
    items['@female_percentage'] = int(items['@female_percentage'])
    items['@male_percentage'] = int(items['@male_percentage'])
    return items

def fetch_job_by_skills(student_id: int) -> dict:
    conn = db.connect()
    query = '''SELECT J.job_id, J.job_title, J.salary, J.location, J.job_type, C.company_name, T1.skill_count
                FROM Job_Role J JOIN (
                    SELECT R.job_id, COUNT(R.skill_id) as skill_count
                    FROM Requires R
                    WHERE R.skill_id IN (
                        SELECT O.skill_id FROM Owns O WHERE O.student_id = %(student_id)s
                    )
                    GROUP BY R.job_id
                ) T1 ON T1.job_id = J.job_id
                JOIN Company C ON C.company_id = J.company_id
                WHERE T1.skill_count = (
                        SELECT COUNT(*) FROM 
                        Requires R
                        WHERE R.job_id = J.job_id
                        GROUP BY R.job_id
                );'''
    query_results = conn.execute(query, student_id=student_id).fetchall()
    conn.close()
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item

def fetch_student_by_skills(job_id: int) -> dict:
    conn = db.connect()
    query = '''SELECT St.student_id, St.email, St.university_name, St.gpa, T1.status
            FROM Student St JOIN 
            (
                SELECT O.student_id, A.status, COUNT(O.skill_id) AS skill_count
                FROM Owns O
                JOIN Applies A ON O.student_id = A.student_id
                WHERE O.skill_id IN (SELECT R.skill_id FROM Requires R WHERE R.job_id = %(job_id)s)
                AND A.job_id = 1
                GROUP BY O.student_id
            ) T1 ON T1.student_id = St.student_id
            WHERE T1.skill_count = (
                SELECT COUNT(*) FROM Requires R WHERE R.job_id = %(job_id)s
            );'''
    query_results = conn.execute(query, job_id=job_id).fetchall()
    conn.close()
    for result in query_results:
        columns = result.keys()
    
    item = [dict(zip(columns, row)) for row in query_results]
    return item