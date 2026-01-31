const { useState, useContext } = React;

function InputName() {
    const {initial, setInitial} = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        
        console.log("Form submitted with value:", inputValue);
        
        if (!inputValue.trim()) {
            alert("Please enter a URL");
            return;
        }
        
        function getCSRFToken() {
            const token = document.querySelector("[name=csrfmiddlewaretoken]");
            if (!token) {
                console.error("CSRF token not found!");
                return "";
            }
            return token.value;
        }
        
        const csrfToken = getCSRFToken();
        console.log("CSRF Token:", csrfToken ? "Found" : "Not Found");
        
        fetch("/generateimage/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                url_data: inputValue
            })
        })
        .then(res => {
            console.log("Response status:", res.status);
            console.log("Response headers:", res.headers.get('content-type'));
            
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                return res.text().then(text => {
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                });
            }
            
            return res.json();
        })
        .then(data => {
            console.log("Response data:", data);
            alert(data.status + ": " + data.message);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to generate QR code: " + error.message);
        });
    }
    
    return (
        <>
            <form 
                className="relative top-30 [&>*]:flex flex-col left-10" 
                onSubmit={handleSubmit}
            >
                <input 
                    value={inputValue} 
                    onChange={(event) => {
                        setInputValue(event.target.value);
                        setInitial(event.target.value); 
                    }}  
                    className="border-solid border-5 border-white text-white w-[20%]" 
                    placeholder="enter url or name" 
                    type="text" 
                    name="url" 
                    id="url"
                />
                <input  
                    className="border-solid border-4 border-white mt-3 p-1 rounded" 
                    type="submit" 
                    value="GENERATE"
                />
            </form>
        </>
    );
}