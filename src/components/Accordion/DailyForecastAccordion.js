import {
    faArrowDownLong,
    faArrowUpLong,
    faDroplet,
    faTemperatureHigh,
    faWind,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { metricFunction, weatherIcon } from '../../utilities';
import classes from './Accordion.module.css'

const DailyForecastAccordion = ({data,index,unit}) => {
    // converts unix format time to human readable weekday and date
      const date = new Date(data.dt * 1000).toLocaleString('en-IN', {
          weekday: 'short',
          day: '2-digit'
      });
    // converts unix format time to human readable date
    // used for calculation time of sunrise, sunset, moonrise and moonset
    const timeConverter = (unixTime) =>
      {
        const convertedTime = new Date(unixTime * 1000).toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return convertedTime
      }

  return (
    <div className="accordion-item">
    <div className="accordion-header" id={`heading${index}`}>
      <div className={`accordion-button ${index!==0 && 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={index===0?'true':'false'} aria-controls={`collapse${index}`}>
        <div className ={classes['accordion-header']} >

        <span className={``}>{date}</span>
        <span className={``}>
            {
                (unit === '\u00B0C' || unit === '') ? Math.round(data.temp.day): Math.round(metricFunction(data.temp.day, unit))
            } &deg;/ 
            {
                (unit === '\u00B0C' || unit === '') ? Math.round(data.temp.night): Math.round(metricFunction(data.temp.night, unit))
            } &deg;
        </span>
        <span className={`d-none d-sm-inline`}>
            <FontAwesomeIcon icon={weatherIcon(data.weather[0])[0]} className={`px-2`} fontSize={25}/>
            <span className={`text-capitalize`}>{data.weather[0].description}</span>
        </span>
        <span className={`d-none d-md-inline `}>
            <FontAwesomeIcon icon={faDroplet}className={`pe-2`}/>
            <span className={`me-3`}>{data.humidity}%</span>
        </span>
        </div>
      </div>
    </div>

        {/* Accordion Body */}

    <div id={`collapse${index}`} className={`accordion-collapse collapse ${index===0 &&'show'}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
      <div className={`accordion-body`}>
        <div className="container">
            <div className='py-2'>
            <p className='pb-0'>{date} | Day</p>
            <span className='pe-3 fs-1'>
                {(unit === '\u00B0C' || unit === '') ? Math.round(data.temp.day): Math.round(metricFunction(data.temp.day, unit))}&deg;
            </span>
            <FontAwesomeIcon icon={faSun} fontSize={30}/>
            </div>
            <div className="row text-center">
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Feels Like</p>
                    <FontAwesomeIcon icon={faTemperatureHigh}className="pe-2"/>
                    {(unit==='\u00B0C' || unit==='')?Math.round(data.feels_like.day):Math.round(metricFunction(data.feels_like.day,unit))}&deg;
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Sunrise</p>
                    <FontAwesomeIcon icon={faSun}/>
                    <FontAwesomeIcon icon={faArrowUpLong}className="ps-1 pe-2"/>
                    {timeConverter(data.sunrise)}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Sunset</p>
                    <FontAwesomeIcon icon={faSun}/>
                    <FontAwesomeIcon icon={faArrowDownLong}className="ps-1 pe-2"/>
                    {timeConverter(data.sunset)}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Humidity</p>
                    <FontAwesomeIcon icon={faDroplet}className="pe-2"/>
                    {data.humidity}%
                </div>
            </div>
            <div className='py-2'>
                <p className='pb-0'>{date} | Night</p>
                <span className='pe-3 fs-1'>
                    {(unit === '\u00B0C' || unit === '') ? Math.round(data.temp.night): Math.round(metricFunction(data.temp.night, unit))}&deg;
                </span>
                <FontAwesomeIcon icon={faMoon} fontSize={30}/>
            </div>
            <div className="row text-center">
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Feels Like</p>
                    <FontAwesomeIcon icon={faTemperatureHigh} className="pe-2"/>
                    {(unit==='\u00B0C' || unit==='')?Math.round(data.feels_like.night):Math.round(metricFunction(data.feels_like.night,unit))}&deg;
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Moonrise</p>
                    <FontAwesomeIcon icon={faMoon}/>
                    <FontAwesomeIcon icon={faArrowUpLong}className="pe-2"/>
                    {timeConverter(data.moonrise)}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Moonset</p>
                    <FontAwesomeIcon icon={faMoon}/>
                    <FontAwesomeIcon icon={faArrowDownLong}className="pe-2"/>
                    {timeConverter(data.moonset)}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Wind Speed</p>
                    <FontAwesomeIcon icon={faWind}className="pe-2"/>
                    {data.wind_speed}km/hr
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DailyForecastAccordion