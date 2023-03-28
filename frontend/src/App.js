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
import { ContextProvider } from "./context/Context";
import { LoadScript } from "@react-google-maps/api";
import { googleMapsApiData } from "./config";
import EditTransaction from "./components/transaction/edit/EditTransaction";
import AllTransactions from "./components/transaction/all/AllTransactions";
import NotFound from "./components/transaction/NotFound";

function App() {
  return (
    <div className="App font-['Poppins']">
      <LoadScript
        googleMapsApiKey={googleMapsApiData.googleMapsApiKey}
        libraries={googleMapsApiData.libraries}
      >
      <ContextProvider>
      <Router>
        <Routes>
          <Route  path="/" exact
            element={
              <PrivateRoute>
                <MainContainer />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<NewTransaction />} />
            <Route path="/transactions" element={<AllTransactions />} />
            <Route path="/view/:transactionId" element={<ViewTransaction />} />
            <Route path="/edit/:transactionId" element={<EditTransaction />} />
          </Route>
          <Route path="/" element={<LoginSignup />}>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
      </ContextProvider>
      </LoadScript>
    </div>
  );
}

export default App;
