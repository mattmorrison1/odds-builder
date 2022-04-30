import React, { Component } from "react";
import "./matches.css";

class Match extends Component {
  render() {
    const {
      date,
      homeOdds,
      awayOdds,
      drawOdds,
      homeName,
      awayName,
      matchName,
      oddsBuilder,
      addToOdds,
    } = this.props;

    return (
      <>
        <div className="date">
          <p>{date}</p>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  className={awayOdds > homeOdds ? "win" : "lose"}
                  onClick={() => {
                    addToOdds(homeName, homeOdds, matchName);
                  }}
                  disabled={oddsBuilder.some(
                    (element) => element.matchName === matchName
                  )}
                >
                  <div>{this.props.homeName}</div>
                  <div>{homeOdds.toFixed(2)}</div>
                </button>
              </td>
              <td>
                <button
                  className="draw"
                  onClick={() => {
                    addToOdds("Draw", drawOdds, matchName);
                  }}
                  disabled={oddsBuilder.some(
                    (element) => element.matchName === matchName
                  )}
                >
                  <div>Draw</div>
                  <div>{drawOdds.toFixed(2)}</div>
                </button>
              </td>
              <td>
                <button
                  className={awayOdds > homeOdds ? "lose" : "win"}
                  onClick={() => {
                    addToOdds(awayName, awayOdds, matchName);
                  }}
                  disabled={oddsBuilder.some(
                    (element) => element.matchName === matchName
                  )}
                >
                  <div>{awayName}</div>
                  <div>{awayOdds.toFixed(2)}</div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Match;
