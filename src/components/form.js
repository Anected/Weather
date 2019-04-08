import React from 'react';
import axios from "axios";
import onClickOutside from "react-onclickoutside";

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
       const { lat, lon,display_name} = city;
       this.props.getWeather(lat,lon,display_name);
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
    handleClickOutside = () =>{
        this.handleHide();
    };
        render() {
        const {show} = this.state;
        const cityChoice = this.state.cityChoice;
        return (
            <div className={this.props.cityName ? 'divleft':'div'} >
                <form className='form' onChange={this.getCity} onSubmit={this.props.getWeather}>
                    <div className='form' >
                        <input className='input'
                                type='text'
                                name='city'
                                placeholder='Введите город'/>
                        <button className={this.props.cityName ? 'btnleft':'btn'}>⮞</button>
                    </div>
                </form>
                <div className='standart'>
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
                </div>
            </div>
        )
    }

}


export default onClickOutside(Form);