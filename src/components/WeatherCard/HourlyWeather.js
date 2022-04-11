import React from 'react'
import classes from './DailyWeather.module.css'
const HourlyWeather = ({hourly,i}) => {
  const date=new Date(hourly.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});

  return (
    <div className={`my-2 px-3 ${i===5?null:classes.element} `}>
        <small>{date}</small>
        <div className='lead fs-5'>{Math.round(hourly.temp)}&deg;</div>
    </div>
  )
}

export default HourlyWeather