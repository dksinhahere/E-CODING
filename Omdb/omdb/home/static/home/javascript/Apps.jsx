const { createContext, useContext, useState } = React;

const SearchContext = createContext(null);

function Apps() {
  const [searchTerm, setSearchTerm] = useState(
    "http://www.omdbapi.com/?apikey=371f8d65&i=tt3896198"
  );

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <Header />
      <Main />
      <Footer />
    </SearchContext.Provider>
  );
}
