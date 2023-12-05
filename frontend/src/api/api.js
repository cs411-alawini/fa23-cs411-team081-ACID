import axios from "axios";

export const baseURL = "http://127.0.0.1:5000/";
export const student_login = "student/login";
export const recruiter_login = "recruiter/login";
export const all_job_postings = "student/job_openings";
export const student_apply_job = "student/apply";
export const student_applications = "student/applied";
export const student_search_by_name = "student/job_openings_by_name";
export const company_applicants = "company/view_applications";
export const decide_applicant_status = "company/decide";
export const get_stats = "/company/stats";
export const get_jobs_by_skills = "/student/jobs_by_skills";
export const get_student_by_skills = "/company/students_by_skills";
export const close_job = "/company/close";
export const create_job = "/company/create";
export const delete_job = "/company/delete";
export const job_postings = "/company/postings";

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
		const response = await api.post(`${decide_applicant_status}`, {
			job_id: params.job_id,
			student_id: params.student_id,
			status: params.status,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiGetStats = async (params) => {
	try {
		const response = await api.post(`${get_stats}`, {
			company_id: params.company_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiGetJobsBySkills = async (params) => {
	try {
		const response = await api.post(`${get_jobs_by_skills}`, {
			student_id: params.student_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiStudentsBySkills = async (params) => {
	try {
		const response = await api.post(`${get_student_by_skills}`, {
			job_id: params.job_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiCloseJobs = async (params) => {
	try {
		const response = await api.post(`${close_job}`, {
			job_id: params.job_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiCreateJob = async (params) => {
	try {
		const response = await api.post(`${create_job}`, {
			job_title: params.job_id,
			salary: params.salary,
			location: params.location,
			job_type: params.job_type,
			company_id: params.company_id,
			skill_names: params.skill_names,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiDeleteJob = async (params) => {
	try {
		const response = await api.post(`${delete_job}`, {
			job_id: params.job_id,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const apiGetJobPostings = async (params) => {
	try {
		const response = await api.post(`${job_postings}`, {
			company_id: params.company_id,
			count: params.count,
		});
		console.log(response);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
