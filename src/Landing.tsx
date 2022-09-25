import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import User from '../model/User';
import { Navigate } from 'react-router';
import UserContext from './UserContext';

export default function Landing() {

    const [currentPage, setCurrentPage] = useState('Login');
    const [serverPath, setServerPath] = useState('http://localhost:4000/login-user')
    // const [serverRes, setServerRes] = useState('');
    // const [credentials, setCredentials] = useState({
    //     username: '',
    //     password: ''
    // });

    const { serverRes, setServerRes, credentials, setCredentials } = useContext(UserContext);


    useEffect(() => {
        if (currentPage === 'Login') {
            setServerPath('http://localhost:4000/login-user')
        } else if (currentPage === 'Register'){
            setServerPath('http://localhost:4000/register-user')
        }
    }, [currentPage]);


    const submit = async () => {
      await axios.post(serverPath, credentials).then(res => {
        setServerRes(res.data)
      })
    };

    useEffect(() => {
        {serverRes === 'user-not-exist' && setCurrentPage('Register')}
    }, [serverRes])

    return (<>
            <div className="min-w-screen min-h-screen flex flex-col text-center justify-center align-center">
                <div className='w-1/2 min-w-fit self-center border p-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 flex flex-col gap-2'>
                    <h1 className='text-8xl text-white mb-6 text-left tracking-tighter font-bold'>{currentPage}</h1>
    
                    
                    <input value={credentials.username} onChange={(e) => {setCredentials((prev: any) => ({...prev, username: e.target.value}))}} type="username" placeholder='Username' className='w-full rounded p-4'></input>
                    <input value={credentials.password} onChange={(e) => {setCredentials((prev: any) => ({...prev, password: e.target.value}))}}type="password" placeholder='Password' className='w-full rounded p-4'></input>
                    <div className='flex flex-col w-full gap-2'>
                        <button className='w-full font-thin tracking-widest uppercase text-3xl bg-opacity-40 rounded p-4 bg-white' onClick={submit}>Submit</button>
                        
                        <button className='w-full font-thin text-center tracking-wide text-2xl mt-4 text-white hover:font-bold' onClick={() => {
                            {currentPage === 'Login' ? setCurrentPage('Register') : setCurrentPage('Login')}
                        }}>
                            {currentPage === 'Login' ? 'Create new account' : 'Already a user?'}
                        </button>

                    </div>
                </div>
            </div>

            {serverRes.success && <Navigate to="/dashboard" replace={true} />}
    </>)
}