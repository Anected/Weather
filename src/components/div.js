import React from "react";
import moment from 'moment';
moment.lang('ru');

class WeatherDiv extends React.Component  {

    checkDay = (item,time) => {
        console.log(time,time);
        if (time === item) {
            return true
        }
    };

    render() {
        const data = this.props.weatherData.list;
        console.log(data[0]);
        const time = moment.unix(data[0].dt).format('YYYY-MM-DD');
        console.log(time);
        return (
            <div>
                {data.map((item, key) => {
                    const params = item.main;
                    const weather = item.weather;
                    return (
                        <div className='card'>
                            {this.checkDay((moment.unix(item.dt).format('YYYY-MM-DD')),time) &&
                            <div className='cardDiv'>
                                <p className='cardElement '>{moment.unix(item.dt).format('HH:mm')} </p>
                                <img className='img' src={this.props.func(weather[0].description)} width="80" height="80"
                                     alt='Pogoda'/>
                                <p className='cardElementTemp '>{Math.ceil(params.temp)}°  </p>

                            </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default WeatherDiv;