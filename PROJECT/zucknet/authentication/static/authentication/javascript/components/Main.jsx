function Main()
{
    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <form action="/signup/" method="post" className="border-solid border-4 border-white w-[50%] relative left-90 top-30">
                 <div dangerouslySetInnerHTML={{ __html: window.userRegisterHtml }} />
                 <input type="submit" value="submit"></input>
            </form>
            <form action="/login/" method="post" className="border-solid border-4 border-white w-[50%] relative left-90 top-60">
                 <div dangerouslySetInnerHTML={{ __html: window.userLoginHtml }} />
                 <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}