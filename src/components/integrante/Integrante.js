import React from 'react'
import "./Integrante.css"

function Integrante (props) {
    return (
        <div className='integrante'>
            <img className='foto-integrante' src={props.membro}></img>
            <p className='nome-integrante'>{props.nome}</p>
            <p className='descrição-integrante'>{props.descricao}</p>
        </div>
    )
}

export default Integrante