import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import ApplyButton from "../ApplyButton/ApplyButton";

function JobCard({ props }) {
	return (
		<div className="flex flex-row min-w-full items-center justify-between border-2 p-3">
			<div className="flex flex-col space-y-2">
				<div className="font-bold text-lg">{props.job_title}</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span>{props.company_name}</span>
					<FontAwesomeIcon
						className="text-blue-500"
						icon={faCircleCheck}
					/>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<FontAwesomeIcon icon={faLocationDot} />
					<span>{props.location}</span>
					<span>{props.job_id}</span>
				</div>
			</div>
			{props.status === "NA" && (
				<div>
					<ApplyButton props={props} />
				</div>
			)}
			{props.status === "Accepted" && (
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
			)}
		</div>
	);
}

export default JobCard;
