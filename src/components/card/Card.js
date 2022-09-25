import { div } from '@tensorflow/tfjs'
import React from 'react'
import "./Card.css"

function Card(props) {
    return(
        <div className='card'>
            <p className='card-numero'>{props.numero}</p>
            <p className='card-texto'>{props.texto}</p>
        </div>
    )
}

export default Card;