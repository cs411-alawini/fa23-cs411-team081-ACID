import React from "react";
import JobCard from "../JobCard/JobCard";
import { useNavigate } from "react-router-dom";

function HomePage() {
	const navigate = useNavigate();

	const handleStudentButton = () => {
		navigate("/studentLogin");
	};
	const handleRecruiterButton = () => {
		navigate("/recruiterLogin");
	};

	return (
		<div className="bg-white flex flex-col space-y-8 items-center justify-center min-h-screen min-w-full">
			<div className="text-8xl font-extrabold text-purple-800">
				HireIt!
			</div>
			<div className="flex flex-row space-x-5 items-center justify-center">
				<button
					onClick={handleRecruiterButton}
					type="button"
					className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-full hover:bg-purple-800 hover:text-white"
				>
					Recruiter
				</button>
				<button
					onClick={handleStudentButton}
					type="button"
					className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-full hover:bg-purple-800 hover:text-white"
				>
					Student
				</button>
			</div>
		</div>
	);
}

export default HomePage;
