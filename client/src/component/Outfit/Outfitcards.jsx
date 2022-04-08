
// class Outfitcards extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="outfitcards">
//         <h1>Outfitcards</h1>
//       </div>
//     );
//   }
// }

let fakelocalstoragedata=[{
  "id": 65637,
    "name": "Blues Suede Shoes",
    "category": "Dress Shoes",
    "default_price": "120.00",
    "image":"https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
},
{"id": 65644,
"name": "Greg Sweatpants",
"category": "Sweatpants",
"default_price": "599.00",
"image":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
}
]

import React,{ useState, useEffect } from 'react'
import OutfitCSS from '../cssModules/Outfit.module.css'
import Outfitcard from './Outfitcard.jsx'
import PropTypes from 'prop-types'

function Outfitcards(props) {
const [collection,setCollection]=useState(()=>{
  let saved=localStorage.getItem("collection");
  let initialValue=JSON.parse(saved);
  return initialValue || [];
})

console.log(localStorage)
//populate the state from local storage
//onclick, collect the prop data(item name, price, review )
//to save it to the storage

let handleAdd = ()=>{
  let newAdd = {}
  newAdd.id=props.currProductData.id;
  let collection=localStorage.getItem("collection");
  if (collection.indexOf(`"id":${newAdd.id}`)===-1) {
    //console.log("collectionindexof>>>>",collection.indexOf(`"id":${newAdd.id}`))
  newAdd.name=props.currProductData.name;
  newAdd.category=props.currProductData.category
  newAdd.default_price=props.currStyle.original_price;
  newAdd.image=props.currStyle.photos[0].thumbnail_url || "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg"
  collection=JSON.parse(collection)
  collection.push(newAdd)
  localStorage.setItem("collection",JSON.stringify(collection))
  setCollection(collection)
  return;
  } 
}

let handleUpdate =()=>{
  let collection=JSON.parse(localStorage.getItem("collection"));
  setCollection(collection)
}
useEffect(()=>{
  
let collection=JSON.parse(localStorage.getItem("collection"))
  // console.log("localStorage>>>>",localStorage)
  // console.log("collection>>>>",collection)
  setCollection(collection)
},[])


  return (
    <>
    <h1>My Collection</h1>
    <div className={OutfitCSS.container}>
    <div className={OutfitCSS.card}>
      <h1 className={OutfitCSS.text} onClick={handleAdd}>Add this outfit to your collection</h1>
      </div>
    { collection? collection.map((item)=><Outfitcard key={item.id} item={item} handleUpdate={handleUpdate}/>) : ""
    }
    </div>
    </>
  )
}

Outfitcards.propTypes = {
  currStyle: PropTypes.object,
  currentProduct:PropTypes.number,
  currProductData:PropTypes.object

 
  
};


export default Outfitcards