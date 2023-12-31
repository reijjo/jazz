import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import userApi from "./api/userApi";
import Navbar from "./components/nav/Navbar";
import Homepage from "./pages/Homepage";
import Sign from "./pages/Sign";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Points from "./pages/Points";
import { User } from "./utils/types";
import authApi from "./api/authApi";
import { isAxiosError } from "axios";
import Scores from "./pages/Scores";
import UserPlay from "./pages/UserPlay";

const App = () => {
  // For the login / register form
  const [formLogin, setFormLogin] = useState(true);

  // Logged user
  const [user, setUser] = useState<User | null>(null);

  console.log("USER", user);

  // See if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      // Get token from localStorage
      const token = localStorage.getItem("yatzy");

      if (!token) {
        setUser(null);
        localStorage.clear();
      }

      try {
        if (token) {
          const res = await authApi.authorization(token);
          console.log("res", res);

          const validUser = res.user;

          if (validUser) {
            setUser(validUser);
          } else {
            setUser(null);
            localStorage.clear();
          }
        }
      } catch (error: unknown) {
        localStorage.clear();
        setUser(null);
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.error("Error checking token", error);
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
      <Navbar user={user} formLogin={formLogin} setFormLogin={setFormLogin} />
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
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
        <Route path="/play" element={<Play />} />
        <Route path="/scores" element={<Scores />} />
        <Route
          path="/lobby"
          element={<Lobby user={user} setUser={setUser} />}
        />
        <Route
          path="/userplay"
          element={<UserPlay user={user} setUser={setUser} />}
        />
        <Route path="/points" element={<Points user={user} />} />
        <Route path="*" element={<Homepage user={user} />} />
      </Routes>
      {/* </main> */}
    </Router>
  );
};

export default App;
