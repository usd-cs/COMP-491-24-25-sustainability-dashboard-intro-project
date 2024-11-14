import express from "express";
import cors from "cors";
import auth_routes from "./auth/routes.js";
import comments_routes from './comments/routes.js';
import posts_routes from './posts/routes.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/comments', comments_routes);

app.use('/posts', posts_routes);

app.use('/auth', auth_routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
