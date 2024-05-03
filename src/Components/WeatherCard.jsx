import "./Weather.css"

const WeatherCard = ({ title, value }) => {
    return (
      <div className="weather-card">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    );
  };
  
  export default WeatherCard;