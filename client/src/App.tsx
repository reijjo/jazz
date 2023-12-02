import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import userApi from "./api/userApi";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Sign from "./pages/Sign";
import Lobby from "./pages/Lobby";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  // Get all users just to see that backend works
  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userApi.getAllUsers();
      console.log("All Users", allUsers);
    };

    getUsers();
  }, []);

  return (
    <Router>
      {/* <main> */}
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={<Sign isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      {/* </main> */}
    </Router>
  );
};

export default App;
