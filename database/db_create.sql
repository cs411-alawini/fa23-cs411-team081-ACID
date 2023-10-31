CREATE DATABASE IF NOT EXISTS hireit;

USE hireit;

CREATE TABLE IF NOT EXISTS Student (
    student_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    dob DATE NOT NULL,
    age INT NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    gpa DECIMAL(5, 2) NOT NULL,
    grad_date INT NOT NULL,
    pwd VARCHAR(20) NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE IF NOT EXISTS Company (
    company_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    hq_location VARCHAR(255) NOT NULL,
    sector VARCHAR(255) NOT NULL,
    PRIMARY KEY (company_id)
);

CREATE TABLE IF NOT EXISTS Recruiter(
    recruiter_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pwd VARCHAR(20) NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (recruiter_id)
);

CREATE TABLE IF NOT EXISTS Job_Role(
    job_id INT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (job_id)
);

CREATE TABLE IF NOT EXISTS Skill(
    skill_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (skill_id)
);

CREATE TABLE IF NOT EXISTS Applies (
    status VARCHAR(255) NOT NULL,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (job_id) REFERENCES Job_Role(job_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (student_id, job_id)
);

CREATE TABLE IF NOT EXISTS Worked (
    company_id INT NOT NULL,
    student_id INT NOT NULL,
    work_exp_id INT NOT NULL,
    role VARCHAR(255) NOT NULL,
    years_of_exp INT NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (work_exp_id)
);

CREATE TABLE IF NOT EXISTS Requires(
    skill_id INT NOT NULL,
    job_id INT NOT NULL,
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (job_id) REFERENCES Job_Role(job_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(skill_id, job_id)
);

CREATE TABLE IF NOT EXISTS Owns (
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(student_id, skill_id)
);