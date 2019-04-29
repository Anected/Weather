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
        cityName: null,
        temp: null,
        wind: null,
        windDirection: null,
        description: null,
        humidity: null,
        time: null,
        pressure: null,
        sunset: null,
        sunrise: null
    };

    getForecast = (lat, lon, display_name) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}9&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    data: response.data,
                    cityName: display_name.match(/(\S+)\s/)[0].slice(0, -2)
                    });
                this.getWeather(response.data.city.id)
            })
            .catch(error => {
                console.log(error);
            });
    };

    getWeather = (code) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${code}&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    sunset: response.data.sys.sunset,
                    sunrise: response.data.sys.sunrise,
                    temp: response.data.main.temp,
                    wind: response.data.wind.speed,
                    windDir: response.data.wind.deg,
                    description: response.data.weather[0].description,
                    humidity: response.data.main.humidity,
                    time: response.data.dt,
                    pressure: response.data.main.pressure
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Info city={this.state.cityName}
                />
                <Form getWeather={this.getForecast} cityName={this.state.cityName}/>
                <Weather
                    data={this.state.data}
                    city={this.state.cityName}
                    temp={this.state.temp}
                    wind={this.state.wind}
                    windDir={this.state.windDir}
                    description={this.state.description}
                    humidity={this.state.humidity}
                    time={this.state.time}
                    pressure={this.state.pressure}
                    sunset={this.state.sunset}
                    sunrise={this.state.sunrise}
                />
            </div>
        );
    }
}


export default App