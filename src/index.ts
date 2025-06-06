import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { setupSocket } from './socket.js';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import radis from './config/radish.config.js';
import { instrument } from '@socket.io/admin-ui';

dotenv.config({
	path: ['.env', '.env.local'],
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: [ 'http://localhost:3000', 'https://admin.socket.io' ],
    credentials: true,
	},
	adapter: createAdapter(radis),

});

instrument(io, {
	auth: false,
	mode: 'development',
});

setupSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: '*',
	})
);

const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
	res.send('Hello World!');
});

// Routes
app.use('/api', router);

// Start the server
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export { io };
