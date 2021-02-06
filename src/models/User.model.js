import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false,
});

export default User;