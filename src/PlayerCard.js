import { useState } from 'react';
import './PlayerCard.css';
import config from './config';



function PlayerCard({ player}) {

    return (
      <div className="player-card">
        <img src={config + player.imageUrl} alt={player.name} />
        <h3 >{player.name}</h3>
        <p >{player.gameRole}</p>
      </div>
    );
}


  export default PlayerCard;