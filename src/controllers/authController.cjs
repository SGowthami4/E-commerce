const {registerUser,verifyUser,loginUser}=require('../services/authServices.cjs')
const register=async(req,res)=>{
    const {username,password,email,role}=req.body;
    try{
        const response = await registerUser({ username, password, email, role }); 
        res.status(201).json(response);
    }catch(error){
        res.status(500).json({error:error.message})
    }
};
const verify=async(req,res)=>{
    try{
        const response=await verifyUser(req.params.token);
        res.redirect(response.redirect);
    }catch(error){
    res.status(403).json({message:error.message})
    }
};
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const token = await loginUser({ email, password });
        console.log(token);    
        res.json({token})
    }catch(error){
        res.status(401).json({error:error.message})
    }
};
module.exports={
register,verify,login
};