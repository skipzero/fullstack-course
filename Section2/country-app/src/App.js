import {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

const Filter = ({filter, filterBy}) => {
  
  return (
    <div>
      <label>Find Countries: <input onChange={filterBy} value={filter} id='filter' /></label>
    </div>
  )
}

const Country = ({search, countries, filterBy}) => {

  return (
    <ul>
      {search.query === '' ?
        countries.map(country => {
          return <li key={country.name.common} >
            {country.name.common}
          </li>
        })
        : search.list.map(country => {
          console.log('lists',search, country);
          return <li key={country.name.common}>
            {country.name.common} <button onClick={() => filterBy(country.name.common)}>Show</button>
          </li>
        })}
    </ul>
  )
}

const Weather = (props) => {
 console.log('Weather Pros', props)
 const name = props.name;
 const {weather, wind, main} = props.weather;
 const weatherUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    return <>
    <h2>Weather in {name}</h2>
    <div><strong>Temprature: {main.temp} ℃</strong> </div>
    <img src={weatherUrl} alt={weather[0].description} title={weather[0].description} className='weather-icon'/> 
    <div><strong>Wind Speed: {wind.speed} m/s</strong></div>
  </>
}

const SingleCountry = (props) => {
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  console.log('SingleCount', props)
  const {capital, area, languages, flags, name, capitalInfo} = props.country;
  const [lat, lon] = capitalInfo.latlng;
  const apiKey = process.env.REACT_APP_OWOC_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log('single', lat, lon, apiKey)
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setWeatherData(res.data)
        setLoading(false)
      })
  },[url])
  return <>
    <h1>{name.common}</h1>
    <div>Capital: {capital}</div>
    <div>Area: {area}</div>
    <div>
      Languages:
      <ul>
        {Object.keys(languages).map(lang => {
          return <li key={lang}>
            {languages[lang]}
          </li>
        })}
      </ul>
      <img src={flags.png} alt={name.common} title={name.common} className='flag'/>
      {loading ?
        <>
          'Weather loading'
        </> :
        <>
          <Weather weather={weatherData} name={capital[0]} />
        </>}
    </div>
  </>
}

function App() {
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState({
    query: '',
    list: []
  })
  const [countries, setCountries] = useState([])

  const baseUrl = 'https://restcountries.com/v3.1/'


  useEffect(() => {
    axios.get(`${baseUrl}all`)
      .then(res => {
        setCountries(res.data);
      })
  },[]);

  const handleFilterChange = (event) => {
    let target;
    if (event.target) {
      target = event.target.value;
    } else {
      target = event;
    }
    setFilter(target)

    const results = countries.filter(country => {
      if (target === '') return countries
      return country.name.common.toLowerCase().includes(target.toLowerCase())
    })
    console.log('filet', results, query)
    setQuery({
      query: target,
      list: results
    })
  }

  // console.log('countries', countries)
  return (
    <div className="App">
      <Filter value={filter} filterBy={handleFilterChange}/>

      {query.list.length === 1 ?
        <SingleCountry country={query.list[0]} /> :
      query.list.length <= 10 && query.list.length > 0 ?
        // query.list.map((country) => {
          <>
            <Country search={query} filterBy={handleFilterChange} />
          </>
       :
      'Too many matches, please add more characters'
    }
    </div>
  );
}

export default App;


// await Axios.get('https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D')
