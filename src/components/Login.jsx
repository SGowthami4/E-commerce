import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Card,Typography,TextField ,FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton,CardActions,Button,Link as MUILINK, Snackbar} from '@mui/material'
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function Login() {
  const [showPassword, setShowPassword] =useState(false)
  const [loginForm, setLoginForm] = useState({
    email:"",
    password:""
  });
  const [loginMessage,setLoginMessage]=useState('')
    const [loggedIn,setLoggedIn]=useState(false)
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const [role,setRole]=useState('')
    const [open,setOpen]=useState(false)

  const handleLogin=async(e)=>{
    e.preventDefault();

    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setLoginMessage("All fields are required for login");
      return;
    }
    setLoading(true);
    try{
      const response=await fetch('http://localhost:3005/auth/login',{
        method:'POST',
        headers:{
         "Content-type":"application/json", 
        },
        body:JSON.stringify(loginForm)
      })
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Error Logging in");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      console.log(data.role);
      localStorage.setItem("authToken", data.token.token);
      localStorage.setItem('role',data.token.role)
      localStorage.setItem("loginSuccess", "true");
      if(data.token.role){
        setRole(data.token.role)
      }
      setLoginMessage("Login Successful");
      setLoggedIn(true);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        localStorage.removeItem("loginSuccess"); 
        navigate(`/dashboard/${data.token.role}`);
      }, 3000); 
      setLoginForm({
        email:"",
        password:""
     })
    }catch (error) {
      setLoginMessage(error.message || "Error registering user");
      console.log(error);  
    } finally {
      setLoading(false);
    }

  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',  
      alignItems: 'center',     
      height: '100vh'  ,
      backgroundColor: '#f8f9fa'         
    }}>
   <Card sx={{ width:5/6,maxWidth:450, padding:5,placeSelf:'center', display:'flex', flexDirection:'column', gap:2,  fontSize:30,boxShadow:5,borderRadius:2}}>
   <Typography gutterBottom variant="h4" component="div">
          Login
        </Typography> 
        <TextField
          required
          id="email"
          label="Email"
          placeholder='Enter your email'
          size='medium'
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
                <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
          required
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder='password'
           value={loginForm.password}
           onChange={(e)=>setLoginForm({...loginForm,password:e.target.value})}
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
        <CardActions>
        <Button variant='contained' onClick={handleLogin} disabled={loading}>
        {loading?"Logging in...":"Login"}
            </Button>
        </CardActions>
        {loginMessage ? (
  loginMessage === "Login Successful" ? (
    <Snackbar
      open={open}
      autoHideDuration={5000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
    >
      <Alert onClose={handleClose} severity="success" variant="filled">
        Login successful! Welcome.
      </Alert>
    </Snackbar>
  ) : (
    <Typography variant="h6" sx={{ color: "red", mt: 2 }}>
      {loginMessage}
    </Typography>
  )
) : null}

        <Typography padding={2}>Not Registered? <MUILINK  sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} component={Link} to='/' >Register</MUILINK> here</Typography>
       
      </Card>
    </div>
  )
}
