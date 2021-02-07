import { Product } from "../entity/Product.entity";
import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

export const getProducts = async ( req: Request, res: Response) => {

    try {

        //Buscar productos
        const products = await getRepository(Product).find()

        res.json({
            ok: true,
            products,
        });

    } catch (error) {
        console.log(error),
            res.status(500).json({
                ok: false,
                msg: 'Error Inesperado'
            })
    }
}

export const createProduct = async ( req: Request, res: Response) => {

    const { name, category, priece, stock } = req.body;
    const id = uuidv4();

    const product = {
        id,
        name,
        category,
        priece,
        stock
    }

    try {

        //Crear Producto

        const newProduct = getRepository(Product).create(product);
        const results = await getRepository(Product).save(newProduct);

        res.json({
            ok: true,
            msg: 'Producto creado',
            data: results
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado revisar logs',
        });
    }
}

export const updateProduct = async ( req: Request, res: Response ) => {

    const  id  = req.params.id;
    const { name, category, priece, stock } = req.body;

    try {

        //Verificar si el producto Existe y traerlo

        const productDB = await getRepository(Product).findOne(id);

        //Verificar que exista
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        };

        //Actualizar producto

        await getRepository(Product).merge(productDB, req.body);
        
        const result = await getRepository(Product).save(productDB);

        return res.json({
            ok: true,
            message: 'Producto actualizado',
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

export const deleteProduct = async ( req: Request, res: Response ) => {

    const id = req.params.id;

    try {

        //Verificar que existe

        const productDB = await getRepository(Product).findOne(id);

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        //Caso que exista borrar

        const result = getRepository(Product).delete(id)

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

export const getOneProduct = async ( req: Request, res: Response ) => {

    const id  = req.params.id;

    try {

        //Verificar que el producto existe

        const productDB = await getRepository(Product).findOne(id);

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        res.json({
            ok: true,
            data: productDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}



