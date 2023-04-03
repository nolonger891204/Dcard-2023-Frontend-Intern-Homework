import {Router} from 'express'
import getRequestToken from './getRequestToken'

const router = Router();
router.use('/', getRequestToken);

export default router;