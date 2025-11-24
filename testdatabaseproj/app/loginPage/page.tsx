"use client"
import Navbar from "../navbar";
import { useState } from "react";

export default function Loginpage(){
    const [username, setUsername] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [email, setEmail] = useState("");
    
    async function HandleSubmit(){
        const res = await fetch('/api/login', {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username,
            email: email,
            password: rawPassword
          })
        })

        if(res.status == 200){
          console.log("Password is Correct")
        } else if(res.status !== 200){
          console.log("Password is Wrong")
        }

    }
    
    return(
        <div>
            <Navbar></Navbar>
            <h2 className="text-4xl font-bold text-center mt-10 underline">Log In</h2>

          <form className="flex flex-col items-center mt-10">
            <label htmlFor="username" className="text-2xl font-bold">Username</label>
            <input type="text" id="username" placeholder="C00lKidd" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
              setUsername(e.target.value)
            }}></input>

            <label htmlFor="email" className="text-2xl font-bold">Email</label>
            <input type="text" id="email" placeholder="ExampleEmail@gmail.com" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
              setEmail(e.target.value)
            }}></input>

            <label htmlFor="password" className="text-2xl font-bold">Password</label>
            <input type="password" id="password" placeholder="Password@1234" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
              setRawPassword(e.target.value);
            }}></input>

            <div className="flex gap-50 text-2xl mt-10">
                <button type="button" className="bg-green-500 p-5 rounded-xl" onClick={HandleSubmit}>Log In</button>
            </div>

        </form>
        </div>
    )
}