import React, {useState, useEffect} from "react";
import '../Styles/header.css'
import key from "../key";
import WeatherConditions from "./WeatherConditions";
import 'animate.css/animate.min.css'

const WeatherLocations = () => {
    const [otherWeather, setOtherWeather] = useState({});
    const [otherWeatherConditions, setOtherWeatherConditions] = useState({});
    const [location, setLocation] = useState([]);
    const [infoAvailable, setInfoAvailable] = useState(false);
    const [animate, setAnimate] = useState('');
    const degrees = '\u00b0';

    // useEffect(()=> {
    //     if (infoAvailable === true) {
    //         setAnimate('container animated bounceInLeft');
            // const ID = setTimeout(() => {
            //     setAnimate('container');
            // }, 10000);
            // return () => {clearTimeout(ID)}

    //     }
    // }, [otherWeather]);


    const weatherLocation = (e) => {
        const cityState = e.target.value;
        const locationArray = cityState.split(',');
        setLocation(locationArray)
    };

    const getTheWeather = () => {
        setAnimate('container');
        fetch("https://api.weatherbit.io/v2.0/current?city=" + location[0] + "," + location[1] + "&key=" + key + "&units=I")
            .then(res => res.json())
            .then(response => {
                setOtherWeather(response.data[0]);
                setOtherWeatherConditions(response.data[0].weather);
                setLocation([]);
                setAnimate('container animated bounceInLeft');
                setInfoAvailable(true);
                // setTimeout(() => {
                //     setAnimate('container');
                // }, 3000)
            })

            .catch(err => {
                console.log(err);
                alert('Location is not correct or city and state are not separated with a comma')
            });

    };
    return (
        <div>
            <h2>Enter a city and state to check the weather in another area</h2>
            <input
                onChange={weatherLocation}
                name="location"
                value={location}
                placeholder="New York, NY"
                autoComplete="off"
                onSubmit={getTheWeather}
            />
            <button
                onClick={getTheWeather}
                type="submit"
            >Submit
            </button>

            {infoAvailable && <div className={animate}>
                <h1>Current Weather in {otherWeather.city_name}, {otherWeather.state_code}</h1>
                <hr/>
                <div className="flex-container">
                    <WeatherConditions
                        title="Current Temp"
                        item={otherWeather.temp + degrees +' F'}
                    />
                    <WeatherConditions
                        title="Current Conditions"
                        item={otherWeatherConditions.description}
                    />
                    <WeatherConditions
                        title="Cloud Cover"
                        item={otherWeather.clouds + '%'}
                    />
                    <WeatherConditions
                        title="Dew Point"
                        item={otherWeather.dewpt}
                    />
                    <WeatherConditions
                        title="Wind"
                        item={otherWeather.wind_spd + 'MPH ' + otherWeather.wind_cdir}
                    />
                </div>
            </div>}
        </div>
            )
            };

            export default WeatherLocations;