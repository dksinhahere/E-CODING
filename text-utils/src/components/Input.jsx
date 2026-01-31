import { useState } from "react"

function Input() {

    const [text, setText] = useState("")

    const UpperCase=()=> {
        setText((text) => text.toUpperCase())
    }

    const LowerCase=()=> {
        setText((text) => text.toLowerCase())
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto mt-24">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 border-4 border-solid border-blue-500 p-2" />

        <div className="flex gap-4">
            <button onClick={UpperCase} className="border-4 border-solid border-blue-500 px-4 py-2 bg-gray-400">
            UpperCase
            </button>

            <button onClick={LowerCase} className="border-4 border-solid border-blue-500 px-4 py-2 bg-gray-400">
            LowerCase
            </button>
        </div>
        </div>
    )
}

export { Input }
