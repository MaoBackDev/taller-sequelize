import { Router } from "express";
import { getProfile, getUsers } from "../controllers/user.controller.js";
const router = Router();

// router.post('/', createUser);
router.get('/', getUsers);
router.get('/profile', getProfile);


export default router;