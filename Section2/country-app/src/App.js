import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const {countries, setCountries} = useState([]);


  const getCountries = async () => {
    try {
      await Axios.get('https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D')
      // await Axios.get('https://restcountries.com/v3.1/alll')
        // .then(res => res.json())
        .then(res => console.log('RESP', res.data))
        .then(res => setCountries(res.data))
    } catch (err) {
      console.log(`Error: ${err} while fetching countries`)
    }
  }


  useEffect(() => {
    getCountries()
  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
