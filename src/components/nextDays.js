import React from "react";
import moment from 'moment';


class NextDays extends React.Component {
    state = {
        plusOneTemp: [],
        plusTwoTemp: [],
        plusThreeTemp: [],
        plusFourTemp: [],
        plusFiveTemp: [],
        clicked:[]
    };

    getClickedData = (day) => {
        this.setState({clicked:[]});
        this.props.data.list.forEach((item) => {
            if (moment.unix(item.dt).format('DD') === day) {
               this.state.clicked.push(item);
            }
        });
        this.props.updateData(this.state.clicked);
    };

    getMaxOfArray = (numArray) => {
        return Math.max.apply(null, numArray);
    };
    getMinOfArray = (numArray) => {
        return Math.min.apply(null, numArray);
    };

    render() {
        const data5 = this.props.data.list;
        return (
            <div>
                <div className='divright'>
                    <p>Рассвет - {moment.unix(this.props.sunrise).format(' HH:mm')}  &nbsp; Закат
                        - {moment.unix(this.props.sunset).format(' HH:mm')}</p>
                </div>
                <div>
                    {data5.forEach((item) => {
                        const plusOne = moment().add(1, 'day').format('MMDD');
                        const plusTwo = moment().add(2, 'day').format('MMDD');
                        const plusThree = moment().add(3, 'day').format('MMDD');
                        const plusFour = moment().add(4, 'day').format('MMDD');
                        const plusFive = moment().add(5, 'day').format('MMDD');
                        const params = item.main;
                        if (moment.unix(item.dt).format('MMDD') === plusOne) {
                            this.state.plusOneTemp.push(params.temp);
                        }
                        else if (moment.unix(item.dt).format('MMDD') === plusTwo) {
                            this.state.plusTwoTemp.push(params.temp);
                        } else if (moment.unix(item.dt).format('MMDD') === plusThree) {
                            this.state.plusThreeTemp.push(params.temp);
                        } else if (moment.unix(item.dt).format('MMDD') === plusFour) {
                            this.state.plusFourTemp.push(params.temp);
                        } else if (moment.unix(item.dt).format('MMDD') === plusFive) {
                            this.state.plusFiveTemp.push(params.temp);
                        }


                    })
                    }
                    <div className='FiveDays'>
                        <div className='Forecast5days' onClick={() => this.getClickedData(moment().add(1, 'day').format('DD'))}>
                            <p className='ForecastElement '>{moment().add(1, 'day').format(('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                            <p className='ForecastTemp '>{Math.ceil(this.getMaxOfArray(this.state.plusOneTemp))}°({Math.ceil(this.getMinOfArray((this.state.plusOneTemp)))}°) </p>
                        </div>
                        <div className='Forecast5days' onClick={() => this.getClickedData(moment().add(2, 'day').format('DD'))}>
                            <p className='ForecastElement '> {moment().add(2, 'day').format(('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                            <p className='ForecastTemp '>{Math.ceil(this.getMaxOfArray(this.state.plusTwoTemp))}°({Math.ceil(this.getMinOfArray((this.state.plusTwoTemp)))}°) </p>
                        </div>
                        <div className='Forecast5days' onClick={() => this.getClickedData(moment().add(3, 'day').format('DD'))}>
                            <p className='ForecastElement '>{moment().add(3, 'day').format(('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                            <p className='ForecastTemp '>{Math.ceil(this.getMaxOfArray(this.state.plusThreeTemp))}°({Math.ceil(this.getMinOfArray((this.state.plusThreeTemp)))}°) </p>
                        </div>
                        <div className='Forecast5days' onClick={() => this.getClickedData(moment().add(4, 'day').format('DD'))}>
                            <p className='ForecastElement '>{moment().add(4, 'day').format(('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                            <p className='ForecastTemp '>{Math.ceil(this.getMaxOfArray(this.state.plusFourTemp))}°({Math.ceil(this.getMinOfArray((this.state.plusFourTemp)))}°) </p>
                        </div>
                        <div className='Forecast5days' onClick={() => this.getClickedData(moment().add(5, 'day').format('DD'))}>
                            <p className='ForecastElement '> {moment().add(5, 'day').format(('dddd, DD MMMM  ')).replace(/(^|\s)\S/g, l => l.toUpperCase())} </p>
                            <p className='ForecastTemp '>{Math.ceil(this.getMaxOfArray(this.state.plusFiveTemp))}°({Math.ceil(this.getMinOfArray((this.state.plusFiveTemp)))}°) </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NextDays;