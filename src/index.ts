import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import cors from 'cors'
dotenv.config({
  path: ['.env', '.env.local'],
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));

const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

// Routes 
app.use('/api',router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 