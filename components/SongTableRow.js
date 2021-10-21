//Abstraer la lógica de la fila de la Tabla SongTable y re-direccionar
import React from "react";
import { useHistory } from "react-router";

const SongTableRow = ( {el, id, handleDeleteSong} ) => {

    let { bio, search } = el;
    let avatar = bio.artists[0].strArtistThumb;
    let avatarStyles = {
        width: "auto",
        height: "40px"
    };

     let history = useHistory();
    return(
        <tr>
           <td><img style={avatarStyles} src={avatar} alt={search.artist} /></td>
           <td>{search.artist}</td>
           <td>{search.song}</td>

           <button onClick={ ()=> history.push(`/${id}`) }>Ver</button>
           <button onClick={ ()=> handleDeleteSong(id)}>Eliminar</button>
        </tr>
    )
};

export default SongTableRow