import mysql from 'mysql2/promise';
const bcrypt = require("bcrypt");

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
        [rows] = await connection.execute('SELECT passwordHash FROM UserInfo WHERE username= ?', [username])
    } catch(err){
        return new Response(JSON.stringify({message: 'something went wrong with the SQL'}), {status: 500})
    }

    let PasswordHash;

    if(rows.length === 0){
        return new Response(JSON.stringify({message:'User Not Found'}), {status: 404})
    } 
    else{
        PasswordHash = rows[0].passwordHash;
    }

    try{
        const match = await bcrypt.compare(password, PasswordHash)
        if(match){
            return new Response(JSON.stringify({message: 'Password Matches'}), {status: 200})
        } else{
            return new Response(JSON.stringify({message: 'Password Does Not Match'}), {status: 401})
        }

    } catch(err){
        console.error(err)
    }

    await connection.end()
}