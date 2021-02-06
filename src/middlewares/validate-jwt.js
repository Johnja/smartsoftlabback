

import jwt from 'jsonwebtoken';


const validateJWT = (req, res, next) => {

    //Leer el token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJWT
};
