import express from "express";
import auth_routes from "./auth/routes";
import comments_routes from '../src/comments/routes';
import posts_routes from '../src/posts/routes';



const app = express();
const port = 3000;

app.use(express.json());

app.use('/comments', comments_routes);

app.use('/posts', posts_routes);

app.use('/api/users', user_routes);

app.use('/auth', auth_routes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
