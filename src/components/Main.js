import React from 'react'
import Card from './Card'
import cardData from './cardData'

const Main = (props) => {

    const titleData = cardData.map(items => {
        return (

            <Card
                key={items.id}
                items={items}
            />

        )
    })


    return (

        <div
            className='main--content '>
            {titleData}
        </div>



    )
}

export default Main

