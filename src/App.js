import { Fragment, useState, useEffect, useCallback } from 'react'
import { ToggleFrom } from './components/Forms/ToggleFrom';
import { weatherIcon } from './utilities';
import { Route, Routes } from 'react-router-dom';
import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import TempCard from './components/CurrentWeather/TempCard';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import DailyWeatherCard from './components/DailyWeatherCard/DailyWeatherCard';
import HourlyWeatherCard from './components/HourlyWeatherCard/HourlyWeatherCard';
import Radar from './components/Radar/Radar';
import Navbar from './components/Navbar/Navbar';
import ErrorModal from './components/ErrorModal/ErrorModal';
import TwoDayHourlyForecast from './components/HourlyWeatherCard/TwoDayHourlyForecast';
import EightDayForecast from './components/DailyWeatherCard/EightDayForecast';
import Footer from './components/Footer/Footer';


function App() {
  // loading spinner jsx code
  const middleware =
    (<div className="spinner-border text-primary" role="status" style={{ margin: '10rem 0', width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>)

  const [getData, setGetData] = useState({});
  // this state is triggered admist request and response of data
  const [isLoading, setIsLoading] = useState(false);
  // used for mapping on radar
  const [coordinates, setCoordinates] = useState([]);

  // console.log('App');
  const [errorAlert, setErrorAlert] = useState(null);

  // function to get weather data based on zip code and country entered by the user 
  const getByZip = async (iso2, zip) => {
    setErrorAlert(null)
    setIsLoading(true);

    // Get the place name and lat,log coordinates 
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso2}&units=metric&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const data = await res.json();

    // API Error Handling
    if (data.cod === '404') 
    {
      // displays alert message when error occurs
      return setErrorAlert(data);
    }

    // destructuring name and coordinates from the response object from openweather API
    const { name, coord } = data;
    // set coordionated for Radar
    setCoordinates([coord.lat, coord.lon]);

    // Get the current,daily and hourly weather data 
    res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const { current, daily, hourly,timezone } = await res.json();

    // Get the state and country names using openCast API
    res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coord.lat}+${coord.lon}&key=ecdad83f9a43466cb0d2ef5d24876161`)
    const { results } = await res.json();

    setGetData({
      timezone,
      current,
      daily,
      hourly,
      location: `${name}${results[0].components.city !== undefined ? (", " + results[0].components.city) : ""}, ${results[0].components.state}, ${results[0].components.country}`
    })
    // hides the loading spinner
    setIsLoading(false)
  }

  // Function to get weather data based on location entered by the user 
  const getByLocation = async (location, coordinates) => {
    setErrorAlert(null)
    setIsLoading(true);
    setCoordinates([coordinates[1], coordinates[0]]);
    // Get the current,daily and hourly weather data based on the coordinates found above 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[1]}&lon=${coordinates[0]}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const { current, daily, hourly, timezone } = await response.json();
    setGetData({
      timezone,
      location,
      current,
      daily,
      hourly,
    });
    setIsLoading(false);
  }

  // Function to get weather data based on users current IP address 
  const getWeatherThroughIP = async () => {
    setErrorAlert(null)
    setIsLoading(true);
    // get city,state,country name & geography coordinates from idata API
    // let response = await fetch(`https://api.ipdata.co/?api-key=4825cba494257a270b1a4e24386c124042b61f8e54720ac8a4ed04ec`);
    let response = await fetch(`http://ip-api.com/json`);
    const { city, regionName, country, lat, lon } = await response.json();
    // get current, daily, hourly weather data using coordinates responded by ipdata API
    response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const { current, daily, hourly,timezone } = await response.json();
    // set the coordinates array which is used to locate the place on radar map
    setCoordinates([lat, lon])
    setGetData({
      timezone,
      current,
      daily,
      hourly,
      location: city + ", " + regionName + ", " + country,
    })
    setIsLoading(false);
  }

  console.log(getData)

  // change the background according to the weather description
  let ans = [];
  if (Object.keys(getData).length > 1) {
    ans = weatherIcon(getData.current.weather[0])
  }

  // calls getWeatherThroughIP function when the page renders for the first time
  useEffect(() => {
    getWeatherThroughIP();
  }, []);

  const metricChange = useCallback((unit = "") =>
    setGetData((prevState) => {
      return ({
        ...prevState,
        units: unit
      })
    }),
    [])



  return (
    <Fragment>
      <Navbar onUnitChange={metricChange} errorAlert={errorAlert===null&& true} />
      {/* {errorAlert && <ErrorToast errorMsg={errorAlert} onCloseHandler={()=>setErrorAlert(null)}/>} */}
      <Routes>
        <Route path='/' element=
          {
            <>
              <section style={{ backgroundImage: `url(${ans[1]})` }} className={classes['current-weather']}>
                <div className='row position-relative'>
                  <div className={classes.overlay}></div>
                  <div className={`col-xl-8 col-lg-7 col-md-6 position-relative ${isLoading === true && classes.spinner}`}>
                    {
                      (isLoading === false && Object.keys(getData).length > 1) ?
                      // display when the data is present
                        <TempCard current={getData.current} unit={getData.units} location={getData.location} timezone={getData.timezone} date={getData.current.dt} />
                        // else check whether there is any error ,if not display the middleware
                        : errorAlert!==null ? <ErrorModal errorMsg={errorAlert} /> :middleware
                    }
                  </div>
                  <div className={`col-xl-4 col-lg-5 col-md-6 ${classes.glass} text-white`}>
                    <ToggleFrom onGet={{ zip: getByZip, loc: getByLocation }} /><hr />
                    <div className={`${isLoading === true && classes.spinner}`}>
                      {
                        (isLoading === false && Object.keys(getData).length > 1) ?
                        // display when the data is present
                          <>
                            <WeatherInfo data={getData} />
                            <hr />
                            <DailyWeatherCard dailyWeather={getData.daily.slice(0, 5)} timezone={getData.timezone} unit={getData.units} /><hr />
                            <HourlyWeatherCard hourlyWeather={getData.hourly.slice(1, 6)} timezone={getData.timezone} unit={getData.units} />
                          </>
                          // else check whether there is any error ,if not display the middleware
                          : errorAlert!==null ? null : middleware
                      }
                    </div>
                  </div>
                </div>
              </section>
              {
                errorAlert!==null ? null :
                  <div className={`container mb-5 ${isLoading === true && classes.spinner}`}>
                    {(coordinates.length !== 0 && getData.location !== undefined) ?
                      <>
                        <h2 className='display-5 py-4'>Radar at {getData.location.split(',').slice(-1)}</h2>
                        <Radar lat={coordinates[0]} lng={coordinates[1]} />
                      </> : middleware}
                  </div>
              }
            </>
          } />
        <Route path='/hourly' element={<TwoDayHourlyForecast hourlyWeather={getData.hourly} timezone={getData.timezone} location={getData.location} unit={getData.units} />} />
        <Route path='/daily' element={<EightDayForecast dailyWeather={getData.daily} timezone={getData.timezone} location={getData.location} unit={getData.units} />} />
        <Route path='/*'
          element={
            <div className='d-flex align-items-center justify-content-center vh-100' >
              <ErrorModal errorMsg={{ cod: 404, message: "Page Not Found" }} />
            </div>
          } />
      </Routes>
      <Footer />
    </Fragment>

  );
}


export default App;
