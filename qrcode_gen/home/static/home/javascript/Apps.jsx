const { createContext, useContext, useState } = React

const AppContext = createContext()

function Apps()
{
    const [initial, setInitial] = useState("QrCodeGenerator")
    const contextValue = {
        initial,
        setInitial
    }

    return (
        <AppContext.Provider value={contextValue}>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </AppContext.Provider>
    )
}