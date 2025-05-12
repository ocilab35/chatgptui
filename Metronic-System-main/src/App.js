import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Signup from "./Pages/Authentication/Signup";
import Signin from "./Pages/Authentication/Signin";
import EnterEmail from "./Pages/Authentication/EnterEmail";
import CheckEmail from "./Pages/Authentication/CheckEmail";
import ChangePassword from "./Pages/Authentication/ChangePassword";
import Passwordchanged from "./Pages/Authentication/Passwordchanged";
import Home from "./Components/Home";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Components/Navbar";

function DashboardLayout() {
  return (
    <>
      <Navbar /> {/* Yeh ab render hoga */}
      <Outlet /> {/* Yeh nested routes ko render karega */}
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sign-Up" element={<Signup />} />
            <Route path="/Sign-In" element={<Signin />} />
            <Route path="Entere-Email" element={<EnterEmail />} />
            <Route path="Check-Email" element={<CheckEmail />} />
            <Route path="Change-Password" element={<ChangePassword />} />
            <Route path="Password-Changed" element={<Passwordchanged />} />

            <Route
              path="/Dash-Board"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* <Route index element={<Navbar />} /> */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
