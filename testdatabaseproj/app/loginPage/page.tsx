import Navbar from "../navbar";

export default function Loginpage(){
    return(
        <div>
            <Navbar></Navbar>
            <h2 className="text-4xl font-bold text-center mt-10 underline">Log In</h2>

        <form className="flex flex-col items-center mt-10">
            <label htmlFor="username" className="text-2xl font-bold">Username</label>
            <input type="text" id="username" placeholder="C00lKidd" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl"></input>

            <label htmlFor="email" className="text-2xl font-bold">Email</label>
            <input type="text" id="email" placeholder="ExampleEmail@gmail.com" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl"></input>

            <label htmlFor="password" className="text-2xl font-bold">Username</label>
            <input type="password" id="password" placeholder="Password@1234" className="border h-[3rem] w-1/3 text-2xl border-gray-400 rounded-xl"></input>

            <div className="flex gap-50 text-2xl mt-10">
                <button className="bg-green-500 p-5 rounded-xl">Log In</button>
                <button className="bg-red-500 p-5 rounded-xl">Clear</button>
            </div>

        </form>
        </div>
    )
}