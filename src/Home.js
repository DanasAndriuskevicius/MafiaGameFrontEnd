import React, { useState, useEffect } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import io from 'socket.io-client';

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

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    const sendMessage = () => {
        if (currentMessage.trim() === '') return;

        if (socket) {
            socket.emit('message', currentMessage);
            setCurrentMessage('');
        }
    };

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
                <Link className="admin-desk-link" to="/players">Admin Desk</Link>
            </Container>

            <div className="App">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Home;


//old code
/*import React, { useState, useEffect } from 'react';
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
                <Button color="link"><Link to="/players">Admin Desk</Link></Button>
            </Container>
        </div>
    );
}

export default Home;*/
