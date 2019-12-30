import React from "react";

const WeatherConditions = (props) => {
    return (
                <div className="data">
                    <h2>{props.title}</h2><br />
                    <h3>{props.item}</h3>
                    <h3>{props.item2}</h3>
                    <h3>{props.item3}</h3>
                </div>
    )
};

export default WeatherConditions;