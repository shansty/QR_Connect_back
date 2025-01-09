import { Router } from "express";
import authRoutes from "./auth";
import googleOAuthRoutes from "./google_oauth";
import profileRoutes from "./profile";


const rootRouter: Router = Router();

rootRouter.use('/', authRoutes);
rootRouter.use('/auth/google', googleOAuthRoutes)
rootRouter.use('/profile', profileRoutes)

export default rootRouter;