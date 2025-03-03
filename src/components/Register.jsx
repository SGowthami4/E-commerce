import { Card, InputAdornment,IconButton,FormControl,InputLabel, OutlinedInput, TextField, Typography, CardActions, Button,Link as MUILINK,MenuItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'


export default function Register() {
    const [showPassword, setShowPassword] =useState(false)
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "customer",
        email: "",
      });
    const [message,setMessage]=useState('')
    const [registered,setRegistered]=useState(false)
    const [loading,setLoading]=useState(false)

    const handleRegistration=async(e)=>{
      e.preventDefault();

      if(!form.username || !form.password || !form.role || !form.email){
        alert('All fields are required for registration')
        return;
      }
      setLoading(true);
      try{
        const response=await fetch('http://localhost:3005/auth/register',{
          method:'POST',
          headers:{
           "Content-type":"application/json", 
          },
          body:JSON.stringify(form)
        })
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Registration Failed");
        }
        const data = await response.json();
        setMessage("A verification link has been sent to your email.Please check your inbox");
        setRegistered(true);
        setForm({username: "",
          password: "",
          role: "customer",
          email: "",
       })
      }catch (error) {
        setMessage(error.message || "Error registering user");
        setRegistered(true);
      } finally {
        setLoading(false);
      }

    }

  return (
  <div style={{
    display: 'flex',
    justifyContent: 'center',  
    alignItems: 'center',     
    height: '100vh'  ,
    backgroundColor: '#f8f9fa'         
  }} >      
   <Card sx={{ width:5/6,maxWidth:450, padding:5,placeSelf:'center', display:'flex', flexDirection:'column', gap:2,  fontSize:30,boxShadow:5,borderRadius:2}}>
   <Typography gutterBottom variant="h4" component="div">
          Register
        </Typography>
        <TextField
          required
          id="email"
          label="Email"
          placeholder='Enter your email'
          size='medium'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
          <TextField
          required
          id="username"
          label="Username"
          placeholder='Enter username'
          size='medium'
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })}
        />
  
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
          required
            id="password"
            type={showPassword ? 'text' : 'password'}
           value={form.password}
           onChange={(e)=>setForm({...form,password:e.target.value})}
            endAdornment={
              <InputAdornment position="end">

                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={() => setShowPassword((prev) => !prev)}                  onMouseDown={(e)=>e.preventDefault()}
                  onMouseUp={(e)=>e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <TextField
    id="role"
    select
    label="Select Role"
    value={form.role || 'customer'}
    onChange={(e) => setForm({ ...form, role: e.target.value })}
>
<MenuItem value="seller">Seller</MenuItem>
<MenuItem value="customer">Customer</MenuItem>
</TextField>


        <CardActions>
        <Button variant='contained' onClick={handleRegistration} disabled={loading}>
        {loading?"Registering...":"Register"}
            </Button>
        </CardActions>
        {registered && message==="A verification link has been sent to your email.Please check your inbox" ? (
  <Typography variant="body1"  sx={{color:'green', mt: 2 }}>
    {message}
  </Typography>):
  (<Typography variant="body1"  sx={{color:'red', mt: 2 }}>
  {message}
</Typography>
)}
        <Typography padding={2}>Already Registered? <MUILINK  sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} component={Link} to='/login' >Login</MUILINK> here</Typography>
       
  </Card>
    </div>
  )
}
