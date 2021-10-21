//Formulario
import React, { useState } from "react";

const initialForm = {
    artist: "",
    song: ""
};

const SongForm = ({ handleSearch, handleSaveSong })=> {
    
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ form, setForm ] = useState(initialForm);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!form.artist || !form.song) {
            alert("Datos incompletos");
            //Cuando el formulario esté vacío
            setIsDisabled(true);
            return
        } 
        handleSearch(form);
        setForm(initialForm);
        //Actualizo para activar botón
        setIsDisabled(false);
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    name="artist" 
                    placeholder="Nombre del Intérprete" 
                    onChange={handleChange} 
                    value={form.artist}/>
                <input type="text" 
                    name="song" 
                    placeholder="Nombre de la Canción" 
                    onChange={handleChange} 
                    value={form.song}/>
                <input type="submit" 
                    value="Enviar"/>
                <input type="button" 
                    value="Agregar Canción"
                    onClick={handleSaveSong}
                    disabled={isDisabled && "disabled"}
                    />
            </form>
        </div>
    )
};


export default SongForm