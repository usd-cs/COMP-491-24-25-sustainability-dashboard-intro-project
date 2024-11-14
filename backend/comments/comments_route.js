import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser for parsing request bodies
import postRoutes from './routes.js';

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Define the /posts route
app.use('/api/comments', commentRoutes); // Use the postRoutes here if it's exporting a router

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
