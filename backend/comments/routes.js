import { Router } from 'express';
import { add_comment, delete_comment } from './controller.js'; // Import the controller functions

const router = Router();


router.post("/add", add_comment);
router.post("/del", delete_comment);

export default router;


