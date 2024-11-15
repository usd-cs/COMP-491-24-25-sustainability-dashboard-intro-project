// routes.js
import { Router } from 'express';
import { get_posts, add_posts} from './controller.js'; // Import controller functions

const router = Router();

// Define routes for posts
router.get('/get_posts', get_posts);         // Get all posts
router.post('/add_posts', add_posts);        // Add a new post
//router.delete('/posts/:id', remove_posts);  // Remove a post by ID

export default router;
