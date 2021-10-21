//Componente donde confluye la información del artista y la canción
import Message from "./Message";
import SongDetailsArtist from "./SongDetailsArtist";
import SongDetailsLyric from "./SongDetailsLyric";

const SongDetails = ( { search, lyric, bio } )=> {

    if( !lyric || !bio ) return null;

    return(
        <>
            {/* 'err' se refiere al nuestro error programado en helpHttp en Promise.reject y 'error' es lanzado desde la API lyrics.ovh */}
            {lyric.error || lyric.err || lyric.name === "AbortError" ? (
            <Message 
            msg= {`Error: No existe la canción '${search.song}'`} 
            bgColor= "#dc3545"
            /> ) : (
            <SongDetailsLyric title={search.song} lyrics={lyric.lyrics}/>
            )}

            {bio.artists ? (
            <SongDetailsArtist artist={bio.artists[0]}
            />) : (
            <Message
            msg= {`Error: No existe el intérprete '${search.artist}'`} 
            bgColor= "#dc3545"/>
            )}   
        </>
    )
};

export default SongDetails