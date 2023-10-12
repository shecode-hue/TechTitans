import "./styles/App.css";
import { useState, useEffect } from "react";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/User.context";
import LoadingPage from "./helpers/components/loading-page";
import { routes } from "./configs";
import { FloatButton } from "antd";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")));
    setLoading(false);

    return () => {};
  }, []);

  function renderApp() {
    return (
      <div>
        <Router>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <div className="space space--xl ..."></div>
            <div className="space space--lg ..."></div>
            <Routes>
              {routes.map((route, index) => (
                <Route {...route} key={index} />
              ))}
            </Routes>
            <FloatButton.BackTop />
            <Footer />
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
  return loading ? <LoadingPage message={"Fetching Data"} /> : renderApp();
}

export default App;
