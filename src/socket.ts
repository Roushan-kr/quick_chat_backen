import { Server } from 'socket.io';

export function setupSocket(io: Server) {
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
