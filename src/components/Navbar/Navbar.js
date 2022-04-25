import {useState,useEffect} from 'react'

const Navbar = ({onUnitChange}) => {
  const [unit, setUnit] = useState('');
  console.log("nav");
  useEffect(() => {
    onUnitChange(unit)
  }, [onUnitChange,unit]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container ms-5 ps-5">
        <div className="navbar-brand">Weather.com</div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="degree" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {unit===''?'\u00B0C':unit}
              </div>
              <ul className="dropdown-menu" aria-labelledby="degree">
                <li className='dropdown-item' onClick={(e)=>setUnit(e.currentTarget.innerHTML)}>&deg;C</li>
                <li className="dropdown-item" onClick={(e)=>setUnit(e.currentTarget.innerText)}>&deg;F</li>
              </ul>
            </li>
          </ul>
      </div>
    </nav>
  )
}

export default Navbar