import React from 'react'
// import  classes  from "./TempCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {weatherIcon} from '../../utilities';

const TempCard = ({current,location,state,country,date}) => 
{
  const icon = weatherIcon(current.weather[0]);

  return (
    <div className={` card mb-4 `}>
        <div className="card-header">
            <h5 className={` lead fs-3 pt-2`}>{location}{state!==undefined &&", "+state}{country!==undefined&&", "+country}</h5>
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