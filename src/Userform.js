import React from 'react';
//import logo from './logo.svg';

//function Userform() {
class Userform extends React.Component {

  constructor(props) {
    super(props);
    this.state        = { numberofcoords: 0 } ;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var numberEle = document.getElementById("numberInput")
    console.log("numberEle " +  numberEle.value);
    this.setState({ numberofcoords: numberEle.value });
  }

  render() {
    return (
      <div>
        <form id = "randomCoors">
          <div className="form-group">
            <label for="exampleInputEmail1">How many points would you like to look up? (1-20)</label>
            <input type="Number" className="form-control" id="numberInput" aria-describedby="numberInput" placeholder="Enter a Number" required/>
            <small id="emailHelp" className="form-text text-muted">Points will be randomly generated and showed on the map</small>
            <div id="numberofcoords" numberofcoords={this.state.numberofcoords}></div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={ this.handleChange }>Get Weather</button>
        </form>
        <br />
      </div>
    );
  }
}

export default Userform;
