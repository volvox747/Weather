import React from 'react'
import  classes  from "./TempCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {weatherIcon} from '../../utilities';

const TempCard = ({current,location,state,country,date}) => 
{
  const icon = weatherIcon(current.weather[0]);
  date=new Date(date*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
    <div className={`${classes['temp-card']} `}>
        <div className="w-75">
            <h5 className={` display-6`}>{location}{state!==undefined &&", "+state}{country!==undefined&&", "+country}</h5>
        </div>
        <div className='card-body'>
            <div className="card-text d-flex align-items-center">
              <span className='display-1 pe-3'>{Math.round(current.temp)}&deg;</span>
              <FontAwesomeIcon icon={icon} fontSize={80} />
            </div>
            <div className="card-text lead fs-3 text-capitalize">{current.weather[0].description}</div> 
            <small className="card-text">Last updated {date}</small>
            
        </div>
    </div>
  )
}

export default TempCard