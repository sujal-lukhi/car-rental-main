import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === "left" && " md:items-start md:text-left"}`}>
      <h1 className='font-bold text-4xl md:text-[40px] text-white tracking-tight pb-2'>{title}</h1>
      <p className='text-sm md:text-base text-gray-400 mt-1 max-w-156'>{subTitle}</p>
    </div>
  )
}

export default Title
