import React from 'react' 
export default function Btn ({ text, viewAll = false, bgColor, roundednone=false, onClick,disabled=false}){
  return (
   <>
   <div className={`${viewAll ? 'sm:hidden block' : 'block'} 
   ${bgColor ?'bg-secondaryColor text-white ':'bg-white text-secondaryColor'} 
   ${roundednone ? '': 'rounded-[4px]'}
   ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-1 cursor-pointer'} 
   px-4 py-2 text-center border-secondaryColor 
   font-semibold border-[1px] cursor-pointer`} 

   onClick={!disabled ? onClick : undefined} disabled>

        {text}
      </div> 
   </>
  )
}
