//Componente principal
import React, { useState, useEffect } from "react";
import { HashRouter, Link, Switch, Route } from 'react-router-dom';
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import SongTable from "./SongTable";
import SongPage from "../pages/SongPage";

const SongSearch = ()=> {
    
    let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

    const [ search, setSearch ] = useState(null);
    const [ lyric, setLyric ] = useState(null);
    const [ bio, setBio ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ mySongs, setMySongs ] = useState(mySongsInit);

    useEffect( ()=> {
        if(search === null) return;

        const fetchData = async () => {
            const { artist, song } = search;
            
            let artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

            setLoading(true);

            const [ artistRes, songRes ] = await Promise.all([
                helpHttp().get(artistUrl),
                helpHttp().get(songUrl)
            ]);

            setBio(artistRes);
            setLyric(songRes);

            setLoading(false);
        }
        fetchData();

        localStorage.setItem("mySongs", JSON.stringify(mySongs));

        }, [search, mySongs]);

    const handleSearch = (data) => {
        setSearch(data);
    };

    const handleSaveSong = () => {
        alert("Salvando canción en favoritas");
        let currentSong = {
            search,
            lyric,
            bio
        };
        
        let songs = [...mySongs, currentSong];
        setMySongs(songs);
        setSearch(null);
        //Guardamos en localStorage la actualización actual.
        localStorage.setItem("mySongs", JSON.stringify(songs))
    };

    const handleDeleteSong = (id) => {
        let isDelete = window.confirm(`Eliminando canción con el id: ${id}`);
        if(isDelete) {
            let songs = mySongs.filter( (e, index)=> index !== id);
            setMySongs(songs);
            //Guardamos en localStorage la actualización actual.
            localStorage.setItem("mySongs", JSON.stringify(songs))
        }
    };

    return(
        <div>
            <HashRouter basename="canciones">
                
                <header>
                    <h2>SongSearch</h2>
                    <Link to="/">Home</Link>
                    <br/>
                    <br/>
                </header>

                {loading && <Loader/>}

                <article className="grid-1-2">
                    <Switch>
                        <Route exact path="/">
                            <SongForm 
                            handleSearch= {handleSearch} 
                            handleSaveSong={handleSaveSong}
                            />
                    
                            <SongTable 
                            mySongs={mySongs}
                            handleDeleteSong={handleDeleteSong}
                            />
                            
                            {search && !loading && (
                            <SongDetails 
                            search={search} 
                            lyric={lyric} 
                            bio={bio}
                            />)}
                        </Route>

                        <Route exact path="/:id" children={<SongPage mySongs={mySongs}/>}/>
                        
                        <Route path="*" children={<Error404/>}/>
                    </Switch>

                </article>
            </HashRouter>
        </div>
    )
};

export default SongSearch