

import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';


export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    //Leer el token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token'
        });
    }

    try {

        const uid = jwt.verify(token, process.env.JWT_SECRET || '');

        req.body = {
            "jswt": uid
        };

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}
