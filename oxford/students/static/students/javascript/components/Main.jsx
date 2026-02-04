
function Main()
{
    return (
        <div className="h-screen text-white bg-gray-800">
            <form action="" method="post"
            className="position relative left-100 border-solid border-4 border-white w-100">
                <div dangerouslySetInnerHTML={{ __html: window.studentFormHTML }} />
                <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}