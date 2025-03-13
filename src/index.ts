import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 