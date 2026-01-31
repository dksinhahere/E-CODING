const {useContext} = React;


function InputCgpa()
{
    const {initial, setInitial} = useContext(AppContext);

    function handleCHange(e)
    {
        setInitial({...initial, cgpa:parseFloat(e.target.value)})
    }

    return (
        <div>
            <input onChange={handleCHange} value={initial.cgpa} placeholder="Enter CGPA in numbers" className="w-full" type="number" id="cgpa"></input>
        </div>
    )
}