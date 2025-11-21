"use client"
import Image from "next/image";
import Navbar from "./navbar";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(){
    if(username.length > 0 && rawPassword.length > 0 && email.length > 0){
      if(username.trim() !== "" && rawPassword.trim() !== "" && email.trim() !== ""){
      
        const res = await fetch('/api/register', {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username,
            email: email,
            password: rawPassword
          })
        })

        console.log(res)
      }
    }
  }

  return (
    <div>
      <Navbar></Navbar>

      <div>
        <h2 className="text-4xl font-bold text-center mt-10 underline">Register</h2>
        <form className="flex flex-col items-center mt-10">
          <label htmlFor="username" className="text-2xl font-bold">Username</label>
          <input type="text" id="username" placeholder="C00lKidd" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
            setUsername(e.target.value)
          }}></input>

          <label htmlFor="email" className="text-2xl font-bold">Email</label>
          <input type="text" id="email" placeholder="ExampleEmail@gmail.com" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
            setEmail(e.target.value)
          }}></input>

          <label htmlFor="password" className="text-2xl font-bold">Username</label>
          <input type="password" id="password" placeholder="Password@1234" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl" onChange={(e) => {
            setRawPassword(e.target.value);
          }}></input>

          <div className="flex gap-50 text-2xl mt-10">
            <button type="button" className="bg-green-500 p-5 rounded-xl" onClick={handleSubmit}>Register</button>
            <button type="button" className="bg-red-500 p-5 rounded-xl">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
