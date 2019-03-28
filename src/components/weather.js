import React from 'react';


class Weather extends React.Component {
   capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    render() {
        return (
            <div>
                {this.props.city &&
                <div>
                    <p> Город: {this.props.city}</p>
                    <p>{this.capitalizeFirstLetter(this.props.description)}</p>
                    <p> Температура: {Math.ceil(this.props.temp)}°</p>
                    <p>Скорость ветра: {this.props.wind} м/с</p>
                    <p>Влажность: {this.props.humidity}%</p>
                </div>}
            </div>
        )
    }

}

export default Weather