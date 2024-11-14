import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.get('/', controller.get_comments);
router.post("/", controller.add_comments);
router.get("/:id", controller.get_comments_by_id);
router.delete("/:id", controller.remove_comments);
router.get("/post/:id", controller.get_comments_by_post_id);

export default router;