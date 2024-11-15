import { Router } from 'express';
import { add_comment, remove_comment } from './controller.js';

const router = Router();


router.post('/add_comment', add_comment); 
router.delete('/:commentId', remove_comment);


export default router;


