import React, {Component} from 'react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';

import './WeatherForm.css';
import CityList from '../cityList/CityList';
// import * as App from '../../servises/App';

export default class WeatherForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			city: '',
			cities: []
		};
		this.handleChange = this.handleChange.bind(this)
		this.getTemp = this.getTemp.bind(this)
		this.localStorageCheck = this.localStorageCheck.bind(this)
		this.localStorageWrite = this.localStorageWrite.bind(this)
	}

	handleChange(e) {
		this.setState({city: e.target.value});
		console.log('handleChange----',this.state)
	}

	getTemp() {
		const cityName = this.state.city
		const cities = this.state.cities

		axios.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&appid=2509cbd7203a8d34c6e0c217881f6d0d')
		  .then(function (response) {

		    cities.push({name: cityName, temp: response.data.main.temp})

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		//App.getWeather(cities,cityName)

		this.setState({cities: cities});
		console.log('state',this.state.cities);

		this.localStorageWrite(this.state.cities)

	}

	localStorageWrite(array) {
		let obj = JSON.stringify(array)
		localStorage.setItem("myList", obj)
		localStorage.removeItem("myKey")
		var returnObj = JSON.parse(localStorage.getItem("myList"))
	}

	localStorageCheck() {
		let userArray = localStorage.getItem('myList')
		if(localStorage.getItem('myList')) {

			return localStorage.getItem('myList')
		}
	}





	render() {

		return (
			<div className="weatherForm">
				<div className="weatherFormRow">
					<input className="weatherFormInput" id="city" placeholder="Type city.."  onChange={this.handleChange}/>
					<button className="weatherFormSubmit" onClick={this.getTemp}>Get weather!</button>
				</div>
				<CityList parentFunc={this.getTemp} keyList={this.state.cities} />
			</div>
		)
	}
}
