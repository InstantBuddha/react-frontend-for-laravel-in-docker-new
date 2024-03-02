import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import ViewMembers from "./components/admin/ViewMembers";
import Signup from "./components/formik-member-signup/Signup";
import Success from "./components/formik-member-signup/Success";
import Failure from "./components/formik-member-signup/Failure";
import AdminLogin from "./components/admin/AdminLogin";
import BasicCorsTest from "./components/BasicCorsTest";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {  
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/view-members"
              element={
                <ProtectedRoute>
                  <ViewMembers />
                </ProtectedRoute>
              }
            />
            <Route path="/member-registration" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure/:errorCode" element={<Failure />} />
            <Route path="/cors-test" element={<BasicCorsTest />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
