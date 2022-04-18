import React, { Fragment } from 'react'
import DailyWeatherCard from '../DailyWeatherCard/DailyWeatherCard';
import HourlyWeatherCard from '../HourlyWeatherCard/HourlyWeatherCard';
import TempCard from '../CurrentWeather/TempCard';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

export const WeatherCard = ({data}) => {
  const date=new Date(data.current.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
      <Fragment>
        <TempCard  current={data.current} location={data.location} state={data.state} country={data.country} date={date}/>
        <DailyWeatherCard dailyWeather={data.daily.slice(0,5)}/>
        <HourlyWeatherCard hourlyWeather={data.hourly.slice(1,6)}/>
        <WeatherInfo data={data}/>
      </Fragment>
  )
}
