
function Header(props)
{
    return (
        <h1 className={"bg-gradient-to-r from-blue-800 via-gray-500 text-white py-5 pl-4 text-4xl flex fixed top-0 left-0 w-full"}>{props.data.header}</h1>
    )
}

export {Header}