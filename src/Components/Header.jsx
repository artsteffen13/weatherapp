import React, {useEffect, useState} from 'react';
import key from '../key'
import '../Styles/header.css'
import WeatherConditions from "./WeatherConditions";

const Header = () => {

    const [myWeather, setMyWeather] = useState({});
    const [weatherConditions, setWeatherConditions] = useState({});
    const [weatherOutlook, setWeatherOutlook] = useState([]);
    const degrees = '\u00b0';

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
//https://cors-anywhere.herokuapp.com/

            fetch("https://api.weatherbit.io/v2.0/current?lat=" + latitude + "&lon=" + longitude + "&key=" + key + "&units=I")
                .then(res => res.json())
                .then(response => {
                    setMyWeather(response.data[0]);
                    setWeatherConditions(response.data[0].weather);
                    console.log(response)
                })

                .catch(err => {
                    console.log(err);
                });
            fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&key=" + key + "&units=I")
                .then(res => res.json())
                .then(response => {
                    setWeatherOutlook(response.data);
                    console.log(response.data)
                })

                .catch(err => {
                    console.log(err);
                })
        });
    }, []);
    return (
        <div className="container">
            <h1>Current Weather in {myWeather.city_name}, {myWeather.state_code}</h1>
            <hr/>
            <div className="flex-container">
                <WeatherConditions
                    title="Current Temp"
                    item={myWeather.temp + degrees + ' F'}
                />
                <WeatherConditions
                    title="Current Conditions"
                    item={weatherConditions.description}
                />
                <WeatherConditions
                    title="Cloud Cover"
                    item={myWeather.clouds + '%'}
                />
                <WeatherConditions
                    title="Dew Point"
                    item={myWeather.dewpt}
                />
                <WeatherConditions
                    title="Wind"
                    item={myWeather.wind_spd + 'MPH ' + myWeather.wind_cdir}
                />
            </div>
            <h1>15 day outlook</h1>
            <hr/>
            <div className="flex-container">
                {weatherOutlook.map((item, index) => {
                    return (
                    <WeatherConditions
                    title={item.valid_date.slice(5)}
                    item={'Hi - ' + item.high_temp + degrees + ' F'}
                    item2={'Low - ' + item.low_temp + degrees + ' F'}
                    item3={'Precip - ' + Math.floor(item.precip * 100) + '%'}
                    key={index}
                    />
                    )
                })
                }
            </div>
        </div>
    )
};

// city={myWeather.city_name}
// state={myWeather.state_code}
// temp={myWeather.temp}
// conditions={weatherConditions.description}
// clouds={myWeather.clouds}
// dewPoint={myWeather.dewpt}
// windSpeed={myWeather.wind_spd}
// windDir={myWeather.wind_cdir}

export default Header;

