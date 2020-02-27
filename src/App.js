import React, {useEffect, useState} from 'react';

import './App.css';
import Community from "./components/Community";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const App = _ => {
    const [active, setActive] = useState(null);

    const [communities, setCommunities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const fetchCommunities = async _ => {
        const endpoint = process.env.REACT_APP_API || 'http://api.homeis.com/v1/communities';
        try {
            const list = await axios.get(endpoint);
            setCommunities(list.data.data);
        } catch (err) {
            setError(true);
        }

        setLoading(false);
    };

    const handleClick = id => {
        setActive(active !== id ? id : null);
    };

    useEffect(fetchCommunities, []);

    return (
        <Container>
            {loading ? <CircularProgress /> :
                error ? <Alert severity={'error'} >Failed to fetch data, try again</Alert> :
                communities.map(community => (
                    <Community
                        name={community.name}
                        tags={community.popularTags}
                        key={community.id}
                        active={community.id === active}
                        onChange={_ => handleClick(community.id)}
                    />
                    )
                )
            }
        </Container>
    )
};

export default App;
