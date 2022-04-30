import React, { Component } from "react";
import axios from "axios";
import Match from "./components/matches";
import Teams from "./components/teams";
import Leagues from "./components/leagues";
import OddsTable from "./components/oddsTable";
import Title from "./components/title";
import Spinner from "./components/spinner";

class App extends Component {
  state = {
    matchData: {},
    teamData: {},
    compData: {},
    leagueSelected: "",
    oddsBuilder: [],
    total: 1,
  };
  apiKey =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MTk2MTM0NzIxOSwiaWF0IjoxNjQ1OTg3MjE5LCJqdGkiOiIzYTRjYzY4Zi01YjhlLTQ4NTEtYTQ0Zi02MDBkZDQwMjg2MzciLCJzdWIiOiJhM2ZhZjliZC04MTFiLTQ5ODctOWJmYy1lMWNkNzdkYjRkMTQiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiJhM2ZhZjliZC04MTFiLTQ5ODctOWJmYy1lMWNkNzdkYjRkMTQifQ.YIElp9ZF63geBxIm0teeoR7xSVLknzKYkH_kTzEmeaciG5oBQcbNXDW6twQRLo1qMqy7jtdvhO4pJ2hVeZmmQ4OeIg6XWqL_jr6XrxMvrvHqhWd8ZWB96s_6LXOAn65_U7aS51CB-mODOsl63kjRIGBkjQ-x10B8lQty0jeNASEsuCl7mjJVXfenh8aut_6E9eYBBqYPxVL_9KRIzTlq63OcicBAMqUF1uHEkbZxOGCRZnW7bSCJHy-lj3m377L1TaA-57XNm0R9kNeI6t9mv10JDCMALM1tTY3acPKVE55UQAmKtOCKLU_VU2JgH8E1VAqhCzExcC4yRcFd9KieoQ";
  apiBaseUrl = "https://sports-api.cloudbet.com";
  soccer = "soccer.match_odds";
  period = "period=ft";

  teamSelected = (team) => {
    this.setState({
      teamData: this.state.matchData.data.events.filter(function (event) {
        const soccer = "soccer.match_odds";
        return event.name.indexOf(team) > -1 && event.markets[soccer];
      }),
    });
  };

  leagueSelected = (league) => {
    this.cloudbetComp(league);
  };

  async cloudbetComp(league) {
    try {
      const result = await axios.get(
        "https://sports-api.cloudbet.com/pub/v2/odds/competitions/" + league,
        {
          headers: {
            "X-API-Key": this.apiKey,
          },
        }
      );
      this.setState({ matchData: result });
      // get rid of apiData event that doesn't contain a match and list all teams that have a match
      const chosenTeams = result.data.events.flatMap((element) => {
        if (element.home != null) return [element.home.name, element.away.name];
        else return console.log(element.key + " error");
      });
      // get rid of duplicate teams and teams that are undefined from the apiData
      const allTeams = [...new Set(chosenTeams)]
        .filter((element) => element !== undefined)
        .sort();
      this.setState({ compData: allTeams });
    } catch (error) {
      console.log(error);
    }
  }

  addToOdds = (team, odds, matchName) => {
    const newOdds = this.state.oddsBuilder;
    this.setState({ oddsBuilder: [...newOdds, { team, odds, matchName }] });
    this.addToTotal(odds);
  };

  addToTotal = (number) => {
    const newTotal = number * this.state.total;
    this.setState({ total: newTotal });
  };

  clearOdds = () => {
    this.setState({ oddsBuilder: [], total: 1 });
  };

  removeMatch = (removed) => {
    console.log('remove match ran')
    const revised = this.state.oddsBuilder.filter(element => element.matchName !== removed)
    console.log(revised)
    this.setState({ oddsBuilder: revised})
    console.log(this.state.oddsBuilder)
  }

  render() {
    const { compData, teamData, oddsBuilder } = this.state;

    return (
      <>
        <Title />
        <div>
          <Leagues getLeague={this.leagueSelected} />
        </div>
        <div>
          {compData.length > 0 ? (
            <Teams getTeam={this.teamSelected} compData={compData} />
          ) : (
            <Spinner data={"League"}/> 
          )}
        </div>
        {teamData.length > 0 ?
          teamData.map((element) => {
            this.odds =
              element.markets[this.soccer].submarkets[this.period].selections;
            return (
              <Match
                key={element.name}
                homeName={element.home.name}
                awayName={element.away.name}
                matchName={element.name}
                date={element.cutoffTime}
                homeOdds={this.odds[0].price}
                drawOdds={this.odds[1].price}
                awayOdds={this.odds[2].price}
                addToOdds={this.addToOdds}
                oddsBuilder={oddsBuilder}
              />
            );
          }) : compData.length > 0 ? (
            <Spinner data={"Team"}/> 
          ) : (
            <>
            </>
          )}
        {oddsBuilder.length > 0 ? (
          <OddsTable
            oddsBuilder={oddsBuilder}
            total={this.state.total}
            clearOdds={this.clearOdds}
            removeMatch={this.removeMatch}
          />
        ) : teamData.length > 0 ? (
          <Spinner /> 
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
