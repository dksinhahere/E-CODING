import { useState } from "react";

function Bulb()
{
    const [light, setLight] = useState(false)
    const [onOff, setOnOff] = useState("ON")

    const handleClick = () => {
        setLight(prev => !prev)
        if(onOff == "OFF") {
            setOnOff("ON")
        } else {
            setOnOff("OFF")
        }
    }

    return (
        <div className="flex flex-col relative top-20 justify-center items-center">
            <button onClick={() => handleClick()} className="bg-blue-800 text-white p-2">{onOff}</button>
            {light === true ? (
                <div className="size-50 relative top-10 rounded-full bg-yellow-400">
                    
                </div>
            ):(
                <div className="size-50 relative top-10 rounded-full border-5 border-solid border-black bg-black">
                </div>
            )}
        </div>
    )
}

export {Bulb}