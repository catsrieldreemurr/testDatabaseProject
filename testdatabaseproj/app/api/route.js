import mysql from 'mysql2/promise';

export async function GET() {
    console.log("ENV:", {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db: process.env.DB_NAME
    });

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute('DESCRIBE UserInfo');
        await connection.end();

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error("MYSQL ERROR:", err);
        return new Response("Error: " + err.message, { status: 500 });
    }
}
