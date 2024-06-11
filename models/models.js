import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(40), unique: true },
    name: { type: DataTypes.STRING(100) },
    password: { type: DataTypes.STRING(25) },
    role: { type: DataTypes.STRING(10), defaultValue: "USER" },
});

const Application = sequelize.define('application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING(10), defaultValue: "Active" },
    message: { type: DataTypes.STRING(400) },
    comment: { type: DataTypes.STRING(400) },
});

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    refreshToken: { type: DataTypes.STRING },
});

User.hasMany(Application);
Application.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

export {
    User,
    Application,
    Token
};