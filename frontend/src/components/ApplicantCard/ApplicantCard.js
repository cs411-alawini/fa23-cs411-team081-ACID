import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { apiDecideApplicantStatus } from "../../api/api";
import ApplyButton from "../ApplyButton/ApplyButton";

function ApplicantCard({ props }) {
	useEffect(() => {
		// console.log(props);
	}, []);

	const [statusChange, setStatusChange] = useState("");

	const handleAccept = async (e) => {
		// console.log(props.student_id, props.job_id);
		const response = await apiDecideApplicantStatus({
			student_id: props.student_id,
			job_id: props.job_id,
			status: "Accepted",
		});
		if (response.success === true) {
			setStatusChange("Accepted");
			toast.success("Status Updated", {
				position: "bottom-center",
				theme: "colored",
			});
			// this.ApplyButton.button.disabled = true;
		} else {
			toast.error("Status Update Failed", {
				position: "bottom-center",
				theme: "colored",
			});
		}
	};
	const handleReject = async (e) => {
		// console.log(props.student_id, props.job_id);
		const response = await apiDecideApplicantStatus({
			student_id: props.student_id,
			job_id: props.job_id,
			status: "Rejected",
		});
		if (response.success === true) {
			setStatusChange("Rejected");
			toast.success("Status Updated", {
				position: "bottom-center",
				theme: "colored",
			});
			// this.ApplyButton.button.disabled = true;
		} else {
			toast.error("Status Update Failed", {
				position: "bottom-center",
				theme: "colored",
			});
		}
	};
	return (
		<div className="flex flex-row min-w-full items-center justify-between border-2 p-3">
			<div className="flex flex-col space-y-2">
				<div className="font-bold text-lg">{props.job_type}</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">Degree:</span>
					<span>{props.degree}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">GPA:</span>
					<span>{props.gpa}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">Gender:</span>
					<span>{props.gender}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">Job Title:</span>
					<span>{props.job_title}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">University:</span>
					<span>{props.university_name}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span className="font-bold">Email:</span>
					<span>{props.email}</span>
				</div>
			</div>
			{props.status === "Accepted" && (
				<div>
					<button
						type="button"
						disabled
						className="bg-green-200 px-4 py-2 rounded-xl w-1/9"
					>
						Accepted
					</button>
				</div>
			)}
			{props.status === "Pending" && statusChange === "" && (
				<div className="flex flex-row space-x-3">
					<button
						onClick={handleAccept}
						type="button"
						className="bg-yellow-200 px-4 py-2 rounded-xl w-1/9 hover:bg-green-800 hover:text-white"
					>
						Approve
					</button>
					<button
						onClick={handleReject}
						type="button"
						className="bg-yellow-200 px-4 py-2 rounded-xl w-1/9 hover:bg-red-800 hover:text-white"
					>
						Reject
					</button>
				</div>
			)}
			{statusChange === "Accepted" && (
				<button
					disabled
					type="button"
					className="bg-green-200 px-4 py-2 rounded-xl w-1/9 "
				>
					Accepted
				</button>
			)}
			{statusChange === "Rejected" && (
				<button
					disabled
					type="button"
					className="bg-red-200 px-4 py-2 rounded-xl w-1/9 "
				>
					Rejected
				</button>
			)}
			{props.status === "Rejected" && (
				<div>
					<button
						type="button"
						disabled
						className="bg-red-200 px-4 py-2 rounded-xl w-1/9"
					>
						Rejected
					</button>
				</div>
			)}
		</div>
	);
}

export default ApplicantCard;
