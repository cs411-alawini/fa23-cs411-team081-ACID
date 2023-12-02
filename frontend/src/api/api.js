import axios from "axios";

export const baseURL = "http://127.0.0.1:5000/";
export const student_login = "student/login";
export const recruiter_login = "recruiter/login";
export const all_job_postings = "student/job_openings";

export const api = axios.create({
	baseURL: "http://127.0.0.1:5000/",
});

export const apiStudentLogin = async (credentials) => {
	try {
		const response = await api.post(
			`${student_login}`,
			{
				student_id: credentials.student_id,
				pwd: credentials.pwd,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiRecruiterLogin = async (credentials) => {
	try {
		const response = await api.post(`${recruiter_login}`, {
			recruiter_id: credentials.recruiter_id,
			pwd: credentials.pwd,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiStudentAllJobPostings = async () => {
	try {
		const response = await api.get(`${all_job_postings}`);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
