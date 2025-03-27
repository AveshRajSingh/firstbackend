import React, { useState } from 'react'

const CreateAdmin = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const handleCreateAdminClick = async() => {
      console.log("running");
    try {
            const res = await fetch('http://localhost:3000/api/v1/admin/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            })
            console.log(res);
    } catch (error) {
        console.log("error occured",error);
    }
    }
    return (
        <div className="min-h-screen bg-zinc-800 text-white flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 w-[50vw]  py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-xl font-bold text-indigo-600 mb-6 border-b-2 border-blue-500 ">
              <span className="text-red-600 text-3xl">Register</span> for Admin
            </p>
            <div className="flex w-full  gap-5 flex-col ">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg"
                type="text"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg"
                type="password"
                placeholder="Password"
              />
              <div className="flex gap-3 justify-between">
                <button
                  className="bg-blue-600 w-full h-10 px-3 py-1 outline-none rounded-lg hover:bg-blue-800 transition duration-300"
                  onClick={(e) => handleCreateAdminClick(e)}
                >
                  Create Admin
                </button>
               
              </div>
            </div>
          </div>
        </div>
      );
}

export default CreateAdmin
