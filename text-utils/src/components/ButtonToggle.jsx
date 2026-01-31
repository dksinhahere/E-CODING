import { useState } from "react"

function ButtonToggle(props)
{
    
    return (
        <button onClick={props.data.click} className={"flex relative top-24 left-20 bg-black text-white p-2 rounded border-4 border-solid border-blue-500"}>{props.data.text}</button>
    )
}

export {ButtonToggle}