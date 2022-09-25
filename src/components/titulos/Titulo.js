import React from 'react'
import "./Titulo.css"

function Titulo(props) {
    return (
        <p className='titulo'>{props.texto}</p>
    )
}

export default Titulo;