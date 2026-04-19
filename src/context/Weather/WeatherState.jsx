import React, { useState } from 'react'
import WeatherContext from './WeatherContext'
import axios from 'axios'

const WeatherState = (props) => {
    const [weather,setWeather] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError]=useState("")
    const fetchWeather=async(cityName)=>{
        try{
        setLoading(true)
        setError("")
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
            params:{
                q:cityName,
                appid:import.meta.env.VITE_APP_WEATHER_API,
                units:"metric"
            }
        })
        // console.log(response.data)
        setWeather(response.data)
    }catch(err){
        setError("City not found ❌")
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    }
  return (
    <div>
      <WeatherContext.Provider value={{fetchWeather,weather,loading,error}}>
        {props.children}
      </WeatherContext.Provider>
    </div>
  )
}

export default WeatherState
