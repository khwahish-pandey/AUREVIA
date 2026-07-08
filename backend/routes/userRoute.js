import express from 'express';
import { getUserProfile } from '../controller.js/UserController.js';
import { isUserAuthenticated } from '../middleware/isAuth.js';
import { currAdmin } from '../controller.js/UserController.js';
import  adminAuth  from '../middleware/adminAuth.js';

const userRoute=express.Router();
userRoute.get("/userprofile",isUserAuthenticated,getUserProfile);
userRoute.get("/adminprofile",adminAuth,currAdmin);
export default userRoute;