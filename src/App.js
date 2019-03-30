import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import Info from './components/info'
import Form from './components/form'
import Weather from './components/weather'

const API_KEY = 'd022cd263149a8cbbae87cdb92c511b5';


class App extends Component {
    state = {
        cityName: null,
        temp: null,
        wind: null,
        description: null,
        humidity: null,
    };

    getWeather = (lat,lon) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}9&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                const WeatherData = response.data.list[0];
                const CountryData = response.data.city;
                this.setState({
                    cityName: CountryData.name,
                    temp: WeatherData.main.temp,
                    wind: WeatherData.wind.speed,
                    description: WeatherData.weather[0].description,
                    humidity: WeatherData.main.humidity
                })

            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div >
                <Info  city={this.state.cityName}/>
                <Form getWeather={this.getWeather} cityName={this.state.cityName}/>
                <Weather
                    city={this.state.cityName}
                    temp={this.state.temp}
                    wind={this.state.wind}
                    description={this.state.description}
                    humidity={this.state.humidity}/>
            </div>
        );
    }
}


export default App