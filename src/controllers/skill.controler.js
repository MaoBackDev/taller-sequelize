import { Skill } from "../models/Skill.js";

export const createSkill = async (req, res) => {
  const { name } = req.body;

  try {
    const skillExist = await Skill.findOne({ where: { name }});
    if(skillExist) return res.status(400).json({
      message: 'La habilidad ya existe.'
    })

    const skill = await Skill.create({
      name
    })

    res.status(201).json({
      ok: true,
      skill
    })

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.status(200).json({
      ok: true,
      skills
    })
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}