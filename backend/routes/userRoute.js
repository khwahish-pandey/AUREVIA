import express from 'express';
import { getUserProfile } from '../controller.js/UserController.js';
import { isUserAuthenticated } from '../middleware/isAuth.js';
const userRoute=express.Router();
userRoute.get("/userprofile",isUserAuthenticated,getUserProfile);
export default userRoute;