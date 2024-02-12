import React from 'react'
import '../App.css'
import Content from './cardContent'
import colorData from './colorData'

const Card = (props) => {

    // const imageData = colorData.map(items => {
    //     return (
    //         <Content
    //             key={items.id}
    //             items={items}
    //         />
    //     )
    // })
    return (
        <>
            <div className='card'>
                <div className='card--header'>
                    <p>{props.items.title}</p>
                </div>
                {/* 
                <div className='card--content--grid'>
                    {imageData}
                </div> */}
            </div>


        </>

    )
}

export default Card