import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import Info from './components/info'
import Form from './components/form'
import Weather from './components/weather'

const API_KEY = 'd022cd263149a8cbbae87cdb92c511b5';


class App extends Component {
    state = {
        data: null,
        actual: {
            cityName: null,
            temp: null,
            wind: null,
            windDirection:null,
            description: null,
            humidity: null,
            time: null,
            pressure: null,
        },
        sunset:null,
        sunrise:null
    };

    getWeather = (lat,lon,display_name) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}9&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                const WeatherData = response.data.list[0];
                console.log(response.data);
                this.setState({
                    data:response.data,
                    actual:{
                        countryCode:response.data.city.country,
                        cityName: display_name.match(/(\S+)\s/)[0].slice(0, -2),
                        temp: WeatherData.main.temp,
                        wind: WeatherData.wind.speed,
                        windDir:WeatherData.wind.deg,
                        description: WeatherData.weather[0].description,
                        humidity: WeatherData.main.humidity,
                        time: WeatherData.dt,
                        pressure: WeatherData.main.grnd_level
                    },
                });
            this.getSun(response.data.city.id)
            })

            .catch(error => {
                console.log(error);
            });
    };

    getSun = (code) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${code}&APPID=${API_KEY}&units=metric&lang=ru`)
            .then (response =>{
                this.setState({
                        sunset: response.data.sys.sunset,
                        sunrise: response.data.sys.sunrise
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div >
                <Info  city={this.state.actual.cityName}
                />
                <Form getWeather={this.getWeather} cityName={this.state.actual.cityName}/>
                <Weather
                    data={this.state.data}
                    city={this.state.actual.cityName}
                    temp={this.state.actual.temp}
                    wind={this.state.actual.wind}
                    windDir={this.state.actual.windDir}
                    description={this.state.actual.description}
                    humidity={this.state.actual.humidity}
                    time={this.state.actual.time}
                    pressure={this.state.actual.pressure}
                    sunset={this.state.sunset}
                    sunrise={this.state.sunrise}
                />
            </div>
        );
    }
}


export default App