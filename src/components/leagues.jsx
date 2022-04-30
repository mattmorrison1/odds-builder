import React, { Component } from 'react';
import './leagues.css';

class Leagues extends Component {
    state = { leagues: [
            {
                name:"Premier League",
                key:"soccer-england-premier-league",
            },
            {
                name:"Championship",
                key:"soccer-england-championship"
            },
            {
                name:"League One",
                key:"soccer-england-league-one"

            },{
                name:"League Two",
                key:"soccer-england-league-two"
            },
            {
                name:"National League",
                key:"soccer-england-national-league" 
            }]
        }

    render() { 
        return (
        <div>  
            <div className="header">
                <p>Leagues</p>
            </div>
            <div className="scrollWrap">
                {this.state.leagues.map(element => {
                    return (<div className="leagues" key={element.name} onClick={() => { this.props.getLeague(element.key) }}>{element.name}</div>)
                })}
            </div>
        </div>
        );
    }
}
 
export default Leagues;