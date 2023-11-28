import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      alert('Logged in successfully!');
    } else {
      alert('Invalid username or password!');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (loggedIn) {
    return (
      <div className="bg-purple-800 min-h-screen flex justify-center items-center">
        <div className="text-white text-center">
          <h1 className="text-4xl mb-4">Welcome, {username}!</h1>
          <button
            className="bg-white text-purple-800 px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-row m-5 justify-center items-center"
      onSubmit={handleLogin}
    >
      <div className="bg-white border-2 border-purple-800 p-8 rounded-md shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="username" className="flex text-purple-800 font-bold mb-2">
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
          <label htmlFor="password" className="flex text-purple-800 font-bold mb-2">
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
