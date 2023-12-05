import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserId } from "../../App";
import { apiStudentApplyJob } from "../../api/api";

function ApplyButton({ props }) {
	const [style, setStyle] = useState(
		"bg-purple-200 px-4 py-2 rounded-xl w-full hover:bg-purple-800 hover:text-white"
	);
	const [text, setText] = useState("Apply");
	const _UserId = useContext(UserId);

	const handleClick = async (e) => {
		// console.log(props.student_id, props.job_id);
		const response = await apiStudentApplyJob({
			student_id: _UserId,
			job_id: props.job_id,
		});
		// console.log(response);
		if (response.success === true) {
			setStyle("bg-yellow-200 px-4 py-2 rounded-xl w-full");
			setText("Pending");
			toast.success("Apply Success", {
				position: "bottom-center",
				theme: "colored",
			});
			// this.ApplyButton.button.disabled = true;
		} else {
			toast.error("Apply Failed", {
				position: "bottom-center",
				theme: "colored",
			});
		}
	};

	return (
		<button type="button" onClick={handleClick} className={style}>
			{text}
		</button>
	);
}

export default ApplyButton;
