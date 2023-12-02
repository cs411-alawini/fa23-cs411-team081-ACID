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
import { apiStudentAllJobPostings } from "../../api/api";

function JobOpeningsPage() {
	const _UserId = useContext(UserId);
	const _UserType = useContext(UserType);
	const [response, setResponse] = useState([]);
	console.log("UserId", _UserId);

	const [searchInput, setSearchInput] = useState("");

	const fetchJobOpenings = async (e) => {
		const response = await apiStudentAllJobPostings();
		setResponse(response);
		console.log(response);
	};

	useEffect(() => {
		fetchJobOpenings();
	});

	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	return (
		<div className="bg-white flex flex-col items-center justify-start min-h-screen min-w-full">
			<div className="bg-violet-900 flex flex-col items-center justify-center min-w-full space-y-4 p-4">
				<div className="text-white font-bold text-2xl">
					Active Job Openings
				</div>
				<div>
					<input
						className="rounded- w-96"
						type="text"
						placeholder="Search here"
						onChange={handleChange}
						value={searchInput}
					/>
					<button className="bg-white">Search</button>
				</div>
			</div>

			<div className="flex flex-col p-4 items-center justify-center min-w-full">
				<Suspense fallback={<div>Loading...</div>}>
					{response.map((item, index) => (
						<JobCard key={index + 1} props={item}></JobCard>
					))}
				</Suspense>
			</div>
		</div>
	);
}

export default JobOpeningsPage;
