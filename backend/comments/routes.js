import { Router } from 'express';
import { get_comments_by_post } from './controller.js';

const router = Router();



router.post("/", controller.add_comments);
router.delete("/:id", controller.remove_comments);


export default router;


