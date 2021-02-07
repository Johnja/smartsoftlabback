/*

PATH: /api/products

*/

import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { getProducts, createProduct, updateProduct, deleteProduct, getOneProduct } from '../controllers/products.controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/',
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
    getProducts
);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre del producto es necesario').not().isEmpty(),
        check('category', 'Una categoria es necesaria').not().isEmpty(),
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
    createProduct
);

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('category', 'La categoria es obligatoria').not().isEmpty(),
        validateFields
    ],
    (req: Request, res: Response, next: NextFunction) => {
        //Verifica los errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
    updateProduct

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
        next()
    },
    deleteProduct

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
        }
        next()
    },
    getOneProduct
);

export default router;
