interface AuthUser {
	id: Number;
	name: string;
	email: string;
}

declare namespace Express {
	export interface Request {
		user?: AuthUser;
	}
}
