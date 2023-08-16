import { Op } from 'sequelize';
import bcrypt from "bcrypt";
import { User } from '../models/User.js';
import { Skill } from '../models/Skill.js';

export const getUsers = async(req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { first_name: 'camilo' },
          { email: 'camilo2@gmail.com' }
        ]
        // first_name: {
        //   [Op.eq]: 'camilo'
        // }
      },
      attributes: {
        exclude: ['password', 'updatedAt']
      }
    });
    res.status(200).json({
      ok: true,
      users
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      where: {
        status: 'activo'
      },
      attributes: {
        exclude: ['password', 'status', 'createdAt', 'updatedAt']
      },
      include: [{
        model: Skill,
        attributes: {
          exclude: ['id']
        },
        through: { attributes: [] }
      }]
    });
    res.status(200).json({
      ok: true,
      user
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}



export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, address, skills} = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {

    // select * from users where email=email
    const userExist = await User.findOne({
      where: { email }
    })

    if(userExist) return res.status(400).json({
      message: 'ya existe una cuenta con el email proporcinado.'
    })

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      address
    })

    skills.map(skill => user.addSkill([skill]))
    await user.save();

    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente.'
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}