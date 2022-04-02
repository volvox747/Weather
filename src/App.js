import './App.css';
import {Fragment, useState} from 'react'
import { ToggleFrom } from './components/Forms/ToggleFrom';
// import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar/Navbar';
import { WeatherCard } from './components/WeatherCard/weatherCard';

function App() {
  const [getData, setGetData] = useState({});
  const getByZip=async(iso2,zip)=>
  {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso2}&units=metric&appid=c6b6521bbfa0ecfa8b508528f3f9823e`, {
      method: "GET"
    });
    const data=await res.json();
    setGetData(data)
  }

  const getByLocation=async(location)=>
  {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const data = await response.json();
    console.log(data);
    setGetData(data)
  }
  return (
    <Fragment>
      <Navbar/>
      <div className="container">
        <ToggleFrom onGet={{zip:getByZip,loc:getByLocation}}/>
        {Object.keys(getData).length!==0 && <WeatherCard data={getData}/>}
      </div>
    </Fragment>
  );
}

export default App;
