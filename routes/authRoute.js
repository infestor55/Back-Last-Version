import express from 'express';
import {registerController, loginController,testController, updateUserController, getallusers, getSingleUser, deleteUserController} from '../controllers/authController.js';
import {requireSignIn} from '../middlewares/authMiddleware.js';


//------------- ROUTER OBJECT -----------------
const router = express.Router()

//*************** ROUTING *****************


//------------- REGISTER || METHOD POST --------
router.post('/register', registerController)

//------------- LOGIN || POST -----------------
router.post('/login', loginController)


//------------- TEST ROUTE -------------------
router.get('/test', requireSignIn,  testController);



//------------ UPDATE USER ROUTER --------------
router.put('/update-user/:id', updateUserController);


//------------ GET ALL USERS ROUTE ------------
router.get('/get-all-users', getallusers);


//------------ GET A SINGLE USER ROUTE ----------
router.get('/getsingleusers/:id', getSingleUser);


//------------ DELETE USER ROUTE ---------------
router.delete('/deleteUser/:id', deleteUserController);


export default router;