import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, getCurrentLocation, selectedCity }) => {

  return (
    <div>
        <Button
        variant={selectedCity === '' ? 'secondary' : 'light'} onClick={() => getCurrentLocation()}
        >current location</Button>
        {cities.map((item, index)=> (
          <Button variant={selectedCity === item ? "secondary" : "light"} key={index} onClick={()=>setCity(item)}>{item}</Button>
        ))}
    </div>
  )
}

export default WeatherButton