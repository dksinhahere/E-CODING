
function Output()
{
    let url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcR5U16C8yXgBpl7-Bc7Itjx3_LRl425zINA&s"
    return (
        <>
            <div className="relative left-[400px] top-10">
                <h1 className="text-2xl font-bold mb-3">OUTPUT</h1>

                <div className="w-[500px] h-[300px] border-4 border-white rounded overflow-hidden bg-gray-800">
                    <img src={url} alt="Output" className="w-full h-full object-cover" />
                </div>
            </div>
        </>
    )
}