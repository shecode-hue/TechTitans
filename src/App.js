import "./styles/App.css";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./configs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { FloatButton } from "antd";

function App() {
  function renderApp() {
    return (
      <div>
        <Router>
          <Header />
          <div className="space space--xl ..."></div>
          <div className="space space--lg ..."></div>
          <Routes>
            {routes.map((route, index) => (
              <Route {...route} key={index} />
            ))}
          </Routes>
          <FloatButton.BackTop
            style={{ background: "grey", borderRadius: "4rem" }}
            icon={<BsArrowUpCircleFill />}
          />
          <Footer />
        </Router>
      </div>
    );
  }
  return renderApp();
}

export default App;
