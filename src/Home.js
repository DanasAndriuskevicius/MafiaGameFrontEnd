import React, { useState, useEffect } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';

function Home() {
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const playerList = players.map(player => (
        <tr key={player.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{player.name}</td>
        </tr>
    ));

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>Game Players</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerList}
                    </tbody>
                </Table>
                <Button color="link"><Link to="/players">Game Players Admin Desk</Link></Button>
            </Container>
        </div>
    );
}

export default Home;
