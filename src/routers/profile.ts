import { Router } from "express";
import authMiddleware from "../middlewares/auth"
import { getUserProfileName } from "../controllers/profile";

const profileRoutes:Router = Router();

profileRoutes.get('/:id', [authMiddleware], getUserProfileName)

export default profileRoutes;