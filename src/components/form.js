import React from 'react';
import RelativePortal from 'react-relative-portal';
import axios from "axios";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Form extends React.Component {
    state = {
        show: false,
        cityChoice: null,
        city:null
    };
    getCity = (event) => {
        const city = event.target.value;
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
            .then(response => {
                this.setState({cityChoice: response.data});
            });
        if (this.state.cityChoice !== null && this.state.cityChoice !== undefined) {
            this.handleShow();
        }
    };

   getCityData = (city) => {
       const { lat, lon} = city;
       this.props.getWeather(lat,lon);
       this.handleHide();
    };
    _setShowAsyncTimer = null;
    handleShow = () => {
        this._setShowAsync(true);
    };
    handleHide = () => {
        this._setShowAsync(false);
    };

    componentWillUnmount() {
        clearTimeout(this._setShowAsyncTimer);
    };

    _setShowAsync(show) {
        clearTimeout(this._setShowAsyncTimer);
        this._setShowAsyncTimer = setTimeout(() => {
            this.setState({show: show});
        }, 0);
    }

    render() {
        const {show} = this.state;
        const cityChoice = this.state.cityChoice;
        return (
            <div className={this.props.cityName ? 'divleft':'div'}>
                <form onChange={this.getCity} onSubmit={this.props.getWeather}>
                    <div><input className='input'
                                type='text'
                                name='city'
                                placeholder='Введите город'/>
                        <button className={this.props.cityName ? 'btnleft':'btn'}>⮞</button>
                    </div>
                </form>
                <div className='standart'>
                    <RelativePortal
                        component="table"
                        left={0}
                        top={10}
                        className='modal'
                    >
                        {show && cityChoice && cityChoice.map((city, key) => {
                            const {display_name} = city;
                            return (
                                <table className='table'  key={key}>
                                    <tbody className='tbody' key={key}>
                                    <tr className={this.props.cityName ? 'trleft':'tr'} key={key} onClick={()=> this.getCityData(city)}>
                                        <td className={this.props.cityName ? 'tdleft':'td'} key={key} >  {display_name}  </td>
                                    </tr>
                                    </tbody>
                                </table>
                            )
                        })
                        }
                    </RelativePortal>
                </div>
            </div>
        )
    }

}

export default Form