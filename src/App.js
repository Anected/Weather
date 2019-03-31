import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import Info from './components/info'
import Form from './components/form'
import Weather from './components/weather'

const API_KEY = 'd022cd263149a8cbbae87cdb92c511b5';


class App extends Component {
    state = {
        actual: {
            cityName: null,
            temp: null,
            wind: null,
            description: null,
            humidity: null,
        },
        next: {
            data: null,
            temp: null,
            description: null,
        },
        next2: {
            data: null,
            temp: null,
            description: null,
        },
        next3: {
            data: null,
            temp: null,
            description: null,
        }
    };

    getWeather = (lat,lon) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}9&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                const WeatherData = response.data.list[0];
                const WeatherData1 = response.data.list[1];
                const WeatherData2 = response.data.list[2];
                const WeatherData3 = response.data.list[3];
                const CountryData = response.data.city;
                console.log(response.data);
                this.setState({
                    actual:{
                        cityName: CountryData.name,
                        temp: WeatherData.main.temp,
                        wind: WeatherData.wind.speed,
                        description: WeatherData.weather[0].description,
                        humidity: WeatherData.main.humidity
                    },
                    next: {
                        data: WeatherData1.dt_txt,
                        temp: WeatherData1.main.temp,
                        description: WeatherData1.weather[0].description,
                    },
                    next2: {
                        data: WeatherData2.dt_txt,
                        temp: WeatherData2.main.temp,
                        description: WeatherData2.weather[0].description,
                    },
                    next3: {
                        data: WeatherData3.dt_txt,
                        temp: WeatherData3.main.temp,
                        description: WeatherData3.weather[0].description,
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
                <Info  city={this.state.actual.cityName}/>
                <Form getWeather={this.getWeather} cityName={this.state.actual.cityName}/>
                <Weather
                    city={this.state.actual.cityName}
                    temp={this.state.actual.temp}
                    wind={this.state.actual.wind}
                    description={this.state.actual.description}
                    humidity={this.state.actual.humidity}
                    temp1={this.state.next.temp}
                    temp2={this.state.next2.temp}
                    temp3={this.state.next3.temp}
                    description1={this.state.next.description}
                    description2={this.state.next2.description}
                    description3={this.state.next3.description}
                    data1= {this.state.next.data}
                    data2= {this.state.next2.data}
                    data3= {this.state.next3.data}/>
            </div>
        );
    }
}


export default App