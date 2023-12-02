import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import ApplyButton from "../ApplyButton/ApplyButton";

function JobCard({ props }) {
	console.log("props", props);
	return (
		<div className="flex flex-row min-w-full items-center justify-between border-2 p-3">
			<div className="flex flex-col space-y-2">
				<div className="font-bold text-lg">{props.job_title}</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<span>Company</span>
					<FontAwesomeIcon
						className="text-blue-500"
						icon={faCircleCheck}
					/>
				</div>
				<div className="flex flex-row items-center justify-start space-x-2 font-light text-sm">
					<FontAwesomeIcon icon={faLocationDot} />
					<span>{props.location}</span>
				</div>
			</div>
			<div>
				<ApplyButton />
			</div>
		</div>
	);
}

export default JobCard;
