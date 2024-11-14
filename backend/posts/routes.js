import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.get('/', controller.get_posts);
router.post("/", controller.add_posts);
router.get("/:id", controller.get_posts_by_id);
router.delete("/:id", controller.remove_posts);

export default router;