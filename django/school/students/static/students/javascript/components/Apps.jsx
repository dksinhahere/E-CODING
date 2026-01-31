const { useState } = React;
const { useReducer } = React;

let data = {
    name:"",
    email:"",
    password:"",
    confirmPass:""
}

function reduce(data, action)
{
    return {...data, [action.type]:action.val}
}

function Apps()
{
    const [state, dispatch] = useReducer(reduce, data)
    const [submit, setSubmit] = useState(null)

    const handle_submit = (e) => {
        e.preventDefault();
        setSubmit(state)
        console.log(submit)
    };

    return (
        <>
            <main className="bg-gray-700 text-white h-160">
                <form className="flex flex-col w-100 border-5 border-white border-solid space-y-4 relative top-30 left-130 p-10">
                    <label htmlFor="name">Enter your full name:</label>
                    <input type="text" id="name" name="name" onChange={(e) => dispatch({val:e.target.value, type:"name"})} className="border-3 border-white border-solid" required />

                    <label htmlFor="email">Enter your email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => dispatch({val:e.target.value, type:"email"})} className="border-3 border-white border-solid" required />

                    <label htmlFor="password">Enter your password:</label>
                    <input type="password" id="password" name="pass" onChange={(e) => dispatch({val:e.target.value, type:"password"})} className="border-3 border-white border-solid" required />

                    <label htmlFor="confirmPassword">Confirm your password:</label>
                    <input type="password" id="confirmPassword" name="confirmPass" onChange={(e) => dispatch({val:e.target.value, type:"confirmPass"})} className="border-3 border-white border-solid" required />

                    <input type="submit" onClick={handle_submit} className="border-3 border-white border-solid"></input>                </form>
            </main>  
        </>
    )
}