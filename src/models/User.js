import { DataTypes } from "sequelize";
import { sequelize } from "../database/DBConnection.js";
import { Skill } from "./Skill.js";


export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
})

User.belongsToMany(Skill, { through: 'users_skills'} )
Skill.belongsToMany(User, { through: 'users_skills'} )

// Status.hasMany(User,{
//   foreignKey: 'status_id',
//   sourceKey: 'id'
// });

// User.belongsTo(Status, {
//   foreignKey: 'status_id',
//   targetKey: 'id'
// });

// CREATE TABLE users (
// id SERIAL PRIMARYKEY NOT NULL
//)