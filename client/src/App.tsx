import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      {/* <main> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      {/* </main> */}
    </Router>
  );
};

export default App;
