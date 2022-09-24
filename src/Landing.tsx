import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from '../model/User';
import { Navigate } from 'react-router';

export default function Landing() {

    const [currentPage, setCurrentPage] = useState('Login');
    const [serverPath, setServerPath] = useState('http://localhost:4000/login-user')
    const [serverRes, setServerRes] = useState('');
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    console.log(serverRes)

    useEffect(() => {
        if (currentPage === 'Login') {
            setServerPath('http://localhost:4000/login-user')
        } else if (currentPage === 'Register'){
            setServerPath('http://localhost:4000/register-user')
        }
    })

    const submit = async () => {
      await axios.post(serverPath, credentials).then(res => {
        setServerRes(res.data)
      })
    };


    return (<>
            <div className="min-w-screen min-h-screen flex flex-col text-center justify-center align-center">
                <div className='w-1/2 self-center border p-6 rounded bg-blue-300 flex flex-col gap-2'>
                    <h1 className='text-3xl text-left tracking-tighter font-bold'>{currentPage}</h1>
                    <input onChange={(e) => {setCredentials(prev => ({...prev, username: e.target.value}))}} type="text" placeholder='Username' className='w-full rounded p-2'></input>
                    <input onChange={(e) => {setCredentials(prev => ({...prev, password: e.target.value}))}}type="text" placeholder='Password' className='w-full rounded p-2'></input>
                    <button onClick={submit}>Click</button>
                    <button onClick={() => {setCurrentPage('Register')}}>Already a user?</button>
                </div>
            </div>

            {/* {serverRes === 'verified' && <Navigate to="/dashboard" replace={true} />} */}
    </>)
}