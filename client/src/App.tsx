import Login from "./pages/login/Login"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={ 
          user // there's a user?
          ? <Home />
          : <Register />
        }/>
        <Route path="/login" element={
          user // there's a user?
          ? <Navigate to="/" /> 
          : <Login />
        }/>
        <Route path="/register" element={
          user // there's a user?
          ? <Navigate to="/" />
          : <Register />
        }/>
        <Route path="/messenger" element={
          user // there's a user?
          ? <Messenger />
          : <Navigate to="/" />
        }/>        
        <Route path="/profile/:username" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;
