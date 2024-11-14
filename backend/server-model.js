import express from "express";
import cors from "cors";

import comments_routes from '../backend/comments/routes.js';
import posts_routes from '../backend/posts/routes.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/comments', comments_routes);

app.use('/posts', posts_routes);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
