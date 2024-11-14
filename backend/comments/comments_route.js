import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser for parsing request bodies
import commentRoutes from './routes.js';

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Define the /comments route
app.use('/api/comments', commentRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


