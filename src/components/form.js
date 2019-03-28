import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.weatherMethod}>
                   <div> <input className='input' type='text' name='city' placeholder='Введите город'/>
                    <button className='btn'>⮞</button>
                   </div>
                </form>
            </div>
        )
    }

}

export default Form