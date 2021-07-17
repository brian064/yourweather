import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

function Tips({ textColor, weather }) {
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
      color: #fff;
      cursor: pointer;
    }
  `

  // Displays different messages depending on weather forecast
  const clearTips = ["Go out! It's a good day to play sports or have a picnic!", "Today is a perfect kite flying day!"]
  const rainTips = ["Invest in a sturdy umbrella, it'll come in handy!", "Rain boots will keep your socks from getting soggy!"]
  const cloudsTips = ["Try to find a cloud shaped like your favorite animal!", "Now's a good time for a walk under the shade of the clouds!"]
  const snowTips = ["Make sure your tires are ready for the slippery roads!", "An ice cream scooper can make quick snowballs!"]
  
  // getTip() will use Weather API to return a tip based on weather condition
  const getTip = (weather) => {
    switch(weather) {
      case "Rain":
        return rainTips[Math.floor(Math.random()*rainTips.length)]
      case "Snow":
        return snowTips[Math.floor(Math.random()*snowTips.length)]
      case "Clear":
        return clearTips[Math.floor(Math.random()*clearTips.length)] 
      case "Clouds":
        return cloudsTips[Math.floor(Math.random()*cloudsTips.length)] 
          
      default:
        return `No particular tip right now. Check back again later!`
    }
  }

  const getImage = (weather) => {
    switch(weather) {
      case "Rain":
        return <img src="http://openweathermap.org/img/wn/10d@2x.png" />
      case "Snow":
        return <img src="http://openweathermap.org/img/wn/13d@2x.png" />
      case "Clear":
        return <img src="http://openweathermap.org/img/wn/01d@2x.png" />
      case "Clouds":
        return <img src="http://openweathermap.org/img/wn/02d@2x.png" />
          
      default:
        return ''
    }
  }

  return (
    <div css={style}>
        {weather ? getImage(weather) : ''}
        <h1>Here's a Tip!</h1>
        <h3>{weather ? getTip(weather) : 'No particular tip right now. Check back again later!'}</h3>
    </div>
  );
}

export default Tips;
