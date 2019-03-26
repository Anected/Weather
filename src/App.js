import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import Info from './components/info'
import Form from './components/form'
import Weather from './components/weather'

const API_KEY = 'd022cd263149a8cbbae87cdb92c511b5';


class App extends Component {
    state ={
        data:null
    };
    componentDidMount(){
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}&units=metric`)
            .then(response => {
                this.setState({data: response.data});
            })};

    getWeather = (event) => {
        event.preventDefault();
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}&units=metric`)
            .then(response => {
                this.setState({data:response.data });
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
                <Weather data={this.state.data}/>
            </div>
        );
    }
}


export default App