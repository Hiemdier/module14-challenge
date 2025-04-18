import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username },
    });
    // If user is not found, send an authentication failed response
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    console.log(`Logged in as user ${user.username}. ID ${user.id}`);
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate a JWT token for the authenticated user
    const id = user.id;
    const token = jwt.sign({ id, username }, secretKey, { expiresIn: '15m' });
    return res.json({ token }); // Send the token as a JSON response
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
