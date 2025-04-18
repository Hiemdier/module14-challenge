import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: number; // Change id to string to match the expected type
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1]; // Extract JWT
  const secretKey = process.env.JWT_SECRET_KEY || '';
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = { ...decoded, id: decoded.id }; // Convert id to string before assigning
    return next(); // ✅ Only proceed if token verification succeeds
  }
  catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
