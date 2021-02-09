import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { getUsers, createUser, updateUser, deleteUser, getOneUser } from '../controllers/users.controller';
import { Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/',
    [
        validateJWT
    ],
    ( req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
    getUsers
);

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields,
    ],
    (req: Request, res: Response, next: NextFunction ) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
    createUser

);

router.put(
    '/:id',
    [
       validateJWT,
       check('name', 'El nombre es obligatorio').not().isEmpty(),
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
        next();
    },
    updateUser
);

router.delete(
    '/:id',
    [
        validateJWT,
    ],
    (req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }  
        next();
    },
    deleteUser
);

router.get(
    '/:id',
    [
        validateJWT,
    ],
    (req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        };
        next();
    },
    getOneUser
);

export default router;