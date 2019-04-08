import React from 'react';
import Solnechno from '../images/Solnechno.svg'
import Rain from '../images/Rain.svg'
import Groza from '../images/Groza.svg'
import Pasmurno from '../images/Pasmurno.svg'
import Sneg from '../images/Sneg.svg'
import Tuman from '../images/Tuman.svg'


class Weather extends React.Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    chooseImg = () => {
        if (this.props.description === 'облачно' || this.props.description === 'пасмурно') {
            return Pasmurno
        }
        else if (this.props.description === 'солнечно' || this.props.description === 'ясно') {
            return Solnechno
        } else if (this.props.description === 'дождь' || this.props.description === 'сильный дождь' || this.props.description === 'слабый дождь') {
            return Rain
        } else if (this.props.description === 'гроза') {
            return Groza
        } else if (this.props.description === 'снег' || this.props.description === 'небольшой снегопад') {
            return Sneg
        } else if (this.props.description === 'туман') {
            return Tuman
        }
        else {
            return Pasmurno
        }
    };

    render() {
        return (
            <div>
                {this.props.city &&
                <div className='weather'>
                    <div className='weatherdiv'>
                        <p className='city'>{this.props.city}</p>
                        <img className='img' src={this.chooseImg()} width="150" height="150" alt='Pogoda'/>
                        <h1 className='temp'>{Math.ceil(this.props.temp)}°</h1>
                    </div>
                    <p className='description'>{this.capitalizeFirstLetter(this.props.description)} </p>
                    <p className='text'>Влажность: {this.props.humidity}% Ветер: {Math.ceil(this.props.wind)} м/с</p>

                    <div className='card'>
                        <div className='cardDiv'>
                            <p className='cardElement '>Время : {this.props.data1}</p>
                            <p className='cardElement '>{Math.ceil(this.props.temp1)}°  &nbsp; {this.capitalizeFirstLetter(this.props.description1)}</p>
                        </div>
                        <div className='cardDiv'>
                            <p className='cardElement '>Время : {this.props.data2}</p>
                            <p className='cardElement '>{Math.ceil(this.props.temp2)}°&nbsp; {this.capitalizeFirstLetter(this.props.description2)}</p>
                        </div>
                        <div className='cardDiv'>
                            <p className='cardElement '>Время : {this.props.data3}</p>
                            <p className='cardElement '>{Math.ceil(this.props.temp3)}°&nbsp; {this.capitalizeFirstLetter(this.props.description3)}</p>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

}

export default Weather