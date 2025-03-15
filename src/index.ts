import express from 'express';
import router from './routes';
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
  res.send('Hello World!');
});
// Routes 
app.get('/api',router);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 