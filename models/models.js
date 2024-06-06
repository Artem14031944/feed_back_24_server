import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Application = sequelize.define('application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING, defaultValue: "Active" },
    message: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
});

User.hasMany(Application);
Application.belongsTo(User);

export {
    User,
    Application
};