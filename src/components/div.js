import React from "react";
import moment from 'moment';


class WeatherDiv extends React.Component {
    state = {
        data:this.props.weatherData.list.slice(0,8)
    };
    getСlickedData = () =>{
      if (this.props.clickedData.length !== 0 && this.state.data !== this.props.clickedData) {
          this.setState({data:this.props.clickedData});
      }
    };
    render() {
        this.getСlickedData();
        return (
            <div>
                {this.state.data.map((item, key) => {
                    const params = item.main;
                    const weather = item.weather;
                    const wind = item.wind;
                    return (
                        <div className='card' key={key}>
                            <div className='cardDiv'>
                                <p className='cardElement '>{moment.unix(item.dt).format('DD MMM HH:mm')} </p>
                                <img className='img' src={this.props.func(weather[0].description)} width="50"
                                     height="50" alt='Pogoda'/>
                                <p className='cardElementTemp '>{Math.ceil(params.temp)}° </p>
                                <p className='weatherInfo '>Влажность : {params.humidity }%</p>
                                <p className='weatherInfo '>Ветер: {Math.ceil(wind.speed) } м/с,  {this.props.windDirection(wind.deg)}</p>
                                <p className='weatherInfo '>Давление : {Math.ceil((params.grnd_level) * 0.75006375541921)} </p>

                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default WeatherDiv;