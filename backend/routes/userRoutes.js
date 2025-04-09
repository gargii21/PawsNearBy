import {Router} from 'express';
import login from  '../Controllers/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {basic_signup, deleteUser, regUser, updateUser} from '../Controllers/userController.js';
import search from '../Controllers/searchController.js';
import { addProvider } from '../Controllers/providerController.js';
//import { sendRequest, acceptRequest, rejectRequest, getRequestStatus } from '../Controllers/requestController.js';
import { addPet, getPets } from '../Controllers/petController.js';
import {createRequest, getRequestsForProvider} from '../Controllers/requestController.js';
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
router.post("/getRequestsForProvider",authMiddleware,getRequestsForProvider);
router.delete("/delete",authMiddleware,deleteUser);
router.post("/addPet",authMiddleware,addPet);
router.get("/getPet",authMiddleware,getPets);
//console.log(req.user)
router.get('/me', authMiddleware, (req, res) => {
  try{
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    res.json({ user: req.user }); // will include isProvider, userId, email, etc.
  }
catch(error){
  console.log(error);
}
});


export default router;