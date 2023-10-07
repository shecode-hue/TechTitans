import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import FireTableAntd from "./components/tables/FireTable.antd";
import ReportsTable from "./components/tables/ReportsTable.antd";
import SignInForm from "./components/forms/SignInForm";
import CreateEvent from "./components/forms/CreatEvent";
import SignUpForm from "./components/forms/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/misc/Homepage";
import { Logout } from "./components/misc/Logout";
import PrimaryHomepage from "./components/misc/PrimaryHomepage";
import About from "./components/misc/About";
import EditFireForm from "./components/forms/EditFireForm";
import ReportFire from "./components/forms/ReportFireForm";
import { UserContext } from "./context/User.context";
import LoadingPage from "./helpers/components/loadingPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  // log the environment
  console.log(process.env.NODE_ENV);

  // useEffect to check if user is logged in
  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")));
    setLoading(false);

    return () => {
      // localStorage.removeItem("user");
    };
  }, []);

  function renderApp() {
    // log the loggedIn state
    return (
      <div>
        <Router>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <div className="space space--xl ..."></div>
            <div className="space space--lg ..."></div>
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/login" element={<SignInForm />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/register" element={<SignUpForm />}></Route>
              <Route exact path="/reportFire" element={<ReportFire />}></Route>
              <Route exact path="/editFire" element={<EditFireForm />}></Route>
              <Route exact path="/logout" element={<Logout />}></Route>
              <Route
                exact
                path="/fireTable"
                element={<FireTableAntd />}
              ></Route>
              <Route
                exact
                path="/reportTable"
                element={<ReportsTable />}
              ></Route>
            </Routes>
            <Footer />
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
  return loading ? <LoadingPage message={"Fetching Data"} /> : renderApp();
}

export default App;
