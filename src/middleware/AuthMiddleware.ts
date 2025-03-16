import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function AuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeadder = req.headers.authorization;
	if (authHeadder === null || authHeadder === undefined) {
        return res.status(401).json({ message: 'Unauthorized' });
	}
    const token = authHeadder.split(' ')[1];
	jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = decoded as AuthUser;
		next();
	});
}
