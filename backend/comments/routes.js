import { Router } from 'express';
import { add_comment, } from './controller.js'; // add remove comment when implemented

const router = Router();



router.post("/add", add_comment);

export default router;


