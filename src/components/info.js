import React from 'react';
import '../index.css';

class Info extends React.Component {
    render (){
        return(
            <div className= 'info' >
                {!this.props.city &&
                <div>
                    <h1>Прогноз погоды</h1>
                    <h2>Узнайте погоду в вашем городе</h2>
                </div>
                }
            </div>
        )
    }

}
export default Info

