import React, { useState } from "react";
import "./CreateJobs.css"; 

const CreateJobs = () => {
  const [jobtitle, setRole] = useState("");
  const [sal, setSal] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const newJob = {
    //   // id: Math.random().toString(),
    //   desc: desc,
    //   exp: parseInt(exp),
    //   profile: profile,
    //   techs: techs.split(",").map((tech) => tech.trim()),
    // };
    // console.log(newJob);

    // fetch(`${process.env.REACT_APP_URL}/post`, {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newJob),
    // })
    //   .then((v) => {
    //     v.json();
    //   })
    //   .then((v) => console.log("Success:", v));

    // Clear input fields after submission
    setRole("");
    setSal("");
    setLoc("");
    setType("");
    setSkills("");
  };

  return (
    

    <div className="job-form">
      <div className='flex text-purple-800 font-bold text-3xl'>Post a New Job</div>
{/*      
      <form
      className="flex flex-row m-5 justify-center items-center"
      onSubmit={handleSubmit}
    > */}
    
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            value={jobtitle}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={sal}
            onChange={(e) => setSal(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Job Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setType(e.target.value)}
            required
          />
         <button
          type="submit"
          className="border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md w-full hover:bg-purple-800 hover:text-white"
        >Add Job Posting</button>
        </form>
      </div>

  );
};

export default CreateJobs;
// title,salary, location, type