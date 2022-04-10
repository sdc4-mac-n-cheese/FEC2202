import React from "react";



// use commented lines bellow and put it under your page where you need to generage the star review.
//set a average state with zero and with useEffect to update the average rating
//-------------------------->
// useEffect(()=>{
//     axios
//       .get('/reviews/meta',{params: { product_id:/*the productid num that you need for star review*/}})
//       .then((res)=>{
//         let average=0
//         if(!res.data.ratings){
//           setAveragescore(0)
//         } else {
//           let counter=0
//           let sumscore=0
//           for (const[star,num] of Object.entries(res.data.ratings)){
//               counter+=Number(num)
//               sumscore+=Number(star)* Number(num)
//           }
//           //console.log("counter,sumscore",counter,sumscore)
//        average=sumscore/counter
//        /*set your state with this average virable. eg--->setAveragescore(average)*/
//         }
  
//       })
//       .catch(err=>{console.log(err)})
//   },[])
//   //console.log("averagescore>>>>",averagescore)
//     const handledelete =()=>{
//       let collection=JSON.parse(localStorage.getItem("collection"))
//       // console.log("getting inforamtion from localstorage>>>>",collection)
//       // console.log(props.item.id)
//       let newcollection =collection.filter((collectitem)=>(props.item.id !== collectitem.id))
//       //console.log("after filter collection",newcollection)
//       localStorage.setItem("collection",JSON.stringify(newcollection))
//       props.handleUpdate()
//         }
//----------end of updating average rating---------------

//the function below is for you to call from your file. simply import this page. eg:--->import { starReview } from '../functions.jsx';

//note:
//first arg:idNum is the product Number that you need to generate star reviews on
//second arg: cssSheetName. Style the stars with your csssheet(margin, padding...)  eg:---> RelatedItemsCSS
//(optional)third arg: the size of the stars that you want. I used the normal size, so didnt supply this arg (sizes can be " fa-lg" or" fa-2x"--- " fa-5x")
  
export function starReview(averagescore, cssSheetName,size){
    
    //console.log("counter,sumscore",counter,sumscore)

        if (averagescore===5){
            return (<div className={cssSheetName.starreview}>
                <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/>
                </div>
            )} else if (averagescore>4.5){
                return (<div className={cssSheetName.starreview}>
                     <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-half-o" aria-hidden="true"/>
                    </div>)
            } else if(averagescore>4){
                return (<div className={cssSheetName.starreview}>
                    <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                    </div>)
            } else if(averagescore>3.5){
                return (
                    (<div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-half-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
                )
            } else if (averagescore>3){
                return (
                    (<div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
                )
            } else if (averagescore>2.5){
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-half-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } else if (averagescore>2){
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } else if (averagescore>1.5){
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-half-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } else if (averagescore >1){
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } else if (averagescore>0.5){
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star-half-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } else {
                return (
                    <div className={cssSheetName.starreview}>
                        <i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/><i className="fa fa-star-o" aria-hidden="true"/>
                        </div>)
            } 
    


}