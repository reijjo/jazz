import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import userApi from "./api/userApi";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Sign from "./pages/Sign";
import Lobby from "./pages/Lobby";
import { User } from "./utils/types";
import authApi from "./api/authApi";
import { isAxiosError } from "axios";

const App = () => {
  // For the login / register form
  const [formLogin, setFormLogin] = useState(false);

  // Logged user
  const [user, setUser] = useState<User | null>(null);

  console.log("USER", user);

  // // See if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await authApi.authorization();
        if (valid && valid.user) {
          setUser(valid.user);
        } else {
          console.log("localStorage cleared");
          localStorage.removeItem("yatzy");
          setUser(null);
        }

        console.log("valid", valid);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.log(error.response?.data.message);
        } else {
          console.log("err", error);
        }
      }
    };
    checkAuth();
  }, [setUser]);

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
      <Navbar formLogin={formLogin} setFormLogin={setFormLogin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <Sign
              isLogin={formLogin}
              setIsLogin={setFormLogin}
              // user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/lobby"
          element={<Lobby user={user} setUser={setUser} />}
          // element={<Lobby />}
        />
        <Route path="*" element={<Homepage />} />
      </Routes>
      {/* </main> */}
    </Router>
  );
};

export default App;
