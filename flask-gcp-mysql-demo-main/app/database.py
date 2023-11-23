"""Defines all the functions related to the database"""
from app import db

def fetch_todo(company_id: int) -> dict:
    """Reads all tasks listed in the todo table

    Returns:
        A list of dictionaries
    """

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


def update_task_entry(task_id: int, text: str) -> None:
    """Updates task description based on given `task_id`

    Args:
        task_id (int): Targeted task_id
        text (str): Updated description

    Returns:
        None
    """

    conn = db.connect()
    query = 'Update tasks set task = "{}" where id = {};'.format(text, task_id)
    conn.execute(query)
    conn.close()


def update_status_entry(task_id: int, text: str) -> None:
    """Updates task status based on given `task_id`

    Args:
        task_id (int): Targeted task_id
        text (str): Updated status

    Returns:
        None
    """

    conn = db.connect()
    query = 'Update tasks set status = "{}" where id = {};'.format(text, task_id)
    conn.execute(query)
    conn.close()


def insert_new_task(id: int, title: str, salary: int, location: str, type: str) ->  int:
    """Insert new task to todo table.

    Args:
        text (str): Task description

    Returns: The task ID for the inserted entry
    """

    conn = db.connect()
    query = 'Insert Into Job_Role VALUES ("{}", "{}", "{}", "{}", "{}", "{}");'.format(
        id, title, salary, location, type, 1)
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    task_id = query_results[0][0]
    conn.close()

    return task_id


def remove_task_by_id(job_id: int) -> None:
    """ remove entries based on task ID """
    conn = db.connect()
    query = 'Delete From Job_Role where job_id={};'.format(job_id)
    conn.execute(query)
    conn.close()
