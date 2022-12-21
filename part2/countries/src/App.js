import axios from "axios";
import { useState, useEffect } from "react";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>
        capital {country.capital[0]}
        <br></br>
        area {country.area}
      </p>
      <p>
        <strong>languages</strong>{" "}
      </p>
      <ul>
        {Object.values(country.languages).map((lan, i) => (
          <li key={i}>{lan}</li>
        ))}
      </ul>
      <img src={country.flags["png"]} alt="flag" />
    </div>
  );
};

const CountriesList = ({ countries, showButtonHandler }) => {
  return (
    <>
      {countries.map((country) => {
        return (
          <div key={country.name.common}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => showButtonHandler(country.name.common)}>
                show
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
};

const Countries = ({ countries, showButtonHandler }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <CountriesList
        countries={countries}
        showButtonHandler={showButtonHandler}
      />
    );
  }
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }
};

const App = () => {
  const [filterWord, setFilterWord] = useState("");
  const [countries, setCountries] = useState([]);
  const shownCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const InputChangeHandler = (event) => {
    setFilterWord(event.target.value);
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input
          value={filterWord}
          placeholder="please input the filter word"
          onChange={InputChangeHandler}
        />
      </p>
      <Countries countries={shownCountries} showButtonHandler={setFilterWord} />
    </div>
  );
};

export default App;
