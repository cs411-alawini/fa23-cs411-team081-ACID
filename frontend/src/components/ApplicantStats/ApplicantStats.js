import React, { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CompanyId } from "../../App";
import { useNavigate } from "react-router-dom";

import "./ApplicantStats.css";
import { apiGetStats } from "../../api/api";
const ApplicantStats = () => {
	const _CompanyId = useContext(CompanyId);
	const [response, setResponse] = useState([]);
	const [buckets, setBuckets] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (_CompanyId === -1) {
			navigate("/");
		}
		fetchStats();
	}, []);

	const fetchStats = async (e) => {
		const response = await apiGetStats({
			company_id: _CompanyId,
		});
		console.log(response);
		setBuckets(response["@buckets"]);
		console.log("GETIT", buckets);
		setResponse(response);
	};

	return (
		<div className="bg-white flex flex-col items-center justify-start min-h-screen min-w-full">
			<div className="bg-violet-900 flex flex-col items-center justify-center min-w-full space-y-4 p-4">
				<div className="text-white font-bold text-2xl h-20 p-4 ">
					Statistics on Students
				</div>
			</div>
			<div className="App">
				<div className="dataCard customerCard">
					<div>Work Experience Distribution</div>
					<Bar
						data={{
							labels: ["0-1", "2-4", "4-6", "6-8", "8+"],
							datasets: [
								{
									label: "Work Experience",
									data: [
										response["@0-1"],
										response["@2-4"],
										response["@4-6"],
										response["@6-8"],
										response["@8+"],
									],
									backgroundColor: [
										"rgba(255, 99, 132, 0.2)",
										"rgba(255, 159, 64, 0.2)",
										"rgba(255, 205, 86, 0.2)",
										"rgba(75, 192, 192, 0.2)",
										"rgba(54, 162, 235, 0.2)",
										"rgba(153, 102, 255, 0.2)",
										"rgba(201, 203, 207, 0.2)",
									],
									borderColor: [
										"rgb(255, 99, 132)",
										"rgb(255, 159, 64)",
										"rgb(255, 205, 86)",
										"rgb(75, 192, 192)",
										"rgb(54, 162, 235)",
										"rgb(153, 102, 255)",
										"rgb(201, 203, 207)",
									],
									borderWidth: 1,
								},
							],
						}}
						options={{
							elements: {
								line: {
									tension: 0.5,
								},
							},
							plugins: {
								title: {
									text: "Work Experience",
								},
							},
						}}
					/>
				</div>

				<div className="dataCard categoryCard">
					<div>Gender Distribution</div>
					<Doughnut
						data={{
							labels: ["Male", "Female"],
							datasets: [
								{
									label: "Gender Based Stats",
									data: [
										response["@male_percentage"],
										response["@female_percentage"],
									],
									backgroundColor: [
										"rgb(255, 99, 132)",
										"rgb(54, 162, 235)",
										"rgb(255, 205, 86)",
									],
								},
							],
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ApplicantStats;
