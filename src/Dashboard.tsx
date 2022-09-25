import axios from "axios";
import UserContext from "./UserContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router";

export default function Dashboard() {

    const { serverRes, setServerRes, credentials, setCredentials } = useContext(UserContext);
    
    const currentUser = serverRes?.user;

    const connectServer = async () => {
        await axios.get('http://localhost:4000/dashboard')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    connectServer();

    const [formData, setFormData] = useState({})

    const formSubmit = async (e: any) => {
        e.preventDefault();
        setUpdateInfo(!updateInfo);
        await axios.post('http://localhost:4000/dashboard', {
            currentUser, formData
        }).then((res) => {
            setServerRes(res.data)
        }).catch((err) => {
            console.log(err)
        })
    };

    const formChange = (e: any) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const [updateInfo, setUpdateInfo] = useState(false);

    return (<>

        <div className="flex flex-col align-center justify-center min-w-screen min-h-screen text-center">
            <h1 className={"uppercase text-6xl font-bold tracking-tighter"}>Welcome {currentUser?.username}!</h1>
            {currentUser?.newlyCreated && 'You have successfully created a new account!'}
            <p>Your current account status is {currentUser?.role}.</p>
            <p>{currentUser?.firstName.length > 0 ? `Your first name is ${currentUser?.firstName}.` : 'You still need to update your first name.'}</p>
            <p>{currentUser?.lastName.length > 0 ? `Your last name is ${currentUser?.lastName}.` : 'You still need to update your last name.'}</p>
            <p>{currentUser?.email.length > 0 ? `Your email is ${currentUser?.email}.` : 'You still need to update your email.'}</p>
            

            {updateInfo ? <>

                <div className='p-4'>
                    <h2 className="text-2xl mb-2 uppercase font-light">Update Information</h2>
                    <form className="flex flex-col gap-2">
                        <input onChange={formChange} name='firstName' type="text" placeholder="First Name" className="rounded border p-2 max-w-lg self-center"></input>
                        <input onChange={formChange} name='lastName'  type="text" placeholder="Last Name" className="rounded border p-2 max-w-lg self-center"></input>
                        <input onChange={formChange} name='email' type="text" placeholder="Email" className="rounded border p-2 max-w-lg self-center"></input>
                        <button onClick={formSubmit} className="rounded border p-2 max-w-lg w-1/5 self-center">Click to post</button>
                    </form>
                </div>
            
            </> : <>
                <button onClick={() => setUpdateInfo(!updateInfo)} className="rounded border p-2 max-w-lg w-1/5 self-center">Want to update your info?</button> 
            </>}


        </div>




        {serverRes.length <= 0 && <Navigate to='/' />}
    </>)
}