import React, { useEffect, Suspense, useContext, useState } from "react";
import "./CreateJobs.css";
import { CompanyId } from "../../App";
import { apiCreateJob } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateJobs = () => {
	const [jobtitle, setRole] = useState("");
	const [sal, setSal] = useState("");
	const [loc, setLoc] = useState("");
	const [type, setType] = useState("");
	const [skills, setSkills] = useState("");
	const _CompanyId = useContext(CompanyId);
	const navigate = useNavigate();

	useEffect(() => {
		// console.log("CompanyID", _CompanyId);
		// if (_CompanyId === -1) {
		// 	navigate("/");
		// }
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await apiCreateJob({
			job_title: jobtitle,
			salary: sal,
			location: loc,
			job_type: type,
			company_id: _CompanyId,
			skill_names: skills,
		});
		// console.log(response);
		if (response.success === true) {
			toast.success("Job Create Successful", {
				position: "bottom-center",
				theme: "colored",
			});
			setRole("");
			setSal("");
			setLoc("");
			setType("");
			setSkills("");
		} else {
			toast.error("Job Create Failed", {
				position: "bottom-center",
				theme: "colored",
			});
		}
	};

	return (
		<div className="job-form">
			<div className="flex text-purple-800 font-bold text-3xl">
				Post a New Job
			</div>
			{/*      
      <form
      className="flex flex-row m-5 justify-center items-center"
      onSubmit={handleSubmit}
    > */}

			<form onSubmit={handleSubmit} className="cform">
				<input
					type="text"
					placeholder="Job Title"
					className="cinput"
					value={jobtitle}
					onChange={(e) => setRole(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Salary"
					className="cinput"
					value={sal}
					onChange={(e) => setSal(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Location"
					className="cinput"
					value={loc}
					onChange={(e) => setLoc(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Job Type"
					className="cinput"
					value={type}
					onChange={(e) => setType(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Skills (comma separated)"
					className="cinput"
					value={skills}
					onChange={(e) => setSkills(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-full hover:bg-purple-800 hover:text-white"
				>
					Add Job Posting
				</button>
			</form>
		</div>
	);
};

export default CreateJobs;
// title,salary, location, type
