import React, { useState, useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import QuickNote from './components/QuickNote'
import Weather from './components/Weather'
import Tips from './components/Tips'
import { useForm } from 'react-hook-form';

//api call api.openweathermap.org/data/2.5/find?q=London&units=metric
const API_key = "06a424c7bad27b78fe295ab53728e01f"
const locationURL = "https://ip.nf/me.json"

const cardsContainer = css`
  display: block;
  position: relative;
  margin: auto;
  text-align: center;
  transition: all 0.5s ease-in-out;
`

const loadingtext = css`
  display: block;
  position: relative;
  color: #404040;
  margin-top: 50px;
  text-align: center;
  transition: all 0.5s ease-in-out;
`

const formCss = css`
  display: block;
  position: relative;
  margin: auto;
  text-align: center;
`
// box-shadow: 0px 5px 30px 5px rgba(0,0,0,0.15);
const titleStyle = css`
  text-align: center;
  color: #fff;
  padding: 5px;
  padding-bottom: 50px;
  font-weight: bold;
  & h1 {
    font-family: 'Jaldi';
    font-weight: 700;
    font-size: 60px;
  }
`
const mainContainer = css`
  box-shadow: 0px 5px 50px 20px rgba(0,0,0,0.15);
  padding-top: 30px;
  background-color: #eee;
  border-radius: 20px 20px 0 0; 
  height: 100vh;
  width: 100%;
`

const cityInput = css`
  border: none;
  appearance: none;
  font-size: 20px;
  padding: 10px;
  outline: none;
  border-radius: 12px;
  &:focus::placeholder {
    color: transparent;
  }
  &::placeholder {
    transition: color 0.3s ease-in-out;
  }
`

function App() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [weather, setWeather] = useState('')
  const [weatherDesc, setWeatherDesc] = useState('')
  const [temp, setTemp] = useState('')
  // const [locationInfo, setLocationinfo] = useState({ ip: ''})

  const { register, handleSubmit } = useForm();

  //get user location using this hook
  // const getUserLocation = () => {
  //   fetch(locationURL, { method: "get" })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let locationInfo = {...data}
  //       setCity(locationInfo.ip.city)
  //     })
  // }

  // getUserLocation()

  useEffect(() => {
    fetch(locationURL, { method: "get" })
      .then((response) => response.json())
      .then((data) => {
        const locationInfo = {...data}
        setCity(locationInfo.ip.city)
      })
  }, [])

  // console.log("CITY: ", city)

  const getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&units=imperial&appid=${API_key}`)

    const response = await api_call.json()

    // console.log(response)

    if (response.list) {
      setWeather(response?.list[0]?.weather[0]?.main)
      setWeatherDesc(response?.list[0]?.weather[0]?.description)
      setTemp(response?.list[0]?.main?.temp)
    }
  }

  if (city) {
    getWeather()
  }

  // FORM HOOK
  const onSubmit = formData => {
    setCity(formData?.city)
    console.log("CITY: ", city)
  }
  
  // console.log("Temp: " + temp)
  // console.log("Weather: " + weather)
  // console.log("Weather Description: " + weatherDesc)

  return (
    <>
      <div css={titleStyle}>
          <h1>YourWeather</h1>
          <p>Simple Daily Weather Forecast. Just For You.</p>
      </div>
      <div css={mainContainer}>
        <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
          <input css={cityInput} type="text" {...register("city")} placeholder="Enter A City" id="city"/><br />
        </form>
        {city ? (
          <div css={cardsContainer}>
            <QuickNote textColor='#252525' />
            <Weather name='Jarel Brian' textColor='#252525' temp={temp} weather={weather} weatherDesc={weatherDesc} city={city} state={state} />
            <Tips textColor='#252525' weather={weather}  />
          </div>
        ) : (<h1 css={loadingtext}>Getting Your Current Location...</h1>)}
      </div>
    </>
  );
}

export default App;
