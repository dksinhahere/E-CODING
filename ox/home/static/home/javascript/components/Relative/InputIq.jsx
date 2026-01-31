const {useContext} = React;


function InputIq() {
    const {initial, setInitial} = useContext(AppContext);
    
    function handleChange(e) {
        setInitial({...initial, iq: parseFloat(e.target.value) || 0});
    }
    
    return (
        <div>
            <input 
                placeholder="Enter Iq in numbers" 
                className="w-full mt-5" 
                type="number" 
                id="iq"
                onChange={handleChange}
                value={initial.iq}
            ></input>
        </div>
    );
}