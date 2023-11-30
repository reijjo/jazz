import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Sign from "./pages/Sign";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  console.log("islogn", isLogin);
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
