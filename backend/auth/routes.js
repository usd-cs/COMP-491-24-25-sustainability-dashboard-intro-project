import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.get('/', controller.get_users);
router.get('/:user_id', controller.get_users_by_id);
router.post('/', controller.add_users);
router.delete('/:user_id', controller.remove_users);
router.get('/username/:username', controller.get_users_by_username);
router.post('/login', controller.get_users_by_username_and_password);

export default router;