import React, { useContext, useEffect, useState } from "react";
import WeatherState from "../../../context/Weather/WeatherState";
import WeatherContext from "../../../context/Weather/WeatherContext";
import { Spinner } from "../../common";

const HomeDefault = () => {
  const {loading,error,weather,fetchWeather}=useContext(WeatherContext)
  const [recentCities,setRecentCities]=useState([])
  const [city, setCity] = useState("");

  const onChangeHandler = (e) => {
    setCity(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(city);
    try{
    if(!city.trim()) return;
    fetchWeather(city);
    const oldCities = JSON.parse(localStorage.getItem("cities")) || []
    const newCities = [city,...oldCities.filter((c)=>c!=city)].slice(0,5)
    setRecentCities(newCities)
    localStorage.setItem("cities",JSON.stringify(newCities))
    setCity("")
    }  catch(err){
      console.log(err)
    }
  };

  const recentCityData=(cityName)=>{
    try{
      setCity(cityName)
      fetchWeather(cityName)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
  try {
    const getCities = JSON.parse(localStorage.getItem("cities")) || [];
    setRecentCities(getCities);
  } catch (err) {
    console.log(err);
    setRecentCities([]);
  }
}, []);
  return (
    <div className="flex flex-col gap-7 py-7 h-full items-center px-4">
      {/* search bar starts here*/}
        <form onSubmit={onSubmitHandler} className="flex w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl  rounded-xl overflow-hidden">
          <input
            type="text"
            value={city}
            onChange={onChangeHandler}
            placeholder="Enter city name"
            name="city"
            id="city"
            className="flex-1 w-full bg-white px-4 py-3 outline-none" 
          />
          <button className="bg-black px-5 text-white font-semibold whitespace-nowrap ">
            Search
          </button>
        </form>
      {/* search bar ends here */}

      {recentCities && 
      
      <div className="flex gap-2 items-center justify-center flex-col md:flex-row">
        <h1 className="text-lg">Recent:</h1>
        {recentCities.map((item,i)=>(
          <button key={i} className="bg-black text-white px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-700 transition max-w-[150px] truncate" onClick={()=>recentCityData(item)}>
            {item}
          </button>
        ))}
      </div>
      }

      {loading && <p className="flex-1 flex items-center justify-center text-lg">{<Spinner/>}</p>}
      {error && <p className="flex-1 flex items-center justify-center text-lg">{error}</p>}
      {!loading && !error && !weather && <p className="flex-1 flex items-center justify-center text-lg">Search for a city</p>}


      {/* card starts here */}
      {!loading && !error && weather &&
      <div className="flex-1 bg-white flex flex-col text-center justify-center p-7 gap-5 rounded-3xl w-full sm:max-w-md shadow-2xl">
        <h1 className="font-bold text-lg">Weather Info</h1>
        <div className="flex-1 flex flex-col justify-center bg-slate-300 p-7">
        <p className="flex gap-2 my-5"><span className="font-semibold">City name:</span> {weather?.name || ""}</p>
        <p className="flex gap-2 my-5"><span className="font-semibold">Temperature:</span>{weather?.main?.temp}°C</p>
        <p className="flex gap-2 my-5"><span className="font-semibold">Country:</span>{weather?.sys?.country}</p>
        <p className="flex gap-2 my-5"><span className="font-semibold">Description:</span>{weather?.weather?.[0]?.main === "Clouds" && "Cloudy Weather ☁️" || weather?.weather?.[0]?.main === "Haze" && "Hazey Weather 🌫️" || weather?.weather?.[0]?.main === "Clear" && "Clear weather☀️" || weather?.weather?.[0]?.main === "Rain" && "Rainy weather🌧️" || weather?.weather?.[0]?.main === "Snow" && "Snowy Weather ❄️"} {!["Rain","Clouds","Haze","Snow","Clear"].includes(weather?.weather?.[0]?.main) && weather?.weather?.[0]?.main}</p>
        </div>
      </div>
}
      {/* card ends here */}
    </div>
  );
};

export default HomeDefault;
