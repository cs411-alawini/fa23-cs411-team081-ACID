import React, { useEffect, Suspense, useContext, useState } from "react";
import {
	Auth,
	SetAuth,
	UserId,
	SetUserId,
	UserType,
	SetUserType,
} from "../../App";
import JobCard from "../JobCard/JobCard";
import { apiStudentAllApplications } from "../../api/api";
import { useNavigate } from "react-router-dom";

function JobApplicationsPage() {
	const _UserId = useContext(UserId);
	const _UserType = useContext(UserType);
	const _SetAuth = useContext(SetAuth);
	const auth = useContext(Auth);
	const [response, setResponse] = useState([]);
	const [count, setCount] = useState(0);
	console.log("UserId", _UserId);

	const [searchInput, setSearchInput] = useState("");

	const fetchJobApplications = async (e) => {
		const response = await apiStudentAllApplications({
			student_id: _UserId,
			count: count,
		});
		console.log(response);
		setResponse(response);
	};

	const handleSkillMatch = (e) => {
		e.preventDefault();
		navigate("/skillMatch");
	};

	const IncrementCount = () => {
		setCount(count + 10);
	};

	const DecrementCount = () => {
		if (count != 0) {
			setCount(count - 10);
		}
	};

	useEffect(() => {
		if (auth === false) {
			navigate("/");
		}
		fetchJobApplications();
	}, [count]);

	const navigate = useNavigate();

	const handleJobOpeningsClick = (e) => {
		e.preventDefault();
		navigate("/jobOpenings");
	};

	const handleLogOut = (e) => {
		e.preventDefault();
		_SetAuth(false);
		navigate("/");
	};

	return (
		<div className="bg-white flex flex-col items-center justify-start min-h-screen min-w-full">
			<div className="bg-violet-900 flex flex-col items-center justify-center min-w-full space-y-4 p-4">
				<div className="text-white font-bold text-2xl">
					Job Applications
				</div>
				<div className="flex flex-row space-x-5 w-full justify-center">
					<button
						onClick={handleJobOpeningsClick}
						className="border-2 border-white text-white px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Job Openings
					</button>
					<button
						onClick={handleSkillMatch}
						className="border-2 border-white text-white px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Skill Match
					</button>
					<button
						onClick={handleLogOut}
						className="border-2 border-white text-white px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Logout
					</button>
				</div>
			</div>

			<div className="flex flex-col p-4 items-center justify-center min-w-full">
				<Suspense fallback={<div>Loading...</div>}>
					{response.map((item, index) => (
						<JobCard key={index + 1} props={item}></JobCard>
					))}
				</Suspense>
				<div className="flex flex-row p-4 items-center justify-between min-w-full">
					<button
						className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
						onClick={DecrementCount}
					>
						Back
					</button>
					<button
						className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
						onClick={IncrementCount}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default JobApplicationsPage;
