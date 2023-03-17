import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginSignup from './components/LoginSignup';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import {Toaster} from "react-hot-toast"
import PrivateRoute from './auth_routes/PrivateRoute';
import Home from './components/Home';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <div className="App">
      <Router>    
      <Routes>
      <Route
          path="/"
          exact
          element={
            <PrivateRoute>
              <MainContainer />
            </PrivateRoute>
          }
        />
          <Route  path="/" element={<LoginSignup/>}> 
            <Route  path="/signup" element={<SignupForm/>}/>
            <Route  path="/login" element={<LoginForm/>}/>
          </Route>
          {/* TODO: Work 404 not found route  */}
          <Route  path="*" element={<Home/>}/> 
      </Routes>
    </Router>
    <Toaster/>
    </div>
  );
}

export default App;
