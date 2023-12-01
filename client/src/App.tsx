import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Sign from "./pages/Sign";
import userApi from "./api/userApi";

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
        <Route path="*" element={<Homepage />} />
      </Routes>
      {/* </main> */}
    </Router>
  );
};

export default App;
