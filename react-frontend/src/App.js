import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ViewMembers from './components/admin/ViewMembers';
import Signup from './components/formik-member-signup/Signup';
import Success from './components/formik-member-signup/Success';
import Failure from './components/formik-member-signup/Failure';
import AdminLogin from './components/admin/AdminLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/view-members" element={<ViewMembers />} />
          <Route path="/member-registration" element={<Signup />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure/:errorCode" element={<Failure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
