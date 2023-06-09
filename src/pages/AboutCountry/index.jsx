import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./AboutCountry.css";
import Header from "../../components/Header";
import axios from "axios";
import CountryMap from "../../components/CountryMap";
import CountryInfo from "../../components/CountryInfo";
import Poroshenko from "../../components/Poroshenko";

function AboutCountry() {
  const { indexCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [showInfoAboutCountry, setShowInfoAboutCountry] = useState(true);
  const [showCountryMap, setShowCountryMap] = useState(false);
  let showDiv;

  const navigate = useNavigate();
  useEffect(() => {
    const allCountriesList = JSON.parse(localStorage.getItem("countries"));
    setAllCountries(allCountriesList);
    const tmp = allCountriesList.find((item) => item.cca3 === indexCountry);
    setCountry(tmp);
  }, [indexCountry]);

  if (!country) {
    return (
      <div className="message_box">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  if (country === "Error") {
    return (
      <div className="message_box">
        <div className="error">
          <img
            src="https://digitalsynopsis.com/wp-content/uploads/2016/12/http-status-codes-dogs.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
  if (
    indexCountry === "RUS" ||
    indexCountry === "RU" ||
    indexCountry === "BLR"
  ) {
    return <Poroshenko />;
  }

  if (showInfoAboutCountry) {
    showDiv = <CountryInfo chosenCountry={country}></CountryInfo>;
  }
  if (showCountryMap) {
    showDiv = <CountryMap chosenCountry={country}></CountryMap>;
  }
  return (
    <>
      <Header
        allContries={allCountries}
        headerText={country.name.common.toUpperCase()}
      />
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          <li>
            <button
              onClick={() => {
                setShowCountryMap(false);
                setShowInfoAboutCountry(true);
              }}
              className={showInfoAboutCountry ? "button_ active" : "button_"}
            >
              information about country
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowCountryMap(true);
                setShowInfoAboutCountry(false);
              }}
              className={showCountryMap ? "button_ active" : "button_"}
            >
              show country on map
            </button>
          </li>

        </ul>
      </div>
      <div className="buttons">
        <button
          className="button_"
          onClick={() => navigate(-1)}
        >{`<=BACK`}</button>
        <Link className="goBack" to="/">
          <button className="button_">go back to list</button>
        </Link>
        <div className="buttons_tabs">
        <button
          onClick={() => {
            setShowCountryMap(false);
            setShowInfoAboutCountry(true);
          }}
          className={showInfoAboutCountry ? "button_ active" : "button_"}
        >
          information about country
        </button>
        <button
          onClick={() => {
            setShowCountryMap(true);
            setShowInfoAboutCountry(false);
          }}
          className={showCountryMap ? "button_ active" : "button_"}
        >
          show country on map
        </button>
        </div>
        
      </div>
      {showDiv}
    </>
  );
}

export default AboutCountry;
