import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "./styles.css";
import Nav from "./Nav";
import Search from "./search";
import Repositories from "./repositories";
import { getRepositories, createRepository, destroyRepository } from "../../services/api";


const MainPage = () => {
    
    const { user, logout } = useContext(AuthContext);
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);


    const loadData = async (query = '') => {
        try {
            setLoading(true);
            const response = await getRepositories(user?.id, query);
            console.log(response.data);
            setRepositories(response.data) 
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoadingError(true);
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, []);
    
    const handleLogout = () => {
        console.log("Logout");
        logout();
    }

    const handleSearch = (query) => {
        loadData(query);
    }

    const handleDeleteRepo = async (repository) => {
        console.log("delete repo", repository);
        await destroyRepository(user?.id, repositories._id);
        await loadData();
    
    }

    const handleNewRepo = async (url) => {
        console.log("new repo", url);
        try {
            await createRepository(user?.id, url);
            await loadData();
        } catch (err) {
            console.error(err);
            // setLoadingError(true);
        }
    }

    if (loadingError) {
        return ( 
                <div className="loading">
                Error loading repositories. <link to="/login">Return</link>
                </div>
        )   
    }

    if (loading) {
        return (
                <div className="loading">
                Loading...
               </div>
        )
    }


    return (
        <div id="main">
            <Nav onLogout={handleLogout} />
            <Search onSearch={handleSearch} />
            {/* <p>Welcome {user.name}!</p> */}
            <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleNewRepo} />
        </div>
    )
}

export default MainPage;