import React from 'react';

class Weather extends React.Component {
    render (){
        const data = this.props.data;
        const message = data && 'Ведите название города для отображения погоды';
        return(
            <div>
               <h3>{message}</h3>
            </div>
        )
    }

}
export default Weather