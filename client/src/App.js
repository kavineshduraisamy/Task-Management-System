import "./App.css";
import { BrowserRouter as HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbars from "./Nav/NavBar";
import Header from "./Nav/Header";
import ProfileNav from "./Nav/ProfileNav";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Adminpage from "./Pages/Admin";
import CreateTask from "./Pages/CreateTask";
import Footer from "./Pages/Footer";
import AssignedTask from "./Pages/AssignedTask";
function App() {
  const currentPath = window.location.pathname;
  return (
    <div className="App">
      <HashRouter>
        <Header />
        {currentPath.includes("/admin") ||
        currentPath.includes("/createtask") ||
        currentPath.includes("/assignedtask") ? (
          <ProfileNav />
        ) : (
          <Navbars />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/assignedtask" element={<AssignedTask />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
