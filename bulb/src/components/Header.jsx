
function Header()
{
    return (
        <header>
            <nav className="container mx-auto mx-w-screen-xl px-4 sm:px-6 lg:px-8">
                <ul className="flex [&>*]:pl-10 py-3 bg-red-700 text-white">
                    <li>Home</li>
                    <li>Gallery</li>
                    <li>Photos</li>
                    <li>Videos</li>
                </ul>
            </nav>
        </header>
    )
}

export {Header}