import {useState, useEffect} from 'react';
import axios from 'axios';

const Filter = ({onChange, filter}) => {
  
  return (
    <div>
      <label>Find Countries: <input onChange={onChange} value={filter}/></label>
    </div>
  )
}

const Country = ({url, name}) => {
  return (
    <li>
      <span><a href={`${url}name/${name}`}>{name}</a> </span>
    </li>
  )
}

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([])

  const baseUrl = 'https://restcountries.com/v3.1/'


  useEffect(() => {
    axios.get(`${baseUrl}all`)
      .then(res => {
        setCountries(res.data);
      })
      .then(res => {
        console.log(countries)
      })
  },[]);

  const onChange = () => {
    return;
  }

  console.log('countries', countries)
  return (
    <div className="App">
      <Filter value={filter} onChange={onChange}/>
      {/* {countries.length > 10 ?
      'Too many matches, please add more characters' : */
      countries.map((country) => {
        return <Country name={country.name.common} url={baseUrl} />       
      })}
    </div>
  );
}

export default App;


// await Axios.get('https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D')
