const {useContext} = React;

function ButtonSubmit() {
    const {initial, setInitial} = useContext(AppContext);
    
    function handleClick() {
        console.log("CGPA:", initial.cgpa);
        console.log("IQ:", initial.iq);
        
        
    }
    
    return (
        <>
            <button 
                onClick={handleClick} 
                className="border-2 border-solid border-black mt-5 p-2 pointer hover:bg-amber-900 hover:text-white relative left-30"
            >
                Check Pass or Fail
            </button>
        </>
    );
}