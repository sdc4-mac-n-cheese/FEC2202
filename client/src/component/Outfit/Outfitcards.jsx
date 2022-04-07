
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


useEffect(()=>{
  
  localStorage.setItem("collection",JSON.stringify(fakelocalstoragedata))
  console.log("localStorage>>>>",localStorage)
  console.log("collection>>>>",collection)
},[collection])


  return (
    <>
    <h1>My Collection</h1>
    <div className={OutfitCSS.container}>
    <div className={OutfitCSS.card}>
      <h1 className={OutfitCSS.text}>Add this outfit to your collection</h1>
      </div>
    {collection.map((item)=>{
      return <Outfitcard key={item.id} item={item} />
    }) }
    </div>
    </>
  )
}

export default Outfitcards