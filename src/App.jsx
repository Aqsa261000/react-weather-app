import React from 'react'
import { DefaultLayout } from './components/layout'
import { Home } from './pages'
import WeatherState from './context/Weather/WeatherState'

const App = () => {
  return (
    <WeatherState>
    <DefaultLayout>
      <Home/>
    </DefaultLayout>
    </WeatherState>
  )
}

export default App
