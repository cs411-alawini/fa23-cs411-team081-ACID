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
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const Auth = createContext();
export const SetAuth = createContext();
export const UserId = createContext();
export const SetUserId = createContext();
export const UserType = createContext();
export const SetUserType = createContext();

toast.configure();
function App() {
	const [auth, setauth] = useState(false);
	const [userId, setUserId] = useState();
	const [userType, setUserType] = useState("");
	return (
		<>
			<Auth.Provider value={auth}>
				<SetAuth.Provider value={setauth}>
					<UserId.Provider value={userId}>
						<SetUserId.Provider value={setUserId}>
							<UserType.Provider value={userType}>
								<SetUserType.Provider value={setUserType}>
									<RouterProvider router={router} />
								</SetUserType.Provider>
							</UserType.Provider>
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
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

export default App;
