import {Router} from 'express';
import login from  '../Controllers/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {basic_signup, deleteUser, regUser, updateUser} from '../Controllers/userController.js';
import search from '../Controllers/searchController.js';
import { addProvider } from '../Controllers/providerController.js';
const router = Router();

router.post("/login",authMiddleware,login);
router.post("/search",authMiddleware,search);
router.post("/basic_signup",authMiddleware,basic_signup);
router.post("/signup",authMiddleware,regUser);

router.post("/updateInfo",authMiddleware,updateUser);

router.post("/regProvider",authMiddleware,addProvider);

router.delete("/delete",authMiddleware,deleteUser);



export default router;