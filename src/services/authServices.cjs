const dotenv=require('dotenv');
dotenv.config();
const prisma=require('../prisma/prismaClient.cjs')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {createTransport}=require('nodemailer')

const sender=process.env.EMAIL_SENDER;
const password=process.env.EMAIL_PASSWORD;
const JWT_SECRET=process.env.JWT_SECRET;

const transporter=createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:sender,
        pass:password
    },
})

const registerUser=async({username,password,email,role})=>{
    const receiver=email;
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(`${password}:`,hashedPassword);
    const token=jwt.sign({username:username,password:hashedPassword,email:email,role:role},JWT_SECRET,{
        expiresIn:'1h',
    });
    const info=await transporter.sendMail({
        from:sender,
        to:receiver,
        subject:"Mail Verification ✔",
        text:"Click on the link below",
        html: `<div>To verify <a href="http://localhost:3005/auth/verify/${token}">click here</a>
</div>`
    });
    return {message: "Verification email sent. Please check your inbox!" }

}

const verifyUser=async(token)=>{
    try{
        const userInfo=jwt.verify(token,JWT_SECRET);
        const {username,password,email,role}=userInfo;
        const existingUser=await prisma.users.findUnique({where:{email}});
        if(existingUser?.registrationStatus){
            return { redirect: "http://localhost:5173/login" };
        }else{
            await prisma.users.create({
                data:{username,password,email,role,registrationStatus:true},
            });
            return { redirect: "http://localhost:5173/login" };        
        }
    }catch(error){
        if (error.name === "TokenExpiredError") {
            throw new Error("Verification link expired. Request a new one.");
          }
          throw new Error("Verifification failed");
    }
};
const loginUser = async ({ email, password }) => {
    console.log("Searching for email:", email);
    try{
        const user=await prisma.users.findUnique({where:{email}});
        console.log(await prisma.$queryRaw`SELECT * FROM "Users" WHERE email ='gowthamis_jtbb2@jtdfoundation.org'`);

        
   
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        const token=jwt.sign(
            { userId: user.id, email: user.email, role: user.role, username: user.username },
            JWT_SECRET
        );
        return {
            userInfo:user,
            token:token,
        }
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        throw error;
    }
};


module.exports={
    registerUser,
    verifyUser,
    loginUser
};