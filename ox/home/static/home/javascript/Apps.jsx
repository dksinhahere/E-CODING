
const {createContext, useState} = React

const AppContext = createContext({
    cgpa:null,
    iq:null
})

function Apps()
{
    const [initial, setInitial] = useState({cgpa:0, iq:0})

    return (
        <AppContext.Provider value={{initial, setInitial}}>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </AppContext.Provider>
    )
}