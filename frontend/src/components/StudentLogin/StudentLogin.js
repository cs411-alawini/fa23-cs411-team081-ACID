import React, { createContext, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";

export const StudentLoginContext = createContext();

function StudentLogin() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="flex text-purple-800 font-bold text-3xl">
				Student Login
			</div>
			<LoginForm props={{ type: "student" }}></LoginForm>
		</div>
	);
}

export default StudentLogin;
