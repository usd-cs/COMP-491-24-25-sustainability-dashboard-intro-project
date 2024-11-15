import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commentRoutes from './routes.js';

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the /api/comments route
app.use('/api/comments', commentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
