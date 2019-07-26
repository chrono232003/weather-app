import React from 'react';
import './App.css';
import GetCoordinates from './GetCoordinates.js'
import MapGL, {Marker} from 'react-map-gl';

const mapToken = 'pk.eyJ1IjoiY2hyb25vMjMyMDAzIiwiYSI6ImNqeWhoZjRuMTBieDAzbWsyeGwzMDdoajkifQ.AqMffzfdiguijdg4waFbsQ';

class UI extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
          numberOfCoords: 0,
          promiseIsResolved: false,
          width: 800,
          height: 700,
          coordinates: []
        }

        this.handleChange = this.handleChange.bind(this);
      };

      handleChange(event) {
        var numberEle = document.getElementById("numberInput")

        //validate the input from the user
        if (numberEle.value < 1 || numberEle.value > 20) {
          this.setState({
            inputValid: false,
            numberofcoords: numberEle.value,
            promiseIsResolved: false
          });
        } else {
          this.setState({
            inputValid: true,
            numberofcoords: numberEle.value,
            promiseIsResolved: false
          });
        }
      }

      async componentDidUpdate() {

        if (this.state.promiseIsResolved === false) {
            console.log("this is the number of coord to loop: " + this.state.numberofcoords)


            var coordinatesClassInstance = new GetCoordinates();
            var coordinateList = coordinatesClassInstance.getRandomLatLongCoords(this.state.numberofcoords);
            console.log("this is the coord list: " + coordinateList)
            console.log("this is the coord list length: " + coordinateList.length)
            var coordArr = [];


            if (coordinateList.length > 0) {
            for (var i=0; i < coordinateList.length; i++) {
              var lat = coordinateList[i][0];
              var long = coordinateList[i][1]
              await fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&appid=3ec059ce7ec49481a8fdc9217305b06a")
              .then(res => res.json())
              .then((data) => {
                var coord = {};
                coord.cityName = (data.name !== "") ? data.name : "(Unknown Location)";
                coord.weatherDescription = data.weather[0].description;
                coord.temp = data.main.temp.toFixed(0);
                coord.pressure = data.main.pressure;
                coord.humidity = data.main.humidity;
                coord.windSpeed = data.wind.speed;
                coord.latitude = data.coord.lat;
                coord.longitude = data.coord.lon;
                coordArr.push(coord);
              })

              .catch(err => console.log("we have an error: ", err))
            }

            this.setState({
                  coordinates: coordinateList,
                  coordinateMap: coordArr,
                 promiseIsResolved:true
              })
          }
        }
      }

    componentDidMount() {

      this.setState({
          coordinateMap: [],
          promiseIsResolved:true
        })
    }

  render() {

    var state = this.state;
    var markerPositionAdjust = {
      position: 'relative',
      top: '-10px'
    };
    var numberOfCoords = state.numberofcoords
    if (!state.inputValid) {
      return (<div className="header">
                <center><h3>Weather Around The Globe</h3></center>
                <br/>
                <form id = "randomCoors" className="form">
                  <div className="form-group">
                    <label for="exampleInputEmail1">How many points would you like to look up? (1-20)</label>
                    <input type="Number" className="form-control" id="numberInput" aria-describedby="numberInput" placeholder="Enter a Number" min="1" max="20" required/>
                    <small id="emailHelp" className="form-text text-muted">Points will be randomly generated and showed on the map</small>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={ this.handleChange }>Get Weather</button>
                </form>
                <br />
              </div>)
    }
    if(state.promiseIsResolved) {
    return(
        <div>
        <div className="header">
          <center><h3>Weather Around The Globe</h3></center>
          <br/>
          <form id = "randomCoors" className="form">
            <div className="form-group">
              <label for="exampleInputEmail1">How many points would you like to look up? (1-20)</label>
              <input type="Number" className="form-control" id="numberInput" aria-describedby="numberInput" placeholder="Enter a Number" min="1" max="20" required/>
              <small id="emailHelp" className="form-text text-muted">Points will be randomly generated and showed on the map</small>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ this.handleChange }>Get Weather</button>
          </form>
          <br />
        </div>



      <div className="row">
      <div className="col-xl-8">
      <br />
    <MapGL
      width={state.width}
      height={state.height}
      zoom={0}
      mapboxApiAccessToken={mapToken}
      mapStyle={'mapbox://styles/mapbox/basic-v9'}>
      {state.coordinates.map(function(coord, index){
         return(<Marker latitude={coord[0]} longitude={coord[1]}>
          <p>{index + 1}</p>
          <img src='images/marker.png' width="20" height="30" style={markerPositionAdjust}/>
        </Marker>)
        })}
    </MapGL>
    </div>
       <div className="col-xl-4">
       <br/>
      {state.coordinateMap.map(function(coord, index){
          return(
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th colSpan="2"><center>{index + 1}. {coord.cityName}</center></th>
                </tr>
                <tr>
                  <td>Weather Description</td>
                  <td>{coord.weatherDescription}</td>
                </tr>
                <tr>
                  <td>Current Temp</td>
                  <td>{coord.temp} F</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{coord.pressure} hpa</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{coord.humidity} %</td>
                </tr>
                <tr>
                  <td>Wind Speed</td>
                  <td>{coord.windSpeed} m/s</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>{coord.latitude}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>{coord.longitude}</td>
                </tr>
              </tbody>
              <br />
            </table>)
          })}
          </div>
      </div>
      </div>
    )
  } else {
    return <center><h3>Fetching data...</h3></center>
  }
  }

}

export default UI;
