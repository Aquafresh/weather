import axios from 'axios';
import React from 'react';
import WeatherForm from '../components/weatherForm/WeatherForm';


export function getWeather(cityName, cities) {

	return axios.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&appid=2509cbd7203a8d34c6e0c217881f6d0d')
	  .then(function (response) {

	  	console.log(response)
	    cities.push({name: cityName, temp: response.data.main.temp})

	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}
