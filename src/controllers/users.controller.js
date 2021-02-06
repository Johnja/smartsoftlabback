import User from "../models/User.model";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { response } from 'express';
import  createJWT  from '../helpers/jwt';

const getUsers = async ( req, res = response ) => {

    try {

        //Buscar usuarios
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'password'],
            order: [
                ['id', 'DESC']
            ]
        });

        res.json({
            ok: true,
            users,
            uid: req.uid //UID de usuario que realiza la peticion
        });

    } catch (error) {
        console.log(error),
            res.status(500).json({
                ok: false,
                msg: 'Error Inesperado'
            })
    }
}

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;
    const id = uuidv4();

    try {

        //Verificar si el usuario no se ha creado antes

        const isEmail = await User.findOne({
            attributes: ['id', 'name', 'email', 'password'],
            where: { email }
        });

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

        //Crear Usuario

        let newUser = await User.create({
            id,
            name,
            email,
            password: passwordHash
        }, {
            fields: ['id', 'name', 'email', 'password']
        });

        //Generar Token

        const token = await createJWT(newUser.id);

        res.json({
            ok: true,
            name,
            email,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado revisar logs',
        });
    }
}

const updateUser = async (req, res = response) => {

    const id = req.params.id;
    const { name, email, password } = req.body;

    try {

        //Verificar si el usuario existe y traerlo

        const userDB = await User.findOne({
            attributes: ['id', 'name', 'email', 'password',],
            where: { id }
        });

        //Verificar que exista
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Verificar el email recibido no pertenezca a otro usuario

        if (userDB.email !== email) {

            const isEmail = await User.findOne({
                attributes: ['id', 'name', 'email', 'password',],
                where: { email }
            });

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

        //Actualizar usuario

        const updatedUser = await User.update({
            name,
            email,
            password: passwordHash
        },
            {
                where: { id }
            });

        return res.json({
            ok: true,
            msg: 'Usuario Actualizado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const id = req.params.id;

    try {

        //Verificar que existe

        const userDB = await User.findOne({
            attributes: ['id', 'name', 'email', 'password',],
            where: { id }
        });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Caso que exista borrar

        await User.destroy({
            where: {
                id
            }
        });

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

const getOneUser = async (req, res = response) => {

    const id  = req.params.id;

    try {

        //Verificar que el usuario existe

        const userDB = await User.findOne({
            attributes: ['id', 'name', 'email', 'password',],
            where: { id }
        });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        res.json({
            ok: true,
            id: userDB.dataValues.id,
            name: userDB.dataValues.name,
            email: userDB.dataValues.email,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getOneUser
}
