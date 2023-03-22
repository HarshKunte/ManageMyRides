import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/auth/LoginSignup";
import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./auth_routes/PrivateRoute";
import Home from "./components/Home";
import MainContainer from "./components/MainContainer";
import NewTransaction from "./components/transaction/create/NewTransaction";
import ViewTransaction from "./components/transaction/view/ViewTransaction";

function App() {
  return (
    <div className="App font-['Poppins']">
      <Router>
        <Routes>
          <Route  path="/" exact
            element={
              <PrivateRoute>
                <MainContainer />
              </PrivateRoute>
            }
          >
            <Route path="/add" element={<NewTransaction />} />
            <Route path="/view" element={<ViewTransaction />} />
          </Route>
          <Route path="/" element={<LoginSignup />}>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
          {/* TODO: Work 404 not found route  */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
