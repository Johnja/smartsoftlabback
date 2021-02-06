import Product from "../models/Product.model";
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';

const getProducts = async (req, res = response) => {

    try {

        //Buscar productos
        const products = await Product.findAll({
            attributes: ['id', 'name', 'category', 'priece', 'stock'],
            order: [
                ['id', 'DESC']
            ]
        });

        res.json({
            ok: true,
            products,
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

const createProduct = async (req, res = response) => {

    const { name, category, priece, stock } = req.body;
    const id = uuidv4();

    try {

        //Verificar si el producto no se ha creado antes por el name

        const isName = await Product.findOne({
            attributes: ['id', 'name', 'category', 'priece', 'stock'],
            where: { name }
        });

        //Si existe no lo crea nuevamente

        if (isName) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe otro producto con el mismo nombre'
            });
        };

        //Crear Producto

        let newProduct = await Product.create({
            id,
            name,
            category,
            priece,
            stock
        }, {
            fields: ['id', 'name', 'category', 'priece', 'stock']
        });

        res.json({
            ok: true,
            msg: 'Producto creado',
            data: newProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado revisar logs',
        });
    }
}

const updateProduct = async (req, res = response ) => {

    const  id  = req.params.id;
    const { name, category, priece, stock } = req.body;

    try {

        //Verificar si el producto Existe y traerlo

        const productDB = await Product.findOne({
            attributes: ['id', 'name', 'category', 'priece', 'stock'],
            where: {
                id
            }
        });

        //Verificar que exista
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        };

        console.log("producto DB",productDB);

        //Actualizar producto

        const updatedProduct = await Product.update({
            name,
            category,
            priece,
            stock
        },
            {
                where: { id }
            });

        return res.json({
            ok: true,
            message: 'Producto actualizado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteProduct = async (req, res = response ) => {

    const id = req.params.id;

    try {

        //Verificar que existe

        const productDB = await Product.findOne({
            attributes: ['id', 'name', 'category', 'priece', 'stock'],
            where: { id }
        });

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        //Caso que exista borrar

        await Product.destroy({
            where: {
                id
            }
        });

        res.json({
            ok: true,
            msg: 'Producto Borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const getOneProduct = async (req, res = response ) => {

    const id  = req.params.id;

    try {

        //Verificar que el producto existe

        const productDB = await Product.findOne({
            attributes: ['id', 'name', 'category', 'priece', 'stock'],
            where: { id }
        });

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        res.json({
            ok: true,
            data: product
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
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct
}


