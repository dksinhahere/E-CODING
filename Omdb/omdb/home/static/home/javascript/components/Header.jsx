

const { useContext, useState } = React;

function Header() {
  const { setSearchTerm } = useContext(SearchContext);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");

  const searchHandler = () => {
    if (!query.trim()) return;

    const base = "http://www.omdbapi.com/?i=tt3896198&apikey=371f8d65";
    const finalApi = `${base}&s=${encodeURIComponent(query)}&type=${type}`;

    setSearchTerm(finalApi);
  };

  return (
    <nav className="flex flex-row gap-5 p-[2%] bg-blue-800 text-white fixed top-0 left-0 w-full">
      <h1 className="text-3xl">OmDb, Welcome</h1>

      <input
        type="search"
        placeholder="search movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border-5 border-solid border-white"
      />

      <select
        name="movies"
        id="mov"
        value={type}
        className="bg-blue-800 text-white"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="series">Series</option>
        <option value="movie">Movies</option>
        <option value="episode">Episodes</option>
      </select>

      <button
        onClick={searchHandler}
        className="border-5 border-solid border-white rounded p-1 pointer"
      >
        SEARCH MOVIE
      </button>
    </nav>
  );
}
