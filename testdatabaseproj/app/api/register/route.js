export async function POST(req){
    try{
    const data = await req.json();

    const {username, email, password} = data;

    console.log(username, email, password);

    return new Response(JSON.stringify({ message: "User recieved" }), { status: 200 });
    }
    catch(err){
        console.error(err);
    }
}