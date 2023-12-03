import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	Auth,
	SetAuth,
	UserId,
	SetUserId,
	UserType,
	SetUserType,
	SetCompanyId,
	CompanyId,
} from "../../App";
import { apiStudentLogin, apiRecruiterLogin, api } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ props }) => {
	const _Auth = useContext(Auth);
	const _SetAuth = useContext(SetAuth);
	const _UserId = useContext(UserId);
	const _SetUserId = useContext(SetUserId);
	const _UserType = useContext(UserType);
	const _SetUserType = useContext(SetUserType);
	const _CompanyId = useContext(CompanyId);
	const _SetCompanyId = useContext(SetCompanyId);

	const [username, setUsername] = useState(0);
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		let response = null;
		if (props.type === "student") {
			response = await apiStudentLogin({
				student_id: username,
				pwd: password,
			});
		} else if (props.type === "recruiter") {
			response = await apiRecruiterLogin({
				recruiter_id: username,
				pwd: password,
			});
		}
		// console.log("Boom", response);
		if (response.status === true) {
			// let obj = {
			// 	user_id: response.id,
			// 	user_type: response.userType,
			// 	status: response.status,
			// };
			// let obj_str = JSON.stringify(obj);
			_SetAuth(true);
			_SetUserId(response.id);
			_SetUserType(response.userType);
			toast.success("Login Successful", {
				position: "bottom-center",
				theme: "colored",
			});
			if (response.userType === "student") {
				navigate("/jobOpenings");
			} else {
				_SetCompanyId(response.company_id);
				navigate("/companyApplicants");
			}
		} else {
			toast.error("Login Failed", {
				position: "bottom-center",
				theme: "colored",
			});
		}
	};

	return (
		<form
			className="flex flex-row m-5 justify-center items-center"
			onSubmit={handleLogin}
		>
			<div className="bg-white border-2 border-purple-800 p-8 rounded-md shadow-md w-80">
				<div className="mb-4">
					<label
						htmlFor="username"
						className="flex text-purple-800 font-bold mb-2"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border-2 border-purple-800 rounded-md px-4 py-2 w-full focus:outline-none focus:border-purple-700"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="flex text-purple-800 font-bold mb-2"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-2 border-purple-800 rounded-md px-4 py-2 w-full focus:outline-none focus:border-purple-700"
					/>
				</div>
				<button
					type="submit"
					className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-full hover:bg-purple-800 hover:text-white"
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
