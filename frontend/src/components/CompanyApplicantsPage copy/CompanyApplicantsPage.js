import React, { useEffect, Suspense, useContext, useState } from "react";
import {
	Auth,
	SetAuth,
	UserId,
	SetUserId,
	UserType,
	SetUserType,
	CompanyId,
} from "../../App";
import JobCard from "../JobCard/JobCard";
import {
	apiCompanyApplicants,
	apiStudentAllJobPostings,
	apiStudentFetchByName,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import ApplicantCard from "../ApplicantCard/ApplicantCard";

function CompanyApplicantsPage() {
	const _UserId = useContext(UserId);
	const _CompanyId = useContext(CompanyId);
	const auth = useContext(Auth);
	const _SetAuth = useContext(SetAuth);
	const _UserType = useContext(UserType);
	const [response, setResponse] = useState([]);
	const [count, setCount] = useState(0);
	console.log("UserId", _UserId);
	console.log("companyId", _CompanyId);

	const [searchInput, setSearchInput] = useState("");

	const fetchApplicants = async (e) => {
		const response = await apiCompanyApplicants({
			company_id: _CompanyId,
			count: count,
		});
		setResponse(response);
		console.log("Fetching", response);
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
		fetchApplicants();
	}, [count]);

	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	const handleLogOut = (e) => {
		e.preventDefault();
		_SetAuth(false);
		navigate("/");
	};

	const navigate = useNavigate();

	const handleApplicationsClick = (e) => {
		e.preventDefault();
		navigate("/jobApplications");
	};

	// const handleSearch = async (e) => {
	// 	const response = await apiStudentFetchByName({
	// 		company_name: searchInput,
	// 		student_id: _UserId,
	// 	});
	// 	setResponse(response);
	// };

	const handleRemoveFilter = () => {
		setSearchInput("");
		setCount(0);
		fetchApplicants();
	};

	return (
		<div className="bg-white flex flex-col items-center justify-start min-h-screen min-w-full">
			<div className="bg-violet-900 flex flex-col items-center justify-center min-w-full space-y-4 p-4">
				<div className="text-white font-bold text-2xl">
					All Applicants
				</div>
				{/* <div>
					<input
						className="rounded- w-96"
						type="text"
						placeholder="Search here"
						onChange={handleChange}
						value={searchInput}
					/>
					<button
						onClick={handleSearch}
						className="border-2 border-purple-800 bg-white text-purple-800 px-2 h-fit py-1 ml-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Search
					</button>

					{searchInput !== "" && (
						<button
							onClick={handleRemoveFilter}
							className="border-2 border-purple-800 bg-white text-purple-800 px-2 h-fit py-1 ml-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
						>
							Remove Filter
						</button>
					)}
				</div> */}
				<div>
					<button
						onClick={handleApplicationsClick}
						className="border-2 border-white text-white px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Create Job
					</button>
					<button
						onClick={handleLogOut}
						className="border-2 ml-4 border-white text-white px-4 py-2 rounded-md w-1/9 hover:bg-purple-800 hover:text-white"
					>
						Logout
					</button>
				</div>
			</div>

			<div className="flex flex-col p-4 items-center justify-center min-w-full">
				<Suspense fallback={<div>Loading...</div>}>
					{response.map((item, index) => (
						<ApplicantCard
							key={index + 1}
							props={item}
						></ApplicantCard>
					))}
				</Suspense>
				{searchInput === "" && (
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
				)}
			</div>
		</div>
	);
}

export default CompanyApplicantsPage;
