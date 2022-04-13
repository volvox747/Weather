import React from 'react'
import DailyWeather from './DailyWeather';


const DailyWeatherCard = ({dailyWeather}) => {
  return (
    <div className="pb-5 d-flex">
      {dailyWeather.map((obj, index) => (
        <DailyWeather key={index} i={index} daily={obj} />
      ))}
    </div>
  );
}

export default DailyWeatherCard