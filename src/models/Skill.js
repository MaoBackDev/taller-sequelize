import { DataTypes } from "sequelize";
import { sequelize } from "../database/DBConnection.js";


export const Skill = sequelize.define('skills', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, 
  {
    timestamps: false
  }
)