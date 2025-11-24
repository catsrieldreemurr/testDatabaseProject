import mysql from 'mysql2/promise';
import bcrypt from "bcrypt";

import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../lib/session";

export async function POST(req){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    const data = await req.json()
    const {username, email, password} = data;
    let rows;
    try{
        [rows] = await connection.execute('SELECT idUserInfo,passwordHash, username FROM UserInfo WHERE username= ?', [username])
    } catch(err){
        return new Response(JSON.stringify({message: 'something went wrong with the SQL'}), {status: 500})
    }

    if(rows.length === 0){
        return new Response(JSON.stringify({message:'User Not Found'}), {status: 404})
    }

    const user = rows[0]

    const match = await bcrypt.compare(password, user.passwordHash)
    if(!match){
        return new Response(JSON.stringify({message: 'Password does not match'}), {status: 401})
    }
    await connection.end()


    try{
    const res = new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
    const session = await getIronSession(req, res, sessionOptions);
    session.user = { id: user.id, username: user.username };
    await session.save();
    return res;
    }
    catch(err){
        console.error(err);
    }
}
