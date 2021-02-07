import bcrypt from 'bcryptjs';
import { User } from '../entity/User.entity';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { createJWT } from '../helpers/jwt';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        //Buscar el usuario en DB

        const userDB = await getRepository(User).findOne({ email });

        //Si no regresa usuario

        if (!userDB) {

            return res.status(400).json({
                ok: false,
                msg: 'Verifique contraseña y email'
            })
        } 

        //Verificar contraseña

        const validPassword = bcrypt.compareSync(password, userDB.password);


        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        };


        //Generar el token - JWT

        const token = await createJWT(userDB.id);

        res.json({
            ok: true,
            token,

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const renewToken = async (req: Request, res: Response) => {

    const { jswt } = req.body;

    //Generar el token - JWT

    const token = await createJWT(jswt.uid);

    res.json({
        ok: true,
        uid: jswt.uid,
        token
    })
}

