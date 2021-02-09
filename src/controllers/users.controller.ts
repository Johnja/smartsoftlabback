import { User } from "../entity/User.entity";
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { createJWT } from '../helpers/jwt';


export const getUsers = async (req: Request, res: Response) => {

    try {

        //Buscar usuarios
        const users = await getRepository(User).find();

        return res.json({
            ok: true,
            users,
        });

    } catch (error) {
        console.log(error),
            res.status(500).json({
                ok: false,
                msg: 'Error Inesperado'
            })
    }
}

export const createUser = async (req: Request, res: Response) => {

    const { id, name, email, password } = req.body;
 

    const user = {
        name,
        email,
        password,
        id
    }

    try {

        //Verificar si el usuario no se ha creado antes por email

        const isEmail = await getRepository(User).findOne({ email });

        //Si existe no lo crea nuevamente

        if (isEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        };

        //encryptar contraseña

        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        user.password = passwordHash;

        //Crear Usuario

        const newUser = getRepository(User).create(user);
        const results = await getRepository(User).save(newUser);

        //Generar Token

        const token = await createJWT(newUser.id);

        res.json({
            ok: true,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado revisar logs',
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const {  name, email, password } = req.body;

    const user = {
        id,
        name,
        email,
        password,
    }

    try {

        //Verificar si el usuario existe y traerlo

        let userDB = await getRepository(User).findOne(id);

        //Verificar que exista

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Verificar el email recibido no pertenezca a otro usuario

        if (userDB.email !== email) {

            const isEmail = await getRepository(User).findOne({ email });

            if (isEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                })
            }
        }

        //Encryptar contraseña que llega

        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        user.password = passwordHash;

        //Actualizar usuario

        await getRepository(User).merge(userDB, user);

        const result = await getRepository(User).save(userDB);

        return res.json({
            ok: true,
            msg: 'Usuario Actualizado',
            name: userDB.name,
            email: userDB.email,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        //Verificar que existe

        const userDB = await getRepository(User).findOne(id);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Caso que exista borrar

        const result = getRepository(User).delete(id)

        res.json({
            ok: true,
            msg: 'Usuario Borrado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

export const getOneUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        //Verificar que el usuario existe

        const userDB = await getRepository(User).findOne(id);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}
