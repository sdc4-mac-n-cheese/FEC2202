import React from 'react'
import OutfitCSS from '../cssModules/Outfit.module.css'

function Outfitcard(props) {
  return (
      
      <div className={OutfitCSS.card}>
      <button className={OutfitCSS.outfitcardbutton}>&#8854;</button>
      <br/>
      <h2>{props.item.name}</h2>
      <p>{props.item.category}</p>
      <h2>review star placeholder</h2>
      <h3>{props.item.default_price}</h3>
      <img src={props.item.image}></img>
      </div>
    

  )
}

export default Outfitcard