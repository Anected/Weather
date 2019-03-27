import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import Info from './components/info'
import Form from './components/form'
import Weather from './components/weather'

const API_KEY = 'd022cd263149a8cbbae87cdb92c511b5';


class App extends Component {
    state = {
        city: null,
        cityName: null,
        temp: null,
        wind: null,
        description: null,
        humidity: null
    };

    toLatin = (text) => {
        const arrru = ['Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ы', 'ы', 'Ь', 'ь', 'Ъ', 'ъ', 'Э', 'э'];
        const arren = ['Ya', 'ya', 'Yu', 'yu', 'Ch', 'ch', 'Sh', 'sh', 'Sh', 'sh', 'Zh', 'zh', 'A', 'a', 'B', 'b', 'V', 'v', 'G', 'g', 'D', 'd', 'E', 'e', 'E', 'e', 'Z', 'z', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'F', 'f', 'H', 'h', 'C', 'c', 'Y', 'y', '`', '`', '\'', '\'', 'E', 'e'];
        for (let i = 0; i < arrru.length; i++) {
            let reg = new RegExp(arrru[i], "g");
            text = text.replace(reg, arren[i]);
        }
        return text;
    };

    getWeather = (event) => {
        event.preventDefault();
        const city = this.toLatin((event.target.elements.city.value));
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                const WeatherData = response.data.list[0];
                const CountryData = response.data.city;
                console.log(WeatherData);
                console.log(CountryData);
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
            <div>
                <Info/>
                <Form weatherMethod={this.getWeather}/>
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