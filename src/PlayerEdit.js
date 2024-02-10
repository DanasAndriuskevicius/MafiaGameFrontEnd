import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function PlayerEdit(props) {
    const emptyItem = {
        name: '',
    };

    const [item, setItem] = useState(emptyItem);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchPlayer() {
            if (props.match.params.id !== 'new') {
                const response = await fetch(`/players/${props.match.params.id}`);
                const player = await response.json();
                setItem(player);
            }
        }
        fetchPlayer();
    }, [props.match.params.id]);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let newItem = { ...item };
        newItem[name] = value;
        setItem(newItem);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Patikriname, ar vartotojo įvesties laukas ne tuščias
        if (!item.name.trim()) {
            setError("Player name cannot be empty");
            return;
        }
        
        const method = item.id ? 'PUT' : 'POST';
        const url = item.id ? `/players/${item.id}` : '/players/';

        await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        props.history.push('/players/');
    };

    const title = <h2>{item.id ? 'Edit Player' : 'Add Player'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={item.name || ''}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Button color="primary" type="submit">
                            Save
                        </Button>{' '}
                        <Button color="secondary" tag={Link} to="/players/">
                            Cancel
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default withRouter(PlayerEdit);