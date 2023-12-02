import React from "react";
import LoginForm from "../LoginForm/LoginForm";

function RecruiterLogin() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="flex text-purple-800 font-bold text-3xl">
				Recruiter Login
			</div>
			<LoginForm props={{ type: "recruiter" }}></LoginForm>
		</div>
	);
}

export default RecruiterLogin;
