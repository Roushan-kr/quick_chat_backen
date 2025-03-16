import { Request, Response } from 'express';
import prisma from '../config/db.config.js';

class ChatGropController {
	static async index(req: Request, res: Response) {
		try {
			const user = req.user as AuthUser;

			const groups = await prisma.chatGroup.findMany({
				where: {
					user_id: user.id as number,
				},
				orderBy: {
					created_at: 'desc',
				},
			});

			return res.json({ data: groups });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}

	static async show(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (id) {
				const group = await prisma.chatGroup.findUnique({
					where: {
						id: String(id),
					},
				});
				return res.json({ data: group });
			}
			return res.status(400).json({ message: 'Please provide group id' });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}

	static async store(req: Request, res: Response) {
		try {
			const body = req.body;
			const user = req.user as AuthUser;
			const group = await prisma.chatGroup.create({
				data: {
					title: body?.title,
					passcode: body?.passcode || '',
					user_id: (user.id as number),
				},
			});
			return res.json({ data: group });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}
    
	static async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const body = req.body;

			const group = await prisma.chatGroup.update({
				where: {
					id: String(id),
				},
				data: body,
			});
			return res.json({ message: 'Group updated successfully!', group });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}
	static async destroy(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (id) {
				await prisma.chatGroup.delete({
					where: {
						id: String(id),
					},
				});
				return res.json({ message: 'Group deleted successfully!' });
			}
			return res.status(400).json({ message: 'Please provide group id' });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Something went wrong.please try again!' });
		}
	}
}
