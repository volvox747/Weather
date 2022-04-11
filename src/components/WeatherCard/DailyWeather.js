import React from 'react'
import classes from './DailyWeather.module.css'

const DailyWeather = ({daily,i}) => {
    const date=new Date(daily.dt*1000).toLocaleString('en-IN',{weekday:'short',day:'2-digit'});
  return (
    <div className={`my-2 px-3 text-center ${i===4?null:classes.element}`}>
        <small>{date}</small>
        <div className='lead fs-5 fw-bold'>{Math.round(daily.temp.max)}&deg;</div>
        <small className='text-muted'>{Math.round(daily.temp.min)}&deg;</small>
    </div>
  )
}

export default DailyWeather