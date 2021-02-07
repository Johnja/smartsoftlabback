/*

Path: '/api/login'

*/

import { Router } from 'express';
import { login, renewToken } from '../controllers/auth.controller';
import { check, validationResult } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { Request, Response, NextFunction } from 'express';

const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields,
    ],
    (req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
    login
);

router.get(
    '/renew',
    [
        validateJWT,
    ],
    (req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
    renewToken

)

export default router;