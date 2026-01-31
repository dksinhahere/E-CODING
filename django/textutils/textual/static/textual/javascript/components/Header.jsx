
function Header()
{
    return (
        <nav className=" flex flex-row fixed top-0 left-0 w-full gap-8 pl-4 p-4 bg-gradient-to-r from-blue-700 to-gray-700 text-white">
                <div className="text-2xl">
                    TextUtils
                </div>
                <ul className="flex flex-row gap-4 pt-1">
                    <li>About</li>
                    <li>Photos</li>
                    <li>Docs</li>
                </ul>
        </nav>
    )
}