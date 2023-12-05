import React, { useEffect, Suspense, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import ApplyButton from "../ApplyButton/ApplyButton";
import { apiCloseJobs, apiDeleteJob } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function JobCardCompany({ props }) {
	const [statusChange, setStatusChange] = useState("");

	const handleDelete = async (e) => {
		// console.log(props.id);
		const response = await apiDeleteJob({
			job_id: props.id,
		});
		if (response.success === true) {
			setStatusChange("Deleted");
			toast.success("Job Role Updated", {
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
	const handleClose = async (e) => {
		// console.log(props.id);
		const response = await apiCloseJobs({
			job_id: props.id,
		});
		if (response.success === true) {
			setStatusChange("Closed");
			toast.success("Job Role Updated", {
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
				<div className="font-bold text-lg">{props.title}</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span>{props.job_type}</span>
					<FontAwesomeIcon
						className="text-blue-500"
						icon={faCircleCheck}
					/>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<FontAwesomeIcon icon={faLocationDot} />
					<span>{props.location}</span>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					Job ID:
					<span>{props.id}</span>
				</div>
			</div>
			{statusChange === "" && (
				<div className="flex flex-row space-x-3">
					<button
						onClick={handleClose}
						type="button"
						className="bg-yellow-200 px-4 py-2 rounded-xl w-1/9 hover:bg-gray-500 hover:text-white"
					>
						Close
					</button>
					<button
						onClick={handleDelete}
						type="button"
						className="bg-yellow-200 px-4 py-2 rounded-xl w-1/9 hover:bg-red-800 hover:text-white"
					>
						Delete
					</button>
				</div>
			)}
			{statusChange === "Deleted" && (
				<button
					disabled
					type="button"
					className="bg-red-200 px-4 py-2 rounded-xl w-1/9 "
				>
					Deleted
				</button>
			)}
			{statusChange === "Closed" && (
				<button
					disabled
					type="button"
					className="bg-gray-400 px-4 py-2 rounded-xl w-1/9 "
				>
					Closed
				</button>
			)}
			{/* {props.status === "NA" && (
				<div>
					<ApplyButton props={props} />
				</div>
			)} */}
			{/* {props.status === "Accepted" && (
				<div>
					<button
						type="button"
						disabled
						className="bg-green-200 px-4 py-2 rounded-xl w-full "
					>
						Accepted
					</button>
				</div>
			)}
			{props.status === "Pending" && (
				<div>
					<button
						type="button"
						disabled
						className="bg-yellow-200 px-4 py-2 rounded-xl w-full "
					>
						Pending
					</button>
				</div>
			)}
			{props.status === "Rejected" && (
				<div>
					<button
						type="button"
						disabled
						className="bg-red-200 px-4 py-2 rounded-xl w-full "
					>
						Rejected
					</button>
				</div>
			)} */}
		</div>
	);
}

export default JobCardCompany;
