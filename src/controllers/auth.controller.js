import bcrypt from "bcrypt";
import { User } from "../models/User.js";


export const signUp = async (req, res) => {
  const { first_name, last_name, email, password, address } = req.body;

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

    // skills.map(skill => user.addSkill([skill]))
    // await user.save();

    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente.'
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email }
    })
    if(!user) return res.status(400).json({
      message: 'Credenciales incorrectas'
    })
    const passValid =  bcrypt.compareSync(password, user.password);
    if(!passValid) return res.status(400).json({
      message: 'Credenciales incorrectas'
    })

    res.status(200).json({
      ok: true,
      user: user.id
    })
  } catch (error) {
    
  }
}