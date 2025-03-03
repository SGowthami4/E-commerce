const {Pool}=require('pg');
const express=require('express');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const cors=require('cors')
const {createTransport}=require('nodemailer')
const app=express();
app.use(cors())
app.use(express.json())
const PORT=3005;
const JWT_SECRET = "bcd8672b887b43d2758983a367cfc873368f98a228f70ced3e";
const client=new Pool({
    user:'postgres',
    host:'localhost',
    database:'Ecommerce',
    password:'jtd@123',
    port:5432,
})

require('dotenv').config();
const sender = process.env.EMAIL_SENDER;
const password = process.env.EMAIL_PASSWORD;
let receiver;
const transporter=createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:sender,
        pass:password

    },
});

app.post("/register", async (req, res) => {
    const { username, password,email, role} = req.body;
    let receiver=email;
    try{
      const hashedPassword = await bcrypt.hash(password, 10); 
      console.log("hashed password is", hashedPassword);
      const token = jwt.sign({username:username,password:hashedPassword,email:email,role:role}, JWT_SECRET, {
          expiresIn: "1h",
        });        
        const info = await transporter.sendMail({
          from: sender, // sender address
          to: receiver, // list of receivers
          subject: "Mail Verification ✔", // Subject line
          text: "Click on the link below 👇", // plain text body
          html: `<div>To verify <a href="http://localhost:3005/verify/${token}">click here</a></div>`
        });
        res.status(201).json({ message:"Verification email sent. Please check your inbox!"  });
    }catch (error) {
      console.log(error);
    }
    
  });
  app.get('/verify/:token', async (req, res) => {
    try{
      const receivedToken=req.params.token;
      console.log("Recieved Token:",receivedToken);
      const userInfo=jwt.verify(receivedToken,JWT_SECRET);
      const { username, password, email, role } = userInfo;
const checkingUserExistence = await client.query(
    'SELECT * FROM "Users" WHERE email = $1;', 
    [email]
);
     
if (checkingUserExistence.rowCount > 0 && checkingUserExistence.rows[0].registrationStatus) {
  console.log("User already verified, redirecting to login...");
  return res.redirect('http://localhost:5173/login');
}
      await client.query(
        'INSERT INTO "Users" (username, password, email, role, "registrationStatus") VALUES ($1, $2, $3, $4, $5)',
        [username, password, email, role, true]
    );
    console.log("Verified successfully:", username);  
      res.redirect('http://localhost:5173/login')
    }catch(error){
      if(error.name==='TokenExpiredError'){
        console.error('Token Expired:',error)
        return res.status(403).json({ message: "Verification link expired. Request a new one." });
      }
      console.error('verification failed:',error)
      res.status(403).json({message:'Verification Failed'})
    }
 })
 
 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// dummy data

// {
//   "name": "Alice Johnson",
//   "email": "alice.seller123@example.com",
//   "role": "seller",
//   "password": "Alice@123"
// },

