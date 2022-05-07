import {useState,useEffect, memo} from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css'

const Navbar = ({onUnitChange,errorAlert}) => {
  const [unit, setUnit] = useState('');
  useEffect(() => {
    onUnitChange(unit)
  }, [onUnitChange,unit]);
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark" style={{zIndex:'1030'}}>
      <div className="container">
        <div className="navbar-brand" style={{fontSize:25}}>Weather Report</div>
        {
        errorAlert===true &&
        <>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item pe-3">
              <NavLink to='/' className={`nav-link text-white ${classes.hoverBorder}`}>Home</NavLink>
            </li>
            <li className="nav-item pe-3">
              <NavLink to='/daily' className={`nav-link text-white ${classes.hoverBorder}`}>Daily Forecast</NavLink>
            </li>
            <li className="nav-item pe-3">
              <NavLink to='/hourly' className={`nav-link text-white ${classes.hoverBorder}`}>Hourly Forecast</NavLink>
            </li>
            <li className="nav-item dropdown">
              <div className={`nav-link dropdown-toggle text-white ${classes.hoverBorder}`} id="degree" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {unit===''?'\u00B0C':unit}
              </div>
              <ul className="dropdown-menu" aria-labelledby="degree">
                <li className='dropdown-item' onClick={(e)=>setUnit(e.currentTarget.innerHTML)}>&deg;C</li>
                <li className="dropdown-item" onClick={(e)=>setUnit(e.currentTarget.innerText)}>&deg;F</li>
              </ul>
            </li>
          </ul>
        </div>
        </>    
        }
      </div>
    </nav>
  )
}

export default memo(Navbar)