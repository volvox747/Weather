import React from 'react'

export const WeatherCard = (props) => {
  return (
    <div className='card p-4 w-50'>
        <div className='card-header'>
            <div className='card-title'>
                <h3>{props.data.name}</h3>
                <p className='lead'>{props.data.main.temp} </p>
            </div>
        </div>
        <div className='card-body'>
            <p>Humidity: {props.data.main.humidity}</p>
            <p>Visibility: {props.data.visibility}</p>
            <p>Pressure: {props.data.main.pressure}</p>
        </div>
    </div>
  )
}
