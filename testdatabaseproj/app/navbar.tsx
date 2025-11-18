import Link from "next/link";

export default function Navbar(){
    return(
        <nav>
            <div className="bg-teal-700 flex place-content-between items-center p-5 text-white">
                <h1 className="text-4xl font-bold">Catsriel says Hi</h1>
                <div className="flex gap-10">
                    <Link href={"/"} className="text-xl">Registration</Link>
                    <Link href={"/loginPage"} className="text-xl">Log In</Link>
                </div>
            </div>
        </nav>
    )
}