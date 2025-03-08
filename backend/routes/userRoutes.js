import {Router} from 'express';
import login from  '../Controllers/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {deleteUser, regUser, updateUser} from '../Controllers/userController.js';
import search from '../Controllers/searchController.js';
const router = Router();

router.post("/login",authMiddleware,login);
router.post("/search",authMiddleware,search);

router.post("/signup",authMiddleware,regUser);

router.post("/updateInfo",authMiddleware,updateUser);

router.delete("/delete",authMiddleware,deleteUser);



export default router;