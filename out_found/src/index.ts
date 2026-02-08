import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', name: 'Out&Found Investigative Hub' });
});

app.listen(port, () => {
  console.log(`Out&Found API listening on port ${port}`);
});
