import jwt from 'jsonwebtoken';

export const generateTokenAndCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '20d' });

    res.cookie('jwt', token, {
        httpOnly: true,  // Prevents client-side JavaScript access
        secure: process.env.NODE_ENV === "production",  // Ensures it only works on HTTPS in production
        sameSite: "strict",  // Prevents CSRF attacks
        maxAge: 20 * 24 * 60 * 60 * 1000 // 20 days
    });
};
