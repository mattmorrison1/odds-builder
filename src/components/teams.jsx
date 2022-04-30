import React, { Component } from 'react';
import './teams.css';

class Team extends Component {

    render() { 

        const { compData, getTeam } = this.props

        return (
           <div>
                <div className="header">
                    <p>Teams</p>
                </div>
                <div className="scrollWrap">
                    {compData.map(element => {
                        return (<div className="teams" key={element} onClick={() => { getTeam(element) }}>{element}</div>)
                    })}
                </div>
           </div>
        );
    }
}
 
export default Team;