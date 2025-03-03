import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
function App() {
 
  return (
  <>
   <Router>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard/:role' element={<Dashboard/>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App
