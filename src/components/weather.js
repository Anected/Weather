import React from 'react';
import Sunny from '../images/Sunny.svg'
import Rain from '../images/Rain.svg'
import Thunderstorm from '../images/Thunderstorm.svg'
import Cloudy from '../images/Cloudy.svg'
import Snow from '../images/Snow.svg'
import Mist from '../images/Mist.svg'
import WeatherDiv from './div.js'
import NextDays from './nextDays.js'
import moment from 'moment'
import 'moment/locale/ru'

const imgs ={
    Sunny,
    Rain,
    Thunderstorm,
    Cloudy,
    Snow,
    Mist,
};
const match ={
    Cloudy:['облачно', 'пасмурно'],
    Sunny:['солнечно', 'ясно'],
    Rain:['дождь','сильный дождь', 'слабый дождь'],
    Snow:['снег', 'небольшой снегопад'],
    Mist:['туман'],
    Thunderstorm:['гроза']
};
moment.locale('ru');

class Weather extends React.Component {
    state={
      clickedData:[]
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    chooseImg = (description) => {
        for (let key in match){
            if (match[key].includes(description)){
                return imgs[key]
            }
        }
        return imgs.Cloudy
    };
    updateData = (value) => {
        this.setState({clickedData:value})
    };
    windDirection = (angle) => {
        if (angle > 337.5 && angle <= 22.5) {
            return ('С')
        }
        else if (angle > 22.5 && angle <= 67.5) {
            return ('СВ')
        }
        else if (angle > 67.5 && angle <= 112.5) {
            return ('В')
        } else if (angle > 112.5 && angle <= 157.5) {
            return ('ЮВ')
        } else if (angle > 157.5 && angle <= 202.5) {
            return ('Ю')
        } else if (angle > 202.5 && angle <= 247.5) {
            return ('ЮЗ')
        } else if (angle > 247.5 && angle <= 295.5) {
            return ('З')
        } else if (angle > 295.5 && angle <= 337.5) {
            return ('СЗ')
        }
    };

    render() {
        const now = moment();
        return (
            <div>
                {this.props.city &&
                <div className='weather'>
                    <div className='weatherdiv'>
                        <p className='city'>{this.props.city}</p>
                        <p className='time'> {(now.format('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                        <img className='img' src={this.chooseImg(this.props.description)} width="150" height="150"
                             alt='Pogoda'/>
                        <h1 className='temp'>{Math.ceil(this.props.temp)}°</h1>
                        {this.props.description && <p className='description'>{this.capitalizeFirstLetter(this.props.description)} </p>}
                        <p className='text'>Влажность: {this.props.humidity}% </p>
                        <p className='text'>Ветер: {Math.ceil(this.props.wind)} м/с
                            , {this.windDirection(this.props.windDir)} </p>
                        <p className='text'>Давление  : {Math.ceil((this.props.pressure) * 0.75006375541921)} мм. рт.
                            ст. </p>
                    </div>
                    <NextDays data={this.props.data} sunset={this.props.sunset} sunrise={this.props.sunrise} func={this.chooseImg} updateData={this.updateData}/>
                    <WeatherDiv weatherData={this.props.data} func={this.chooseImg} windDirection={this.windDirection} clickedData={this.state.clickedData}/>

                </div>
                }
            </div>
        )
    }

}

export default Weather