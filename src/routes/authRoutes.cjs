const express=require('express');

const router=express.Router();

const {register,verify,login}=require('../controllers/authController.cjs')
// console.log("register",register);
// console.log("verify",verify);
// console.log("login",login);

if (!register || !verify || !login) {
    throw new Error("One or more controller functions are undefined");
}



router.post('/register',register)
router.get('/verify/:token',verify);
router.post('/login',login)

module.exports=router;