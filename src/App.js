import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  add,
  totalNumOfHost,
  decimalToBinary,
  binaryToDecimal,
  convertToSubnet,
  numOfUsableHosts,
  convertToIpv4,
  ipv4ToBinary,
  broadCastAddress,
  wildCardConverter,
  binarySubnetMask,
  ipClass,
  decimalToHex,
  reverseIpv4,
  networkAddress,
  splitClass
} from './utils/helper';

class App extends Component {
  state = {
    subnetList: splitClass("Any"),
    subnetBit: 32,
    checked: false,
    ipAddress: "0.0.0.0",
    subnetIpv4: "255.255.255.255",

  }

  handleInput = e => {
    console.log(e.target.value)
    this.setState({
      ipAddress: e.target.value,
    })
  }

  handleDropdown = e => {
    var temp = e.target.value.split(',')
    console.log(temp)
    // console.log(e.target.value)
    this.setState({
      subnetIpv4: temp[0],
      subnetBit: parseInt(temp[1]),
    })
  }

  handleRadioButton = e => {
    console.log(e.target.value)
    console.log(splitClass(e.target.value))
    this.setState({
      subnetClass: e.target.value,
      subnetList: splitClass(e.target.value),
    })
  }

  handleCalButton = e => {
    // console.log(this.state.subnetBit)
    console.log(binarySubnetMask(this.state.subnetBit))
    this.setState({
      checked: true,
      showIP: this.state.ipAddress,
      binarySubnet: binarySubnetMask(this.state.subnetBit),
      broadCast: broadCastAddress(this.state.subnetBit, this.state.ipAddress),
      totalNumHost: totalNumOfHost(this.state.subnetBit),
      numUsableHost: numOfUsableHosts(this.state.subnetBit),
      networkAdd: networkAddress(this.state.subnetIpv4, this.state.ipAddress)

    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1 className="App-title">IP Subnet Calculator</h1> */}
          <h1 className="App-title">IP Subnet Calculator</h1>
        </header>

        <div className="radio-group">
          <label> 
            <input type="radio" name="subclass" value="Any" onChange={this.handleRadioButton}/>
            Any
          </label>
          <label>
            <input type="radio" name="subclass" value="A" onChange={this.handleRadioButton}/>
            A
          </label>
          <label>
            <input type="radio" name="subclass" value="B" onChange={this.handleRadioButton}/>
            B
          </label>
          <label>
            <input type="radio" name="subclass" value="C" onChange={this.handleRadioButton}/>
            C
          </label>    
        </div>

        <div className="dropDown">
          <select onChange={this.handleDropdown}>
            {
              this.state.subnetList.map((element, i) => 
                <option value={[element, 32 - i]}>{element += ' / ' + (32 - i).toString() }</option>
            )}
          </select>
        </div>

        <div className="inputIP">
            <label>
              IP Address
            </label>
            <input type="text" class="form-control" onChange={this.handleInput}/>
        </div>

        <div className="button calculate">
            <button type="button" class="btn btn-primary" onClick={this.handleCalButton}>Calculate</button>
        </div>
        
        {
          this.state.checked &&
        <table class="table">
            <tbody>
              <tr>
                  <td>IP Address</td>
                  <td>{this.state.showIP}</td>
              </tr>
              <tr>
                <td>Network Address</td>
                <td>{this.state.networkAdd}</td>
              </tr>
              <tr>
                <td>Binary Subnet Mask</td>
                <td>{this.state.binarySubnet}</td>
              </tr>
              <tr>
                <td>Broadcast Address</td>
                <td>{this.state.broadCast}</td>
              </tr>
              <tr>
                <td>Total Number of Hosts</td>
                <td>{this.state.totalNumHost}</td>
              </tr>
              <tr>
                <td>Number of Usable Hosts</td>
                <td>{this.state.numUsableHost}</td>
              </tr>
              
            </tbody>
        </table>
        }
      </div>
    );
  }
}

export default App;
