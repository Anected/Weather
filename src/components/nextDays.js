import React from "react";
import moment from 'moment';


class NextDays extends React.Component {
    render (){
        return(
            <div >
                <div className='divright'>
                    <p>Рассвет - {moment.unix(this.props.sunrise).format(' HH:mm')}  &nbsp; Закат - {moment.unix(this.props.sunset).format(' HH:mm')}</p>
                </div>
            </div>
        )
    }

}

export default NextDays;