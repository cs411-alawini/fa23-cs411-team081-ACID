import React, { useState } from "react";
import JobCard from "../JobCard/JobCard";

function JobOpeningsPage() {
	const [searchInput, setSearchInput] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	return (
		<div className="bg-white flex flex-col items-center justify-center min-h-screen min-w-full">
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
				<JobCard></JobCard>
				<JobCard></JobCard>
				<JobCard></JobCard>
				<JobCard></JobCard>
			</div>
		</div>
	);
}

export default JobOpeningsPage;
