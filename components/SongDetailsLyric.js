//Información de la canción
const SongDetailsLyric = ( { title, lyrics } )=> {

    return(
        <section>
            <h3>{title}</h3>
            <blockquote style={{whiteSpace: "pre-wrap"}}>{lyrics}</blockquote>
        </section>
    )
};


export default SongDetailsLyric
