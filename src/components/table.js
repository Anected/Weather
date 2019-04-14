import React from "react";

function Table(props) {
    const data = props.weatherData.list;
    return (
        <table className='tableWeather'>
        {data.map((item, key) => {
            const params=item.main;
            const weather=item.weather;
            return (
                <tbody key={key}>
                <tr className='td' >
                    <td>
                        {Math.ceil(params.temp)}°

                    </td>
                    <td>
                        {weather[0].main}
                    </td>
                </tr>
                </tbody>

            )})}
        </table>)};

export default Table;