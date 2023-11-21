/* To view number of students that applied to each job role */
SELECT
    J.job_id,
    J.job_title,
    COUNT(*)
from
    Job_Role J
    JOIN Applies A ON J.job_id = A.job_id
GROUP BY
    J.job_id;

/* To view number of job roles available for each company */
SELECT
    C.company_id,
    C.company_name,
    COUNT(*)
from
    Company C
    JOIN Job_Role J ON J.company_id = C.company_id
GROUP BY
    C.company_id;

/* To show all jobs applied along with status by a student */
SELECT
    J.job_id,
    J.job_title,
    J.job_type,
    J.salary,
    J.location,
    J.job_type,
    A.status
from
    Job_Role J
    JOIN Applies A ON J.job_id = A.job_id
    JOIN Student St ON A.student_id = St.student_id
WHERE
    St.student_id = "1";

/* To view number of jobs applied by a student */
SELECT
    St.student_id,
    COUNT(A.job_id)
from
    Student St
    JOIN Applies A ON St.student_id = A.student_id
GROUP BY
    St.student_id;

/* A recruiter who posted a job with id=1 can view all students that match the job role skillset */
SELECT
    St.student_id,
    St.email,
    St.university_name,
    St.gpa,
    T1.status
FROM
    Student St
    JOIN (
        SELECT
            O.student_id,
            A.status,
            COUNT(O.skill_id) AS skill_count
        FROM
            Owns O
            JOIN Applies A ON O.student_id = A.student_id
        WHERE
            O.skill_id IN (
                SELECT
                    R.skill_id
                FROM
                    Requires R
                WHERE
                    R.job_id = "1"
            )
            AND A.job_id = "1"
        GROUP BY
            O.student_id
    ) T1 ON T1.student_id = St.student_id
WHERE
    T1.skill_count = (
        SELECT
            COUNT(*)
        FROM
            Requires R
        WHERE
            R.job_id = "1"
    );

/* A student with id=1 can view all job postings that match his/her skillset */
SELECT
    J.job_id,
    J.job_title,
    J.salary,
    J.location,
    J.job_type,
    C.company_name
FROM
    Job_Role J
    JOIN (
        SELECT
            R.job_id,
            COUNT(R.skill_id) as skill_count
        FROM
            Requires R
        WHERE
            R.skill_id IN (
                SELECT
                    O.skill_id
                FROM
                    Owns O
                WHERE
                    O.student_id = "1"
            )
        GROUP BY
            R.job_id
    ) T1 ON T1.job_id = J.job_id
    JOIN Company C ON C.company_id = J.company_id
WHERE
    T1.skill_count = (
        SELECT
            COUNT(*)
        FROM
            Owns O
        WHERE
            O.student_id = "1"
    );

/* Average Salary for every job title */
SELECT
    J.job_title,
    AVG(J.salary)
from
    Job_Role J
GROUP BY
    J.job_title;

/* Average Salary for every job title and university name*/
SELECT
    J.job_title,
    St.university_name,
    AVG(J.salary) as avg_salary
from
    Job_Role J
    JOIN Applies A ON A.job_id = J.job_id
    JOIN Student St ON A.student_id = St.student_id
WHERE
    A.status = 'Accepted'
GROUP BY
    J.job_title,
    St.university_name
ORDER BY
    avg_salary DESC;

/* Which skillset has the highest avg salary */
/* List all job postings -- searching filtering etc */
/* List all student who have applied for a job role. */
/* STAGE -4 CRUD OPERATIONS*/
/* Create Job posting */
/* Update the job posting */
/* Insert into applies table */
/* Update Status of job applied */