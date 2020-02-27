import React, {useEffect, useState} from 'react';

import './App.css';
import Community from "./components/Community";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";

const App = _ => {
    const [active, setActive] = useState(null);

    const [communities, setCommunities] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchCommunities = async _ => {
        const endpoint = process.env.REACT_APP_API || 'http://api.homeis.com/v1/communities';

        const list = await axios.get(endpoint);

        setCommunities(list.data.data);
        setLoading(false);
    };

    useEffect(fetchCommunities, []);

    return (
        <Container>
            {loading ? <CircularProgress /> :
                communities.map(community => (
                    <Community
                        name={community.name}
                        tags={community.popularTags}
                        key={community.id}
                        active={community.id === active}
                        onChange={_ => setActive(community.id)}
                    />
                    )
                )
            }
        </Container>
    )
};

export default App;
