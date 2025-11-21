import mysql from 'mysql2/promise';
const bcrypt = require("bcrypt");

async function HashPass(unHashPass){
    return bcrypt.hash(unHashPass, 10).then(function(hash){
        return hash
    })
}

export async function POST(req){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    
    try{
    const data = await req.json();
    const {username, email, password} = data;
    console.log(username, email, password);
    
    const hashedPassword = await HashPass(password);
    
    await connection.execute(
        'INSERT INTO UserInfo (username, email, password) VALUES(?, ?, ?)', [username, email, hashedPassword]
    )

    await connection.end()

    return new Response(JSON.stringify({ message: "User Registered Successfully" }), { status: 200 });
    }
    catch(err){
        console.error(err);
        return new Response(JSON.stringify({message: "Somthing Went Wrong"}, {status: 500}));
    }
}