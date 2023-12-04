import logo from "./logo.svg";
import "./App.css";
import {
	BrowserRouter,
	RouterProvider,
	createBrowserRouter,
	Route,
	Routes,
	Switch,
	Router,
	Link,
} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./components/HomePage/HomePage";
import RecruiterLogin from "./components/RecruiterLogin/RecruiterLogin";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import JobOpeningsPage from "./components/JobOpeningsPage/JobOpeningsPage";
import JobApplicationsPage from "./components/JobApplicationsPage/JobApplicationsPage";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import CompanyApplicantsPage from "./components/CompanyApplicantsPage copy/CompanyApplicantsPage";
import CreateJobs from "./components/CreateJobs/CreateJobs";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import ApplicantStats from "./components/ApplicantStats/ApplicantStats";

export const Auth = createContext();
export const SetAuth = createContext();
export const UserId = createContext();
export const SetUserId = createContext();
export const UserType = createContext();
export const SetUserType = createContext();
export const CompanyId = createContext();
export const SetCompanyId = createContext();

toast.configure();
function App() {
	const [auth, setauth] = useState(false);
	const [userId, setUserId] = useState(-1);
	const [companyId, setCompanyId] = useState(-1);
	const [userType, setUserType] = useState("");
	return (
		<>
			<Auth.Provider value={auth}>
				<SetAuth.Provider value={setauth}>
					<UserId.Provider value={userId}>
						<SetUserId.Provider value={setUserId}>
							<CompanyId.Provider value={companyId}>
								<SetCompanyId.Provider value={setCompanyId}>
									<UserType.Provider value={userType}>
										<SetUserType.Provider
											value={setUserType}
										>
											<RouterProvider router={router} />
										</SetUserType.Provider>
									</UserType.Provider>
								</SetCompanyId.Provider>
							</CompanyId.Provider>
						</SetUserId.Provider>
					</UserId.Provider>
				</SetAuth.Provider>
			</Auth.Provider>
		</>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/recruiterLogin",
		element: <RecruiterLogin />,
	},
	{
		path: "/studentLogin",
		element: <StudentLogin />,
	},
	{
		path: "/jobOpenings",
		element: <JobOpeningsPage />,
	},
	{
		path: "/jobApplications",
		element: <JobApplicationsPage />,
	},
	{
		path: "/companyApplicants",
		element: <CompanyApplicantsPage />,
	},
  {
		path: "/createJobs",
		element: <CreateJobs />,
	},
	{
		path: "/studentProfile",
		element: <StudentProfile />,
	},
  {
		path: "/applicantStats",
		element: <ApplicantStats />,
	},
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

export default App;
