import { Router } from 'express';
import { add_comment, remove_comment } from './controller.js';

const router = Router();



router.post("/", add_comment);
router.delete("/:id", remove_comment);


export default router;


