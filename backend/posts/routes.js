
import { Router } from 'express';
import { get_posts, add_posts, delete_posts} from './controller.js'; // Import controller functions

const router = Router();


router.get('/get_posts', get_posts);         // Get all posts
router.post('/add_posts', add_posts);        // Add a new post
router.delete('/:postId', delete_posts);

export default router;
