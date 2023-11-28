import React from 'react'
import LoginForm from '../LoginForm/LoginForm'

function StudentLogin() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
        <div className='flex text-purple-800 font-bold text-3xl'>Student Login</div>
        <LoginForm></LoginForm>
    </div>
  )
}

export default StudentLogin