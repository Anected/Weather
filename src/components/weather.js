import React from 'react';

class Weather extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.city}</p>
                <p>{Math.ceil(this.props.temp)}°</p>
                <p>{this.props.wind} м/с</p>
                <p>{this.props.description}</p>
                <p>{this.props.humidity}%</p>
            </div>
        )
    }

}

export default Weather