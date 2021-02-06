import { response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.model';
import  createJWT  from '../helpers/jwt';

const login = async (req, res = response) => {

 const { email, password } = req.body;

    try {

         //Buscar el usuario en DB

         const userDB= await User.findOne({
            attributes:  ['id', 'name', 'email', 'password'],
            where: { email }
        });

        const uid = userDB._id;

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

       const token = await createJWT(userDB._id);

        res.json({
            ok: true,
            token,
            uid
            
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

         //Generar el token - JWT

         const token = await createJWT(uid);

    res.json({
        ok: true,
        uid,
        token
    })
}

module.exports = {
    login,
    renewToken
}
