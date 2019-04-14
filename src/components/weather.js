import React from 'react';
import Sunny from '../images/Sunny.svg'
import Rain from '../images/Rain.svg'
import Thunderstorm from '../images/Thunderstorm.svg'
import Cloudy from '../images/Cloudy.svg'
import Snow from '../images/Snow.svg'
import Mist from '../images/Mist.svg'
import WeatherDiv from './div.js'

import moment from 'moment'
import 'moment/locale/ru'
import Table from './table.js'

moment.locale('ru');

class Weather extends React.Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    chooseImg = (description) => {
        if (description === 'облачно' || description === 'пасмурно') {
            return Cloudy
        }
        else if (description === 'солнечно' || description === 'ясно') {
            return Sunny
        } else if (description === 'дождь' || description === 'сильный дождь' || description === 'слабый дождь') {
            return Rain
        } else if (description === 'гроза') {
            return Thunderstorm
        } else if (description === 'снег' || description === 'небольшой снегопад') {
            return Snow
        } else if (description === 'туман') {
            return Mist
        }
        else {
            return Cloudy
        }
    };

    render() {
        return (
            <div>
                {this.props.city &&
                <div className='weather'>
                    <div className='weatherdiv'>
                        <p className='city'>{this.props.city}</p>
                        <p className='time'>{(moment.unix(this.props.time).format('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                        <img className='img' src={this.chooseImg(this.props.description)} width="150" height="150" alt='Pogoda'/>
                        <h1 className='temp'>{Math.ceil(this.props.temp)}°</h1>
                    </div>
                    <p className='description'>{this.capitalizeFirstLetter(this.props.description)} </p>
                    <p className='text'>Влажность: {this.props.humidity}% Ветер: {Math.ceil(this.props.wind)} м/с</p>

                    <WeatherDiv weatherData={this.props.data} func={this.chooseImg}/>

                </div>
                }
            </div>
        )
    }

}

export default Weather