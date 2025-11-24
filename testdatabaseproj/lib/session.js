export const sessionOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: "test_Session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};