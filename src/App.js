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
            description: null,
            humidity: null,
            time: null,
        },
    };

    getWeather = (lat,lon,display_name) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}9&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                const WeatherData = response.data.list[0];
                console.log(response.data);
                this.setState({data:response.data});
                console.log(this.state.actual.time)
                this.setState({
                    actual:{
                        cityName: display_name.match(/(\S+)\s/)[0].slice(0, -2),
                        temp: WeatherData.main.temp,
                        wind: WeatherData.wind.speed,
                        description: WeatherData.weather[0].description,
                        humidity: WeatherData.main.humidity,
                        time: WeatherData.dt
                    },
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
                    description={this.state.actual.description}
                    humidity={this.state.actual.humidity}
                    time={this.state.actual.time}/>
            </div>
        );
    }
}


export default App