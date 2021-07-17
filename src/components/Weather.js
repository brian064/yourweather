import React from 'react'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import clear from './clear.jpg'
import rain from './rain.jpg'
import snow from './snow.jpg'
import clouds from './clouds.jpg'

function Weather({ textColor, name, temp, weather, weatherDesc, city, state }) {

  const getBackground = (weather) => {
    switch(weather) {
      case "Rain":
        return rain
      case "Snow":
        return snow
      case "Clear":
        return clear
      case "Clouds":
        return clouds
          
      default:
        return ``
    }
  }

  const getTextColor = (weather) => {
    switch(weather) {
      case "Rain":
        return '#fff'
        break;
      case "Snow":
        return '#252525'
      case "Clear":
        return '#252525'
      case "Clouds":
        return '#fff'
          
      default:
        return '#fff'
    }
  }
  
  const style = css`
    position: relative;
    display: inline-block;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 0px 40px 5px rgba(0,0,0,0.15);
    width: 300px;
    padding: 25px;
    color: ${textColor};
    margin: 30px;
    transition: all 0.5s ease-in-out;
    &:hover {
      width: 350px;
      background-color: #404040;
      color: ${getTextColor(weather)};
      cursor: pointer;
      background-image: url(${getBackground(weather)});
      background-size: cover;
    }
  `
  const tempStyle = css`
    font-size: 60px;
  `
  
  // getWeather() will use Weather API to return a temperature based on the location of user
  const getWeather = (weather, weatherDesc) => {
    switch(weather) {
      case "Rain":
        return `It's Rainy today! Don't forget to bring an umbrella!`
        break;
      case "Snow":
        return `It's Snowy today! Don't forget to put your coat and boots on!`
      case "Clear":
        return `It's Clear today! Go out and enjoy nature!`
      case "Clouds":
        return `It's Cloudy today! Enjoy the calm weather!`
          
      default:
        return `Weather Condition: ${weatherDesc}`
    }
  }

  return (
    <div css={style}>
      <div className='container'>
        <h1>Hello!</h1>
        { weather ? (
            <>
                <h3>The current temperature is</h3>
                <h1 css={tempStyle}>{temp}&deg;F</h1>
                <h3>in {city.charAt(0).toUpperCase() + city.slice(1)}{state ? (", " + state) : ''}</h3>
                <h3>{weather ? getWeather(weather, weatherDesc) : ''}</h3>
            </>
        ) : <h3>Sorry, we are unable to get a weather forecast without a valid location</h3>}
      </div>
    </div>
  );
}

export default Weather;
