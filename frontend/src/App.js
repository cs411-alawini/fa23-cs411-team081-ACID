import logo from './logo.svg';
import './App.css';
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
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import RecruiterLogin from './components/RecruiterLogin/RecruiterLogin';
import StudentLogin from './components/StudentLogin/StudentLogin';
import JobOpeningsPage from './components/JobOpeningsPage/JobOpeningsPage';
import StudentProfile from './components/StudentProfile/StudentProfile';

function App() {
  return (
    <>
    <RouterProvider router={router} /> 
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
    path: "/studentProfile",
    element: <StudentProfile />,
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default App;