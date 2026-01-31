function Main() {

    const [text, setText] = React.useState("")

    const handleUpperCase = () => {
        setText(text.toUpperCase())
    }
    const handleLowerCase = () => {
        setText(text.toLowerCase())
    }

    return (
        <div className="min-h-screen w-full p-8">
            <textarea 
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)} 
                className="relative top-20 w-full h-96 border-2 border-blue-500 p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-400"
            />
            
            <div className="flex gap-4 mt-6">
                <button onClick={handleUpperCase} className="relative top-20 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
                    UPPER-CASE
                </button>
                <button onClick={handleLowerCase} className="relative top-20 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
                    LOWER-CASE
                </button>
            </div>
        </div>
    );
}