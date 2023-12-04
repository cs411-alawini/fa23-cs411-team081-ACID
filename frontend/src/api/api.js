import axios from "axios";

export const baseURL = "http://127.0.0.1:5000/";
export const student_login = "student/login";
export const recruiter_login = "recruiter/login";
export const all_job_postings = "student/job_openings";
export const student_apply_job = "student/apply";
export const student_applications = "student/applied";
export const student_search_by_name = "student/job_openings_by_name";
export const company_applicants = "company/view_applications";
export const decideApplicantStatus = "company/decide";

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

export const apiStudentAllJobPostings = async (params) => {
	try {
		const response = await api.post(`${all_job_postings}`, {
			student_id: params.student_id,
			count: params.count,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiStudentApplyJob = async (params) => {
	console.log("Params", params);
	try {
		const response = await api.post(`${student_apply_job}`, {
			student_id: params.student_id,
			job_id: params.job_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiStudentAllApplications = async (params) => {
	try {
		const response = await api.post(`${student_applications}`, {
			student_id: params.student_id,
			count: params.count,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiStudentFetchByName = async (params) => {
	try {
		const response = await api.post(`${student_search_by_name}`, {
			company_name: params.company_name,
			student_id: params.student_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiCompanyApplicants = async (params) => {
	try {
		const response = await api.post(`${company_applicants}`, {
			company_id: params.company_id,
			count: params.count,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiDecideApplicantStatus = async (params) => {
	try {
		const response = await api.post(`${decideApplicantStatus}`, {
			job_id: params.job_id,
			student_id: params.student_id,
			status: params.status,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
