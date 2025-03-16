import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.config.js';
interface LoginPayloadType {
	name: string;
	email: string;
	oauth_id: string;
	provider: string;
	image?: string;
}

class AuthController {
	static async login(req: Request, res: Response): Promise<any> {
		try {
			const body: LoginPayloadType = req.body;
			const keys = Object.keys(body);
			if (keys.length === 0) {
				return res.status(400).json({ message: 'Please provide data' });
			}
				
			
			let findUser = await prisma.user.findUnique({
				where: {
					email: body.email,
				},
			});

			if (!findUser) {
				findUser = await prisma.user.create({
					data: body,
				});
			}
			let JWTPayload = {
				name: body.name,
				email: body.email,
				id: findUser.id,
			};
			const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
				expiresIn: '365d',
			});
			console.log(new Date(),"Token",token);
			return res.json({
				message: 'Logged in successfully!',
				user: {
					...findUser,
					token: `Bearer ${token}`,
				},
			});
		} catch (error) {
			// console.log(new Date(),"GOT Error In Login",error);
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}
}

export default AuthController;
