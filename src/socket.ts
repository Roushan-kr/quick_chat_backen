import { Server ,Socket} from 'socket.io';

interface SocketWithRoom extends Socket {
	room: string;
}

export function setupSocket(io: Server) {
	io.use((socket, next) => {
		console.log('Socket Middleware', socket.id);
		const room = socket.handshake.auth.room;
		if (!room) {
			return next(new Error('No room provided'));
		}
		(socket as SocketWithRoom).room = room;
		next();
	});
	io.on('connection', (socket) => {
		console.log('Socket connected', socket.id);
		socket.on('join', (room) => {
			console.log('Joining Room', room);
			socket.join(room);
		});
		socket.on('message', (data) => {
			console.log('Message', data);
			io.to(data.room).emit('message', data);
		});
		socket.on('disconnect', () => {
			console.log('Socket disconnected',socket.id);
		});
	});
	io.on('disconnect', () => {
		console.log('Socket disconnected');
	});
}
