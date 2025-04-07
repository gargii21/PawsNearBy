import {Router} from 'express';
import login from  '../Controllers/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {basic_signup, deleteUser, regUser, updateUser} from '../Controllers/userController.js';
import search from '../Controllers/searchController.js';
import { addProvider } from '../Controllers/providerController.js';
//import { sendRequest, acceptRequest, rejectRequest, getRequestStatus } from '../Controllers/requestController.js';
import  addPet  from '../Controllers/petController.js';
import createRequest from '../Controllers/requestController.js';
const router = Router();

router.post("/login",authMiddleware,login);
router.post("/search",authMiddleware,search);
router.post("/basic_signup",authMiddleware,basic_signup);
router.post("/signup",authMiddleware,regUser);

router.post("/updateInfo",authMiddleware,updateUser);

router.post("/regProvider",authMiddleware,addProvider);
// router.post("/sendRequest",authMiddleware,sendRequest);
// router.post("/acceptRequest",authMiddleware,acceptRequest);
// router.post("/rejectRequest",authMiddleware,rejectRequest);
// router.get("/getRequestStatus",authMiddleware,getRequestStatus);
router.post("/createRequest",authMiddleware,createRequest);
router.delete("/delete",authMiddleware,deleteUser);
router.post("/addPet",authMiddleware,addPet);



export default router;