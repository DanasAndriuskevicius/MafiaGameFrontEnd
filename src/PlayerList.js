import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import './PlayerList.css';


function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/players/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPlayers(data);
                setIsLoading(false);
                
            })
            .catch(error => console.error('Error fetching players:', error));
    }, []);

    async function remove(id) {
        await fetch(`/players/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            let updatedPlayers = players.filter(player => player.id !== id);
            setPlayers(updatedPlayers);
        })
        .catch(error => console.error('Error removing player:', error));
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const playerList = players.map(player => (
        <tr key={player.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{player.name}</td>
            <td>{player.gameRole}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={`/players/${player.id}`}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(player.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

    return (
        <div className="player-list-container">
            <AppNavbar />
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/players/new">Add Player</Button>
                </div>
                <h3>Players</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Game role</th>
                            <th width="40%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerList}
                    </tbody>
                </Table>
                <div className="player-cards">
                    {players.map(player => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </Container>
        </div>
    );
    
}

export default PlayerList;
