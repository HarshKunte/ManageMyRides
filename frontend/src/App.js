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
import EditTransaction from "./components/transaction/edit/EditTransaction";
import AllTransactions from "./components/transaction/all/AllTransactions";
import NotFound from "./components/transaction/NotFound";
import UserDetails from "./components/user/UserDetails";
import EditUserDetails from "./components/user/EditUseDetails";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPass from "./components/auth/ForgotPass";
import ResetPassword from "./components/auth/ResetPassword";
import AllInvoices from "./components/invoice/all/AllInvoices";
import AddFuelExpense from "./components/expense/fuel/AddFuelExpense";
import AllFuelExpenses from "./components/expense/fuel/AllFuelExpenses";
import AllOtherExpenses from "./components/expense/other/AllOtherExpenses";
import AddOtherExpense from "./components/expense/other/AddOtherExpense";

function App() {
  return (
    <div className="App font-['Poppins']">
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
            <Route path="/invoices" element={<AllInvoices />} />
            <Route path="/expense/fuel" element={<AllFuelExpenses />} />
            <Route path="/expense/fuel/add" element={<AddFuelExpense />} />
            <Route path="/expense/other" element={<AllOtherExpenses />} />
            <Route path="/expense/other/add" element={<AddOtherExpense />} />
            <Route path="/view/:transactionId" element={<ViewTransaction />} />
            <Route path="/edit/:transactionId" element={<EditTransaction />} />
            <Route path="/user/details" element={<UserDetails />} />
            <Route path="/user/details/edit" element={<EditUserDetails />} />
            <Route path="/user/change_password" element={<ChangePassword />} />
          </Route>
          <Route path="/" element={<LoginSignup />}>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/password/forgot" element={<ForgotPass />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
      </ContextProvider>
    </div>
  );
}

export default App;
