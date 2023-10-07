import "./App.css";
import Header from "./pages/Header/header";
import Footer from "./pages/Footer/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
