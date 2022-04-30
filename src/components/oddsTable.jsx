import React, { Component } from "react";
import "./oddsTable.css";
import { FaRegTimesCircle } from "react-icons/fa";

class OddsTable extends Component {
  state = { total: 0, returns: 0, value: '' };

  constructor(props) {
    super(props);
    this.calcReturns = this.calcReturns.bind(this);
  }

  addToTotal = (number) => {
    const newTotal = number + this.state.total;
    this.setState({ total: newTotal });
  };

  calcReturns = (event) => {
    const newVal = event.target.value.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join(".");
    const winnings = newVal * this.props.total;
    this.setState({ value: newVal, returns: winnings  });
  };

  render() {
    const { oddsBuilder, total, clearOdds, removeMatch } = this.props;
    const { returns } = this.state;

    return (
      <>
        {oddsBuilder.map((element) => {
          return (
            <table className="oddsTab">
              <tbody>
                <tr>
                  <td style={{textAlign:"left"}}>{element.team}</td>
                  <td style={{textAlign:"right"}}>{element.odds.toFixed(2)} &nbsp;<FaRegTimesCircle style={{cursor:"pointer"}} onClick={() => removeMatch(element.matchName)}/></td>
                </tr>
                <tr>
                  <td style={{textAlign:"left", fontSize: "11px"}}>{element.matchName}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
        {total > 1 && (
          <>
            <table className="returnTab">
              <tbody>
                <tr>
                  <td style={{textAlign:"left"}}>{oddsBuilder.length} Selections</td>
                  <td><span style={{float:"left", marginTop: "18px"}}>@ {oddsBuilder.reduce(function(acc, curVal) { return acc * curVal.odds }, 1).toFixed(2)}</span> <span style={{float:"right"}}><input className="stake" placeholder="Enter Stake" type="number" min={0} onChange={this.calcReturns} value={this.state.value}></input></span></td>
                </tr>
                <tr>
                  <td style={{textAlign:"left"}}><button className="clear" onClick={() => clearOdds()}>Clear Odds</button></td>
                  <td><span style={{float:"left"}}>Returns: </span><span style={{float:"right", marginRight: "8px"}}>{returns > 0 && `£${returns.toFixed(2)}`}</span></td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </>
    );
  }
}

export default OddsTable;
