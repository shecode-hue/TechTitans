import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fire1 from "../../assets/fire1.jpg";
import fire2 from "../../assets/fire2.jpg";
import fire3 from "../../assets/fire3.jpg";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const Homepage = () => {
  const [fires, setFires] = useState();
  const [reports, setReports] = useState();
  const [loadingFires, setLoadingFires] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    //function to fetch fires from the database
    function fetchData() {
      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/getFires`
        )
        .then(function (response) {
          const { data } = response;
          setFires(data);
          setLoadingFires(true);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/reports`
        )
        .then((response) => {
          const { data } = response;
          setReports(data);
          setLoadingReports(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // const options = {
    //   method: "GET",
    //   url: "https://healthruwords.p.rapidapi.com/v1/quotes/",
    //   params: { t: "Wisdom", maxR: "1", size: "medium", id: "731" },
    //   headers: {
    //     "X-RapidAPI-Key": "d7afd2b351msh93a213509278310p1e1980jsnfe719de10ad6",
    //     "X-RapidAPI-Host": "healthruwords.p.rapidapi.com"
    //   }
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    fetchData();
  }, []);

  let navigate = useNavigate();

  // function to return the number of unextinguished fires
  function getUnextinguishedFires() {
    let count = 0;
    reports.forEach((fire) => {
      if (fire.fireStatus !== "EXTINGUISHED") {
        count++;
      }
    });
    return count;
  }

  return (
    <div
      className="container d-flex"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem"
      }}
    >
      <div className="card" style={{ width: "350px" }}>
        <div className="card__container">
          <div
            className="card__image"
            style={{
              backgroundImage: `url(${fire1})`
            }}
          ></div>
          <div className="card__title-container">
            <p className="title">Fires Recorded</p>
            <span className="subtitle">Windhoek</span>
          </div>
        </div>
        <div className="content u-center">
          <div
            className={`${
              loadingFires ? "none" : "animated loading hide-text"
            }`}
          >
            <p>
              The number of fires recorded is:{" "}
              <code>{loadingFires && fires.length}</code>
            </p>
          </div>
        </div>
        <div className="card__action-bar u-center">
          <button
            className="btn-link outline"
            onClick={() => navigate("/fireTableAntd", { replace: true })}
          >
            See Fires
          </button>
        </div>
        <div className="card__footer">
          <div className="u-text-center">
            <span>
              Keep matches, lighters and candles out of young children’s reach.
            </span>
          </div>
        </div>
      </div>
      <div className="card" style={{ width: "350px" }}>
        <div className="card__container">
          <div
            className="card__image"
            style={{
              backgroundImage: `url(${fire2})`
            }}
          ></div>
          <div className="card__title-container">
            <p className="title">Reports Submitted</p>
            <span className="subtitle">Windhoek</span>
          </div>
        </div>
        <div className="content u-center">
          <div
            className={`${
              loadingReports ? "none" : "animated loading hide-text"
            }`}
          >
            <p>
              The number of reports submitted is:{" "}
              <code>{loadingReports && reports.length}</code>
            </p>
          </div>
        </div>
        <div className="card__action-bar u-center">
          <button
            className="btn-link outline"
            onClick={() => navigate("/reportTable", { replace: true })}
          >
            See Reports
          </button>
        </div>
        <div className="card__footer">
          <div className="u-text-center">
            <span>Store flammable and combustible materials properly.</span>
          </div>
        </div>
      </div>
      <div className="card" style={{ width: "350px" }}>
        <div className="card__container">
          <div
            className="card__image"
            style={{
              backgroundImage: `url(${fire3})`
            }}
          ></div>
          <div className="card__title-container">
            <p className="title">Reports Recorded</p>
            <span className="subtitle">Windhoek</span>
          </div>
        </div>
        <div className="content u-center">
          <div
            className={`${
              loadingReports ? "none" : "animated loading hide-text"
            }`}
          >
            <p>
              The number of unextinguished fires is:{" "}
              <code>{loadingReports && getUnextinguishedFires()}</code>
            </p>
          </div>
        </div>
        <div className="card__action-bar u-center">
          <button
            className="btn-link outline"
            onClick={() => navigate("/reportTable", { replace: true })}
          >
            See Reports
          </button>
        </div>
        <div className="card__footer">
          <div className="u-text-center">
            <span>
              Always maintain and have proper fire fighting equipment in the
              office
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;