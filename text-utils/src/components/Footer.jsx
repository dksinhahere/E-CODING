
function Footer(props)
{
    return (
        <p className={"bg-gradient-to-r from-blue-800 via-gray-500 text-white py-5 pl-4 text-1xl flex fixed bottom-0 left-0 w-full"}>{props.data.footer}</p>
    )
}

export {Footer}