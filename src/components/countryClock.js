import { useEffect, useState } from "react";
import axios from "axios";
import "./countryDropDown.css";
const CountryClock = () => {
  const [time, setTime] = useState(new Date());
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("UTC");
  const [isClockRunning, setIsClockRunning] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://worldtimeapi.org/api/timezone"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `http://worldtimeapi.org/api/timezone/${selectedCountry}`
        );
        setTime(new Date(response.data.utc_datetime));
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    if (isClockRunning) {
      intervalId = setInterval(() => {
        fetchTime();
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [selectedCountry, isClockRunning]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePauseStart = () => {
    setIsClockRunning(!isClockRunning);
  };

  return (
    <div>
      <div className="country-clock">
        <select value={selectedCountry} onChange={handleCountryChange}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <div className="timer-box">{time.toLocaleTimeString()}</div>
        <button style={{ width: "70px" }} onClick={handlePauseStart}>
          {isClockRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default CountryClock;
