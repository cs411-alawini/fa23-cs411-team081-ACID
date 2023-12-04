 import React, { useState } from 'react';



function StudentProfile() {
  return (

    <div className="bg-white flex flex-col items-center justify-start min-h-screen min-w-full">
			<div className="bg-violet-900 flex flex-col items-center justify-center min-w-full space-y-4 p-4">
				<div className="text-white font-bold text-2xl h-20 p-4 ">
                Student Profile


				</div>
				
			</div>


        <div className="container mx-auto mt-8">
        <div className="bg-white max-w-2xl mx-auto p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-gray-600">Name:</p>
                <p className="text-black font-semibold">priya ramesh</p>
            </div>
            <div>
                <p className="text-gray-600">Email:</p>
                <p className="text-black font-semibold">pr1234@gmail.com</p>
            </div>
            <div>
                <p className="text-gray-600">Gender:</p>
                <p className="text-black font-semibold">female</p>
            </div>
            <div>
                <p className="text-gray-600">Date of Birth:</p>
                <p className="text-black font-semibold">09/08/2001</p>
            </div>
            <div>
                <p className="text-gray-600">University:</p>
                <p className="text-black font-semibold">abc university</p>
            </div>
            <div>
                <p className="text-gray-600">Degree:</p>
                <p className="text-black font-semibold">bachelors</p>
            </div>
            <div>
                <p className="text-gray-600">GPA:</p>
                <p className="text-black font-semibold">9.3</p>
            </div>
            <div>
                <p className="text-gray-600">Graduation Date:</p>
                <p className="text-black font-semibold">09/05/2019</p>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};


export default StudentProfile;
