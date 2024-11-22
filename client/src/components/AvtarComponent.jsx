import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

const AvtarComponent = ({userId,name,imgUrl,width,height}) => {
    let avtarText ="";
    const bgColor =[
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-blue-200'
    ]
    let randomNumber = Math.round(Math.random()*5);
    if(name){
        const splitName = name?.split(" ");
        console.log(splitName);
        if(splitName.length>1){
            avtarText = splitName[0][0]+splitName[splitName.length-1][0];
        }
        else{
            avtarText =splitName[0][0];
        }
    }
  return (
    <div className='text-slate-800 overflow-hidden rounded-full shadow border text-3xl' style={{width:width+"px", height: height+"px"}}>
        {
            imgUrl ?(
                <img src={imgUrl}
                      width={width}
                      height={height}
                      alt={name}
                      className='overflow-hidden rounded-full'/>
            ) :
                name ? (
                    <div style={{width:width+"px", height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center font-bold ${bgColor[randomNumber]}`}>
                        {avtarText.toUpperCase()}
                    </div>
                ):(
                   
                    <FaRegCircleUser size={width} />
               
            )
                
            

        }
      
    </div>
  )
}

export default AvtarComponent
