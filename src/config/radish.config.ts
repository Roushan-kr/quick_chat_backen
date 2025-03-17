import { Redis } from 'ioredis';

const radis =new  Redis({
	host: 'localhost',
	port: 6379,
});

export default radis;