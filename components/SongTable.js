//Tabla que muestra la lista de canciones favoritas
import SongTableRow from "./SongTableRow";

const SongTable = ( { mySongs, handleDeleteSong } ) => {

    return(
        <div>
            <h3>Mis Canciones Favoritas</h3>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Artista</th>
                        <th>Canción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { mySongs.length > 0 ? (
                        mySongs.map( (el, index) => (
                        <SongTableRow 
                        key={index} 
                        el={el} 
                        id={index} //Lo usaremos como parámetro en la ruta "/canciones/:id"
                        handleDeleteSong={handleDeleteSong}
                        />
                        ))
                        ) : (
                        <tr><td colSpan="4"
                        >Sin canciones favoritas</td></tr>) }
                </tbody>
            </table>
        </div>
    )
};

export default SongTable