import React from 'react'
import OutfitCSS from '../cssModules/Outfit.module.css'
import PropTypes from 'prop-types'


function Outfitcard(props) {


  const handledelete =()=>{
    let collection=JSON.parse(localStorage.getItem("collection"))
    // console.log("getting inforamtion from localstorage>>>>",collection)
    // console.log(props.item.id)
    let newcollection =collection.filter((collectitem)=>(props.item.id !== collectitem.id))
    //console.log("after filter collection",newcollection)
    localStorage.setItem("collection",JSON.stringify(newcollection))
    props.handleUpdate()
      }



  return (
      
      <div className={OutfitCSS.card}>
      <div className={OutfitCSS.imageparent}>
      <button className={OutfitCSS.outfitcardbutton} onClick={handledelete}> <img src="./cross.png"/></button>
      <img className={OutfitCSS.image} src={props.item.image}></img>
      </div>
      <h3>{props.item.name}</h3>
      <p>{props.item.category}</p>
      <h2>review star placeholder</h2>
      <h3>{props.item.default_price}</h3>

      </div>
    

  )
}

Outfitcard.propTypes = {
  item: PropTypes.object,
  handleUpdate:PropTypes.func
  
};

export default Outfitcard