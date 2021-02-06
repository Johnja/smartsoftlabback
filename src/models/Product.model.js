import Sequelize from "sequelize";
import { sequelize } from "../database/database";

//import User from "./User.model";

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    priece: {
        type: Sequelize.DOUBLE
    },
    stock: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false,
});

//Product.hasOne(User, { foreignKey: 'id', sourceKey: 'id' });
//User.belongsTo(Product, { foreignKey: 'projectId', sourceKey: 'id' });

export default Product;